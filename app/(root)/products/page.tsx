import {getProductFamilies} from "@/lib/actions/product/actions";
import ProductDisplay from "@/components/shared/products/product-display";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

export default async function ProductsPage() {
    const mainTitle = "Wszystkie Produkty";
    const productFamilies = await getProductFamilies();
    const mergeProducts = productFamilies
        .flatMap((family) => family.variants)
        .sort((a,b) => {
                const sizeA = parseInt(a.size.replace(/[^0-9]/g, ''));
                const sizeB = parseInt(b.size.replace(/[^0-9]/g, ''));
                return sizeA - sizeB;
            }
        );

    return (
        <main className="flex min-h-screen flex-col bg-background">
            <section className="w-full py-12 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="mb-6">
                        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Wróć do sklepu
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tighter">{mainTitle}</h1>
                            <p className="text-muted-foreground mt-1">
                                Znaleziono {mergeProducts.length} {mergeProducts.length === 1 ? 'produkt' : mergeProducts.length < 5 ? 'produkty' : 'produktów'}
                            </p>
                        </div>
                    </div>
                    <ProductDisplay products={mergeProducts} />
                </div>
            </section>
        </main>
    );
}