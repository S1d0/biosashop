"use client"

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react"
import type { Order } from "@/types/order"
import {InPostPoint} from "@/types/inpost";

export type DeliveryMethod = "standard" | "express" | "inpost"

interface DeliveryOption {
    method: DeliveryMethod
    price: number
    name: string
    description: string
}

interface CheckoutContextType {
    deliveryMethod: DeliveryMethod
    setDeliveryMethod: (method: DeliveryMethod) => void
    deliveryPrice: number
    deliveryOptions: Record<DeliveryMethod, DeliveryOption>
    selectedPoint: InPostPoint | null
    setSelectedPoint: (point: InPostPoint | null) => void
    order: Order
    updateOrder: (updates: Partial<Order>) => void
}

const deliveryOptions: Record<DeliveryMethod, DeliveryOption> = {
    standard: {
        method: "standard",
        price: 1599,
        name: "Dostawa standardowa",
        description: "2-3 dni robocze",
    },
    express: {
        method: "express",
        price: 1999,
        name: "Dostawa ekspresowa",
        description: "Następny dzień roboczy",
    },
    inpost: {
        method: "inpost",
        price: 999,
        name: "Paczkomat InPost",
        description: "1-2 dni robocze",
    },
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

interface CheckoutProviderProps {
    children: ReactNode
    initialOrder: Order
}

export function CheckoutProvider({ children, initialOrder }: CheckoutProviderProps) {
    // Initialize state from the provided order
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard')
    const [selectedPoint, setSelectedPoint] = useState<InPostPoint | null>(null)
    const [order, setOrder] = useState<Order>(initialOrder)

    const deliveryPrice = useMemo(() => {
        return deliveryOptions[deliveryMethod].price
    }, [deliveryMethod])

    // Update order when delivery method or calculations change
    useEffect(() => {

        // FIXME Check if inpost info is enough
        setOrder((prev) => ({
            ...prev,
            deliveryMethod,
            deliveryFee: deliveryPrice,
            total: prev.totalPrice + deliveryPrice,
            parcelLocker: {name: selectedPoint?.name, address: selectedPoint?.address},
        }))
    }, [deliveryMethod, deliveryPrice, selectedPoint])

    const updateOrder = useCallback((updates: Partial<Order> | Order) => {
        // Check if updates is a complete Order object or partial updates
        if ("id" in updates && "items" in updates && "status" in updates) {
            setOrder(updates as Order)
        } else {
            setOrder((prev) => ({ ...prev, ...updates }))
        }
    }, [])

    const handleSetDeliveryMethod = useCallback((method: DeliveryMethod) => {
        setDeliveryMethod(method)
    }, [])

    const handleSetSelectedPoint = useCallback((point: InPostPoint | null) => {
        setSelectedPoint(point)
    }, [])

    const value = useMemo(
        () => ({
            deliveryMethod,
            setDeliveryMethod: handleSetDeliveryMethod,
            deliveryPrice,
            deliveryOptions,
            selectedPoint,
            setSelectedPoint: handleSetSelectedPoint,
            order,
            updateOrder,
        }),
        [
            deliveryMethod,
            handleSetDeliveryMethod,
            deliveryPrice,
            selectedPoint,
            handleSetSelectedPoint,
            order,
            updateOrder,
        ],
    )
    return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
}

export function useOrderCheckout() {
    const context = useContext(CheckoutContext)
    if (context === undefined) {
        throw new Error("useCheckout must be used within a CheckoutProvider")
    }
    return context
}
