"use server"

import Stripe from "stripe"
// import { updateOrderStatus } from "@/lib/actions/order/action"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
})

export async function createCheckoutSession(orderId: string) {
    try {
        // Here you would typically fetch the order details from your database
        // For now, using static data
        const orderAmount = 1000 // $10.00 in cents
        const orderDescription = "Sample Product"

        const session = await stripe.checkout.sessions.create({
            ui_mode: "custom",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "usd",
                        unit_amount: orderAmount,
                        product_data: {
                            name: orderDescription,
                        },
                    },
                },
            ],
            mode: "payment",
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/summary?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
            automatic_tax: { enabled: false },
            metadata: {
                orderId: orderId || "",
            },
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

export async function verifyPayment(sessionId: string, orderId?: string) {
    try {
        if (!sessionId) {
            return { success: false, error: "Session ID is required" }
        }

        // Retrieve the checkout session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId, {

        })

        if (session.payment_status === "paid") {
            // Payment was successful
            if (orderId) {
                // Update your order status in the database
                // await updateOrderStatus(orderId, "paid")
                console.log("Update order status")
            }

            return {
                success: true,
                paymentStatus: session.payment_status,
                customerEmail: session.customer_details?.email,
            }
        } else {
            return {
                success: false,
                error: `Payment not completed. Status: ${session.payment_status}`,
            }
        }
    } catch (error) {
        console.error("Error verifying payment:", error)
        return {
            success: false,
            error: "Failed to verify payment",
            details: error instanceof Error ? error.message : "Unknown error",
        }
    }
}
