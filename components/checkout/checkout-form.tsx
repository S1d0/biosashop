"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,
    AddressElement,
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {useCart} from "@/components/shared/cart/cart-provider";

export default function CheckoutForm() {
    const router = useRouter()
    const stripe = useStripe()
    const elements = useElements()
    const { clearCart, setIsCartOpen } = useCart()

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsCartOpen(false)

        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!")
                    router.push("/success")
                    break
                case "processing":
                    setMessage("Your payment is processing.")
                    break
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.")
                    break
                default:
                    setMessage("Something went wrong.")
                    break
            }
        })
    }, [stripe, router])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            return
        }

        setIsLoading(true)

        clearCart()
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`,
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.")
        } else {
            setMessage("An unexpected error occurred.")
        }

        setIsLoading(false)
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <LinkAuthenticationElement id="link-authentication-element" onChange={(e) => setEmail(e.value.email)} />

            <h3 className="text-lg font-medium">Shipping Address</h3>
            <AddressElement options={
                {
                    mode: "shipping",
                    fields: {
                        phone: "always"
                    },
                    allowedCountries: ["PL"],
                    validation: {
                        phone: {
                            required: "always"
                        }
                    }
                }
            } />

            <h3 className="text-lg font-medium">Payment Method</h3>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            <Button disabled={isLoading || !stripe || !elements} className="w-full" type="submit">
                {isLoading ? (
                    <span className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </span>
                ) : (
                    <span>Zamów i zapłać</span>
                )}
            </Button>

            {message && <div className="text-center text-red-500">{message}</div>}
        </form>
    )
}
