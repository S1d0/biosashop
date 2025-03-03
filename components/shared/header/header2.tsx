import {EllipsisVertical, Leaf, ShoppingCart, UserIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

export default function Header() {

    const COMPANY_NAME = "Eco biossa";

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-green-600"/>
                    <span className="text-xl font-bold">{COMPANY_NAME}</span>
                </div>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center gap-6">
                   {/*<Link href="#categories" className="text-sm font-medium hover:underline underline-offset-4">*/}
                   {/*     Kategorie*/}
                   {/* </Link>*/}
                    <Link href="/products" className="text-sm font-medium hover:underline hover:text-primary underline-offset-4">
                        Produkty
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 hover:text-primary">
                        O Nas
                    </Link>
                    {/*<Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">*/}
                    {/*    Opinie*/}
                    {/*</Link>*/}
                    <Button variant="outline" size="icon">
                        <ShoppingCart className="h-4 w-4"/>
                        <span className="sr-only">Koszyk</span>
                    </Button>
                </nav>

                {/*
                    Mobile Navigation
                */}
                <nav className="md:hidden flex items-center gap-6">
                    <Sheet>
                        <SheetTrigger className={"align-middle"}>
                            <EllipsisVertical/>
                        </SheetTrigger>
                        <SheetContent className={"flex items-start flex-col"}>
                            <SheetTitle className={"text-2xl tracking-widest"}>Menu</SheetTitle>
                            <Button asChild variant="ghost">
                                <Link
                                    href="#products"
                                    className="text-sm font-medium"
                                >
                                    Produkty
                                </Link>
                            </Button>
                            <Button asChild variant="ghost">
                                <Link
                                    href="#categories"
                                    className="text-sm font-medium"
                                >
                                    Kategorie
                                </Link>
                            </Button>
                            <Button asChild variant="ghost">
                                <Link href="/cart">
                                    <ShoppingCart/>Koszyk
                                </Link>
                            </Button>
                            <Button asChild variant="ghost">
                                <Link
                                    href="#about"
                                    className="text-sm font-medium"
                                >
                                    O Nas
                                </Link>
                            </Button>
                            <Button asChild variant="ghost">
                                <Link
                                    href="#testimonials"
                                    className="text-sm font-medium"
                                >
                                    Opinie
                                </Link>
                            </Button>
                            <Button asChild variant="ghost">
                                <Link href="/cart">
                                    <ShoppingCart/>Koszyk
                                </Link>
                            </Button>
                            <Button asChild variant="ghost">
                                <Link href="/signin">
                                    <UserIcon/>Twoje konto
                                </Link>
                            </Button>
                            <SheetDescription></SheetDescription>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </header>
    );
}