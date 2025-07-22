"use client"

import {useCart} from "@/components/shared/cart/cart-provider";
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import {Package, ShoppingCart} from "lucide-react";
import {motion} from "framer-motion";

export default function CheckoutOverlay() {
    const { isCheckoutLoading, setCheckoutLoading } = useCart()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === "/checkout") {
            setCheckoutLoading(false)
        }
    }, [pathname, setCheckoutLoading]);

    if (!isCheckoutLoading) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6 text-center">
                <p className="text-xl font-semibold text-foreground">Jeszcze chwilka... Przygotowujemy Twoje zamówienie</p>
                <div className="relative mt-4 h-24 w-24">
                    {/* Stationary Shopping Cart */}
                    <ShoppingCart className="absolute animate-pulse left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-primary" />

                    {/* Box dropping into the cart */}
                    <motion.div
                        className="absolute left-1/2 top-1/2"
                        style={{ x: "-50%" }}
                        animate={{
                            y: ["-150%", "-150%", " -50%", "-60%"],
                            opacity: [0, 1, 1, 0],
                            scale: [0.8, 0.8, 0.8, 0.5],
                        }}
                        transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2,
                            ease: "easeInOut",
                            times: [0, 0.25, 0.8, 1],
                            repeatDelay: 0.2,
                        }}
                    >
                        <Package className="h-10 w-10 text-primary" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}