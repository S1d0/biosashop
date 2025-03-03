import Link from "next/link";
import { Button } from "@/components/ui/button";

// Categories based on the ones from footer and categories components
const categories = [
    { id: "all", label: "Wszystkie" },
    { id: "soil", label: "Gleba" },
    { id: "water", label: "Woda" },
    { id: "garden", label: "Ogród" },
    { id: "eco", label: "Ekologiczne" },
];

export default function ProductsFiltersServer() {
    return (
        <div className="bg-white p-4 rounded-lg border sticky top-20">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filtry</h2>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/products">Resetuj</Link>
                </Button>
            </div>

            {/* Categories */}
            <div className="border-b py-4">
                <h3 className="font-medium mb-2">Kategoria</h3>
                <div className="space-y-2">
                    {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                            <Button
                                variant="ghost"
                                className="justify-start p-2 w-full text-left font-normal"
                                asChild
                            >
                                <Link href={`/products?category=${category.id}`}>
                                    {category.label}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price ranges */}
            <div className="py-4">
                <h3 className="font-medium mb-2">Cena</h3>
                <div className="space-y-2">
                    <Button
                        variant="ghost"
                        className="justify-start p-2 w-full text-left font-normal"
                        asChild
                    >
                        <Link href={`/products?priceMin=0&priceMax=100`}>
                            0 - 100 zł
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        className="justify-start p-2 w-full text-left font-normal"
                        asChild
                    >
                        <Link href={`/products?priceMin=100&priceMax=200`}>
                            100 - 200 zł
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        className="justify-start p-2 w-full text-left font-normal"
                        asChild
                    >
                        <Link href={`/products?priceMin=200&priceMax=300`}>
                            200 - 300 zł
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}