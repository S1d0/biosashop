'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ExternalLink, ShoppingCart, Package, Star, Truck} from "lucide-react";
import {ProductVariant} from "@/types/product";
import {useCart} from "@/components/shared/cart/cart-provider";
import {formatPricePLN} from "@/lib/utils";
import Link from "next/link";
import {CldImage} from "next-cloudinary";
import { motion } from "framer-motion";

interface ProductVariantProps {
    variant: ProductVariant
}

export default function ProductVariantPage({variant}: ProductVariantProps) {
    const {addItem} = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -8 }}
            className="h-full"
        >
            <Card
                key={variant.id}
                className="overflow-hidden bg-card/60 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/25 hover:shadow-xl hover:shadow-primary/10 flex flex-col group h-full relative"
            >
                {/* Premium Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <Badge className="bg-primary/90 text-primary-foreground shadow-lg text-xs">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Premium
                    </Badge>
                </div>

                <Link href={`/products/${variant.slug}`} className="contents">
                    <div className="aspect-square relative overflow-hidden cursor-pointer bg-muted/30">
                        {/* Enhanced hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />
                        
                        {/* View Details Button */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <Button size="sm" className="bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border border-white/20">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Zobacz szczegóły
                            </Button>
                        </div>
                        
                        {/* Price overlay on image */}
                        <div className="absolute top-3 left-3 z-15">
                            <Badge className="bg-background/90 text-foreground backdrop-blur-sm border border-white/20 font-bold text-sm">
                                {formatPricePLN(variant.price)}
                            </Badge>
                        </div>
                        
                        <CldImage
                            src={variant.images[0] || "/placeholder.svg"}
                            alt={variant.name}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        
                        {/* Stock indicator */}
                        <div className="absolute bottom-3 left-3 z-15">
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
                                W magazynie
                            </Badge>
                        </div>
                    </div>
                    
                    <CardHeader className="p-4 cursor-pointer space-y-2">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-muted/50">
                                <Package className="w-3 h-3 mr-1" />
                                {variant.size}
                            </Badge>
                            {variant.price >= 20000 && (
                                <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/20">
                                    <Truck className="w-3 h-3 mr-1" />
                                    Darmowa dostawa
                                </Badge>
                            )}
                        </div>
                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                            {variant.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                            {variant.description}
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-0 flex-1 cursor-pointer">
                        <div className="space-y-3">
                            {/* Features */}
                            <div className="min-h-[60px]">
                                {variant.features && variant.features.length > 0 ? (
                                    <div className="space-y-1.5">
                                        {variant.features.slice(0, 3).map((feature, index) => (
                                            <div key={index} className="flex items-center text-xs text-muted-foreground">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                                                <span className="line-clamp-1">{feature}</span>
                                            </div>
                                        ))}
                                        {variant.features.length > 3 && (
                                            <div className="text-xs text-muted-foreground pl-3.5">
                                                +{variant.features.length - 3} więcej funkcji
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-xs text-muted-foreground italic">Produkt bez dodatkowych cech</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Link>
                
                <CardFooter className="p-4 mt-auto border-t border-white/10 bg-muted/20">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <span className="font-bold text-xl text-primary">{formatPricePLN(variant.price)}</span>
                            <span className="text-xs text-muted-foreground">za {variant.size}</span>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/products/${variant.slug}`}>
                                <Button size="sm" variant="outline" className="border-white/20 hover:border-primary/50 hover:bg-primary/5 group/btn">
                                    <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    <span className="sr-only">Zobacz produkt</span>
                                </Button>
                            </Link>
                            <Button
                                size="sm"
                                className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all group/cart"
                                onClick={(e) => {
                                    e.preventDefault()
                                    addItem(variant)
                                }}
                            >
                                <ShoppingCart className="mr-1.5 h-3.5 w-3.5 group-hover/cart:scale-110 transition-transform" />
                                <span className="text-xs font-medium">Dodaj</span>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
