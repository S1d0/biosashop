"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Order } from "@/types/order"
import { StatusEditor } from "@/components/status-editor"
import { DeliveryEditor } from "@/components/delivery-editor"
import { Package, User, MapPin, CreditCard, Truck, Clock, CheckCircle, XCircle, ExternalLink } from "lucide-react"

interface OrderDetailProps {
    order: Order
    onOrderUpdate: (order: Order) => void
}

export function OrderDetail({ order, onOrderUpdate }: OrderDetailProps) {
    const [isEditing, setIsEditing] = useState(false)

    const formatPrice = (price: number) => {
        return (price / 100).toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN",
        })
    }

    const formatDate = (date: Date | null) => {
        if (!date) return "N/A"
        return new Intl.DateTimeFormat("pl-PL", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    const statusConfig = {
        pending: { label: "Oczekujące", icon: Clock, color: "text-yellow-500" },
        paid: { label: "Opłacone", icon: CheckCircle, color: "text-green-500" },
        shipped: { label: "Wysłane", icon: Truck, color: "text-blue-500" },
        delivered: { label: "Dostarczone", icon: Package, color: "text-green-600" },
        cancelled: { label: "Anulowane", icon: XCircle, color: "text-red-500" },
    }

    const StatusIcon = statusConfig[order.status].icon

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-foreground">Zamówienie #{order.orderNumber}</h2>
                    <p className="text-muted-foreground">Utworzone {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="gap-2">
                        <StatusIcon className={`h-4 w-4 ${statusConfig[order.status].color}`} />
                        {statusConfig[order.status].label}
                    </Badge>
                    <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Zakończ Edycję" : "Edytuj Zamówienie"}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Przegląd</TabsTrigger>
                    <TabsTrigger value="items">Produkty</TabsTrigger>
                    <TabsTrigger value="delivery">Dostawa</TabsTrigger>
                    <TabsTrigger value="payment">Płatność</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Informacje o Kliencie
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Imię i nazwisko</label>
                                    <p className="text-foreground">{order.shippingAddress?.fullName || "Brak"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p className="text-foreground">{order.email || "Brak"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                                    <p className="text-foreground">{order.shippingAddress?.phone || "Brak"}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Adres Dostawy
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {order.shippingAddress ? (
                                    <div className="space-y-1">
                                        <p className="text-foreground">{order.shippingAddress.fullName}</p>
                                        <p className="text-foreground">{order.shippingAddress.address}</p>
                                        <p className="text-foreground">
                                            {order.shippingAddress.postalCode} {order.shippingAddress.city}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Brak adresu dostawy</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Status Editor */}
                    {isEditing && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Edytuj Status Zamówienia</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <StatusEditor order={order} onOrderUpdate={onOrderUpdate} />
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Produkty w Zamówieniu ({order.items.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                            <Package className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="font-medium text-foreground">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">Rozmiar: {item.size}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatPrice(item.price)} × {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-foreground">{formatPrice(item.totalPrice)}</p>
                                        </div>
                                    </div>
                                ))}

                                <Separator />

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-medium text-foreground">Suma</span>
                                    <span className="text-lg font-bold text-foreground">{formatPrice(order.totalPrice)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="delivery" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                Informacje o Dostawie
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.deliveryInfo ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Metoda</label>
                                            <p className="text-foreground capitalize">{order.deliveryInfo.method.replace("_", " ")}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Cena</label>
                                            <p className="text-foreground">{formatPrice(order.deliveryInfo.price)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Przewidywana Dostawa</label>
                                            <p className="text-foreground">{formatDate(order.deliveryInfo.estimatedDeliveryDate)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Numer Przesyłki</label>
                                            <p className="text-foreground">{order.deliveryInfo.trackingNumber || "Nie przypisano"}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Przewoźnik</label>
                                            <p className="text-foreground">{order.deliveryInfo.carrier || "Nie przypisano"}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Status</label>
                                            <Badge variant={order.deliveryInfo.delivered ? "default" : "secondary"}>
                                                {order.deliveryInfo.delivered ? "Dostarczone" : "W Transporcie"}
                                            </Badge>
                                        </div>
                                    </div>

                                    {order.deliveryInfo.notes && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Uwagi</label>
                                            <p className="text-foreground">{order.deliveryInfo.notes}</p>
                                        </div>
                                    )}

                                    {isEditing && (
                                        <>
                                            <Separator />
                                            <DeliveryEditor order={order} onOrderUpdate={onOrderUpdate} />
                                        </>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Brak informacji o dostawie</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Informacje o Płatności
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.paymentInfo ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Status</label>
                                            <Badge variant={order.paymentInfo.payed ? "default" : "secondary"}>
                                                {order.paymentInfo.status}
                                            </Badge>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Kwota</label>
                                            <p className="text-foreground">{formatPrice(order.paymentInfo.amount)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Waluta</label>
                                            <p className="text-foreground uppercase">{order.paymentInfo.currency}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Data Płatności</label>
                                            <p className="text-foreground">{formatDate(order.paymentInfo.payedAt)}</p>
                                        </div>
                                    </div>

                                    {order.paymentInfo.paymentMethodDetails && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Metoda Płatności</label>
                                            <p className="text-foreground">
                                                {order.paymentInfo.paymentMethodDetails.brand?.toUpperCase()}
                                                {order.paymentInfo.paymentMethodDetails.last4 &&
                                                    ` ****${order.paymentInfo.paymentMethodDetails.last4}`}
                                            </p>
                                        </div>
                                    )}

                                    {order.paymentInfo.receiptUrl && (
                                        <div>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={order.paymentInfo.receiptUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Zobacz Paragon
                                                </a>
                                            </Button>
                                        </div>
                                    )}

                                    {order.paymentInfo.failureReason && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Powód Niepowodzenia</label>
                                            <p className="text-destructive">{order.paymentInfo.failureReason}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Brak informacji o płatności</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
