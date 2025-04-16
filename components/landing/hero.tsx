import Image from "next/image";
import {
     ChevronDown,
     ShoppingCart
} from "lucide-react";
import React from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";

export default function Hero() {
    const scrollToSection = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden scroll-auto">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image src="/hero/hero.jpg" alt="Wheat Field" fill className="object-cover" priority/>
            </div>

            {/* Glass Effect Container */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 flex items-center justify-center h-[90%]">
                <motion.div
                    initial={{opacity: 0, scale: 1}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.8}}
                    className="backdrop-blur-sm bg-zinc-900/20 p-8 md:p-12 rounded-xl border border-white/30 shadow-xl w-full h-full max-w-5xl mx-auto flex items-center justify-center"
                >
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
                            <span className="text-primary">Microbiosa</span> - Harnessing Nature&apos;s Power
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow">
                            Odkryj rewolucyjne produkty, które w naturalny sposób zmieniają Twoje otoczenie.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => scrollToSection("products")}
                                size="lg" className="bg-primary/90 hover:bg-primary font-semibold tracking-wider text-primary-foreground backdrop-blur-sm text-white">
                                Do sklepu <ShoppingCart className="ml-2 h-4 w-4"/>
                            </Button>
                            <Button
                                onClick={() => scrollToSection("benefits")}
                                variant="outline"
                                size="lg"
                                className="bg-transparent border-white text-white tracking-wider font-semibold hover:bg-white/20 hover:text-white"
                            >
                                Dowiedz się wiecej
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{y: [0, 10, 0]}}
                transition={{repeat: Number.POSITIVE_INFINITY, duration: 2}}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                onClick={() => scrollToSection('products')}
            >
                <button onClick={() => "#products"} className='group'>
                    <ChevronDown className="h-8 w-8 text-white drop-shadow-lg group-hover:text-primary"/>
                </button>
            </motion.div>
        </section>
)
}