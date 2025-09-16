"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, PiggyBank, Truck, Workflow } from "lucide-react"
import type { Order } from "@/types/order"
import { formatPricePLN } from "@/lib/utils"
import OrderCard from "@/components/user/orders/order-card"
import { useState } from "react"

interface UserOrdersProps {
    orders: Order[]
}

type FilterType = "all" | "delivered" | "in-preparation"

export default function UserOrders({ orders }: UserOrdersProps) {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all")

    const numberOfNotDelivered = orders.filter((order) => order.status !== "delivered").length

    const numberOfDelivered = orders.filter((order) => order.status === "delivered").length

    const totalPrice = formatPricePLN(orders.map((order) => order.totalPrice).reduce((a, b) => a + b, 0))

    const getFilteredOrders = () => {
        switch (activeFilter) {
            case "delivered":
                return orders.filter((order) => order.status === "delivered")
            case "in-preparation":
                return orders.filter((order) => order.status !== "delivered")
            case "all":
            default:
                return orders
        }
    }

    const filteredOrders = getFilteredOrders()

    return (
        <section id="user-orders">
            <div className="container px-4 md:px-6 mb-2">
                <h2 className="text-3xl font-bold text-balance ">Historia Zamówień</h2>
                <p className="text-muted-foreground mt-2">Śledź i zarządzaj swoimi zamówieniami</p>
            </div>

            {/*  Order Stats  */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <Card
                    className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                        activeFilter === "all" ? "ring-2 ring-primary bg-accent/30" : ""
                    }`}
                    onClick={() => setActiveFilter("all")}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wszystkie zamówienia</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Suma zakupów</CardTitle>
                        <PiggyBank className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPrice}</div>
                    </CardContent>
                </Card>
                <Card
                    className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                        activeFilter === "delivered" ? "ring-2 ring-primary bg-accent/30" : ""
                    }`}
                    onClick={() => setActiveFilter("delivered")}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Zakupy Dostarczone</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{numberOfDelivered}</div>
                    </CardContent>
                </Card>
                <Card
                    className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                        activeFilter === "in-preparation" ? "ring-2 ring-primary bg-accent/30" : ""
                    }`}
                    onClick={() => setActiveFilter("in-preparation")}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Zakupy w przygotowaniu</CardTitle>
                        <Workflow className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{numberOfNotDelivered}</div>
                    </CardContent>
                </Card>
            </div>
            <section id="order-list">
                {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </section>
        </section>
    )
}
