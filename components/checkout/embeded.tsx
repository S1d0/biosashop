'use client'
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import React, {useEffect, useState} from "react";
import {Order} from "@/types/order";
import {createPaymentIntent} from "@/lib/actions/stripe/action";
import {ArrowLeft, Loader2} from "lucide-react";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/checkout-form";
import OrderSummary from "@/components/checkout/order-summary";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function EmbeddedCheckout(params: {order: Order}) {
    const {order} = params;
    const [clientSecret, setClientSecret] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (!order) {
            return
        }

        const fetchPaymentIntent = async () => {
            try {
                const { clientSecret } = await createPaymentIntent(order)
                setClientSecret(clientSecret!)
            } catch (error) {
                console.error("Error creating payment intent:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPaymentIntent()
    }, [order])

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#0f172a",
        },
    }

    const options = {
        clientSecret,
        appearance,
    }

    return (
            <div className="container mx-auto px-4 py-8 h-full">
                <div className="flex items-center mb-8">
                    <Link href="/" className="flex items-center text-muted-foreground hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Powrót do zakupów
                    </Link>
                </div>
                <h1 className="text-3xl font-bold mb-8">Dane do zamówienia</h1>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                            </div>
                        ) : (
                            clientSecret && (
                                <Elements options={options as StripeElementsOptions} stripe={stripePromise}>
                                    <CheckoutForm/>
                                </Elements>
                            )
                        )}
                    </div>
                    <div className="lg:col-span-2">
                        <OrderSummary order={order}/>
                    </div>
                </div>
            </div>
    )
}