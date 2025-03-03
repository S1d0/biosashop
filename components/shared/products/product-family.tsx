import {ProductFamily} from "@/types/product";
import ProductVariantPage from "@/components/shared/products/product-variant";
import {useMemo} from "react";

export default function ProductFamilyPage({family}: {family: ProductFamily}) {
    const variantsBySize = useMemo(() => {
        return family.variants.sort((a, b) => {
            const sizeA = parseInt(a.size.replace(/[^0-9]/g, ''));
            const sizeB = parseInt(b.size.replace(/[^0-9]/g, ''));

            return sizeA - sizeB;
        });
    }, [family.variants]);



    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-6">
                <h3 className="text-2xl font-bold text-center">{family.name}</h3>
                <p className="text-muted-foreground text-center">{family.description}</p>

                {/* Product variants */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {variantsBySize.map((variant) => (
                        <div key={variant.id}>
                            <ProductVariantPage variant={variant}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}