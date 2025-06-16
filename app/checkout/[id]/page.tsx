import {redirect} from "next/navigation";
import {Order} from "@/types/order";
import CheckoutForm from "@/components/checkout/v3/checkout-form";
import OrderSummary from "@/components/checkout/v3/order-summary";
import {CheckoutProvider} from "@/components/checkout/v3/checkout-provider";
import {fetchOrder} from "@/lib/actions/order/action";

export default async function Checkout({params}: { params: Promise<{ id: string }> }) {
    const orderId = (await params).id
    if (!orderId) {
        redirect("/")
    }
    const order: Order = await fetchOrder(orderId)

    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Finalizacja zamówienia</h1>
            <CheckoutProvider initialOrder={order}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2">
                        <CheckoutForm />
                    </div>
                    <div className="lg:col-span-1">
                        <OrderSummary />
                    </div>
                </div>
            </CheckoutProvider>
        </main>
    )
}

