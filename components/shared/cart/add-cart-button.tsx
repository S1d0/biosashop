'use client'
import {ProductVariant} from "@/types/product";
import {useCart} from "@/components/shared/cart/cart-provider";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";

interface AddCartButtonProps {
    product: ProductVariant
}

export default function AddCartButton({product}: AddCartButtonProps) {
    const {addItem} = useCart()

    return (
        <Button
            className="w-full bg-primary/90 hover:bg-primary text-primary-foreground"
            disabled={!product.stock}
            onClick={() => addItem(product)}
        >
            <ShoppingCart className="mr-2 h-4 w-4"/>
            {product.stock ? "Dodaj do koszyka" : "Produkt niedostępny"}
        </Button>
    )
}