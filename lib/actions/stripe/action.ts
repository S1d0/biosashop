'use server'

import { stripe } from '@/lib/stripe'
import {Order} from "@/types/order";
import {headers} from "next/headers"; // Implement this function to fetch an order from your database

export async function createCheckoutSessionFromOrder(order: Order) {
    try {
        const lineItems = order.items.map((item) => ({
            quantity: item.quantity,
            price_data: {
                currency: "PLN",
                unit_amount: item.price,
                product_data: {
                    name: item.name,
                    images: [
                        "https://via.placeholder.com/400"
                    ]
                }
            }
        }))
        const origin = (await headers()).get('origin')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: lineItems,
            mode: 'payment',
            return_url: `${origin}/return`,
            payment_method_types: ['card', 'blik', 'klarna'],
            automatic_tax: {enabled: false},
        })

        return session
    } catch(error) {
        console.error("Error creating checkout session:", error)
        throw error // Re-throw to allow handling in the component
    }
}

export async function createPaymentIntent(order: Order ) {
    const total = order.totalPrice
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "pln",
        // automatic_payment_methods: {
        //     enabled: true,
        // },
        receipt_email: "sidzkowski@protonmail.com",
        payment_method_types: ['card', 'blik', 'klarna'],

        metadata: {
            items: JSON.stringify(
                order.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                })),
            ),
        },
    })

    return { clientSecret: paymentIntent.client_secret }
}