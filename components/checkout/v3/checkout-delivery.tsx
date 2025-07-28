"use client"

import { useActionState } from "react"
import Form from "next/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { useOrderCheckout } from "@/components/checkout/v3/checkout-provider"
import InPostSelection from "@/components/checkout/v3/inpost/inpost-selection"
import { formatPricePLN } from "@/lib/utils"
import {Order} from "@/types/order";
import {InPostPoint} from "@/types/inpost";
import {SubmitButton} from "@/components/checkout/SubmitButton";
import {updateDeliveryInfo} from "@/lib/actions/delivery/action";

export type DeliveryState = {
    success: boolean
    errors: {
        method?: string[] | undefined
        inPostPoint?: InPostPoint | undefined
        notes?: string[] | undefined
    } | null
    message?: string
    inputs: {
        method?: "standard" | "express" | "inpost"
        inPostPoint:  InPostPoint | undefined
        notes?: string
    } | null
    updatedOrder?: Order
}

const initialDeliveryState: DeliveryState = {
    success: false,
    errors: null,
    message: "",
    inputs: null,
}

export default function CheckoutDeliveryForm({setActiveTabAction}: {setActiveTabAction: (tab: string) => void}) {
    const {
        setDeliveryOption,
        selectedDeliveryOption,
        availableDeliveryOptions,
        updateOrder,
        order,
        selectedPoint,
    } = useOrderCheckout()
    const [state, action] = useActionState(updateDeliveryInfo, initialDeliveryState)
    const [currentDelivery, setDelivery] = useState(selectedDeliveryOption)

    useEffect(() => {
        setDeliveryOption(currentDelivery)
    }, [setDelivery, currentDelivery, setDeliveryOption])

    // Update context when delivery is successfully saved
    useEffect(() => {
        if (state.success && state.updatedOrder) {
            updateOrder(state.updatedOrder)
            setActiveTabAction("payment")
        }
    }, [state.success, state.updatedOrder, updateOrder, setActiveTabAction])

    const handleDeliveryChange = (method: string) => {
        const option = availableDeliveryOptions.find((op) => op.method === method)!
        setDelivery(option)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Opcje dostawy TEST</h2>
            <Form action={action} className="space-y-6">
                <input id="orderId" name="orderId" value={order.id} hidden={true} readOnly={true} />
                <input
                    id="inPostPoint"
                    name="inPostPoint"
                    value={selectedPoint ? JSON.stringify(selectedPoint) : ""}
                    hidden={true}
                    readOnly={true}
                />
                <div className="space-y-2">
                    <Label>Wybierz metodę dostawy</Label>
                    <RadioGroup
                        name="deliveryMethod"
                        value={currentDelivery.method}
                        onValueChange={(value) => handleDeliveryChange(value)}
                        className="space-y-3"
                    >
                        {Object.values(availableDeliveryOptions).map((option) => (
                            <div
                                key={option.method}
                                className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                            >
                                <RadioGroupItem value={option.method} id={option.method} />
                                <Label htmlFor={option.method} className="flex-1 cursor-pointer">
                                    <div className="font-medium">{option.name}</div>
                                    <div className="text-sm text-muted-foreground">{option.description}</div>
                                </Label>
                                <div className="font-medium">{formatPricePLN(option.price)}</div>
                            </div>
                        ))}
                    </RadioGroup>
                    {state.errors?.method && <p className="text-red-500 text-sm">{state.errors.method[0]}</p>}
                </div>

                { selectedDeliveryOption.method === "parcel_locker" && (
                    <InPostSelection />
                )}

                <div className="space-y-2">
                    <Label htmlFor="deliveryNotes">Uwagi do dostawy (opcjonalnie)</Label>
                    <Input
                        id="deliveryNotes"
                        name="deliveryNotes"
                        placeholder="Np. kod do domofonu, preferowane godziny dostawy"
                        defaultValue={state.inputs?.notes || ""}
                    />
                    {state.errors?.notes && <p className="text-red-500 text-sm">{state.errors.notes[0]}</p>}
                </div>

                {state?.success && <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">{state.message}</div>}
                {!state?.success && state.message && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{state.message}</div>
                )}
                <div className="flex gap-4">
                    <SubmitButton buttonText={"Zapisz i przejdź dalej"} loadingText={"Zapisywanie metody dostawy"}/>
                </div>
            </Form>
        </div>
    )
}