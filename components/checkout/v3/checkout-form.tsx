'use client'

import React, {useEffect, useState} from "react";
import {AlertTriangle, CreditCard, Truck, User} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CheckoutAddress from "@/components/checkout/v3/address/checkout-address";
import CheckoutDelivery from "@/components/checkout/v3/checkout-delivery";
import StripeCheckout from "@/components/checkout/stripe-checkout";
import {useOrderCheckout} from "@/components/checkout/v3/checkout-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const ADDRESS_TAB = "address";
const DELIVERY_TAB = "delivery";
const PAYMENT_TAB = "payment";

function MissingInfo({
                         missingItem,
                         buttonText,
                         targetTab,
                         setActiveTab,
                     }: {
    missingItem: string
    buttonText: string
    targetTab: string
    setActiveTab: (tab: string) => void
}) {
    return (
        <Card className="w-full max-w-lg mx-auto border-destructive/50">
            <CardHeader className="text-center">
                <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="mt-4 text-xl">Uzupełnij brakujące informacje</CardTitle>
                <CardDescription>Zanim przejdziesz do płatności uzupełnij {missingItem}.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Button onClick={() => setActiveTab(targetTab)}>{buttonText}</Button>
            </CardContent>
        </Card>
    )
}
export default function CheckoutForm() {
    const [activeTab, setActiveTab] = useState("address")
    const {order} = useOrderCheckout()

   const renderPaymentContent = () => {
        if (!order.shippingAddress) {
            return (
                <MissingInfo
                    missingItem="dane adresowe"
                    buttonText="Dodaj addres"
                    targetTab={ADDRESS_TAB}
                    setActiveTab={setActiveTab}
                />
            )
        }
        if (!order.deliveryInfo) {
            return (
                <MissingInfo
                    missingItem="sposób dostawy"
                    buttonText="Wybierz sposób dostawy"
                    targetTab={DELIVERY_TAB}
                    setActiveTab={setActiveTab}
                />
            )
        }
        return <StripeCheckout order={order} />
    }

    useEffect(() => {
    }, [activeTab]);

    return (
        <>
            <div className="mb-8">
                <div className="flex items-center justify-center mb-8">
                    <button onClick={() => setActiveTab(ADDRESS_TAB)}>
                        <div className={`flex items-center group-hover:text-primary ${activeTab === ADDRESS_TAB ? "text-primary" : ""}`}>
                            <div
                                className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <User size={16}/>
                            </div>
                            <span className="ml-2 font-medium hover:text-primary">Adres</span>
                        </div>
                    </button>
                <Separator className="w-12 mx-2"/>
                    <button onClick={() => setActiveTab(DELIVERY_TAB)} className="group group-hover:bg-primary">
                        <div className={`flex items-center ${activeTab === DELIVERY_TAB ? "text-primary" : ""}`}>
                                <div className={`w-8 h-8 hover:bg-primary rounded-full ${activeTab === DELIVERY_TAB || activeTab === PAYMENT_TAB ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} flex items-center justify-center`}>
                                    <Truck size={16}/>
                                </div>
                                <span className="ml-2 font-medium text">Dostawa</span>
                        </div>
                    </button>
                    <Separator className="w-12 mx-2"/>
                    <button onClick={() => setActiveTab(PAYMENT_TAB)}>
                        <div className={`flex items-center ${activeTab === PAYMENT_TAB ? "text-primary" : ""}`}>
                            <div className={`w-8 h-8 rounded-full ${activeTab === PAYMENT_TAB ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"} flex items-center justify-center`}>
                                <CreditCard size={16}/>
                            </div>
                            <span className="ml-2 font-medium">Płatność</span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="space-y-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="hidden">
                        <TabsTrigger value={ADDRESS_TAB}>Adres</TabsTrigger>
                        <TabsTrigger value={DELIVERY_TAB}>Dostawa</TabsTrigger>
                        <TabsTrigger value={PAYMENT_TAB}>Płatność</TabsTrigger>
                    </TabsList>
                    <TabsContent value={ADDRESS_TAB} className="space-y-6 mt-0">
                        <CheckoutAddress setActiveTabAction={setActiveTab} />
                    </TabsContent>
                    <TabsContent value={DELIVERY_TAB} className="space-y-6 mt-0">
                        <CheckoutDelivery setActiveTabAction={setActiveTab}/>
                    </TabsContent>
                    <TabsContent value={PAYMENT_TAB} className="space-y-6 mt-0">
                        {renderPaymentContent()}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}