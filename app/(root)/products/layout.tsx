import type { ReactNode } from "react"

export default function ProductsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {/* Hero section for products */}
            <div className="relative bg-gradient-to-b from-primary to-background py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary-foreground drop-shadow-md">
                        Nasze Produkty
                    </h1>
                    <p className="text-center text-primary-foreground/90 max-w-2xl mx-auto font-medium drop-shadow-sm">
                        Odkryj naszą pełną gamę naturalnych produktów dla gleby i wody. Wszystkie są produkowane z myślą o
                        zrównoważonym rozwoju i dbałości o środowisko.
                    </p>
                </div>
            </div>
            {children}
        </>
    )
}