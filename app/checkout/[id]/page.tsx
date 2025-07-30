import {redirect} from "next/navigation";
import {Order} from "@/types/order";
import CheckoutForm from "@/components/checkout/v3/checkout-form";
import OrderSummary from "@/components/checkout/v3/order-summary";
import {CheckoutProvider} from "@/components/checkout/v3/checkout-provider";
import {fetchOrder} from "@/lib/actions/order/action";
import {DeliveryOption} from "@/types/delivery";
import {filterDeliveryOption} from "@/lib/actions/delivery/action";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";


export default async function Checkout({params}: { params: Promise<{ id: string }> }) {
    const orderId = (await params).id
    if (!orderId) {
        redirect("/")
    }
    const order: Order = await fetchOrder(orderId)
    const deliveryOptions: DeliveryOption[] = await filterDeliveryOption(order.items)

    return (
        <main className="container mx-auto py-10 px-4">
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Wróć do sklepu
                </Link>
            </div>
            <h1 className="text-3xl font-bold mb-8 text-center">Finalizacja zamówienia</h1>
            <CheckoutProvider initialOrder={order} availableDeliveryOptions={deliveryOptions}>
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

