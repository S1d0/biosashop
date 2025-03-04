'use client'
import {ProductVariant, viewModeEnum} from "@/types/product";
import {Button} from "@/components/ui/button";
import ProductListEnhanced from "@/components/shared/products/product-list-enhanced";
import {useState} from "react";
import {Grid, List} from "lucide-react";
import {cn} from "@/lib/utils";

export default function ProductDisplay({products}: {products: ProductVariant[]}) {
    const [viewMode, setViewMode] = useState(viewModeEnum.GRID)

    return (
        <div className={"flex flex-col h-full"}>
            <div className={"flex items-center justify-end"}>
                <Button variant={"ghost"} onClick={() => setViewMode(viewModeEnum.GRID)}>
                    <Grid className={ cn(viewMode === viewModeEnum.GRID ? `text-primary` : ``)} />
                </Button>
                <Button variant={"ghost"} onClick={() => setViewMode(viewModeEnum.LIST)}>
                    <List className={ cn(viewMode === viewModeEnum.LIST? `text-primary` : ``)} />
                </Button>
            </div>
            <ProductListEnhanced data={products} viewMode={viewMode}/>
        </div>
    );
}