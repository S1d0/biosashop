import CheckoutPage from '@/components/checkout/checkout'
import {redirect} from "next/navigation";
import fetchOrder from "@/lib/actions/order/action";

export default async function Checkout({params}: {params: Promise<{id: string}>}) {
    const { id } = await params
    console.log(id)
    if (!id){
        redirect("/")
    }
    const order = await fetchOrder(id)
    return (
        <CheckoutPage
            order={order}
        />
    )
}