'use client'

import ProductFamilyPage from "@/components/shared/products/v2/product-family";
import React from "react";
import {ProductFamily} from "@/types/product";

interface LandingProductsProps {
    products?: ProductFamily[] | undefined
}

export default function LandingProducts({products}: LandingProductsProps) {
    return (
        <section id="products" className="w-full py-12 md:py-16 lg:py-20 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Our <span className="text-primary">Products</span>
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Choose the size that fits your needs
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl space-y-16 py-12">
                    {products!.map((family) => (
                        <div key={family.id}
                             className="backdrop-blur-sm bg-card/30 p-6 md:p-8 rounded-xl border border-white/10">
                            <ProductFamilyPage family={family}/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}