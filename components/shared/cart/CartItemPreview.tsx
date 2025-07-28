'use client'


import {CartItem, useCart} from "@/components/shared/cart/cart-provider";
import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2} from "lucide-react";
import {formatPricePLN} from "@/lib/utils";
import {useState} from "react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {CldImage} from "next-cloudinary";

export default function CartItemPreview(item: CartItem) {
    const {updateQuantity, removeItem} = useCart()
    const [addButtonDisabled, setAddButtonDisabled] = useState(false)

    const increaseQuantity = () => {
        if (item.quantity >= item.product.stock) {
            setAddButtonDisabled(true)
        } else {
            updateQuantity(item.product.id, item.quantity + 1)
        }
    }

    const decreaseQuantity = () => {
        if (item.quantity < item.product.stock) {
            setAddButtonDisabled(false)
        }
        updateQuantity(item.product.id, item.quantity - 1)
    }
    return (
        <Card className="bg-slate-900 border-white/10 mb-2">
            <CardContent className="p-3">
                <div className="flex items-start justify-between gap-3">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0 bg-slate-800">
                        <CldImage
                            src={item.product.images[0] || "/placeholder.svg?height=80&width=80"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-lg line-clamp-1 text-white">
                            {item.product.name}
                        </h4>
                        <p className="text-xs text-slate-300 line-clamp-1">
                            {item.product.description}
                        </p>
                        <p className="text-xs md:text-sm text-slate-300 mt-1">
                            Rozmiar: {item.product.size}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-white/20 rounded-md bg-slate-800">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-r-none text-white hover:bg-slate-700"
                                    onClick={decreaseQuantity}
                                >
                                    <Minus className="h-3 w-3"/>
                                    <span className="sr-only">Zmniejsz ilość</span>
                                </Button>

                                <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onClick={(e) => e.currentTarget.select()}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === "") return;

                                        const numValue = Number.parseInt(value);
                                        if (!isNaN(numValue) && numValue > 0) {
                                            updateQuantity(item.product.id, numValue);
                                        }
                                    }}
                                    onBlur={(e) => {
                                        const value = e.target.value;
                                        if (value === "" || Number.parseInt(value) < 1) {
                                            updateQuantity(item.product.id, 1);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            const value = e.currentTarget.value;
                                            if (value === "" || Number.parseInt(value) < 1) {
                                                updateQuantity(item.product.id, 1);
                                            }
                                            e.currentTarget.blur();
                                        }
                                    }}
                                    className="w-12 text-center text-sm border-0 focus:ring-0 focus:outline-none bg-slate-800 text-white [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    aria-label="Ilość produktu"
                                />

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-l-none text-white hover:bg-slate-700"
                                    disabled={addButtonDisabled}
                                    onClick={increaseQuantity}
                                >
                                    <Plus className="h-3 w-3"/>
                                    <span className="sr-only">Zwiększ ilość</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/30"
                                    onClick={() => removeItem(item.product.id)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                    <span className="sr-only">Usuń produkt</span>
                                </Button>
                            </div>

                        </div>
                    </div>

                    {/* Price Details */}
                    <div className="text-right">
                        <p className="font-medium text-white">
                            {formatPricePLN(item.product.price * item.quantity)}
                        </p>
                        <p className="text-xs text-slate-300">
                            {item.quantity} x {formatPricePLN(item.product.price)}
                        </p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="bg-slate-800/50 px-3 py-2 flex justify-between items-center border-t border-white/5">
                <Badge variant="outline" className="bg-transparent text-xs text-slate-400 border-0">
                    {item.product.familyId === "terra-family" ? "Microbiosa Terra" : "Microbiosa Aqua"}
                </Badge>
                <Badge variant="outline"
                       className={`bg-transparent text-xs border-0 ${item.product.stock ? 'text-primary' : 'text-amber-500'}`}>
                    {item.product.stock ? `Dostępne: ${item.product.stock}` : "Na zamówienie"}
                </Badge>
            </CardFooter>
        </Card>
    )
}