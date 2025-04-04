import type { ReactNode } from "react"

export default function ProductsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* Hero section for products */}
            <div className="relative bg-gradient-to-b from-primary/80 to-background py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-white/90 text-4xl md:text-5xl font-bold text-center mb-4 text-primary-foreground drop-shadow-sm">
                        Nasze Produkty
                    </h1>
                    <p className="text-center text-white/80 max-w-2xl mx-auto">
                        Odkryj naszą pełną gamę naturalnych produktów dla gleby i wody. Wszystkie są produkowane z myślą o
                        zrównoważonym rozwoju i dbałości o środowisko.
                    </p>
                </div>
            </div>
            {children}
        </>
    )
}