import React, { Suspense } from "react"
import { CheckoutReturn } from "@/components/checkout/checkout-return"
import {CheckCircle, ExternalLink, MapPin, Package, Phone, Truck, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {formatPricePLN} from "@/lib/utils";
import fetchOrder from "@/lib/actions/order/action";
import {verifyPayment} from "@/app/actions/stripe";

export default async function ReturnPage({params, searchParams}: {params: Promise<{id: string}>, searchParams: {sid: string}}){
    const orderId = (await params).id;
    const sid = searchParams.sid

    const response = await verifyPayment(sid, orderId);
    const order = await fetchOrder(orderId);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "W trakcie realizacji":
                return "text-orange-500"
            case "Wysłany":
                return "text-blue-500"
            case "W transporcie":
                return "text-purple-600"
            case "W doręczeniu":
                return "text-green-600"
            case "Dostarczony":
                return "text-green-500"
            default:
                return "text-gray-500"
        }
    }

    return (
        <div className="container max-w-7xl mx-auto py-12 px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <CheckCircle size={40} className="text-green-500"/>
                    Płatność zakończona pomyślnie
                </h1>
                <p className="text-gray-600">Dziękujemy za zakup. Poniżej znajdziesz podsumowanie zamówienia</p>

                <div className="mt-6 flex flex-col items-center justify-center">
                    <p className="font-medium">
                        Numer zamówienia: <span className="text- font-bold">#{order.id}</span>
                    </p>
                    <p className="font-medium">
                        Data płatności: <span className="text-gray-600">12-06-2025</span>
                    </p>
                    <p className="font-medium">
                        Status płatności: <span className="text-green-600 font-bold">Opłacone</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Shipping Information - Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <MapPin size={20}/>
                            Adres dostawy
                        </h3>
                        <div className="space-y-3">
                            <div>
                                {/*<p className="font-medium text-gray-900">{order.shippingAddress.name}</p>*/}
                                <p className="font-medium text-gray-900">Jacek Placek</p>
                            </div>
                            <div>
                                <p className="text-gray-600">ul. Kasztanów</p>
                                <p className="text-gray-600">
                                    {/*{order.shippingAddress.zipCode} {order.shippingAddress.city}*/}
                                    01-015 Warszawa
                                </p>
                                {/*<p className="text-gray-600">{order.shippingAddress.state}</p>*/}
                                {/*<p className="text-gray-600">{order.shippingAddress.country}</p>*/}
                                <p className="text-gray-600">Mazowieckie</p>
                            </div>
                            {/*{order.shippingAddress.phone && (*/}
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-gray-500"/>
                                    {/*<p className="text-gray-600">{order.shippingAddress.phone}</p>*/}
                                    <p className="text-gray-600">+48 518 827 730</p>
                                </div>
                            {/*)}*/}
                        </div>
                    </div>

                    {/* Shipping Status */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Truck size={20}/>
                            Status wysyłki
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className={`font-bold text-lg ${getStatusColor("W trakcie realizacji")}`}>
                                   "W trakcie realizacji"
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Numer przesyłki</p>
                                {/*<p className="font-medium text-gray-900">{order.shippingStatus.trackingNumber}</p>*/}
                                <p className="font-medium text-gray-900">#12345</p>
                            </div>

                            {/*<div>*/}
                            {/*    <p className="text-sm text-gray-500">Kurier</p>*/}
                            {/*    <p className="font-medium text-gray-900">{order.shippingStatus.carrier}</p>*/}
                            {/*</div>*/}

                            <div>
                                <p className="text-sm text-gray-500">Metoda wysyłki</p>
                                <p className="font-medium text-gray-900">Inpost</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Przewidywana data dostawy</p>
                                {/*<p className="font-medium text-green-600">{order.shippingStatus.estimatedDelivery}</p>*/}
                                <p className="font-medium text-green-600">06-10-2025</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Ostatnia aktualizacja</p>
                                {/*<p className="text-gray-600">{order.shippingStatus.lastUpdate}</p>*/}
                                <p className="text-gray-600">06-10-2023</p>
                            </div>

                            {/*{order.shippingStatus.trackingUrl && (*/}
                            <div className="pt-2">
                                    <a
                                        href="http://localhost:3000"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                                    >
                                        <Package size={16}/>
                                        Śledź paczkę
                                        <ExternalLink size={14}/>
                                    </a>
                                </div>
                            {/*)}*/}
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
                                            {/*<Image*/}
                                            {/*    src={item.imageUrl || "/placeholder.svg"}*/}
                                            {/*    alt={item.name}*/}
                                            {/*    width={120}*/}
                                            {/*    height={120}*/}
                                            {/*    className="rounded-md object-cover"*/}
                                            {/*/>*/}
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold">{item.name}</h3>
                                            <div className="flex gap-6 mb-2">
                                                <p>
                                                    Rozmiar: <span className="font-medium">5L</span>
                                                </p>
                                                <p>
                                                    Ilość: <span className="font-medium">{item.quantity}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="grid grid-cols-1 md:grid-cols-1 gap-4 items-start md:items-center">
                                            <div>
                                                <p className="text-sm text-gray-500">Cena</p>
                                                <p className="text-primary font-bold">{formatPricePLN(item.price)} zł</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t flex flex-col md:flex-row justify-between items-center">
                            <div className="text-right">
                                <p className="text-lg">
                                    Łączna kwota: <span
                                    className="text-primary font-bold">{formatPricePLN(order.totalPrice)} zł</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
