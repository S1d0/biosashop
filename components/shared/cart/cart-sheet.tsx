"use client"

import { useCart } from "./cart-provider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingBag, AlertCircle } from "lucide-react"
import {formatPricePLN} from "@/lib/utils"
import CartItemPreview from "@/components/shared/cart/CartItemPreview";

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
    const { items, isCartOpen, setIsCartOpen, totalPrice, totalItems } = useCart()

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
                                >
                                    <CartItemPreview product={item.product} quantity={item.quantity} />
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

