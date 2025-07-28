"use client"

import {Separator} from "@/components/ui/separator"
import {useOrderCheckout} from "@/components/checkout/v3/checkout-provider";
import {formatPricePLN} from "@/lib/utils";
import {CldImage} from "next-cloudinary";

export default function OrderSummary() {
    const {selectedDeliveryOption, selectedPoint, order} = useOrderCheckout()
    const subtotal = order.totalPrice;
    const total = subtotal + selectedDeliveryOption.price

    return (
        <div className="sticky top-4">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Podsumowanie zamówienia</h2>
            </div>

            <div className="space-y-6">
                {/* Lista produktów */}
                <div className="space-y-4">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex gap-3 pb-4 border-b border-border last:border-b-0">
                            <CldImage
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                                <div className="mt-2">
                                    <span className="text-sm text-muted-foreground">Ilość: {item.quantity}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-sm">{formatPricePLN(item.totalPrice)}</div>
                                {item.quantity > 1 && (
                                    <div
                                        className="text-xs text-muted-foreground">{formatPricePLN(item.price)}/szt</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <Separator/>

                {/* Podsumowanie kosztów */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span>Wartość produktów:</span>
                        <span>{formatPricePLN(order.totalPrice)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span>Sposób dostawy ({selectedDeliveryOption.name})</span>
                        <span>{formatPricePLN(selectedDeliveryOption.price)}</span>
                    </div>

                    {selectedDeliveryOption.method === "parcel_locker" && selectedPoint
                    ? (
                        <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                            <div className="font-medium">Paczkomat: {selectedPoint.name}</div>
                            <div>{selectedPoint.address.line1}</div>
                            <div>{selectedPoint.address.line2}</div>
                        </div>
                    )
                    : (
                            <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                                <div className="font-medium">Adres dostawy:</div>
                                <div>{order.shippingAddress?.address}</div>
                                <div>{order.shippingAddress?.postalCode} {order.shippingAddress?.city}</div>
                            </div>
                        )
                    }
                    <Separator/>
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Razem:</span>
                        <span>{formatPricePLN(total)}</span>
                    </div>
                </div>

                {/* Informacje dodatkowe */}
                <div className="bg-muted/20 p-4 rounded-lg">
                    <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Darmowa dostawa od 200 zł</div>
                        <div>• 30 dni na zwrot</div>
                        <div>• Gwarancja najniższej ceny</div>
                    </div>
                </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border">
                <div className="text-xs text-center text-muted-foreground">
                    Kontynuując, akceptujesz nasze{" "}
                    <a href="#" className="underline hover:no-underline">
                        Warunki użytkowania
                    </a>{" "}
                    i{" "}
                    <a href="#" className="underline hover:no-underline">
                        Politykę prywatności
                    </a>
                </div>
            </div>
        </div>
    )
}
