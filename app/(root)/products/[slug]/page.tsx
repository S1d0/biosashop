import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ShoppingCart, Leaf, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductSkeleton from "./loading"
import { formatPrice } from "@/lib/utils"
import { getProductVariant } from "@/lib/actions/product/actions"
import ProductImages from "@/components/shared/products/product-images"
import ProductPrice from "@/components/shared/products/product-price"
import AddCartButton from "@/components/shared/cart/add-cart-button";

interface ProductPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params
    const { slug } = resolvedParams
    const product = await getProductVariant(slug)

    if (!product) {
        notFound()
    }

    return (
        <Suspense fallback={<ProductSkeleton />}>
            <section className="bg-background">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    {/* Breadcrumb */}
                    <div className="flex items-center mb-6 text-sm text-muted-foreground">
                        <Link href="/products" className="hover:text-primary flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Powrót do produktów
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Product Images */}
                        <div className="lg:col-span-1">
                            <ProductImages images={product.images} />
                        </div>

                        {/* Product Details */}
                        <div className="lg:col-span-1">
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center mb-2">
                                        {product.familyId === "terra-family" ? (
                                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mr-2">
                                                <Leaf className="mr-1 h-3 w-3" /> Terra
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 mr-2">
                                                <Droplets className="mr-1 h-3 w-3" /> Aqua
                                            </Badge>
                                        )}
                                        {product.stock > 0 && (
                                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                                Aktywny
                                            </Badge>
                                        )}
                                    </div>
                                    <h1 className="text-3xl font-bold">{product.name}</h1>
                                    <p className="text-muted-foreground mt-2">{product.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                            {product.size}
                                        </Badge>
                                </div>

                                <div className="border-t border-border pt-6">
                                    <h3 className="font-semibold mb-3">Cechy produktu</h3>
                                    {product.features && product.features.length > 0 ? (
                                        <ul className="space-y-2">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-primary mr-2">•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground italic">Brak dodatkowych cech produktu</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Purchase Card */}
                        <div className="lg:col-span-1">
                            <Card className="bg-card/80 backdrop-blur-sm border border-white/10">
                                <CardContent className="p-6 space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Cena</span>
                                        <ProductPrice value={product.price} />
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Status</span>
                                        {product.stock ? (
                                            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 px-3">
                                                W magazynie ({product.stock})
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20 px-3">
                                                Brak w magazynie
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <AddCartButton product={product} />
                                    </div>

                                    <div className="border-t border-border pt-4 text-sm text-muted-foreground">
                                        <p className="flex items-center mb-2">
                                            <span className="text-primary mr-2">•</span>
                                            Darmowa dostawa od 200 PLN
                                        </p>
                                        <p className="flex items-center mb-2">
                                            <span className="text-primary mr-2">•</span>
                                            Bezpieczne płatności
                                        </p>
                                        <p className="flex items-center">
                                            <span className="text-primary mr-2">•</span>
                                            14 dni na zwrot
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <div className="mt-12 md:mt-16">
                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                                <TabsTrigger value="description">Opis</TabsTrigger>
                                <TabsTrigger value="specifications">Specyfikacja</TabsTrigger>
                                <TabsTrigger value="application">Zastosowanie</TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="description"
                                className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                            >
                                <div className="max-w-3xl mx-auto">
                                    <h3 className="text-xl font-semibold mb-4">Szczegółowy opis</h3>
                                    <p className="text-muted-foreground mb-4">{product.description}</p>
                                    <p className="text-muted-foreground">
                                        Microbiosa {product.familyId === "terra-family" ? "Terra" : "Aqua"} to innowacyjne rozwiązanie,
                                        które wykorzystuje naturalne mikroorganizmy do poprawy jakości{" "}
                                        {product.familyId === "terra-family" ? "gleby" : "wody"}. Nasze produkty są w 100% naturalne i
                                        bezpieczne dla środowiska.
                                    </p>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="specifications"
                                className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                            >
                                <div className="max-w-3xl mx-auto">
                                    <h3 className="text-xl font-semibold mb-4">Specyfikacja techniczna</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border-b border-border pb-2">
                                            <span className="font-medium">Pojemność:</span>
                                            <span className="float-right text-muted-foreground">{product.size || "N/A"}</span>
                                        </div>
                                        <div className="border-b border-border pb-2">
                                            <span className="font-medium">Rodzina produktów:</span>
                                            <span className="float-right text-muted-foreground">
                        Microbiosa {product.familyId === "terra-family" ? "Terra" : "Aqua"}
                      </span>
                                        </div>
                                        <div className="border-b border-border pb-2">
                                            <span className="font-medium">Dostępność:</span>
                                            <span className="float-right text-muted-foreground">
                        {product.stock ? "W magazynie" : "Na zamówienie"}
                      </span>
                                        </div>
                                        <div className="border-b border-border pb-2">
                                            <span className="font-medium">Wydajność:</span>
                                            <span className="float-right text-muted-foreground">
                        {product.familyId === "terra-family"
                            ? product.name.includes("S")
                                ? "Do 10m²"
                                : product.name.includes("M")
                                    ? "Do 50m²"
                                    : "Do 200m²"
                            : product.name.includes("S")
                                ? "Do 1000L"
                                : product.name.includes("M")
                                    ? "Do 5000L"
                                    : "Do 20000L"}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="application"
                                className="bg-card/30 backdrop-blur-sm p-6 rounded-lg border border-white/10"
                            >
                                <div className="max-w-3xl mx-auto">
                                    <h3 className="text-xl font-semibold mb-4">Sposób użycia</h3>
                                    <ol className="list-decimal pl-5 space-y-3 text-muted-foreground">
                                        <li>
                                            {product.familyId === "terra-family"
                                                ? "Rozcieńcz produkt w wodzie w proporcji 1:10."
                                                : "Dodaj produkt bezpośrednio do zbiornika wodnego."}
                                        </li>
                                        <li>
                                            {product.familyId === "terra-family"
                                                ? "Równomiernie rozprowadź roztwór na powierzchni gleby."
                                                : "Rozprowadź równomiernie po powierzchni wody."}
                                        </li>
                                        <li>
                                            {product.familyId === "terra-family"
                                                ? "Dla najlepszych rezultatów, stosuj raz na 3 miesiące."
                                                : "Powtarzaj aplikację co 2-4 miesiące, w zależności od wielkości zbiornika."}
                                        </li>
                                        <li>Pierwsze efekty będą widoczne po 2-3 tygodniach od zastosowania.</li>
                                    </ol>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Related Products */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">Sprawdź również</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* This would be populated with actual related products */}
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="bg-card/80 backdrop-blur-sm border border-white/10 overflow-hidden">
                                    <div className="aspect-square relative">
                                        <Image
                                            src={
                                                product.familyId === "terra-family"
                                                    ? "/images/terra5L.png"
                                                    : "/placeholder.svg?height=300&width=300"
                                            }
                                            alt="Related product"
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold truncate">
                                            {product.familyId === "terra-family" ? "Microbiosa Terra" : "Microbiosa Aqua"}{" "}
                                            {i % 3 === 0 ? "S" : i % 3 === 1 ? "M" : "L"}
                                        </h3>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-bold">{formatPrice(49.99 + i * 20)}</span>
                                            <Button size="sm" variant="outline">
                                                <ShoppingCart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Suspense>
    )
}