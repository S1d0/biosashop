import ProductsFiltersServer from "@/components/shared/products/products-filters-server";
import {getProductFamilies} from "@/lib/actions/product/actions";
import ProductListEnhanced from "@/components/shared/products/product-list-enhanced";

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
        <main className="flex min-h-screen flex-col">
            <section className="w-full py-12 md:py-24 bg-white">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tighter">{mainTitle}</h1>
                            <p className="text-muted-foreground mt-1">
                                Znaleziono {mergeProducts.length} {mergeProducts.length === 1 ? 'produkt' : mergeProducts.length < 5 ? 'produkty' : 'produktów'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Sidebar with filters */}
                        <div className="md:col-span-1">
                            <ProductsFiltersServer/>
                        </div>

                        {/* Products grid */}
                        <div className="md:col-span-3">
                            <ProductListEnhanced data={mergeProducts} viewMode={"list"}/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}