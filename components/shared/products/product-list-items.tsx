'use client'

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductVariant } from "@prisma/client";
import AddCartButton from "@/components/shared/cart/add-cart-button";
import { CldImage } from "next-cloudinary";
import { ExternalLink, Package, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { formatPricePLN } from "@/lib/utils";

export default function ProductListItem({ product }: { product: ProductVariant }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-xl border border-white/10 bg-card/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
        >
            <div className="flex gap-6">
                {/* Enhanced Product Image */}
                <div className="w-1/3 lg:w-1/4 flex-shrink-0">
                    <Link href={`/products/${product.slug}`} className="block">
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted/50">
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                            
                            {/* View Details Button */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Zobacz szczegóły
                                </Button>
                            </div>
                            
                            <CldImage
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                            />
                        </div>
                    </Link>
                </div>

                {/* Enhanced Product Information */}
                <div className="flex-1 space-y-4">
                    <div className="space-y-3">
                        {/* Title and Price */}
                        <div className="flex items-start justify-between">
                            <Link href={`/products/${product.slug}`} className="block group">
                                <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
                                    {product.name}
                                </h3>
                                <Badge variant="secondary" className="mt-2">
                                    <Package className="w-3 h-3 mr-1" />
                                    {product.size}
                                </Badge>
                            </Link>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-primary">
                                    {formatPricePLN(product.price)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {product.price >= 20000 && (
                                        <span className="flex items-center">
                                            <Truck className="w-3 h-3 mr-1" />
                                            Darmowa dostawa
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {product.features.slice(0, 3).map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs bg-muted/50 hover:bg-muted transition-colors">
                                        {feature}
                                    </Badge>
                                ))}
                                {product.features.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{product.features.length - 3} więcej
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {product.description.length > 150
                                ? `${product.description.substring(0, 150)}...`
                                : product.description}
                        </p>
                    </div>

                    {/* Enhanced Action Area */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        {/* Stock Status */}
                        <div className="flex items-center space-x-3">
                            {product.stock > 0 ? (
                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 px-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                                    W magazynie ({product.stock})
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20 px-3">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                                    Brak w magazynie
                                </Badge>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <Link href={`/products/${product.slug}`}>
                                <Button variant="outline" size="sm" className="group">
                                    <ExternalLink className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                                    Szczegóły
                                </Button>
                            </Link>
                            {product.stock > 0 && (
                                <div className="min-w-[120px]">
                                    <AddCartButton product={product} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
