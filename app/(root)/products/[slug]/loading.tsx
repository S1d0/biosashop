import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductSkeleton() {
    return (
        <section className="bg-background">
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* Breadcrumb skeleton */}
                <div className="flex items-center mb-6">
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Product Images Skeleton */}
                    <div className="lg:col-span-1">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <div className="flex gap-2 mt-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-20 w-20 rounded-md" />
                            ))}
                        </div>
                    </div>

                    {/* Product Details Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            <div>
                                <div className="flex gap-2 mb-2">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </div>
                                <Skeleton className="h-10 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6 mt-1" />
                            </div>

                            <div className="flex gap-2">
                                {[1, 2].map((i) => (
                                    <Skeleton key={i} className="h-6 w-16 rounded-full" />
                                ))}
                            </div>

                            <div className="border-t border-border pt-6">
                                <Skeleton className="h-6 w-40 mb-3" />
                                <div className="space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-start">
                                            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Purchase Card Skeleton */}
                    <div className="lg:col-span-1">
                        <Card className="bg-card/80 backdrop-blur-sm border border-white/10">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-24" />
                                </div>

                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-32 rounded-full" />
                                </div>

                                <div className="pt-4">
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>

                                <div className="border-t border-border pt-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center mb-2">
                                            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <div className="mt-12 md:mt-16">
                    <div className="w-full max-w-md mx-auto grid grid-cols-3 gap-2 mb-8">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-10 rounded-md" />
                        ))}
                    </div>
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>

                {/* Related Products Skeleton */}
                <div className="mt-16">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="bg-card/80 backdrop-blur-sm border border-white/10 overflow-hidden">
                                <Skeleton className="aspect-square w-full" />
                                <CardContent className="p-4">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <div className="flex justify-between items-center mt-2">
                                        <Skeleton className="h-6 w-20" />
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

