import type { ProductFamily } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import ProductVariant from "@/components/shared/products/v2/product-variant";
import Link from "next/link";

export default function ProductFamilyPage({ family }: { family: ProductFamily }) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-primary">{family.name}</h3>
                    <p className="text-muted-foreground">{family.description}</p>
                </div>
                <Button variant="outline" className="group w-full md:w-auto" asChild>
                        <Link href="/products">
                        Zobacz wszystkie
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {family.variants
                    .sort((a,b)=> a.price > b.price ? 1 : -1)
                    .map((variant) => (
                    <ProductVariant key={variant.id} variant={variant} />
                ))}
            </div>
        </div>
    )
}

