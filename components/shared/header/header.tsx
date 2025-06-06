"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ShoppingCart, Menu, X, ChevronRight, Leaf, Droplets } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/shared/cart/cart-provider"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Initialize cartState with default values
    const { setIsCartOpen, totalItems } = useCart()

    return (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-muted-foreground hover:text-primary focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    {/* Logo - Left Side */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/vercel.svg?height=40&width=40"
                                alt="Microbiosa Logo"
                                width={40}
                                height={40}
                                className="rounded-full mr-2"
                            />
                            <span className="text-primary font-bold text-xl">Microbiosa</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Right Side */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center font-medium text-foreground hover:text-primary transition-colors">
                                Products <ChevronDown className="ml-1 h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href="/#terra" className="flex items-center w-full">
                                        <Leaf className="mr-2 h-4 w-4 text-primary" />
                                        Microbiosa Terra
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/#aqua" className="flex items-center w-full">
                                        <Droplets className="mr-2 h-4 w-4 text-primary" />
                                        Microbiosa Aqua
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center font-medium text-foreground hover:text-primary transition-colors">
                                Categories <ChevronDown className="ml-1 h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Soil Enhancement</DropdownMenuItem>
                                <DropdownMenuItem>Water Treatment</DropdownMenuItem>
                                <DropdownMenuItem>Sustainable Solutions</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href="/#about" className="font-medium text-foreground hover:text-primary transition-colors">
                            About
                        </Link>

                        <div className="flex items-center space-x-4">
                            <ThemeToggle />

                            <button
                                className="relative text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsCartOpen(true)}
                                aria-label="Open shopping cart"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                                )}
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-card border-t border-border">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="flex flex-col space-y-3">
                            <div className="py-2 border-b border-border">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-foreground font-semibold">Products</span>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="pl-4 space-y-2">
                                    <Link
                                        href="/#terra"
                                        className="flex items-center text-muted-foreground hover:text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Leaf className="mr-2 h-4 w-4 text-primary" />
                                        Microbiosa Terra
                                    </Link>
                                    <Link
                                        href="/#aqua"
                                        className="flex items-center text-muted-foreground hover:text-primary"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Droplets className="mr-2 h-4 w-4 text-primary" />
                                        Microbiosa Aqua
                                    </Link>
                                </div>
                            </div>

                            <div className="py-2 border-b border-border">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-foreground font-semibold">Categories</span>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="pl-4 space-y-2">
                                    <Link href="#" className="block text-muted-foreground hover:text-primary">
                                        Soil Enhancement
                                    </Link>
                                    <Link href="#" className="block text-muted-foreground hover:text-primary">
                                        Water Treatment
                                    </Link>
                                    <Link href="#" className="block text-muted-foreground hover:text-primary">
                                        Sustainable Solutions
                                    </Link>
                                </div>
                            </div>

                            <Link
                                href="/#about"
                                className="py-2 text-foreground hover:text-primary border-b border-border"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>

                            <div className="py-2 flex items-center justify-between border-b border-border">
                                <span className="text-foreground">Theme</span>
                                <ThemeToggle />
                            </div>

                            <button
                                className="py-2 flex items-center text-foreground hover:text-primary"
                                onClick={() => {
                                    setMobileMenuOpen(false)
                                    setIsCartOpen(true)
                                }}
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Shopping Cart
                                {totalItems > 0 && (
                                    <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}

