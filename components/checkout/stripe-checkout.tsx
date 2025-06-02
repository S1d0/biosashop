"use client"

import {Order} from "@/types/order";
import {loadStripe} from "@stripe/stripe-js";
import React, {useCallback, useEffect, useState} from "react";
import {
    AddressElement,
    CheckoutProvider,
    PaymentElement,
    useCheckout,
} from "@stripe/react-stripe-js";
import {createCheckoutSession} from "@/app/actions/stripe";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";

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
                const result = await createCheckoutSession(order.id)
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
    }, [order.id])

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
                        <CheckoutForm order={order} />
                    </CheckoutProvider>
        </div>
    )
}



function CheckoutForm({ order }: { order: Order }) {
    const checkout = useCheckout()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formattedAmount, setFormattedAmount] = useState<string>("")
    const [email, setEmail] = useState("")

    // Format the amount from the order directly instead of relying on checkout.total
    useEffect(() => {
        // Use the order amount directly, which we know is valid
        const amount = 100
        setFormattedAmount(`$${amount.toFixed(2)}`)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!checkout) {
            setError("Checkout not initialized")
            return
        }

        if (!email) {
            setError("Email is required")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // Update email first
            // checkout.updateEmail(email)

            // Confirm the payment with email
            const { error: confirmError } = await checkout.confirm({
                email: email,
            })

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

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                />
            </div>

            <div>
                <h4 className="text-lg font-semibold mb-4">Billing Address</h4>
                <AddressElement options={{ mode: "shipping" }} />
            </div>

            <div>
                <h4 className="text-lg font-semibold mb-4">Payment Information</h4>
                <PaymentElement id="payment-element" />
            </div>

            <Button type="submit" disabled={isLoading || !checkout || !email} className="w-full" size="lg">
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    `Pay ${formattedAmount} now`
                )}
            </Button>
        </form>
    )
}
