"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import {useCart} from "@/components/shared/cart/cart-provider";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { setIsCartOpen, totalItems } = useCart()

    return (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side */}
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-muted-foreground hover:text-primary focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                        <Link href="/" className="flex items-center">
                            <Image src="/vercel.svg" alt="Microbiosa Logo" width={32} height={32} className="mr-2" />
                            <span className="text-primary font-bold text-xl">Microbiosa</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation (Center) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/products" className="font-medium text-foreground hover:text-primary transition-colors">
                            Produkty
                        </Link>
                        <Link href="/#about" className="font-medium text-foreground hover:text-primary transition-colors">
                            O nas
                        </Link>
                    </nav>

                    {/* Right Side (Always Visible) */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            className="relative text-foreground hover:text-primary transition-colors"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Otwórz koszyk"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <CartItems totalItems={totalItems} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-card border-t border-border">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href="/products"
                                className="block py-2 text-foreground hover:bg-muted rounded-md px-3"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Produkty
                            </Link>
                            <Link
                                href="/#about"
                                className="block py-2 text-foreground hover:bg-muted rounded-md px-3"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                O nas
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}

function CartItems({ totalItems }: { totalItems: number }) {
    if (totalItems < 1) {
        return null
    }
    return (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {totalItems}
    </span>
    )
}
