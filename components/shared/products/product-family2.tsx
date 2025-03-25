import Image from "next/image"
import type { ProductFamily } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, ChevronRight } from "lucide-react"

export default function ProductFamilyPage({ family }: { family: ProductFamily }) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-primary">{family.name}</h3>
                    <p className="text-muted-foreground">{family.description}</p>
                </div>
                <Button variant="outline" className="group w-full md:w-auto">
                    Zobacz wszystkie
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {family.variants.map((variant) => (
                    <Card
                        key={variant.id}
                        className="overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10 transition-all hover:shadow-lg max-w-sm"
                    >
                        <div className="aspect-square relative overflow-hidden ">
                            <Image
                                src={variant.images[0] || "/placeholder.svg"}
                                alt={variant.name}
                                fill
                                className="object-cover transition-transform hover:scale-105"
                            />
                        </div>
                        <CardHeader className="p-4">
                            <CardTitle className="line-clamp-1">{variant.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{variant.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="flex flex-wrap gap-2">
                                <Badge variant={'secondary'} className={"bg-muted text-muted-foreground"}>
                                    {variant.size}
                                </Badge>
                            </div>
                            {variant.features && (
                                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                                    {variant.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-primary mr-2">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                        <CardFooter className="p-4 flex items-center justify-between">
                            <div className="font-bold text-lg">
                                {variant.price.toLocaleString("pl-PL", { style: "currency", currency: "PLN" })}
                            </div>
                            <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Dodaj
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

