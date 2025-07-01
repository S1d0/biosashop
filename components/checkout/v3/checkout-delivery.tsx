"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Form from "next/form"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { updateDelivery } from "@/lib/actions/order/action"
import { useEffect, useState } from "react"
import {DeliveryMethod, useOrderCheckout} from "@/components/checkout/v3/checkout-provider";
import {Order} from "@/types/order";
import {formatPricePLN} from "@/lib/utils";
import InpostSelection from "@/components/checkout/v3/inpost/inpost-selection";

export type DeliveryState = {
    success: boolean
    errors: {
        deliveryMethod?: string[] | undefined
        parcelLockerName?: string[] | undefined
        deliveryNotes?: string[] | undefined
    } | null
    message?: string
    inputs: {
        deliveryMethod?: DeliveryMethod
        parcelLockerName?: string
        parcelLockerAddress?: string
        deliveryNotes?: string
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
    const [state, action] = useActionState(updateDelivery, initialDeliveryState)
    const { deliveryMethod, setDeliveryMethod, deliveryOptions, updateOrder, order} = useOrderCheckout()
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethod)

    // Update context when delivery method changes
    useEffect(() => {
        setDeliveryMethod(selectedDeliveryMethod)
    }, [selectedDeliveryMethod, setDeliveryMethod])

    // Update context when delivery is successfully saved
    useEffect(() => {
        if (state.success && state.updatedOrder) {
            updateOrder(state.updatedOrder)
            setActiveTabAction("payment")
        }
    }, [state.success, state.updatedOrder, updateOrder, setActiveTabAction])

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Opcje dostawy</h2>
            <Form action={action} className="space-y-6">
                <input id="orderId" name="orderId" value={order.id} hidden={true} readOnly={true} />
                <input
                    id="parcelLockerName"
                    name="parcelLockerName"
                    defaultValue={state.inputs?.parcelLockerName || ""}
                    hidden={true}
                    readOnly={true}
                />
                <input
                    id="parcelLockerAddress"
                    name="parcelLockerAddress"
                    defaultValue={state.inputs?.parcelLockerAddress || ""}
                    hidden={true}
                    readOnly={true}
                />

                <div className="space-y-2">
                    <Label>Wybierz metodę dostawy</Label>
                    <RadioGroup
                        name="deliveryMethod"
                        defaultValue={deliveryMethod}
                        onValueChange={(value) => setSelectedDeliveryMethod(value as DeliveryMethod)}
                    >
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="flex-1 cursor-pointer">
                                <div className="font-medium">{deliveryOptions.standard.name}</div>
                                <div className="text-sm text-muted-foreground">{deliveryOptions.standard.description}</div>
                            </Label>
                            <div className="font-medium">{formatPricePLN(deliveryOptions.standard.price)} zł</div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="flex-1 cursor-pointer">
                                <div className="font-medium">{deliveryOptions.express.name}</div>
                                <div className="text-sm text-muted-foreground">{deliveryOptions.express.description}</div>
                            </Label>
                            <div className="font-medium">{formatPricePLN(deliveryOptions.express.price)} zł</div>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                            <RadioGroupItem value="inpost" id="inpost" />
                            <Label htmlFor="inpost" className="flex-1 cursor-pointer">
                                <div className="font-medium">{deliveryOptions.inpost.name}</div>
                                <div className="text-sm text-muted-foreground">{deliveryOptions.inpost.description}</div>
                            </Label>
                            <div className="font-medium">{formatPricePLN(deliveryOptions.inpost.price)} zł</div>
                        </div>
                    </RadioGroup>
                    {state.errors?.deliveryMethod && <p className="text-red-500 text-sm">{state.errors.deliveryMethod[0]}</p>}
                </div>

                {selectedDeliveryMethod === "inpost" && <InpostSelection />}

                <div className="space-y-2">
                    <Label htmlFor="deliveryNotes">Uwagi do dostawy (opcjonalnie)</Label>
                    <Input
                        id="deliveryNotes"
                        name="deliveryNotes"
                        placeholder="Np. kod do domofonu, preferowane godziny dostawy"
                        defaultValue={state.inputs?.deliveryNotes || ""}
                    />
                    {state.errors?.deliveryNotes && <p className="text-red-500 text-sm">{state.errors.deliveryNotes[0]}</p>}
                </div>


                {state?.success && <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">{state.message}</div>}
                {!state?.success && state.message && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{state.message}</div>
                )}
                <SubmitButton />
            </Form>

        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <p>Zapisywanie...</p>
                </>
            ) : (
                <p>Zapisz opcje dostawy</p>
            )}
        </Button>
    )
}
