'use client'

import { useState } from "react";
import ProductListItem from "@/components/shared/products/product-list-items";
import {ProductVariant } from "@/types/product";
import ProductVariantPage from "@/components/shared/products/product-variant";

export default function ProductListEnhanced({
                                                data,
                                                title,
                                                limit,
                                                viewMode = 'grid'
                                            }: {
    data: ProductVariant[],
    title?: string,
    limit?: number,
    viewMode: string
}) {
    const [mode, setMode] = useState(viewMode);

    const limitedData = limit && limit < data.length ? data.slice(0, limit) : data;

    // Set the viewMode when it changes from parent
    if (viewMode !== mode) {
        setMode(viewMode);
    }

    return (
        <div className="my-6">
            {title && <h2 className="font-bold text-2xl mb-6">{title}</h2>}

            {mode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {limitedData.length > 0
                        ? limitedData.map((product) => (
                            <ProductVariantPage variant={product} key={product.id} />
                        ))
                        : <div className="col-span-full py-8 text-center text-muted-foreground">Brak produktów</div>
                    }
                </div>
            ) : (
                <div className="flex flex-col space-y-4">
                    {limitedData.length > 0
                        ? limitedData.map((product, index) => (
                            <ProductListItem product={product} key={index} />
                        ))
                        : <div className="py-8 text-center text-muted-foreground">Brak produktów</div>
                    }
                </div>
            )}
        </div>
    );
}