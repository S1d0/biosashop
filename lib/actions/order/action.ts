import {prisma} from "@/db/db";
import {notFound} from "next/navigation";
import {convertToPlain} from "@/lib/utils";
import {Order, PaymentResult, ShippingAddress, updateOrderPaymentSchema} from "@/types/order";
import Stripe from "stripe";

export default async function fetchOrder(id: string): Promise<Order> {
    try {
        // 1. Get order from db
        const rawOrder = await prisma.order.findUnique({
            where: {id: id},
            include: {items: true}
        });

        if(!rawOrder) {
            notFound()
        }

        // 2. Convert to plain
        const order: Order = convertToPlain(rawOrder) as Order
        console.log(order)

        return order
    } catch (error) {
        console.error('Error while fetching order: ', error)
        throw error;
    }
}

export async function updateOrder(orderId: string, session: Stripe.Checkout.Session): Promise<Order> {
    try {
        // Prepare payment result data
        const emailAddress: string = session.customer_details?.email || "";
        const paymentResult: PaymentResult = {
            id: session.id,
            status: session.payment_status || "unknown",
            email_address: emailAddress,
            update_time: new Date().toISOString(),
        }

        // Prepare shipping address if available
        let shippingAddress: ShippingAddress | undefined
        if (session.collected_information !== null && session.collected_information.shipping_details !== null) {
            const shippingDetails: Stripe.Checkout.Session.CollectedInformation.ShippingDetails = session.collected_information.shipping_details
            const address: Stripe.Address = shippingDetails.address
            shippingAddress = {
                fullName: shippingDetails.name || "",
                address: `${address.line1 || ""} ${address.line2 || ""}`.trim(),
                city: address.city || "",
                postalCode: address.postal_code || "",
                country: address.country || "",
            }
        }

        // Validate payment update data
        const paymentUpdateData = updateOrderPaymentSchema.parse({
            payed: true,
            payedAt: new Date(),
            paymentResult: paymentResult,
        })

        // Update the order in the database
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                payed: paymentUpdateData.payed,
                payedAt: paymentUpdateData.payedAt,
                paymentResult: paymentUpdateData.paymentResult,
                paymentMethod: session.payment_method_types?.[0] || "card",
                ...(shippingAddress && { shippingAddress }),
                updatedAt: new Date(),
            },
            include: {
                items: true,
            },
        })

       return  convertToPlain(updatedOrder) as Order
    } catch (error) {
        console.error("Error updating order:", error)
        throw new Error("Error updating order")
    }
}