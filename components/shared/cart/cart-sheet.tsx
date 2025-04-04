"use client"

import Image from "next/image"
import { useCart } from "./cart-provider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, AlertCircle } from "lucide-react"
import {formatPricePLN} from "@/lib/utils"

function ContinueShoppingButton() {
    const {setIsCartOpen} = useCart()

    return (
        <Button
            variant="outline"
            className="w-full border-border text-foreground hover:bg-primary/10 hover:text-primary"
            onClick={() => setIsCartOpen(false)}
        >
            Kontynuuj zakupy
        </Button>
    )
}

export function CartSheet() {
    const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col bg-slate-800/90 backdrop-blur-lg border-l border-white/10">
                <SheetHeader className="border-b border-white/10 pb-4">
                    <SheetTitle className="flex items-center text-white">
                        <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                        Koszyk ({totalItems})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-slate-300">
                            <ShoppingBag className="h-12 w-12 mb-4 text-slate-400/50" />
                            <p className="mb-2">Twój koszyk jest pusty</p>
                            <p className="text-sm">Dodaj produkty, aby rozpocząć zakupy</p>
                            <ContinueShoppingButton />
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li
                                    key={item.product.id}
                                    className="bg-slate-900 rounded-lg overflow-hidden shadow-md border border-white/5"
                                >
                                    <div className="p-3 flex items-start justify-center space-x-3">
                                        <div className="relative flex items-center justify-center h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-slate-800">
                                            <Image
                                                src={item.product.images[0] || "/placeholder.svg?height=80&width=80"}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm md:text-xl line-clamp-1 text-white">{item.product.name}</h4>
                                            <p className="text-xs text-slate-300 line-clamp-1">{item.product.description}</p>
                                            <p className="text-xs md:text-lg text-slate-300 mt-1">Rozmiar: {item.product.size}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-white/20 rounded-md bg-slate-800">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-r-none text-white hover:bg-slate-700"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                        <span className="sr-only">Zmniejsz ilość</span>
                                                    </Button>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.quantity}
                                                        onClick={(e) => {
                                                            // Select all text when clicked for easy replacement
                                                            e.currentTarget.select()
                                                        }}
                                                        onChange={(e) => {
                                                            const value = e.target.value

                                                            // Allow empty string during typing
                                                            if (value === "") {
                                                                // Create a temporary state for the input field
                                                                e.target.dataset.tempValue = ""
                                                                return
                                                            }

                                                            const numValue = Number.parseInt(value)
                                                            if (!isNaN(numValue) && numValue > 0) {
                                                                updateQuantity(item.product.id, numValue)
                                                            }
                                                        }}
                                                        onBlur={(e) => {
                                                            // On blur, ensure we have a valid value
                                                            const value = e.target.value
                                                            if (value === "" || Number.parseInt(value) < 1) {
                                                                updateQuantity(item.product.id, 1)
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Handle Enter key
                                                            if (e.key === "Enter") {
                                                                const value = e.currentTarget.value
                                                                if (value === "" || Number.parseInt(value) < 1) {
                                                                    updateQuantity(item.product.id, 1)
                                                                }
                                                                e.currentTarget.blur()
                                                            }
                                                        }}
                                                        className="w-12 text-center text-sm border-0 focus:ring-0 focus:outline-none bg-slate-800 text-white [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        aria-label="Ilość produktu"
                                                    />

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-l-none text-white hover:bg-slate-700"
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        <span className="sr-only">Zwiększ ilość</span>
                                                    </Button>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                                                    onClick={() => removeItem(item.product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Usuń produkt</span>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-medium text-white">{formatPricePLN(item.product.price * item.quantity)}</p>
                                            <p className="text-xs text-slate-300">
                                                {item.quantity} x {formatPricePLN(item.product.price)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-800/50 px-3 py-2 flex justify-between items-center border-t border-white/5">
                    <span className="text-xs text-slate-400">
                      {item.product.familyId === "terra-family" ? "Microbiosa Terra" : "Microbiosa Aqua"}
                    </span>
                                        <span className="text-xs text-primary">
                      {item.product.stock ? `Dostępne: ${item.product.stock}` : "Na zamówienie"}
                    </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-white/10 pt-4 mt-2">
                        <div className="space-y-1.5 mb-4">
                            <div className="flex justify-between text-sm text-white">
                                <span>Suma częściowa</span>
                                <span>{formatPricePLN(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-300">
                                <span>Dostawa</span>
                                <span>Obliczona przy płatności</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg pt-2 text-white">
                                <span>Razem</span>
                                <span>{formatPricePLN(totalPrice)}</span>
                            </div>
                        </div>

                        <SheetFooter className="flex-col gap-2 sm:flex-col">
                            <div className="flex items-center text-xs text-slate-300 mb-2">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                <span>Podatki i koszty dostawy obliczone przy płatności</span>
                            </div>
                            <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
                                Przejdź do płatności
                            </Button>
                            <ContinueShoppingButton />
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

