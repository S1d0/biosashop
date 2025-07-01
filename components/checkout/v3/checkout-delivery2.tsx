"use client"

import Form from "next/form"
import { useState, useTransition, useEffect } from "react"
import { useActionState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MapPin, Clock, Search } from "lucide-react"
import { useFormStatus } from "react-dom"
import { searchInPostPoints } from "@/lib/actions/inpost/actions"
import { useOrderCheckout } from "@/components/checkout/v3/checkout-provider"
import InpostSelection from "@/components/checkout/v3/inpost/inpost-selection";
import {formatPricePLN} from "@/lib/utils";
import {updateDelivery} from "@/lib/actions/order/action";

interface InPostPoint {
    name: string
    type: string[]
    status: string
    location: {
        longitude: number
        latitude: number
    }
    location_type: string
    location_description: string
    opening_hours: string
    address: {
        line1: string
        line2: string
    }
    address_details: {
        city: string
        province: string
        post_code: string
        street: string
        building_number: string
        flat_number: string | null
    }
    phone_number: string | null
    functions: string[]
    easy_access_zone: boolean
    location_247: boolean
    distance?: number
}

const initialDeliveryState = {
    success: false,
    errors: null,
    message: "",
    inputs: null,
    updatedOrder: null,
}

interface SimpleParcelInfo {
    name: string
    address: string
}

export default function CheckoutDelivery() {
    const { order, deliveryOptions, updateOrder, setActiveStep } = useOrderCheckout()
    const [selectedMethod, setSelectedMethod] = useState<string>(order.deliverInfo?.method || "")
    const [selectedPoint, setSelectedPoint] = useState<SimpleParcelInfo | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [inpostPoints, setInpostPoints] = useState<InPostPoint[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [state, action] = useActionState(updateDelivery, initialDeliveryState)
    const [isSearching, startSearchTransition] = useTransition()

    useEffect(() => {
        if (state.success && state.updatedOrder) {
            updateOrder(state.updatedOrder)
            setActiveStep("payment")
        }
    }, [state.success, state.updatedOrder, updateOrder, setActiveStep])

    const handleSearch = async () => {
        if (!searchQuery.trim() || searchQuery.length < 2) {
            setErrors((prev) => ({
                ...prev,
                inpost: "Wpisz kod pocztowy (np. 01-016) lub nazwę miasta (min. 2 znaki)",
            }))
            return
        }

        setErrors((prev) => ({ ...prev, inpost: "" }))

        startSearchTransition(async () => {
            const result = await searchInPostPoints(searchQuery)

            if (result.success && result.data) {
                setInpostPoints(result.data)
                if (result.data.length === 0) {
                    setErrors((prev) => ({
                        ...prev,
                        inpost: "Nie znaleziono paczkomatów. Spróbuj inny kod pocztowy lub miasto.",
                    }))
                }
            } else {
                setErrors((prev) => ({
                    ...prev,
                    inpost: result.error || "Błąd podczas wyszukiwania",
                }))
                setInpostPoints([])
            }
        })
    }

    const handleDeliveryMethodChange = (value: string) => {
        setSelectedMethod(value)
        setSelectedPoint(null)
        setSearchQuery("")
        setInpostPoints([])
        setErrors({})
    }

    const handlePointSelection = (point: InPostPoint) => {

        // setSelectedPoint(point)
        setErrors((prev) => ({ ...prev, inpost: "" }))
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Opcje dostawy</h2>

            <Form action={action} className="space-y-6">
                <input name="orderId" value={order.id} hidden readOnly />
                <input name="deliveryMethod" value={selectedMethod} hidden readOnly />
                <input name="selectedParcelLocker" value={selectedPoint ? JSON.stringify(selectedPoint) : ""} hidden readOnly />

                {/* Delivery Method Selection */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Wybierz metodę dostawy *</Label>
                    <RadioGroup value={selectedMethod} onValueChange={handleDeliveryMethodChange} className="space-y-3">
                        {Object.entries(deliveryOptions).map(([value, option]) => (
                            <div
                                key={value}
                                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                            >
                                <RadioGroupItem value={value} id={value} />
                                <Label htmlFor={value} className="flex-1 cursor-pointer">
                                    <div className="font-medium">{option.name}</div>
                                    <div className="text-sm text-muted-foreground">{option.description}</div>
                                </Label>
                                <div className="font-medium">{formatPricePLN(option.price)} zł</div>
                            </div>
                        ))}
                    </RadioGroup>
                    {/*{state.errors?.deliveryMethod && <p className="text-sm text-red-600">{state.errors.deliveryMethod[0]}</p>}*/}
                </div>

                {/* InPost Point Selection */}
                {selectedMethod === "inpost" && <InpostSelection />}

                {/* Status Messages */}
                {state?.success && (
                    <Alert className="border-green-200 bg-green-50">
                        <AlertDescription className="text-green-800">{state.message}</AlertDescription>
                    </Alert>
                )}
                {!state?.success && state.message && (
                    <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">{state.message}</AlertDescription>
                    </Alert>
                )}

                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setActiveStep("address")} className="flex-1">
                        Wstecz
                    </Button>
                    <DeliverySubmitButton disabled={!selectedMethod || (selectedMethod === "inpost" && !selectedPoint)} />
                </div>
            </Form>
        </div>
    )
}

function DeliverySubmitButton({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="flex-1" disabled={pending || disabled}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Zapisywanie...
                </>
            ) : (
                "Zapisz i przejdź dalej"
            )}
        </Button>
    )
}
