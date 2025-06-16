'use client'

import Form from "next/form";
import {updateAddress} from "@/lib/actions/order/action";
import {useActionState, useEffect } from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";
import {Loader2} from "lucide-react";
import {ShippingAddress} from "@/types/address";
import {useOrderCheckout} from "@/components/checkout/v3/checkout-provider";
import {Order} from "@/types/order";

export type AddressState = {
    success: boolean;
    errors: {
        fullName?: string[] | undefined;
        email?: string[] | undefined;
        address?: string[] | undefined;
        city?: string[] | undefined;
        postalCode?: string[] | undefined;
        phone?: string[] | undefined;
    } | null;
    message?: string;
    inputs: ShippingAddress | null;
    updatedOrder: Order | null;
}

const initialAddress: AddressState = {
    success: false,
    errors: null,
    message: "",
    inputs: null,
    updatedOrder: null
}

export default function CheckoutAddress({setActiveTabAction}: {setActiveTabAction: (tab: string) => void}) {
    const {order, updateOrder} = useOrderCheckout()
    const [state, action] = useActionState(updateAddress, initialAddress)

    useEffect(() => {
        if (state.success && state.updatedOrder) {
            updateOrder(state.updatedOrder)
            setActiveTabAction("delivery")
        }
    }, [state.success, state.updatedOrder, updateOrder])

    return (
        <>
            <AddressEditForm order={order} state={state} action={action} />
        </>
     )
}

interface AddressEditFormProps {
    order: Order,
    state: AddressState,
    action: (formData: FormData) => void
}

function AddressEditForm({order, state, action}: AddressEditFormProps) {
    const valuesDisplay: ShippingAddress | null = order.shippingAddress != null
        ? order.shippingAddress
        : state.inputs

    return (
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Informacje o adresie</h2>
                <Form action={action} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input id="orderId" name="orderId" value={order.id} hidden={true} readOnly={true}/>
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Imię i nazwisko</Label>
                            <Input id="fullName"
                                   name="fullName"
                                   placeholder="Jan Kowalski"
                                   defaultValue={valuesDisplay?.fullName}
                                   required/>
                            {state.errors?.fullName && (
                                <p id="fullName-error" className="text-sm text-red-500">{state.errors?.fullName[0]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email"
                                   name="email"
                                   type="email"
                                   placeholder="jan.kowalski@example.com"
                                   defaultValue={valuesDisplay?.email}
                                   required/>
                            {state.errors?.email && (
                                <p id="email-error" className="text-sm text-red-500">{state.errors?.email[0]}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Adres</Label>
                        <Input id="address"
                               name="address"
                               placeholder="Ulica i numer domu/mieszkania"
                               defaultValue={valuesDisplay?.address}
                               required/>
                        {state.errors?.address && (
                            <p id="address-error" className="text-sm text-red-500">{state.errors?.address[0]}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">Miasto</Label>
                            <Input id="city"
                                   name="city"
                                   placeholder="Warszawa"
                                   defaultValue={valuesDisplay?.city}
                                   required/>
                            {state.errors?.city && (
                                <p id="city-error" className="text-sm text-red-500">{state.errors?.city[0]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Kod pocztowy</Label>
                            <Input id="postalCode" name="postalCode" placeholder="00-000"
                                   defaultValue={valuesDisplay?.postalCode} required/>
                            {state.errors?.postalCode && (
                                <p id="postalCode-error"
                                   className="text-sm text-red-500">{state.errors?.postalCode[0]}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone"
                               name="phone"
                               placeholder="+48 123 456 789"
                               defaultValue={valuesDisplay?.phone}
                               required/>
                        {state.errors?.phone && (
                            <p id="phone-error" className="text-sm text-red-500">{state.errors?.phone[0]}</p>
                        )}
                    </div>

                    {/* Show status information wheter update address was successful or not*/}
                    {state?.success &&
                        <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">{state.message}</div>}
                    {!state?.success && state.message && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{state.message}</div>
                    )}
                    <div className="flex w-full justify-end">
                        <SubmitButton/>
                    </div>
                </Form>
            </div>
    )
}

function SubmitButton() {
    const {pending} = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    <p>Zapisywanie...</p>
                </>
            ) : (
                <p>Zapisz</p>
            )}
        </Button>
    )
}
