"use client"

import {createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode} from "react"
import type {Order} from "@/types/order"
import {InPostPoint} from "@/types/inpost";
import {DeliveryOption} from "@/types/delivery";

interface CheckoutContextType {
    selectedDeliveryOption: DeliveryOption,
    availableDeliveryOptions: DeliveryOption[],
    setDeliveryOption: (option: DeliveryOption) => void
    selectedPoint: InPostPoint | null
    setSelectedPoint: (point: InPostPoint | null) => void
    order: Order
    updateOrder: (updates: Partial<Order>) => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

interface CheckoutProviderProps {
    children: ReactNode,
    initialOrder: Order,
    availableDeliveryOptions: DeliveryOption[]
}

export function CheckoutProvider({children, initialOrder, availableDeliveryOptions}: CheckoutProviderProps) {
    // Initialize state from the provided order
    const defaultOption: DeliveryOption = availableDeliveryOptions.find(op => op.method === "standard")!
    const [selectedDeliveryOption, setDeliveryOption] = useState<DeliveryOption>(defaultOption)
    const [selectedPoint, setSelectedPoint] = useState<InPostPoint | null>(null)
    const [order, setOrder] = useState<Order>(initialOrder)

    // Update order when delivery method or calculations change
    useEffect(() => {
        const method = selectedDeliveryOption.method as string
        const deliveryPrice = selectedDeliveryOption.price
        // FIXME Check if inpost info is enough
        setOrder((prev) => ({
            ...prev,
            method,
            deliveryFee: deliveryPrice,
            total: prev.totalPrice + deliveryPrice,
            parcelLocker: {name: selectedPoint?.name, address: selectedPoint?.address},
        }))
    }, [selectedDeliveryOption, selectedPoint])

    const updateOrder = useCallback((updates: Partial<Order> | Order) => {
        // Check if updates is a complete Order object or partial updates
        if ("id" in updates && "items" in updates && "status" in updates) {
            setOrder(updates as Order)
        } else {
            setOrder((prev) => ({...prev, ...updates}))
        }
    }, [])

    const handleSetDeliveryOption = useCallback((option: DeliveryOption) => {
        setDeliveryOption(option)
    }, [])

    const handleSetSelectedPoint = useCallback((point: InPostPoint | null) => {
        setSelectedPoint(point)
    }, [])

    const value = useMemo(
        () => ({
            selectedDeliveryOption,
            availableDeliveryOptions,
            setDeliveryOption: handleSetDeliveryOption,
            selectedPoint,
            setSelectedPoint: handleSetSelectedPoint,
            order,
            updateOrder,
        }),
        [
            selectedDeliveryOption,
            availableDeliveryOptions,
            handleSetDeliveryOption,
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
