import {EllipsisVertical, Leaf, ShoppingCart, UserIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {AuthDialog} from "@/components/auth/auth-dialog";

export default function Header() {

    const COMPANY_NAME = "Eco biossa";

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-accent border-white bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-gradient-to-t from-primary to-white">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <Leaf className="h-6 w-6 text-green-600"/>
                        <span className="text-xl font-bold">{COMPANY_NAME}</span>
                    </div>
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#categories" className="text-sm font-medium hover:text-foreground hover:underline underline-offset-4">
                        Kategorie
                    </Link>
                    <Link href="/products" className="text-sm font-medium hover:underline hover:text-foreground underline-offset-4">
                        Produkty
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:underline hover:text-foreground underline-offset-4">
                        O Nas
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium hover:underline hover:text-foreground underline-offset-4">
                       FAQ
                    </Link>
                    <AuthDialog className={"text-black py-0 my-0"} triggerLabel={"Twoje zakupy"}/>

                    <UserIcon className={"h-6 w-6 text-white"}/>
                    <Button variant="outline" size="icon" className={"group bg-white"}>
                        <ShoppingCart className="h-4 w-4 group-hover:text-green-700"/>
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