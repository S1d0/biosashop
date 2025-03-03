'use client'

import {ProductVariant} from "@/types/product";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ImageModal} from "@/components/shared/images/image-modal";
import {useState} from "react";
import ProductPrice from "@/components/shared/products/product-price";

export default function ProductVariantPage({variant}: {variant: ProductVariant}) {
    const [viewImg, setViewImg] = useState(false)
    const img = variant.images[0];
    return (
        <div className={`rounded-lg border p-4 transition-shadow hover:shadow-lg flex flex-col h-full`}>
            <div className="flex-1 space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                        onClick={() => setViewImg(true)}
                        src={img || "/placeholder.svg"}
                        alt={`${variant.name} - ${variant.size}`}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition-all hover:scale-105 cursor-pointer"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="font-medium text-xl">{variant.name}</span>
                        <ProductPrice value={variant.price} />
                    </div>
                    <p className="text-sm text-muted-foreground">{variant.description}</p>
                </div>
            </div>
            <div className="pt-4 mt-4 border-t">
                <Button className="w-full" size="sm">
                    Dodaj do Koszyka
                </Button>
            </div>
            <ImageModal
                isOpen={viewImg}
                onClose={() => setViewImg(false)}
                images={variant.images}
                altText={"Zdjęcie wariantu produktu"}
            />
        </div>
    );
}