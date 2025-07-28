"use server"

import {prisma} from "@/db/db";
import {notFound} from "next/navigation";
import {
    CreateOrder,
    createOrderSchema,
    Order, OrderItem, orderItemSchema, orderSchema, PaymentInfo, paymentInfoSchema
} from "@/types/order";
import Stripe from "stripe";
import {AddressState} from "@/components/checkout/v3/address/checkout-address";
import {ShippingAddress, shippingAddressSchema} from "@/types/address";
import {CartItem} from "@/components/shared/cart/cart-provider";

export async function createOrder(items: CartItem[]): Promise<string> {
    const orderItems: OrderItem[] = fromCartItems(items);

    const totalPrice = orderItems.reduce((total, orderItem) =>  total + orderItem.totalPrice, 0)
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

function assertSession(session: Stripe.Checkout.Session) {
 if (!session || !session.id) {
     throw new Error("Invalid session provided");
 }
}

export async function updateOrder(orderId: string, session: Stripe.Checkout.Session, paymentIntent: Stripe.PaymentIntent): Promise<Order> {
    try {
        assertSession(session)

        // Create Payment Information
        const paymentInfo: PaymentInfo = createPaymentInfo(session, paymentIntent);
        const status = paymentInfo.status === "succeeded" ? "paid" : "pending";

        // Update the order in the database
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: status,
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

const deliveryPriceMap = new Map<string, number>()
deliveryPriceMap.set("standard", 1990)
deliveryPriceMap.set("express", 2990)
deliveryPriceMap.set("inpost", 1990)

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


function mapStripeStatus(stripeStatus: Stripe.Checkout.Session.PaymentStatus,
                         sessionStatus: Stripe.Checkout.Session.Status | null
                         ): string {
    if (sessionStatus === 'expired' || sessionStatus == null) return 'canceled'

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

function getPaymentMethodDetails(paymentMethod: Stripe.PaymentMethod | null) {
    return paymentMethod
        ? {
            type: paymentMethod.type,
            last4: paymentMethod.card?.last4,
            brand: paymentMethod.card?.brand,
        } : null;
}

function createPaymentInfo(session: Stripe.Checkout.Session, paymentIntent: Stripe.PaymentIntent): PaymentInfo {
    const isPaid = session.payment_status === "paid"
    const status = mapStripeStatus(session.payment_status, session.status)
    const paymentMethod = paymentIntent.payment_method as Stripe.PaymentMethod | null
    const charge = paymentIntent.latest_charge as Stripe.Charge | undefined

    return paymentInfoSchema.parse({
        status: status,
        amount: session.amount_total,
        currency: session.currency,
        paymentIntentId: session.payment_intent,
        paymentMethodDetails: getPaymentMethodDetails(paymentMethod),
        payed: isPaid,
        payedAt: new Date(),
        createdAt: new Date(session.created * 1000),
        updatedAt: new Date(),
        receiptUrl: charge?.receipt_url
    })
}

