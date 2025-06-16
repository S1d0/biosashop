"use client"

import { CheckCircle, MapPin, Phone, Truck } from "lucide-react"
import { formatPricePLN } from "@/lib/utils"
import type { OrderSummary } from "@/types/order"
import { CldImage } from "next-cloudinary"

interface CheckoutSummaryProps {
    summary: OrderSummary
}

export default function CheckoutSummary({ summary }: CheckoutSummaryProps) {
    // Handle error state
    if (!summary.success || !summary.order) {
        return (
            <div className="container max-w-7xl mx-auto py-12 px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-red-600">Błąd płatności</h1>
                    <p className="text-gray-600">{summary.error?.error || "Wystąpił problem z przetwarzaniem płatności"}</p>
                    {summary.error?.details && <p className="text-sm text-gray-500 mt-2">{summary.error.details}</p>}
                </div>
            </div>
        )
    }

    const { order, paymentStatus, customerEmail } = summary

    const getStatusColor = (delivered: boolean) => {
        return delivered ? "text-green-500" : "text-orange-500"
    }

    const getStatusText = (delivered: boolean, payed: boolean) => {
        if (delivered) return "Dostarczony"
        if (payed) return "W trakcie realizacji"
        return "Oczekuje na płatność"
    }

    const getImage = (cldImg: string) => {
        return cldImg.split("/").pop()?.split(".")[0]
    }

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === "string" ? new Date(date) : date
        return dateObj.toLocaleDateString("pl-PL")
    }

    return (
        <div className="container max-w-7xl mx-auto py-12 px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <CheckCircle size={40} className="text-green-500" />
                    Płatność zakończona pomyślnie
                </h1>
                <p className="text-gray-600">Dziękujemy za zakup. Poniżej znajdziesz podsumowanie zamówienia</p>

                <div className="mt-6 flex flex-col items-center justify-center">
                    <p className="font-medium">
                        Numer zamówienia: <span className="text-gray-900 font-bold">#{order.id}</span>
                    </p>
                    {order.payedAt && (
                        <p className="font-medium">
                            Data płatności: <span className="text-gray-600">{formatDate(order.payedAt)}</span>
                        </p>
                    )}
                    <p className="font-medium">
                        Status płatności:{" "}
                        <span className="text-green-600 font-bold">
              {paymentStatus === "paid" ? "Opłacone" : "Oczekuje na płatność"}
            </span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Shipping Information - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    {order.shippingAddress && (
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <MapPin size={20} />
                                Adres dostawy
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                                    {/*{order.shippingAddress.phone && (*/}
                                        <p className="text-gray-600 mt-1 flex items-center gap-1">
                                            <Phone size={14} className="text-gray-500" />
                                            {/*{order.shippingAddress.phone}*/}
                                        </p>
                                    {/*)}*/}
                                </div>
                                <div>
                                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                                    <p className="text-gray-600">
                                        {order.shippingAddress.postalCode} {order.shippingAddress.city}
                                    </p>
                                    <p className="text-gray-600">{order.shippingAddress.country}</p>
                                </div>
                                {customerEmail && (
                                    <div>
                                        <p className="text-gray-600">{customerEmail}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Shipping Status */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Truck size={20} />
                            Status wysyłki
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className={`font-bold text-lg ${getStatusColor(order.delivered)}`}>
                                    {getStatusText(order.delivered, order.payed)}
                                </p>
                            </div>

                            {order.paymentMethod && (
                                <div>
                                    <p className="text-sm text-gray-500">Metoda płatności</p>
                                    <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                                </div>
                            )}

                            {order.deliveredAt && (
                                <div>
                                    <p className="text-sm text-gray-500">Data dostawy</p>
                                    <p className="font-medium text-green-600">{formatDate(order.deliveredAt)}</p>
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-gray-500">Ostatnia aktualizacja</p>
                                <p className="text-gray-600">{formatDate(order.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Details - Right Side */}
                <div className="lg:col-span-2">
                    <div className="overflow-hidden bg-white">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-center">Kupione przedmioty</h2>
                        </div>

                        <div className="divide-y">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <CldImage
                                                src={getImage(item.image) || "/placeholder.svg"}
                                                alt={item.name}
                                                width={120}
                                                height={120}
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold">{item.name}</h3>
                                            <div className="flex gap-6 mb-2">
                                                <p>
                                                    Ilość: <span className="font-medium">{item.quantity}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-start md:items-center">
                                            <div>
                                                <p className="text-sm text-gray-500">Cena jednostkowa</p>
                                                <p className="text-primary font-bold">{formatPricePLN(item.price)} zł</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Łącznie</p>
                                                <p className="text-primary font-bold">{formatPricePLN(item.totalPrice)} zł</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Wartość produktów:</span>
                                    <span>{formatPricePLN(order.totalPrice - (order.shippingPrice || 0))} zł</span>
                                </div>
                                {order.shippingPrice && (
                                    <div className="flex justify-between">
                                        <span>Koszt wysyłki:</span>
                                        <span>{formatPricePLN(order.shippingPrice)} zł</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Łączna kwota:</span>
                                    <span className="text-primary">{formatPricePLN(order.totalPrice)} zł</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
