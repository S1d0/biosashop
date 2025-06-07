"use client"

import {Order} from "@/types/order";
import {loadStripe} from "@stripe/stripe-js";
import React, {useCallback, useEffect, useState} from "react";
import {
    CheckoutProvider,
} from "@stripe/react-stripe-js";
import {createCheckoutSession} from "@/app/actions/stripe";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Loader2} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import CheckoutForm from "@/components/checkout/checkout-form";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function StripeCheckout({ order }: {order: Order}) {
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch the client secret on component mount
    useEffect(() => {
        const getCheckout = async () => {
            try {
                setIsLoading(true)
                const result = await createCheckoutSession(order)
                if (result.success && result.clientSecret) {
                    setClientSecret(result.clientSecret)
                } else {
                    setError(result.error || "Failed to create checkout session")
                }
            } catch (err) {
                setError("Failed to initialize checkout")
                console.error("Checkout initialization error:", err)
            } finally {
                setIsLoading(false)
            }
        }

        getCheckout()
    }, [order])

    // Create a fetchClientSecret function that returns the stored client secret
    const fetchClientSecret = useCallback(() => {
        // We'll only render the CheckoutProvider when clientSecret is available,
        // so this should always resolve successfully
        return Promise.resolve(clientSecret as string)
    }, [clientSecret])

    const appearance = {
        theme: "stripe" as const,
    }

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <Card>
                    <CardContent className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin mr-2" />
                        <span>Loading checkout...</span>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <Card>
                    <CardContent className="py-8">
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!clientSecret) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <Card>
                    <CardContent className="py-8">
                        <Alert variant="destructive">
                            <AlertDescription>Unable to initialize checkout</AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
                    <CheckoutProvider
                        stripe={stripePromise}
                        options={{
                            fetchClientSecret: fetchClientSecret,
                            elementsOptions: { appearance },
                        }}
                    >
                        <CheckoutForm  />
                    </CheckoutProvider>
        </div>
    )
}