'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ExternalLink, ShoppingCart} from "lucide-react";
import {ProductVariant} from "@/types/product";
import {useCart} from "@/components/shared/cart/cart-provider";
import {formatPricePLN} from "@/lib/utils";
import Link from "next/link";
import {CldImage} from "next-cloudinary";

interface ProductVariantProps {
    variant: ProductVariant
}

export default function ProductVariantPage({variant}: ProductVariantProps) {
    const {addItem} = useCart();

    return (
            <Card
                key={variant.id}
                className="overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10 transition-all hover:shadow-lg flex flex-col group"
            >
                <Link href={`/products/${variant.slug}`} className="contents">
                    <div className="aspect-square relative overflow-hidden cursor-pointer">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    Zobacz szczegóły <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                        </div>
                        <CldImage
                            src={variant.images[0] || "/placeholder.svg"}
                            alt={variant.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                    <CardHeader className="p-4 cursor-pointer">
                        <CardTitle className="line-clamp-1">{variant.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{variant.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1 cursor-pointer">
                        <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                    {variant.size}
                                </Badge>
                        </div>
                        <div className="mt-4 min-h-[80px]">
                            {variant.features && variant.features.length > 0 ? (
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    {variant.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-primary mr-2">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">Produkt bez dodatkowych cech</p>
                            )}
                        </div>
                    </CardContent>
                </Link>
                <CardFooter className="p-4 mt-auto flex items-center justify-between border-t border-white/5">
                    <div className="font-bold text-lg">{formatPricePLN(variant.price)}</div>
                    <div className="flex gap-2">
                        <Link href={`/products/${variant.slug}`}>
                            <Button size="sm" variant="outline" className="border-white/10 hover:border-white/30">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Zobacz produkt</span>
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            className="bg-primary/90 hover:bg-primary text-primary-foreground"
                            onClick={(e) => {
                                e.preventDefault()
                                addItem(variant)
                            }}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Dodaj
                        </Button>
                    </div>
                </CardFooter>
            </Card>
    )
}