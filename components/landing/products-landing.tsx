import {ProductFamily} from "@/types/product";
import ProductFamilyPage from "@/components/shared/products/product-family";

export default function LandingProduct({products}:{products: ProductFamily[]}) {
    return (
        <>
            <section id="products" className="w-full py-2 md:py-8 lg:py-20 bg-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nasze Produkty</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Wybierz rozmiar dopasowany do Twoich potrzeb
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl space-y-12 py-12">
                        {products.map((family) => (
                            <div key={family.id}>
                                <ProductFamilyPage family={family}/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}