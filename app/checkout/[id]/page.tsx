import {redirect} from "next/navigation";
import fetchOrder from "@/lib/actions/order/action";
import {Order} from "@/types/order";
import OrderSummary from "@/components/checkout/order-summary";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import StripeCheckout from "@/components/checkout/stripe-checkout";
import {Suspense} from "react";

export default async function Checkout({params}: {params: Promise<{id: string}>}) {
    const orderId =(await params).id
    if (!orderId){
        redirect("/")
    }
    const order: Order = await fetchOrder(orderId)
    return (
        <div className="container mx-auto px-4 py-8 h-full">
            <div className="flex items-center mb-8">
                <Link href="/public" className="flex items-center text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Powrót do zakupów
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <Suspense fallback={<div>Loading...</div>}>
                        <StripeCheckout order={order} />
                    </Suspense>
                </div>
                <div className="lg:col-span-2">
                    <OrderSummary order={order}/>
                </div>
            </div>
        </div>
    )
}



