export default function ProductsLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Hero section for products */}
            <div className="relative bg-gradient-to-b from-green-50 to-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Nasze Produkty</h1>
                    <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                        Odkryj naszą pełną gamę naturalnych produktów dla gleby i wody. Wszystkie są produkowane z myślą o zrównoważonym rozwoju i dbałości o środowisko.
                    </p>
                </div>
            </div>

            {/* Main content */}
            {children}
        </>
    );
}