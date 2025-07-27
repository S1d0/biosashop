"use server"

import Stripe from "stripe"
import {Order, OrderSummary} from "@/types/order";
import {updateOrder} from "@/lib/actions/order/action";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
})

export async function createCheckoutSession(order: Order) {
    try {
        const lineItems = order.items.map((item) => ({
            quantity: item.quantity,
            price_data: {
                currency: "pln",
                unit_amount: item.price,
                product_data: {
                    name: item.name,
                    images: [item.image]
                }
            }
        }))

        const orderId = order.id
        const session = await stripe.checkout.sessions.create({
            ui_mode: "custom",
            line_items: lineItems,
            mode: "payment",
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/summary/${orderId}?sid={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: false },
            payment_method_types: ['p24', 'blik', 'klarna', 'link', 'card'],
            phone_number_collection: {
                enabled: true,
            },
            metadata: {
                orderId: orderId || "",
            }
        })

        return {
            success: true,
            clientSecret: session.client_secret,
            sessionId: session.id,
        }
    } catch (error) {
        console.error("Error creating checkout session:", error)
        return {
            success: false,
            error: "Failed to create checkout session",
            details: error instanceof Error ? error.message : "Unknown error",
        }
    }
}

export async function verifyPayment(sessionId: string, orderId: string): Promise<OrderSummary> {
    try {
        if (!sessionId) {
            return {
                success: false,
                error: {
                    error: "Session ID is required"
                }
            }
        }

        // Retrieve the checkout session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === "paid") {
            // Payment was successful
            const paymentIntentId = session.payment_intent as string
            const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId,
                {expand: ["latest_charge.balance_transaction", "payment_method"]}
                )
            const order: Order = await updateOrder(orderId, session, paymentIntent)
            const email: string = session.customer_details?.email || ""
            return {
                success: true,
                paymentStatus: session.payment_status,
                customerEmail: email,
                order: order
            }
        } else {
            return {
                success: false,
                error: {
                 error: `Płatność nie udana. Status: ${session.payment_status}`,
                }
            }
        }
    } catch (error) {
        console.error("Error verifying payment:", error)
        return {
            success: false,
            error: {
                error: "Failed to verify payment",
                details: error instanceof Error ? error.message : "Unknown error",
            },
        }
    }
}
