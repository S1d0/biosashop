import {getProductFamilies} from "@/lib/actions/product/actions";
import ProductsClient from "@/components/shared/products/products-client";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

interface ProductsPageProps {
    searchParams: Promise<{
        filter?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const resolvedSearchParams = await searchParams;
    const filter = resolvedSearchParams?.filter;
    
    const productFamilies = await getProductFamilies();
    const allProducts = productFamilies
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
                    
                    <ProductsClient 
                        products={allProducts} 
                        families={productFamilies} 
                        initialFilter={filter} 
                    />
                </div>
            </section>
        </main>
    );
}
