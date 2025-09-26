"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Order } from "@/types/order"
import { Eye, Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react"

interface OrdersListProps {
    orders: Order[]
    onOrderSelect: (order: Order) => void
}

const statusConfig = {
    pending: {
        label: "Oczekujące",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-500",
    },
    paid: {
        label: "Opłacone",
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-500",
    },
    shipped: {
        label: "Wysłane",
        variant: "default" as const,
        icon: Truck,
        color: "text-blue-500",
    },
    delivered: {
        label: "Dostarczone",
        variant: "default" as const,
        icon: Package,
        color: "text-green-600",
    },
    cancelled: {
        label: "Anulowane",
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-500",
    },
}

export function OrdersList({ orders, onOrderSelect }: OrdersListProps) {
    const formatPrice = (price: number) => {
        return (price / 100).toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN",
        })
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("pl-PL", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Nie znaleziono zamówień</h3>
                <p className="text-muted-foreground">Żadne zamówienia nie pasują do aktualnych filtrów.</p>
            </div>
        )
    }

    return (
        <div className="rounded-md border border-border">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-muted/50">
                        <TableHead className="w-[100px]">Nr Zamówienia</TableHead>
                        <TableHead>Klient</TableHead>
                        <TableHead>Produkty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Płatność</TableHead>
                        <TableHead>Suma</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="w-[100px]">Akcje</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => {
                        const statusInfo = statusConfig[order.status]
                        const StatusIcon = statusInfo.icon

                        return (
                            <TableRow
                                key={order.id}
                                className="hover:bg-muted/50 cursor-pointer"
                                onClick={() => onOrderSelect(order)}
                            >
                                <TableCell className="font-mono font-medium">#{order.orderNumber}</TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="font-medium text-foreground">{order.shippingAddress?.fullName || "Brak"}</div>
                                        <div className="text-sm text-muted-foreground">{order.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="font-medium">
                                            {order.items.length} produkt
                                            {order.items.length !== 1 ? (order.items.length < 5 ? "y" : "ów") : ""}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {order.items[0]?.name}
                                            {order.items.length > 1 && ` +${order.items.length - 1} więcej`}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={statusInfo.variant} className="gap-1">
                                        <StatusIcon className={`h-3 w-3 ${statusInfo.color}`} />
                                        {statusInfo.label}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={order.paymentInfo?.payed ? "default" : "secondary"} className="gap-1">
                                        {order.paymentInfo?.payed ? (
                                            <>
                                                <CheckCircle className="h-3 w-3 text-green-500" />
                                                Opłacone
                                            </>
                                        ) : (
                                            <>
                                                <Clock className="h-3 w-3 text-yellow-500" />
                                                Oczekujące
                                            </>
                                        )}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">{formatPrice(order.totalPrice)}</TableCell>
                                <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onOrderSelect(order)
                                        }}
                                        className="h-8 w-8 p-0"
                                    >
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">Zobacz szczegóły zamówienia</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
