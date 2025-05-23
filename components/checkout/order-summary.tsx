import {Order} from "@/types/order";
import Image from "next/image";
import {formatPricePLN} from "@/lib/utils";
import {ShieldCheck, Truck} from "lucide-react";
import React from "react";

export default function OrderSummary(params: {order: Order}) {
    const {order} = params;
    const shippingCost = order.shippingPrice ? order.shippingPrice : 2000;
    const totalCost = order.totalPrice + shippingCost;
    return (
        <>
            <div className="hidden lg:block">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                    <h2 className="text-xl font-semibold mb-6">Twoje zamówienie</h2>
                    <div className="space-y-4 mb-6">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                                    <Image
                                        src={item.image || "/placeholder.svg?height=64&width=64"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="font-medium">{formatPricePLN(item.totalPrice)}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {item.quantity} x {formatPricePLN(item.price)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span>Razem</span>
                            <span>{formatPricePLN(order.totalPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Dostawa</span>
                            <span>{shippingCost === 0 ? "Free" : formatPricePLN(shippingCost)}</span>
                        </div>
                        <div className="flex justify-between font-medium text-lg pt-2 border-t border-border mt-2">
                            <span>Całkowity koszt</span>
                            <span>{formatPricePLN(totalCost)}</span>
                        </div>
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-start">
                            <Truck className="h-4 w-4 mr-2 mt-0.5 text-primary"/>
                            <span>Darmowa dostawa dla zamówień powyżej 200 zł</span>
                        </div>
                        <div className="flex items-start">
                            <ShieldCheck className="h-4 w-4 mr-2 mt-0.5 text-primary"/>
                            <span>Bezpieczne błatności</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}