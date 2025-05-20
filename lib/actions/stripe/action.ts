'use server'

import { stripe } from '@/lib/stripe'
import {Order} from "@/types/order"; // Implement this function to fetch an order from your database

const CURRENCY = "PLN"

export async function createCheckoutSessionFromOrder(order: Order) {
    try {
        const lineItems = order.items.map((item) => ({
            price_data: {
                currency: CURRENCY,
                product_data: {
                    name: item.name,
                    // images: [item.image.startsWith("/placeholder") ? "https://via.placeholder.com/400" : item.image],
                     images:  "https://via.placeholder.com/400",
                },
                unit_amount: item.price, // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            // success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
            // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/cart`,
            shipping_address_collection: {
                allowed_countries: ["PL"],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "usd",
                        },
                        display_name: "Free shipping",
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 3,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 5,
                            },
                        },
                    },
                },
            ],
        })

        return {id: session.id, url: session.url}
    } catch(error) {
        console.error("Error creating checkout session:", error)
        throw error // Re-throw to allow handling in the component
    }
}