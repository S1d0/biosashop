'use client'

import {Order } from "@/types/order";
import {Eye,Package, Truck} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {JSX, useEffect, useState} from "react";
import {formatPricePLN} from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {CldImage} from "next-cloudinary";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

interface OrderCardProps {
    order: Order
}

export default function OrderCard({order}: OrderCardProps) {
    const [statusColor, setStatusColor] = useState<string>("bg-gray-100 text-gray-800 hover:bg-gray-200")
    const [statusIcon, setStatusIcon] = useState<JSX.Element>(<Package className="h-4 w-4"/>)
    const [status, setStatus] = useState<string>("Zamówienie w przygotowaniu")
    const [deliveryMethod, setDeliveryMethod] = useState<string>("")
    const [paymentStatus, setPaymentStatus] = useState<string>("")

    useEffect(() => {
        setStatus(getStatus(order.status, order.deliveryInfo?.method))
        setStatusIcon(getStatusIcon(order.status))
        setStatusColor(getStatusColor(order.status))
        setDeliveryMethod(getDeliveryMethod(order.deliveryInfo?.method))
        setPaymentStatus(getPaymentStatus(order.paymentInfo?.status))
    }, [order]);

    function getPaymentStatus(status: string) {
        switch (status) {
            case "pending":
                return "Oczekująca płatność"
            case "processing":
                return "Procesowanie płatności"
            case "succeeded":
                return "Opłacone"
            case "failed":
                return "Niepowodzenie"
            case"canceled":
                return "Anulowana"
            case "requires_action":
                return "Wymaga akcji"
            default:
                return "Wymaga akcji"
        }
    }

    function getDeliveryMethod(method: string) {
        switch (method) {
            case "inpost":
                return "Paczkomat inpost"
            case "standard":
                return "Przesyłka kurierska standard"
            case "express":
                return "Przesyłka kurierska express"
            case "pickup":
                return "Odbiór na miejscu"
            case "company":
                return "Dostawa firmowa"
            default:
                return "Przesyłka kurierska standard"
        }
    }

    function getStatusColor(status: string): string {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "shipped":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200"
            case "paid":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    function getStatusIcon(status: string) {
        switch (status) {
            case "shipped":
                return <Truck className="h-4 w-4"/>
            default:
                return <Package className="h-4 w-4"/>
        }
    }

    function getStatus(status: string, deliveryMethod: string) {
        switch (status) {
            case "delivered":
                if (deliveryMethod === "pickup") {
                    return "Zamówienie odebrane"
                }
                return "Zamówienie dostarczone"
            case "shipped":
                return "Zamówienie wysłane"
            case "paid":
                if (deliveryMethod === "pickup") {
                    return "Zamówienie opłacone, czeka na odbiór"
                }
                return "Zamówienie opłacone, czeka na wysyłkę"
            case "cancelled":
                return "Zamówienie anulowane"
            default:
                return "Zamówienie w przygotowaniu"
        }
    }

    return (
        <section id="order-card">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Numer zamówienia: {order.orderNumber}</CardTitle>
                        <CardDescription>Data zakupu: {order.createdAt.toLocaleString("pl")}</CardDescription>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className={`flex items-center justify-between ${statusColor} rounded-2xl p-4 gap-2`}>
                            {statusIcon}
                            <span>{status}</span>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold text-lg">Suma: {formatPricePLN(order.totalPrice)}</div>
                            <div className="text-muted-foreground">Ilość: {order.items.length}</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2 items-center">
                            <h4 className='text-lg font-semibold'>Kupione: </h4>
                            {order.items.slice(0, 3).map((item, index) => (
                                <span key={index} className="text-muted-foreground">
                                    {item.name}
                                    {index < Math.min(order.items.length, 3) - 1 && ", "}
                                </span>
                            ))}
                            {order.items.length > 3 && (
                                <span className="text-sm text-muted-foreground">+{order.items.length - 3} więcej</span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button variant='outline' asChild>
                                <Link href={order.paymentInfo.receiptUrl} target="_blank">Rachunek</Link>
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant='outline' size='sm'>
                                        <Eye className='mr-2 h-4 w-4'/>
                                        <span>Szczegóły</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className={"max-w-2xl"}>
                                    <DialogHeader>
                                        <DialogTitle>Zamówienia - {order.orderNumber}</DialogTitle>
                                        <DialogDescription>Pełna lista zakupionych przedmiotów</DialogDescription>
                                    </DialogHeader>
                                    <div className={'space-y-6'}>
                                        <div className={'space-y-2'}>
                                            {order.items.map((item, index) => (
                                                <div key={index}
                                                     className={'flex justify-between items-center gap-3 py-2 px-2'}>
                                                    <div className={'relative h-48 w-48 rounded-md overflow-hidden'}>
                                                        <CldImage src={item.image} alt={item.name} fill
                                                                  className="object-cover"/>
                                                    </div>
                                                    <div className={'flex flex-col'}>
                                                        <span className={'font-semibold'}>Nazwa: {item.name}</span>
                                                        <span
                                                            className={'text-sm text-muted-foreground'}>Pojemność: {item.size}</span>
                                                        <span
                                                            className={'text-sm text-muted-foreground'}>Ilość: {item.quantity} x {formatPricePLN(item.price)}</span>
                                                        <span
                                                            className="text-sm font-semibold">Razem: {formatPricePLN(item.totalPrice)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            <Separator className='my-3'/>
                                            <div className='flex justify-between items-center font-semibold py-2 px-2'>
                                                <span>Suma zamówienia</span>
                                                <span>{formatPricePLN(order.totalPrice)}</span>
                                            </div>

                                            {/* Delivery Informations */}
                                            <Separator className='my-3'/>
                                            {order.deliveryInfo?.method != 'pickup' ? (
                                                    <DeliveryAddress address={order.shippingAddress}/>)
                                                : (
                                                    <div
                                                        className='flex justify-between items-center font-semibold py-2 px-2'>
                                                        <h4 className="font-semibold mb-2">Metoda
                                                            dostawy:</h4> {deliveryMethod}
                                                    </div>
                                                )
                                            }
                                            <div className='flex items-center justify-between font-semibold py-2 px-2'>
                                                <h4 className="font-semibold mb-2">Status zamówienia</h4>
                                                <div
                                                    className={`flex items-center justify-between ${statusColor} rounded-2xl p-4 gap-2`}>
                                                    {statusIcon}
                                                    <span>{status}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

function DeliveryAddress() {
    return (
        <div id='shipping-information px-2 py-2'>
            <h4 className="font-semibold mb-2">Adres Dostawy</h4>
            {order.shippingAddress && (
                <div className="text-muted-foreground">
                    <p>
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                    </p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                    {order.shippingAddress.phone && <p>Telefon: {order.shippingAddress.phone}</p>}
                </div>
            )}
            <h4 className='font-semibold mb-2'>Szczegóły dostawy</h4>
            {order.deliveryInfo?.method && (
                <p className="text-sm mt-2">
                    <span className="font-medium">Metoda:</span> {deliveryMethod}
                </p>
            )}
            {order.deliveryInfo?.trackingNumber && (
                <p className="text-sm mt-2">
                    <span
                        className="font-medium">Numer do śledzenia przesyłki:</span> {order.deliveryInfo.trackingNumber}
                </p>
            )}
            {order.deliveryInfo?.carrier && (
                <p className="text-sm">
                    <span className="font-medium">Dostawca:</span> {order.deliveryInfo.carrier}
                </p>
            )}
        </div>
    )
}
