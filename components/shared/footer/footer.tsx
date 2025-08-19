import {Leaf} from "lucide-react";
import Link from "next/link";
import {headers} from "next/headers";

const email = "kontakt@mikroorganizmy.pl"
const phone = "+48 123 456 789"
const companyName = "Mikroorganizmy";
const address = "ul. Zielona 123, Ekograd 12-345"

export default async function Footer() {
    const headerList = await headers()
    const currentDate = new Date(headerList.get('x-timestamp') || Date.now().toString())
    return (
        <footer className="w-full border-t bg-background py-6 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Leaf className="h-6 w-6 text-emerald-600"/>
                            <span className="text-xl font-bold">Mikrobiosa</span>
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
                            <Link href="/faq" className="text-sm text-muted-foreground hover:underline">
                                FAQ
                            </Link>
                        </nav>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Kontakt</h3>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <p>{address}</p>
                            <p>{email}</p>
                            <p>{phone}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Regulamin</h3>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/terms#privacy" className="text-sm text-muted-foreground hover:underline">
                                Polityka prywatności
                            </Link>
                            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                                Regulamin
                            </Link>
                            <Link href="/terms#withdrawal" className="text-sm text-muted-foreground hover:underline">
                               Odstąpienie od umowy
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {currentDate.getFullYear()} {companyName}. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}