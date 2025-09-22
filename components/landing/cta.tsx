"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import {Variants} from "motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
} as Variants

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
} as Variants

export default function CtaPage() {
    return (
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Simplified background elements - reduced for performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [-10, 10, -10],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                    className="absolute top-16 left-16 w-32 h-32 bg-primary-foreground/10 rounded-full will-change-transform"
                />
                <motion.div
                    animate={{
                        y: [15, -15, 15],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: 3,
                    }}
                    className="absolute bottom-32 right-1/3 w-20 h-20 bg-primary-foreground/8 rounded-full will-change-transform"
                />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-full mb-6"
                        >
                            <Sparkles className="w-8 h-8 text-primary-foreground" />
                        </motion.div>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Gotowy na transformację swojego środowiska?
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl mb-8 text-primary-foreground/90 leading-relaxed"
                    >
                        Dołącz do tysięcy zadowolonych klientów, którzy doświadczyli różnicy Microbiosa. Rozpocznij swoją podróż ku
                        zdrowszemu, bardziej zrównoważonemu środowisku już dziś.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90 shadow-lg group"
                                asChild
                            >
                                <Link href="/products">
                                    Zobacz wszystkie produkty
                                    <ShoppingCart className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 group bg-transparent"
                                asChild
                            >
                                <Link href="/contact">
                                    Skontaktuj się z nami
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Stats section */}
                    <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm"
                        >
                            <div className="text-3xl font-bold mb-2">1,000+</div>
                            <div className="text-primary-foreground/80">Zadowolonych klientów</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm"
                        >
                            <div className="text-3xl font-bold mb-2">95%</div>
                            <div className="text-primary-foreground/80">Redukcja zanieczyszczeń</div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center p-6 bg-primary-foreground/10 rounded-xl backdrop-blur-sm"
                        >
                            <div className="text-3xl font-bold mb-2">Naturalnie</div>
                            <div className="text-primary-foreground/80">Wyłącznie mikroorganizmy</div>
                        </motion.div>
                    </motion.div>

                    {/* Trust indicators */}
                    {/*<motion.div variants={itemVariants} className="mt-12">*/}
                    {/*    <p className="text-sm text-primary-foreground/70 mb-4">Zaufali nam:</p>*/}
                    {/*    <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">*/}
                    {/*        <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg text-sm font-medium">ISO 14001</div>*/}
                    {/*        <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg text-sm font-medium">CE</div>*/}
                    {/*        <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg text-sm font-medium">FDA</div>*/}
                    {/*        <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg text-sm font-medium">GMP</div>*/}
                    {/*    </div>*/}
                    {/*</motion.div>*/}
                </motion.div>
            </div>
        </section>
    )
}
