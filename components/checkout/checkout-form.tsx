"use client"
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js"
import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {AlertTriangle, Loader2} from "lucide-react"
import type { StripeCheckoutConfirmResult } from "@stripe/stripe-js"
import { useOrderCheckout } from "@/components/checkout/v3/checkout-provider"
import { formatPricePLN } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"

function ErrorInfo() {
    return (
        <Card className="w-full max-w-lg mx-auto border-destructive/50">
            <CardHeader className="text-center">
                <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="mt-4 text-xl">Ups coś poszło nie tak</CardTitle>
                <CardDescription>Zdaje się że mamy problemy techniczne</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Button asChild>
                    <Link href="/">Wróć do strony główne i spróbój jeszcze raz</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default function CheckoutForm() {
    const checkout = useCheckout()
    const [paymentError, setPaymentError] = useState<string | null>(null)
    const [formattedAmount, setFormattedAmount] = useState<string>("")
    const { order } = useOrderCheckout()
    const [isLoadind, setIsLoading] = useState(false)

    useEffect(() => {
        let amount = order.totalPrice
        if (order.deliveryInfo) {
            amount += order.deliveryInfo.price
        }
        setFormattedAmount(formatPricePLN(amount))
    }, [order])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Clear previous errors
        setPaymentError(null)
        setIsLoading(true)

        try {
            const confirmResult: StripeCheckoutConfirmResult = await checkout.confirm({
                email: order.shippingAddress?.email,
                phoneNumber: order.shippingAddress?.phone,
                shippingAddress: {
                    name: order.shippingAddress?.fullName,
                    address: {
                        country: "PL",
                        line1: order.shippingAddress?.address,
                        city: order.shippingAddress?.city,
                        postal_code: order.shippingAddress?.postalCode,
                    },
                },
            })

            if (confirmResult.type == "error" && confirmResult.error.code !== null) {
                console.log(confirmResult)
                setPaymentError(confirmResult.error.message || "Płatność nie udana")
            }
        } catch (err) {
            setPaymentError("Ups wygląda na to że coś się nie udało wróć na stronę główną i spróbuj jeszcze raz")
            console.error("Payment error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    if(paymentError) {
        return (
            <ErrorInfo />
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h4 className="text-lg font-semibold mb-4">Wybierz sposób płatności</h4>
                <PaymentElement id="payment-element" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoadind}>
                {isLoadind ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        <p>Przetwarzanie płatności</p>
                    </>
                ) : (
                    <p>Kup i zapłać {formattedAmount}</p>
                )}
            </Button>
        </form>
    )
}
