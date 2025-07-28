"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useCart } from "@/components/shared/cart/cart-provider"
import { ChevronDown, Leaf, Droplets } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
    const { setIsCartOpen, totalItems } = useCart()

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side */}
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-muted-foreground hover:text-primary focus:outline-none transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                        <Link href="/" className="flex items-center group">
                            <Image src="/vercel.svg" alt="Microbiosa Logo" width={32} height={32} className="mr-2" />
                            <span className="text-primary font-bold text-xl group-hover:text-primary/80 transition-colors">
                Microbiosa
              </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation (Center) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/products" className="font-medium text-foreground hover:text-primary transition-colors py-2">
                           Sklep
                        </Link>
                        {/* Products Dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center font-medium text-foreground hover:text-primary transition-colors py-2"
                                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                                onMouseEnter={() => setProductsDropdownOpen(true)}
                                onMouseLeave={() => setProductsDropdownOpen(false)}
                            >
                                Produkty
                                <ChevronDown
                                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                                        productsDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <AnimatePresence>
                                {productsDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                                        onMouseEnter={() => setProductsDropdownOpen(true)}
                                        onMouseLeave={() => setProductsDropdownOpen(false)}
                                    >
                                        <div className="py-2">
                                            <Link
                                                href="/about/terra"
                                                className="flex items-center px-4 py-3 hover:bg-muted transition-colors group"
                                                onClick={() => setProductsDropdownOpen(false)}
                                            >
                                                <div className="flex items-center justify-center w-12 h-12 bg-green-50 dark:bg-green-950/30 rounded-lg mr-4 group-hover:scale-105 transition-transform">
                                                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        Terra Biosa
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">Rozwiązanie dla gleby i upraw</div>
                                                </div>
                                            </Link>
                                            <div className="h-px bg-border mx-4" />
                                            <Link
                                                href="/about/aqua"
                                                className="flex items-center px-4 py-3 hover:bg-muted transition-colors group"
                                                onClick={() => setProductsDropdownOpen(false)}
                                            >
                                                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-950/30 rounded-lg mr-4 group-hover:scale-105 transition-transform">
                                                    <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        Aqua Biosa
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">Rozwiązanie dla systemów wodnych</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/contact" className="font-medium text-foreground hover:text-primary transition-colors py-2">
                            Kontakt
                        </Link>
                        <Link href="/faq" className="font-medium text-foreground hover:text-primary transition-colors py-2">
                            FAQ
                        </Link>
                    </nav>

                    {/* Right Side (Always Visible) */}
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            className="relative text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted"
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
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-card border-t border-border"
                    >
                        <div className="container mx-auto px-4 py-4">
                            <nav className="flex flex-col space-y-1">
                                <div className="py-2">
                                    <div className="text-sm font-semibold text-muted-foreground mb-3 px-3 uppercase tracking-wider">
                                        Produkty
                                    </div>
                                    <Link
                                        href="/about/terra"
                                        className="flex items-center py-3 text-foreground hover:bg-muted rounded-lg px-3 ml-3 transition-colors group"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 bg-green-50 dark:bg-green-950/30 rounded-md mr-3">
                                            <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium group-hover:text-primary transition-colors">Terra Biosa</div>
                                            <div className="text-xs text-muted-foreground">Dla gleby</div>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/about/aqua"
                                        className="flex items-center py-3 text-foreground hover:bg-muted rounded-lg px-3 ml-3 transition-colors group"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-950/30 rounded-md mr-3">
                                            <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium group-hover:text-primary transition-colors">Aqua Biosa</div>
                                            <div className="text-xs text-muted-foreground">Dla wody</div>
                                        </div>
                                    </Link>
                                </div>
                                <Link
                                    href="/products"
                                    className="block py-3 text-foreground hover:bg-muted rounded-lg px-3 font-medium hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                   Sklep
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block py-3 text-foreground hover:bg-muted rounded-lg px-3 font-medium hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Kontakt
                                </Link>
                                <Link
                                    href="/faq"
                                    className="block py-3 text-foreground hover:bg-muted rounded-lg px-3 font-medium hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    FAQ
                                </Link>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

function CartItems({ totalItems }: { totalItems: number }) {
    if (totalItems < 1) {
        return null
    }

    return (
        <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm"
        >
            {totalItems}
        </motion.span>
    )
}
