'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";
import {ProductVariant} from "@/types/product";
import {ImageModal} from "@/components/shared/images/image-modal";
import {useState} from "react";
import {useCart} from "@/components/shared/cart/cart-provider";
import {formatPricePLN} from "@/lib/utils";

interface ProductVariantProps {
    variant: ProductVariant
}

export default function ProductVariantPage({variant}: ProductVariantProps) {
    const [viewImg, setViewImg] = useState(false)
    const {addItem } = useCart();
    return (
        <>
            <Card
                key={variant.id}
                className="overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10 transition-all hover:shadow-lg flex flex-col"
            >
                <div className="aspect-square relative overflow-hidden">
                    <Image
                        onClick={() => setViewImg(true)}
                        src={variant.images[0] || "/placeholder.svg"}
                        alt={variant.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                    />
                </div>
                <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1">{variant.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{variant.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-1">
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
                <CardFooter className="p-4 mt-auto flex items-center justify-between border-t border-white/5">
                    <div className="font-bold text-lg">{formatPricePLN(variant.price)}</div>
                    <Button
                        size="sm"
                        className="bg-primary/90 hover:bg-primary text-primary-foreground"
                        onClick={() => addItem(variant)}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Dodaj
                    </Button>
                </CardFooter>
            </Card>
            <ImageModal
                isOpen={viewImg}
                onClose={() => setViewImg(false)}
                images={variant.images}
                altText={"Zdjęcie wariantu produktu"}
            />
        </>


        // <>
        //     <Card
        //         className="overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10 transition-all hover:shadow-lg max-w-sm"
        //     >
        //         <div className="aspect-square relative overflow-hidden ">
        //             <Image
        //                 onClick={() => setViewImg(true)}
        //                 src={variant.images[0] || "/placeholder.svg"}
        //                 alt={variant.name}
        //                 fill
        //                 className="object-cover transition-transform hover:scale-105"
        //             />
        //         </div>
        //         <CardHeader className="p-4">
        //             <CardTitle className="line-clamp-1">{variant.name}</CardTitle>
        //             <CardDescription className="line-clamp-2">{variant.description}</CardDescription>
        //         </CardHeader>
        //         <CardContent className="p-4 pt-0">
        //             <div className="flex flex-wrap gap-2">
        //                 <Badge variant={'secondary'} className={"bg-muted text-muted-foreground"}>
        //                     {variant.size}
        //                 </Badge>
        //             </div>
        //                 {variant.features && (
        //                     <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
        //                         {variant.features.map((feature, index) => (
        //                             <li key={index} className="flex items-center">
        //                                 <span className="text-primary mr-2">•</span>
        //                                 {feature}
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 )}
        //         </CardContent>
        //         <CardFooter className="p-4 flex items-center justify-between">
        //             <div className="font-bold text-lg">
        //                 <ProductPrice value={variant.price} />
        //             </div>
        //             <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground" onClick={() =>{addItem(variant)}}>
        //                 <ShoppingCart className="mr-2 h-4 w-4"/>
        //                 Dodaj
        //             </Button>
        //         </CardFooter>
        //     </Card>
        //     <ImageModal
        //         isOpen={viewImg}
        //         onClose={() => setViewImg(false)}
        //         images={variant.images}
        //         altText={"Zdjęcie wariantu produktu"}
        //     />
        // </>
    )
}