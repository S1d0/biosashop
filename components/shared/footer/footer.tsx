import {DropletIcon, Globe, Leaf} from "lucide-react";
import Link from "next/link";

type Category = {
    id: string;
    name: string;
    icon: React.ReactElement;
    description: string;
}

const categories: Category[] = [
    {
        id: "soil",
        name: "Gleba",
        icon: <Leaf className="h-6 w-6 text-green-600" />,
        description: "Bogate w składniki odżywcze rozwiązania dla optymalnego wzrostu roślin",
    },
    {
        id: "water",
        name: "Woda",
        icon: <DropletIcon className="h-6 w-6 text-blue-600" />,
        description: "Produkty do oczyszczania i uzdatniania wody",
    },
    {
        id: "garden",
        name: "Ogród",
        icon: <Leaf className="h-6 w-6 text-emerald-600" />,
        description: "Produkty do pielęgnacji ogrodu dla zdrowych roślin",
    },
    {
        id: "eco",
        name: "Ekologiczne",
        icon: <Globe className="h-6 w-6 text-teal-600" />,
        description: "Zrównoważone rozwiązania dla bardziej zielonej planety",
    },
]
export default function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Leaf className="h-6 w-6 text-green-600"/>
                            <span className="text-xl font-bold">Eco Family</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Rodzinna firma tworząca produkty premium dla gleby i wody od 2000 roku.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Szybkie Linki</h3>
                        <nav className="flex flex-col gap-2">
                            <Link href="/" className="text-sm text-muted-foreground hover:underline">
                                Strona Główna
                            </Link>
                            <Link href="/products" className="text-sm text-muted-foreground hover:underline">
                                Produkty
                            </Link>
                            <Link href="/about" className="text-sm text-muted-foreground hover:underline">
                                O Nas
                            </Link>
                            <Link href="/faq" className="text-sm text-muted-foreground hover:underline">
                                FAQ
                            </Link>
                        </nav>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Kategorie</h3>
                        <nav className="flex flex-col gap-2">
                            {categories.map((category) => (
                                <Link key={category.id} href="#"
                                      className="text-sm text-muted-foreground hover:underline">
                                    {category.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Kontakt</h3>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <p>ul. Zielona 123</p>
                            <p>Ekograd, 12-345</p>
                            <p>kontakt@ecofamily.com</p>
                            <p>+48 123 456 789</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Eco Family. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}