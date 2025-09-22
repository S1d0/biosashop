"use server"

import Stripe from "stripe"
import {Order, OrderSummary} from "@/types/order";
import {updateOrder} from "@/lib/actions/order/action";
import {ShippingAddress} from "@/types/address";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
})

async function createOrGetCustomer(shippingAddress: ShippingAddress) {
    const customerList = await stripe.customers.list({
        email: shippingAddress.email,
        limit: 1, // We only need to know if at least one exists
    }).then((res) => res.data)

    if (customerList.length > 0) {
        return customerList[0].id
    }

    const newCustomer = await stripe.customers.create({
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        name: shippingAddress.fullName,
        address: {
            country: "PL",
            line1: shippingAddress.address,
            city: shippingAddress.city,
            postal_code: shippingAddress.postalCode,
        }
    })

    return newCustomer.id
}

function mapFromOrder(order: Order) {
    return order.items.map((item) => ({
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
}

export interface BasicCustomer {
    id: string
    email: string
    phone: string
    name: string
    address: {
        country: string
        line1: string
        city: string
        postal_code: string
    }
}

export async function getCustomer(customerId: string): Promise<BasicCustomer> {
    const customer = await stripe.customers.retrieve(customerId)
    console.log(customer)
    // return {
    //     id: customer.id,
    //     [email]: customer,
    //     phone: customer.phone,
    //     name: customer.name,
    //     address: {
    //         country: customer.address.country,
    //         line1: customer.address.line1,
    //         city: customer.address.city,
    //         postal_code: customer.address.postal_code,
    //     }
    // }
    return {} as BasicCustomer
}

export async function createCheckoutSession(order: Order) {
    try {
        const customerId = await createOrGetCustomer(order.shippingAddress!)
        const lineItems = mapFromOrder(order)
        const orderId = order.id
        const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            ui_mode: "custom",
            line_items: lineItems,
            mode: "payment",
            return_url: `${url}/summary/${orderId}?sid={CHECKOUT_SESSION_ID}`,
            automatic_tax: { enabled: false },
            payment_method_types: ['p24', 'blik', 'klarna', 'link', 'card'],
            phone_number_collection: {
                enabled: true,
            },
            locale: "pl",
            metadata: {
                orderId: orderId || "",
                customerEmail: order.shippingAddress?.email || "",
                customerPhone: order.shippingAddress?.phone || "",
                customerName: order.shippingAddress?.fullName || ""
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
