'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import {Order} from "@/types/order";
import {createCheckoutSessionFromOrder} from "@/lib/actions/stripe/action";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Define the props for the CheckoutPage component
interface CheckoutPageProps {
    order: Order
}

export default function CheckoutPage({order} : CheckoutPageProps) {
    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        const fetchCheckoutSession = async() => {
            const {id} = await createCheckoutSessionFromOrder(order)
            setClientSecret(id)
        }
        fetchCheckoutSession()
    }, [order])

    if (!clientSecret || clientSecret === "") {
        return <div>Loading...</div>
    }

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}