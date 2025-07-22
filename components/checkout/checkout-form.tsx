'use client'

import {PaymentElement, useCheckout} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import { StripeCheckoutConfirmResult} from "@stripe/stripe-js";
import {useOrderCheckout} from "@/components/checkout/v3/checkout-provider";
import {formatPricePLN} from "@/lib/utils";

export default function CheckoutForm() {
    const checkout = useCheckout()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formattedAmount, setFormattedAmount] = useState<string>("")
    const { order } = useOrderCheckout()

    useEffect(() => {
        let amount = order.totalPrice
        if(order.deliveryInfo) {
            amount += order.deliveryInfo.price
        }
        setFormattedAmount(formatPricePLN(amount))
    }, [order])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!checkout) {
            setError("Checkout not initialized")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const confirmResult: StripeCheckoutConfirmResult = await checkout.confirm()

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
            <div>
                <h4 className="text-lg font-semibold mb-4">Wybierz sposób płatności</h4>
                <PaymentElement id="payment-element" />
            </div>

            <Button type="submit" disabled={isLoading || !checkout } className="w-full" size="lg">
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Przetwarzanie...
                    </>
                ) : (
                    `Kup i zapłać ${formattedAmount}`
                )}
            </Button>
        </form>
    )
}
