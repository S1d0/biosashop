"use client"

import type React from "react"

import type { Order } from "@/types/order"
import { loadStripe } from "@stripe/stripe-js"
import { useMemo, useState } from "react"
import { AddressElement, CheckoutProvider, PaymentElement, useCheckout } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { createCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({ order }: { order: Order }) {
    const promise = useMemo(async () => {
        const result = await createCheckoutSession(order.id)

        if (!result.success) {
            throw new Error(result.error || "Failed to create checkout session")
        }

        return result.clientSecret!
    }, [order.id])

    const appearance = {
        theme: "stripe" as const,
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <CheckoutProvider
                        stripe={stripePromise}
                        options={{
                            fetchClientSecret: () => promise,
                            elementsOptions: { appearance },
                        }}
                    >
                        <CheckoutForm order={order} />
                    </CheckoutProvider>
                </CardContent>
            </Card>
        </div>
    )
}

function CheckoutForm({ order }: { order: Order }) {
    const checkout = useCheckout()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!checkout) {
            setError("Checkout not initialized")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const email = await checkout.updateEmail("sidzkowski@protonmail.com");
            console.log("Email updated, ",email)
            // Confirm the payment - no return_url needed as it's set in the session
            const { error: confirmError } = await checkout.confirm()

            if (confirmError) {
                setError(confirmError.message || "Payment failed")
            }
            // If successful, Stripe will automatically redirect to the return_url
        } catch (err) {
            setError("An unexpected error occurred")
            console.error("Payment error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div>
                <h4 className="text-lg font-semibold mb-4">Billing Address</h4>
                <AddressElement options={{ mode: "billing" }} />
            </div>

            <div>
                <h4 className="text-lg font-semibold mb-4">Payment Information</h4>
                <PaymentElement id="payment-element" />
            </div>

            <Button type="submit" disabled={isLoading || !checkout} className="w-full" size="lg">
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    `Pay ${checkout?.total?.total?.amount ? `$${(checkout.total.total.amount / 100).toFixed(2)}` : ""} now`
                )}
            </Button>
        </form>
    )
}
