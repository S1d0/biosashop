'use client'

import OrderSummary from "@/components/checkout/v3/order-summary";
import CheckoutForm from "@/components/checkout/v3/checkout-form";

export default function CheckoutSteps() {

    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-12 text-center">Finalizacja zamówienia</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div className="lg:col-span-2">
                    <CheckoutForm/>
                </div>
                <div className="lg:col-span-1">
                    <OrderSummary/>
                </div>
            </div>
        </main>)
}