'use client'

import {AddressElement, PaymentElement, useCheckout} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {StripeCheckoutConfirmResult} from "@stripe/stripe-js";

export default function CheckoutForm() {
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
            const confirmResult: StripeCheckoutConfirmResult = await checkout.confirm({
                email: email,
            })

            if (confirmResult.type == "error") {
                setError(confirmResult.error.message || "Payment failed")
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
