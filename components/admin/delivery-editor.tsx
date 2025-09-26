"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Order, DeliveryInfo } from "@/types/order"
import { Save, Truck, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DeliveryEditorProps {
    order: Order
    onOrderUpdate: (order: Order) => void
}

const deliveryMethods = [
    { value: "standard", label: "Dostawa Standardowa" },
    { value: "express", label: "Dostawa Ekspresowa" },
    { value: "parcel_locker", label: "Paczkomat" },
    { value: "pickup", label: "Odbiór w Sklepie" },
    { value: "company", label: "Dostawa Firmowa" },
]

const carriers = [
    { value: "dpd", label: "DPD" },
    { value: "ups", label: "UPS" },
    { value: "fedex", label: "FedEx" },
    { value: "dhl", label: "DHL" },
    { value: "poczta_polska", label: "Poczta Polska" },
    { value: "inpost", label: "InPost" },
]

export function DeliveryEditor({ order, onOrderUpdate }: DeliveryEditorProps) {
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>(
        order.deliveryInfo || {
            method: "standard",
            price: 0,
            notes: "",
            parcelLocker: null,
            estimatedDeliveryDate: null,
            trackingNumber: null,
            carrier: null,
            delivered: false,
            deliveredAt: null,
        },
    )
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
        console.log(field, value)
    }

    const handleSave = async () => {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const updatedOrder: Order = {
                ...order,
                deliveryInfo: {
                    ...deliveryInfo,
                    deliveredAt: deliveryInfo.delivered ? new Date() : null,
                },
                updatedAt: new Date(),
            }

            onOrderUpdate(updatedOrder)

            toast({
                title: "Dostawa Zaktualizowana",
                description: "Informacje o dostawie zostały pomyślnie zaktualizowane",
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Błąd",
                description: "Nie udało się zaktualizować informacji o dostawie",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const formatDateForInput = (date: Date | null) => {
        if (!date) return ""
        return date.toISOString().split("T")[0]
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Edytuj Informacje o Dostawie
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="method">Metoda Dostawy</Label>
                        <Select value={deliveryInfo.method} onValueChange={(value) => handleInputChange("method", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Wybierz metodę dostawy" />
                            </SelectTrigger>
                            <SelectContent>
                                {deliveryMethods.map((method) => (
                                    <SelectItem key={method.value} value={method.value}>
                                        {method.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Cena Dostawy (PLN)</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={deliveryInfo.price / 100}
                            onChange={() => handleInputChange("price", "100")}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="carrier">Przewoźnik</Label>
                        <Select
                            value={deliveryInfo.carrier || "none"}
                            onValueChange={(value) => handleInputChange("carrier", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Wybierz przewoźnika" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Nie wybrano przewoźnika</SelectItem>
                                {carriers.map((carrier) => (
                                    <SelectItem key={carrier.value} value={carrier.value}>
                                        {carrier.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tracking">Numer Przesyłki</Label>
                        <Input
                            id="tracking"
                            value={deliveryInfo.trackingNumber || ""}
                            onChange={(e) => handleInputChange("trackingNumber", e.target.value)}
                            placeholder="Wprowadź numer przesyłki"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="estimated-date">Przewidywana Data Dostawy</Label>
                        <Input
                            id="estimated-date"
                            type="date"
                            value={formatDateForInput(deliveryInfo.estimatedDeliveryDate!)}
                            onChange={() => console.log("change")}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="delivered"
                                checked={deliveryInfo.delivered}
                                onCheckedChange={() => handleInputChange("delivered", "")}
                            />
                            <Label htmlFor="delivered" className="flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Oznacz jako Dostarczone
                            </Label>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Uwagi do Dostawy</Label>
                    <Textarea
                        id="notes"
                        value={deliveryInfo.notes || ""}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        placeholder="Dodaj uwagi dotyczące dostawy lub specjalne instrukcje..."
                        rows={3}
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                        <Save className="h-4 w-4" />
                        {isLoading ? "Zapisywanie..." : "Zapisz Informacje o Dostawie"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
