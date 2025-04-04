"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { ProductVariant } from "@/types/product"

export type CartItem = {
    product: ProductVariant
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (product: ProductVariant) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    isCartOpen: boolean
    setIsCartOpen: (isOpen: boolean) => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const setLocalStorage = (key: string, value: CartItem[]) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error("Error setting localStorage", e);
    }
}

// Add a function to safely interact with localStorage (to avoid SSR issues)
const getLocalStorage = (key: string, defaultValue: CartItem[]) => {
    try {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : defaultValue
    } catch (error) {
        console.error("Error accessing localStorage:", error)
        return defaultValue
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    // Set items from localstorage
    useEffect(() => {
        const cartData = getLocalStorage("cart", [])
        setItems(cartData)
    }, []);

    // Calculate totals whenever items change
    useEffect(() => {
        const itemCount = items.reduce((total, item) => total + item.quantity, 0)
        const price = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

        setTotalItems(itemCount)
        setTotalPrice(price)

        // setLocalStorage whenever items change
        setLocalStorage("cart", items)
    }, [items])

    // Add item to cart
    const addItem = (product: ProductVariant) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product.id === product.id)

            if (existingItem) {
                // If item already exists, increase quantity
                return prevItems.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                )
            } else {
                // Otherwise add new item
                return [...prevItems, { product, quantity: 1 }]
            }
        })

        // Open cart when adding items
        setIsCartOpen(true)
    }

    // Remove item from cart
    const removeItem = (productId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
    }

    // Update item quantity
    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }

        setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    }

    // Clear cart
    const clearCart = () => {
        setItems([])
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isCartOpen,
                setIsCartOpen,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

