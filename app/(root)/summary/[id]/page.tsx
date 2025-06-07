import React from "react"
import {verifyPayment} from "@/app/actions/stripe";
import CheckoutSummary from "@/components/checkout/v2/summary";
import {OrderSummary} from "@/types/order";

export default async function ReturnPage({params, searchParams}: {params: Promise<{id: string}>, searchParams: {sid: string}}){
    const orderId = (await params).id;
    const sid = searchParams.sid

    const summary: OrderSummary = await verifyPayment(sid, orderId);

    return (
        <CheckoutSummary {...summary} />
    )
}
