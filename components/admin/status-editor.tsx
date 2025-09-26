"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { Order } from "@/types/order"
import { Save, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StatusEditorProps {
    order: Order
    onOrderUpdate: (order: Order) => void
}

const statusOptions = [
    { value: "pending", label: "Oczekujące", description: "Zamówienie oczekuje na płatność" },
    { value: "paid", label: "Opłacone", description: "Płatność została otrzymana" },
    { value: "shipped", label: "Wysłane", description: "Zamówienie zostało wysłane" },
    { value: "delivered", label: "Dostarczone", description: "Zamówienie zostało dostarczone" },
    { value: "cancelled", label: "Anulowane", description: "Zamówienie zostało anulowane" },
]

export function StatusEditor({ order, onOrderUpdate }: StatusEditorProps) {
    const [status, setStatus] = useState(order.status)
    const [notes, setNotes] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSave = async () => {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const updatedOrder: Order = {
                ...order,
                status: status as Order["status"],
                updatedAt: new Date(),
            }

            onOrderUpdate(updatedOrder)

            toast({
                title: "Status Zaktualizowany",
                description: `Status zamówienia zmieniony na ${statusOptions.find((s) => s.value === status)?.label}`,
            })

            setNotes("")
        } catch (error) {
            toast({
                title: "Błąd",
                description: "Nie udało się zaktualizować statusu zamówienia",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const hasChanges = status !== order.status

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="status">Status Zamówienia</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Wybierz status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    <div className="space-y-1">
                                        <div className="font-medium">{option.label}</div>
                                        <div className="text-xs text-muted-foreground">{option.description}</div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Uwagi do Zmiany Statusu (Opcjonalne)</Label>
                    <Textarea
                        id="notes"
                        placeholder="Dodaj uwagi dotyczące zmiany statusu..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                    />
                </div>
            </div>

            {hasChanges && (
                <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                    <CardContent className="pt-4">
                        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">
                Status zostanie zmieniony z &#34;{statusOptions.find((s) => s.value === order.status)?.label}&#34; na &#34;
                                {statusOptions.find((s) => s.value === status)?.label}&#34;
              </span>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={!hasChanges || isLoading} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isLoading ? "Zapisywanie..." : "Zapisz Status"}
                </Button>
            </div>
        </div>
    )
}
