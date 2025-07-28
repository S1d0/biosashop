"use client"

import {AlertTriangle, ArrowLeft, CheckCircle, MapPin, Phone, Truck} from "lucide-react"
import {formatPhoneNumber, formatPricePLN} from "@/lib/utils"
import type {DeliveryInfo, OrderSummary, PaymentInfo} from "@/types/order"
import { CldImage } from "next-cloudinary"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useCart} from "@/components/shared/cart/cart-provider";
import {useEffect} from "react";

interface CheckoutSummaryProps {
    summary: OrderSummary
}

function CheckoutError({ error }: { error: OrderSummary["error"] }) {
    return (
        <div className="container max-w-2xl mx-auto py-12 px-4">
            <Card className="text-center border-red-200 bg-red-50">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-red-700 flex items-center justify-center gap-3">
                        <AlertTriangle size={32} />
                        Błąd płatności
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-600">{error?.error || "Wystąpił problem z przetwarzaniem płatności"}</p>
                </CardContent>
                <CardFooter className="flex justify-center pt-0 pb-6">
                    <Button asChild variant="outline">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Wróć do strony głównej i spróbuj jeszcze raz
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default function CheckoutSummary({ summary }: CheckoutSummaryProps) {
    const {clearCart} = useCart()
    const { order, paymentStatus, customerEmail } = summary

    useEffect(() => {
        clearCart()
    }, [clearCart]);

   if (!summary.success || !summary.order) {
        return (
            <CheckoutError error={summary.error} />
        )
    }

    if(!order) {
        throw new Error("Order not found")
    }

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

    const paymentInfo: PaymentInfo  = order.paymentInfo!
    const deliveryInfo: DeliveryInfo = order.deliveryInfo!

    return (
        <div className="container max-w-7xl mx-auto py-12 px-4">
            <div className="text-center mb-8">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Wróć do sklepu
                    </Link>
                </div>
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <CheckCircle size={40} className="text-green-500" />
                    Płatność zakończona pomyślnie
                </h1>
                <p className="text-gray-600">Dziękujemy za zakup. Poniżej znajdziesz podsumowanie zamówienia</p>

                <div className="mt-6 flex flex-col items-center justify-center">
                    <p className="font-medium">
                        Numer zamówienia: <span className="text-gray-900 font-bold">#{order.id}</span>
                    </p>
                    {paymentInfo?.payedAt && (
                        <p className="font-medium">
                            Data płatności: <span className="text-gray-600">{formatDate(paymentInfo.payedAt)}</span>
                        </p>
                    )}
                    <p className="font-medium">
                        Status płatności:{" "}
                        <span className="text-green-600 font-bold">
                            {paymentStatus === "paid" ? "Opłacone" : "Oczekuje na płatność"}
                        </span>
                    </p>
                </div>
                <div className="mt-8">
                    {order.paymentInfo?.receiptUrl && (
                        <Button asChild>
                            <Link href={order.paymentInfo.receiptUrl} target="_blank">Zobacz paragon</Link>
                        </Button>
                    )}
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
                                    {order.shippingAddress.phone && (
                                    <p className="text-gray-600 mt-1 flex items-center gap-2">
                                        <Phone size={14} className="text-gray-500" />
                                        {formatPhoneNumber(order.shippingAddress.phone)}
                                    </p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                                    <p className="text-gray-600">
                                        {order.shippingAddress.postalCode} {order.shippingAddress.city}
                                    </p>
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
                                <p className={`font-bold text-lg ${getStatusColor(deliveryInfo.delivered)}`}>
                                    {getStatusText(deliveryInfo.delivered, paymentInfo.payed)}
                                </p>
                            </div>

                            {paymentInfo.paymentMethodDetails && (
                                <div>
                                    <p className="text-sm text-gray-500">Metoda płatności</p>
                                    <p className="font-medium text-gray-900">{paymentInfo.paymentMethodDetails.type}</p>
                                </div>
                            )}

                            {deliveryInfo.deliveredAt && (
                                <div>
                                    <p className="text-sm text-gray-500">Data dostawy</p>
                                    <p className="font-medium text-green-600">{formatDate(deliveryInfo.deliveredAt)}</p>
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
                            {order.items.map((item,index) => (
                                <div key={index} className="p-6">
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
                                    <span>{formatPricePLN(order.totalPrice - (deliveryInfo.price || 0))} zł</span>
                                </div>
                                {deliveryInfo.price && (
                                    <div className="flex justify-between">
                                        <span>Koszt wysyłki:</span>
                                        <span>{formatPricePLN(deliveryInfo.price)}</span>
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
