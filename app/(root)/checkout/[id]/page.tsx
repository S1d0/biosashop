import {redirect} from "next/navigation";
import fetchOrder from "@/lib/actions/order/action";
import EmbeddedCheckout from "@/components/checkout/embeded";
import {Order} from "@/types/order";

export default async function Checkout({params}: {params: Promise<{id: string}>}) {
    const orderId =(await params).id
    if (!orderId){
        redirect("/")
    }

    const order: Order = await fetchOrder(orderId)
    return (
        <EmbeddedCheckout order={order}/>
    )
}