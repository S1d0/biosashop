"use server"

import {prisma} from "@/db/db";
import {notFound} from "next/navigation";
import {
    CreateDeliveryInfo,
    CreateOrder,
    createOrderSchema, deliverInfoSchema,
    Order, OrderItem, orderItemSchema, orderSchema, ParcelLocker, parcelLockerSchema, PaymentInfo, paymentInfoSchema,
} from "@/types/order";
import Stripe from "stripe";
import {AddressState} from "@/components/checkout/v3/address/checkout-address";
import {DeliveryState} from "@/components/checkout/v3/checkout-delivery";
import {ShippingAddress, shippingAddressSchema} from "@/types/address";
import {CartItem} from "@/components/shared/cart/cart-provider";
import {DeliveryMethod} from "@/components/checkout/v3/checkout-provider";
import {string} from "zod";

export async function createOrder(items: CartItem[]): Promise<string> {
    // 1. Create order items
    const orderItems: OrderItem[] = fromCartItems(items);

    // 2. Create order
    const totalPrice = orderItems.reduce((total, orderItem) => total = total + orderItem.totalPrice, 0)
    const newOrder: CreateOrder = createOrderSchema.parse({
        items: orderItems,
        totalPrice: totalPrice,
    })

    const savedOrder= await prisma.order.create({
        data: newOrder
    });

    return savedOrder.id;
}

export async function fetchOrder(id: string): Promise<Order> {
    try {
        const rawOrder = await prisma.order.findUnique({
            where: {id: id},
        });

        if(!rawOrder) {
            notFound()
        }

        // Convert to zod Order
        return orderSchema.parse(rawOrder);
    } catch (error) {
        console.error('Error while fetching order: ', error)
        throw error;
    }
}

export async function updateOrder(orderId: string, session: Stripe.Checkout.Session): Promise<Order> {
    try {
        // Create Payment Information
        const paymentInfo: PaymentInfo = createPaymentInfo(session);

        // Update the order in the database
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                paymentInfo: paymentInfo,
                updatedAt: new Date(),
            }
        })

       return orderSchema.parse(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error)
        throw new Error("Error updating order")
    }
}

export async function updateAddress(initialState: AddressState, formData: FormData): Promise<AddressState> {
    // Retrieve form data
    const orderId = formData.get("orderId") as string;
    const rawData: ShippingAddress = {
        fullName: formData.get("fullName") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        postalCode: formData.get("postalCode") as string
    }

    const validatedFields = shippingAddressSchema.safeParse(rawData)

    if(!validatedFields.success) {
        console.log("Validation failed");
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Proszę poprawić błędy w formularzu.",
            inputs: rawData,
            updatedOrder: null
        }
    }

    const shippingAddress: ShippingAddress = validatedFields.data
    const rawOrder = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            shippingAddress: shippingAddress,
            updatedAt: new Date(),
        }
    })

    const updatedOrder: Order = orderSchema.parse(rawOrder);
    return { success: true, message: "Adres został zapisany pomyślnie", errors: null, inputs: shippingAddress, updatedOrder: updatedOrder}
}

function getDeliveryPrice(deliveryMethod: DeliveryMethod): number {
    switch (deliveryMethod) {
        case "standard":
            return 1990
        case "express":
            return  2990
        case "inpost":
            return 1190
        default:
            throw new Error(`Unknown delivery method: ${deliveryMethod}`);
    }
}
const deliveryPriceMap = new Map<string, number>()
deliveryPriceMap.set("standard", 1990)
deliveryPriceMap.set("express", 2990)
deliveryPriceMap.set("inpost", 1990)

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
function getDeliveryDate(deliveryMethod: DeliveryMethod): Date {
    const now = new Date()
    switch (deliveryMethod) {
        case "standard":
            return addDays(now, 4);
        case "express":
            return addDays(now, 2);
        case "inpost":
            return addDays(now, 3);
        default:
            throw new Error(`Unknown delivery method: ${deliveryMethod}`);
    }
}


export async function updateDelivery(initialState: DeliveryState, formData: FormData): Promise<DeliveryState> {
    const orderId = formData.get("orderId") as string;
    const method = formData.get("method") as string;

    const deliveryEta = getDeliveryDate(method as DeliveryMethod)
    const price =  getDeliveryPrice(method as DeliveryMethod)

    let parcelLocker : ParcelLocker | null = null;
    if(formData.get("parcelLockerName") instanceof string) {
        parcelLocker = parcelLockerSchema.parse({
            name: formData.get("parcelLockerName"),
            address: formData.get("parcelLockerAddress"),
        })
    }

    const rawData: CreateDeliveryInfo = {
        method: formData.get("deliveryMethod") as DeliveryMethod,
        price: price,
        parcelLocker: parcelLocker,
        estimatedDeliveryDate: deliveryEta,
        notes: formData.get("deliveryNotes") as string,
    }

    console.log("Raw data: ", rawData)

    const validatedFields = deliverInfoSchema.safeParse(rawData)
    if(!validatedFields.success) {
        throw new Error()
    }

    const deliveryInfo: CreateDeliveryInfo = validatedFields.data
    await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            deliveryInfo: deliveryInfo,
            updatedAt: new Date(),
        }
    })

    const delivery: DeliveryState = {} as DeliveryState;
    return Promise.resolve(delivery);
}


function fromCartItems(items: CartItem[]): OrderItem[] {
    return items.map(cartItem => {
        const total = cartItem.quantity * cartItem.product.price;
        const image = cartItem.product.cldImage
        return orderItemSchema.parse({
            name: cartItem.product.name,
            productId: cartItem.product.id,
            image: image,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            totalPrice: total,

        })
    })
}

function createPaymentInfo(session: Stripe.Checkout.Session): PaymentInfo {
    const isPaid = session.payment_status === "paid"

    const mapStripeStatus = (
        stripeStatus: Stripe.Checkout.Session.PaymentStatus,
        sessionStatus: Stripe.Checkout.Session.Status | null
    ): PaymentInfo['status'] => {
        // Check session status first
        if (sessionStatus === 'expired' || sessionStatus == null) return 'canceled'

        // Then check payment status
        switch (stripeStatus) {
            case 'paid':
                return 'succeeded'
            case 'unpaid':
                return 'pending'
            case 'no_payment_required':
                return 'succeeded'
            default:
                return 'pending'
        }
    }

    return paymentInfoSchema.parse({
        status: mapStripeStatus(session.payment_status, session.status),
        amount: session.amount_total,
        currency: session.currency,
        paymentIntentId: session.payment_intent,
        payed: isPaid,
        payedAt: new Date().toISOString(),
        createdAt: new Date(session.created * 1000),
        updatedAt: new Date().toISOString(),
    })
}

