'use client'
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {ImageModal} from "@/components/shared/products/image-modal";

type ProductVariant = {
    size: string;
    price: number;
    image: string;
    usage: string;
}

type Product = {
    id: number;
    name: string;
    description: string;
    variants: ProductVariant[];
}
const products: Product[] = [
    {
        id: 1,
        name: "Rewitalizator Gleby EcoSoil",
        description:
            "Wysokiej jakości wzmacniacz gleby z naturalnymi minerałami i korzystnymi mikroorganizmami. Poprawia strukturę gleby i wspiera zdrowy wzrost roślin.",
        variants: [
            {
                size: "Maly (1L)",
                price: 24.99,
                image: "/products/terra/terra1L.jpg",
                usage: "Idealny do małych ogródków i roślin doniczkowych. Wystarcza na około 10m² powierzchni.",
            },
            {
                size: "Średni (5L)",
                price: 99.99,
                image: "/products/terra/terra5L.jpg",
                usage: "Odpowiedni dla średnich ogrodów przydomowych. Wystarcza na około 50m² powierzchni.",
            },
            {
                size: "Duży (10L)",
                price: 179.99,
                image: "/products/terra/terra10L.jpg",
                usage: "Przeznaczony do dużych ogrodów i małych gospodarstw. Wystarcza na około 100m² powierzchni.",
            },
            {
                size: "Przemysłowy (20L)",
                price: 299.99,
                image: "/products/terra/terra20L.jpg",
                usage: "Do zastosowań profesjonalnych i dużych areałów. Wystarcza na około 200m² powierzchni.",
            },
        ],
    },
    {
        id: 2,
        name: "System Filtracji AquaPure",
        description:
            "Zaawansowany system filtracji wody, który usuwa zanieczyszczenia i szkodliwe substancje. Zapewnia czystą, świeżą wodę dla Twojego domu i ogrodu.",
        variants: [
            {
                size: "Mały (do 50L)",
                price: 89.99,
                image: "/products/aqua/aqua1L.jpg",
                usage: "Idealny do małych oczek wodnych i systemów nawadniania roślin domowych.",
            },
            {
                size: "Średni (do 500L)",
                price: 149.99,
                image: "/products/aqua/aqua5L.jpg",
                usage: "Doskonały do przydomowych ogrodów i średnich oczek wodnych.",
            },
            {
                size: "Duży (do 1000L)",
                price: 249.99,
                image: "/products/aqua/aqua10L.jpg",
                usage: "Przeznaczony do dużych ogrodów i stawów przydomowych.",
            },
            {
                size: "Przemysłowy (do 5000L)",
                price: 499.99,
                image: "/products/aqua/aqua20L.jpg",
                usage: "Do zastosowań komercyjnych, gospodarstw rolnych i dużych zbiorników wodnych.",
            },
        ],
    },
]

export default function LandingProduct() {
    const [selectedVariant, setSelectedVariant] = useState<{ [key: number]: number }>({ 1: 0, 2: 0 })
    const [selectedImage, setSelectedImage] = useState<{url: string; alt: string} | null>(null)

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
                        {products.map((product) => (
                            <div key={product.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                                <div className="p-6 space-y-6">
                                    <h3 className="text-2xl font-bold text-center">{product.name}</h3>
                                    <p className="text-muted-foreground text-center">{product.description}</p>

                                    {/* Product variants */}
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                        {product.variants.map((variant, index) => (
                                            <div
                                                key={index}
                                                className={`rounded-lg border p-4 transition-shadow hover:shadow-lg flex flex-col ${
                                                    selectedVariant[product.id] === index ? "ring-2 ring-primary" : ""
                                                }`}
                                                onClick={() => setSelectedVariant({
                                                    ...selectedVariant,
                                                    [product.id]: index
                                                })}
                                            >
                                                <div className="flex-1 space-y-4">
                                                    <div className="aspect-square overflow-hidden rounded-lg"
                                                         onClick={(e) => {
                                                             e.stopPropagation() // Prevent triggering the variant selection
                                                             setSelectedImage({
                                                                 url: variant.image || "/placeholder.svg",
                                                                 alt: `${product.name} - ${variant.size}`
                                                             })
                                                         }}
                                                    >
                                                        <Image
                                                            src={variant.image || "/placeholder.svg"}
                                                            alt={`${product.name} - ${variant.size}`}
                                                            width={400}
                                                            height={400}
                                                            className="h-full w-full object-cover transition-all hover:scale-105 cursor-pointer"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium">{variant.size}</span>
                                                            <span
                                                                className="font-bold">{variant.price.toFixed(2)} zł</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{variant.usage}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-4 mt-4 border-t">
                                                    <Button className="w-full" size="sm">
                                                        Dodaj do Koszyka
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Image Modal */}
            <ImageModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                imageUrl={selectedImage?.url || ""}
                altText={selectedImage?.alt || ""}
            />
        </>
    );
}