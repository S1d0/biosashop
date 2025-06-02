"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { verifyPayment } from "@/app/actions/stripe"

export function CheckoutReturn() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const orderId = searchParams.get("order_id")

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!sessionId) {
            setStatus("error")
            setMessage("No session ID found")
            return
        }

        // Verify the payment status using server action
        const verifyPaymentStatus = async () => {
            try {
                const result = await verifyPayment(sessionId, orderId || undefined)

                if (result.success) {
                    setStatus("success")
                    setMessage("Payment successful!")
                } else {
                    setStatus("error")
                    setMessage(result.error || "Payment verification failed")
                }
            } catch (error) {
                console.error("Error verifying payment:", error)
                setStatus("error")
                setMessage("Failed to verify payment")
            }
        }

        verifyPaymentStatus()
    }, [sessionId, orderId])

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                        {status === "loading" && <Loader2 className="h-6 w-6 animate-spin" />}
                        {status === "success" && <CheckCircle className="h-6 w-6 text-green-600" />}
                        {status === "error" && <XCircle className="h-6 w-6 text-red-600" />}

                        {status === "loading" && "Processing Payment..."}
                        {status === "success" && "Payment Successful!"}
                        {status === "error" && "Payment Failed"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert variant={status === "success" ? "default" : "destructive"}>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>

                    {status === "success" && (
                        <div className="text-center space-y-4">
                            <p className="text-sm text-gray-600">
                                Thank you for your purchase! You will receive a confirmation email shortly.
                            </p>
                            <Button asChild className="w-full">
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="text-center space-y-4">
                            <Button asChild variant="outline" className="w-full">
                                <Link href={`/checkout/${orderId}`}>Try Again</Link>
                            </Button>
                            <Button asChild className="w-full">
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
