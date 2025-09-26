"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Order } from "@/types/order"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { TrendingUp, Package, DollarSign, Users, Clock, CheckCircle, Truck, XCircle } from "lucide-react"

interface OrderAnalyticsProps {
    orders: Order[]
}

export function OrderAnalytics({ orders }: OrderAnalyticsProps) {
    const formatPrice = (price: number) => {
        return (price / 100).toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN",
        })
    }

    const analytics = {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + order.totalPrice, 0),
        averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.totalPrice, 0) / orders.length : 0,
        uniqueCustomers: new Set(orders.map((order) => order.email)).size,

        statusBreakdown: {
            pending: orders.filter((o) => o.status === "pending").length,
            paid: orders.filter((o) => o.status === "paid").length,
            shipped: orders.filter((o) => o.status === "shipped").length,
            delivered: orders.filter((o) => o.status === "delivered").length,
            cancelled: orders.filter((o) => o.status === "cancelled").length,
        },

        paymentStatus: {
            paid: orders.filter((o) => o.paymentInfo?.payed).length,
            pending: orders.filter((o) => !o.paymentInfo?.payed).length,
        },

        deliveryMethods: orders.reduce(
            (acc, order) => {
                const method = order.deliveryInfo?.method || "unknown"
                acc[method] = (acc[method] || 0) + 1
                return acc
            },
            {} as Record<string, number>,
        ),

        recentOrders: orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    }

    const statusChartData = Object.entries(analytics.statusBreakdown).map(([status, count]) => {
        const statusLabels = {
            pending: "Oczekujące",
            paid: "Opłacone",
            shipped: "Wysłane",
            delivered: "Dostarczone",
            cancelled: "Anulowane",
        }
        return {
            name: statusLabels[status as keyof typeof statusLabels] || status,
            value: count,
            percentage: analytics.totalOrders > 0 ? (count / analytics.totalOrders) * 100 : 0,
        }
    })

    const deliveryChartData = Object.entries(analytics.deliveryMethods).map(([method, count]) => {
        const methodLabels = {
            standard: "Standardowa",
            express: "Ekspresowa",
            parcel_locker: "Paczkomat",
            pickup: "Odbiór w Sklepie",
            company: "Firmowa",
            unknown: "Nieznana",
        }
        return {
            name:
                methodLabels[method as keyof typeof methodLabels] ||
                method.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            value: count,
        }
    })

    const revenueByDay = orders.reduce(
        (acc, order) => {
            const date = new Date(order.createdAt).toLocaleDateString("pl-PL")
            acc[date] = (acc[date] || 0) + order.totalPrice
            return acc
        },
        {} as Record<string, number>,
    )

    const revenueChartData = Object.entries(revenueByDay)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .slice(-7) // Last 7 days
        .map(([date, revenue]) => ({
            date,
            revenue: revenue / 100,
        }))

    const statusIcons = {
        pending: { icon: Clock, color: "text-yellow-500" },
        paid: { icon: CheckCircle, color: "text-green-500" },
        shipped: { icon: Truck, color: "text-blue-500" },
        delivered: { icon: Package, color: "text-green-600" },
        cancelled: { icon: XCircle, color: "text-red-500" },
    }

    return (
        <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wszystkie Zamówienia</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            Wszystkie zamówienia
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Całkowite Przychody</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatPrice(analytics.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            Wszystkie przychody
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Średnie Zamówienie</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatPrice(analytics.averageOrderValue)}</div>
                        <p className="text-xs text-muted-foreground">Wartość na zamówienie</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Klienci</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.uniqueCustomers}</div>
                        <p className="text-xs text-muted-foreground">Unikalni klienci</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Status Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Podział Statusów Zamówień</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {statusChartData.map((item) => {
                                const statusKey = item.name.toLowerCase() as keyof typeof statusIcons
                                const StatusIcon = statusIcons[statusKey]?.icon || Package
                                const iconColor = statusIcons[statusKey]?.color || "text-muted-foreground"

                                return (
                                    <div key={item.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <StatusIcon className={`h-4 w-4 ${iconColor}`} />
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Progress value={item.percentage} className="w-20 h-2" />
                                            <Badge variant="secondary" className="text-xs">
                                                {item.value}
                                            </Badge>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Revenue Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Trend Przychodów (Ostatnie 7 Dni)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                revenue: {
                                    label: "Przychody",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[200px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                        formatter={(value: number) => [formatPrice(value * 100), "Przychody"]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="var(--color-revenue)"
                                        strokeWidth={2}
                                        dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Delivery Methods */}
                <Card>
                    <CardHeader>
                        <CardTitle>Metody Dostawy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                standard: {
                                    label: "Standardowa",
                                    color: "hsl(var(--chart-1))",
                                },
                                express: {
                                    label: "Ekspresowa",
                                    color: "hsl(var(--chart-2))",
                                },
                                parcel_locker: {
                                    label: "Paczkomat",
                                    color: "hsl(var(--chart-3))",
                                },
                                pickup: {
                                    label: "Odbiór w Sklepie",
                                    color: "hsl(var(--chart-4))",
                                },
                                company: {
                                    label: "Firmowa",
                                    color: "hsl(var(--chart-5))",
                                },
                            }}
                            className="h-[200px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={deliveryChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {deliveryChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                        formatter={(value: number) => [value, "Zamówienia"]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {deliveryChartData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center gap-1">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))` }}
                                    />
                                    <span className="text-xs text-muted-foreground">{entry.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ostatnie Zamówienia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.recentOrders.map((order) => {
                                const StatusIcon = statusIcons[order.status]?.icon || Package
                                const iconColor = statusIcons[order.status]?.color || "text-muted-foreground"

                                return (
                                    <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <StatusIcon className={`h-4 w-4 ${iconColor}`} />
                                            <div>
                                                <p className="font-medium text-sm">#{order.orderNumber}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {order.shippingAddress?.fullName || order.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-sm">{formatPrice(order.totalPrice)}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Status Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Podsumowanie Statusów Płatności</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="font-medium">Opłacone Zamówienia</span>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">{analytics.paymentStatus.paid}</p>
                                <p className="text-sm text-muted-foreground">
                                    {analytics.totalOrders > 0
                                        ? Math.round((analytics.paymentStatus.paid / analytics.totalOrders) * 100)
                                        : 0}
                                    %
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-yellow-500" />
                                <span className="font-medium">Oczekujące Płatności</span>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">{analytics.paymentStatus.pending}</p>
                                <p className="text-sm text-muted-foreground">
                                    {analytics.totalOrders > 0
                                        ? Math.round((analytics.paymentStatus.pending / analytics.totalOrders) * 100)
                                        : 0}
                                    %
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
