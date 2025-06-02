import { Suspense } from "react"
import { CheckoutReturn } from "@/components/checkout/checkout-return"

export default function ReturnPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <CheckoutReturn />
                </Suspense>
            </div>
        </div>
    )
}
