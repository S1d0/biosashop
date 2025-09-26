"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { OrdersList } from "@/components/orders-list"
// import { OrderDetail } from "@/components/order-detail"
// import { OrderAnalytics } from "@/components/order-analytics"
import { Search, Package, TrendingUp, Users, DollarSign, Filter } from "lucide-react"
import type { Order } from "@/types/order"
import {OrdersList} from "@/components/admin/orders-list";
import {OrderAnalytics} from "@/components/admin/order-analiticts";

// Mock data for demonstration
const mockOrders: Order[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        status: "pending",
        orderNumber: 1001,
        email: "customer@example.com",
        totalPrice: 15999,
        items: [
            {
                productId: "prod-1",
                name: "Premium T-Shirt",
                image: "/plain-white-tshirt.png",
                price: 7999,
                quantity: 2,
                totalPrice: 15998,
                size: "M",
            },
        ],
        shippingAddress: {
            fullName: "Jan Kowalski",
            email: "jan@example.com",
            address: "ul. Przykładowa 123",
            city: "Warszawa",
            postalCode: "00-001",
            phone: "+48 123 456 789",
        },
        deliveryInfo: {
            method: "standard",
            price: 1500,
            notes: "Dostawa w godzinach 9-17",
            parcelLocker: null,
            estimatedDeliveryDate: new Date("2024-01-15"),
            trackingNumber: null,
            carrier: null,
            delivered: false,
            deliveredAt: null,
        },
        paymentInfo: {
            status: "pending",
            amount: 15999,
            currency: "pln",
            paymentIntentId: "pi_test123",
            paymentMethodDetails: null,
            receiptUrl: null,
            payed: false,
            payedAt: null,
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-10"),
        },
        stripeCustomerId: null,
        userId: null,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        status: "shipped",
        orderNumber: 1002,
        email: "anna@example.com",
        totalPrice: 24999,
        items: [
            {
                productId: "prod-2",
                name: "Designer Hoodie",
                image: "/cozy-hoodie.png",
                price: 12999,
                quantity: 1,
                totalPrice: 12999,
                size: "L",
            },
            {
                productId: "prod-3",
                name: "Cotton Pants",
                image: "/various-styles-of-pants.png",
                price: 8999,
                quantity: 1,
                totalPrice: 8999,
                size: "M",
            },
        ],
        shippingAddress: {
            fullName: "Anna Nowak",
            email: "anna@example.com",
            address: "ul. Testowa 456",
            city: "Kraków",
            postalCode: "30-001",
            phone: "+48 987 654 321",
        },
        deliveryInfo: {
            method: "express",
            price: 2500,
            notes: "3 piętro, klatka A",
            parcelLocker: null,
            estimatedDeliveryDate: new Date("2024-01-12"),
            trackingNumber: "TRK123456789",
            carrier: "DPD",
            delivered: false,
            deliveredAt: null,
        },
        paymentInfo: {
            status: "succeeded",
            amount: 24999,
            currency: "pln",
            paymentIntentId: "pi_test456",
            paymentMethodDetails: {
                type: "card",
                last4: "4242",
                brand: "visa",
            },
            receiptUrl: "https://pay.stripe.com/receipts/test",
            payed: true,
            payedAt: new Date("2024-01-11"),
            createdAt: new Date("2024-01-11"),
            updatedAt: new Date("2024-01-11"),
        },
        stripeCustomerId: "cus_test123",
        userId: null,
        createdAt: new Date("2024-01-11"),
        updatedAt: new Date("2024-01-11"),
    },
]

export function AdminDashboard() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [orders, setOrders] = useState<Order[]>(mockOrders)

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toString().includes(searchQuery) ||
            order.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.shippingAddress?.fullName.toLowerCase().includes(searchQuery.toLowerCase())

        let matchesStatus = true
        if (statusFilter === "all") {
            matchesStatus = true
        } else if (statusFilter === "pending") {
            // Show all orders that are not delivered (pending, paid, shipped, cancelled)
            matchesStatus = order.status !== "delivered"
        } else {
            matchesStatus = order.status === statusFilter
        }

        return matchesSearch && matchesStatus
    })

    const updateOrder = (updatedOrder: Order) => {
        setOrders((prev) => prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)))
        setSelectedOrder(updatedOrder)
    }

    const stats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status !== "delivered").length,
        shippedOrders: orders.filter((o) => o.status === "shipped").length,
        totalRevenue: orders.reduce((sum, order) => sum + order.totalPrice, 0),
    }

    const handleCardFilter = (filterType: string) => {
        setStatusFilter(filterType)
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <Package className="h-8 w-8 text-primary" />
                        <h1 className="text-xl font-semibold text-foreground">Zarządzanie Zamówieniami</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="text-xs">
                            Panel Administratora
                        </Badge>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 border-r border-border bg-card">
                    <nav className="p-4 space-y-2">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Package className="h-4 w-4" />
                            Zamówienia
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Analityka
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Users className="h-4 w-4" />
                            Klienci
                        </Button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <Tabs defaultValue="orders" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 max-w-md">
                            <TabsTrigger value="orders">Zamówienia</TabsTrigger>
                            <TabsTrigger value="analytics">Analityka</TabsTrigger>
                        </TabsList>

                        <TabsContent value="orders" className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card
                                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                                    onClick={() => handleCardFilter("all")}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Wszystkie Zamówienia</CardTitle>
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.totalOrders}</div>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                                    onClick={() => handleCardFilter("pending")}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Oczekujące</CardTitle>
                                        <Package className="h-4 w-4 text-yellow-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                                    onClick={() => handleCardFilter("shipped")}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Wysłane</CardTitle>
                                        <Package className="h-4 w-4 text-blue-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stats.shippedOrders}</div>
                                    </CardContent>
                                </Card>
                                <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Przychody</CardTitle>
                                        <DollarSign className="h-4 w-4 text-green-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {(stats.totalRevenue / 100).toLocaleString("pl-PL", {
                                                style: "currency",
                                                currency: "PLN",
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Filters */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Zamówienia</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4 mb-6">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Szukaj zamówień..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                                            <SelectTrigger className="w-48">
                                                <Filter className="h-4 w-4 mr-2" />
                                                <SelectValue placeholder="Filtruj według statusu" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Wszystkie Statusy</SelectItem>
                                                <SelectItem value="pending">Oczekujące</SelectItem>
                                                <SelectItem value="paid">Opłacone</SelectItem>
                                                <SelectItem value="shipped">Wysłane</SelectItem>
                                                <SelectItem value="delivered">Dostarczone</SelectItem>
                                                <SelectItem value="cancelled">Anulowane</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <OrdersList orders={filteredOrders} onOrderSelect={setSelectedOrder} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="analytics">
                            <OrderAnalytics orders={orders} />
                        </TabsContent>
                    </Tabs>
                </main>
            </div>

            {/* Order Detail Modal */}
            <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Zamówienie #{selectedOrder?.orderNumber}</DialogTitle>
                    </DialogHeader>
                    {/*{selectedOrder && <OrderDetail order={selectedOrder} onOrderUpdate={updateOrder} />}*/}
                </DialogContent>
            </Dialog>
        </div>
    )
}
