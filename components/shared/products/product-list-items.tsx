import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { Badge } from "@/components/ui/badge";
import { ProductVariant } from "@prisma/client";
import AddCartButton from "@/components/shared/cart/add-cart-button";

export default function ProductListItem({ product }: { product: ProductVariant }) {
    return (
        <div className="rounded-lg border p-4 transition-shadow hover:shadow-lg flex gap-6">
            {/* Product Image */}
            <div className="w-1/4 flex-shrink-0">
                <Link href={`/products/${product.slug}`} className="block">
                    <div className="aspect-square overflow-hidden rounded-lg cursor-pointer">
                        <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="h-full w-full object-cover transition-all hover:scale-105"
                        />
                    </div>
                </Link>
            </div>

            {/* Product Information */}
            <div className="flex-1 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Link href={`/products/${product.slug}`} className="hover:underline">
                            <span className="font-medium">{product.name}</span>
                        </Link>
                        <span className="font-bold">{(product.price / 100).toFixed(2)} zł</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {product.features.map((feature, index) => (
                            <div key={index}>
                                <Badge variant={"outline"}>{feature}</Badge>
                            </div>
                        ))}
                    </div>

                    <p className="text-sm text-muted-foreground">
                        {product.description.length > 120
                            ? `${product.description.substring(0, 120)}...`
                            : product.description}
                    </p>
                </div>

                {/* Stock Status */}
                <div className="flex justify-between items-center">
                    <div>
                        {product.stock > 0
                            ? <Badge variant="outline" className="bg-green-100 px-4">W magazynie</Badge>
                            : <Badge variant="destructive" className="px-4">Brak w magazynie</Badge>
                        }
                    </div>

                    {/* Action Button */}
                    {product.stock > 0 && (
                        <AddCartButton product={product} />
                    )}
                </div>
            </div>
        </div>
    );
}