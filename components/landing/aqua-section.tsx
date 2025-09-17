"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Droplets, Waves, Fish, Sparkles } from "lucide-react"
import {Variants} from "motion";
import Link from "next/link";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.6,
        },
    },
} as Variants;

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
} as Variants;

const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
} as Variants;

const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
} as Variants

export default function AquaSection() {
    return (
        <section id="aqua" className="py-20 relative bg-primary text-primary-foreground overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "linear",
                    }}
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                        backgroundSize: "100% 100%",
                    }}
                />
            </div>

            <div className="container px-4 md:px-6 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    <motion.div variants={imageVariants} className="relative">
                        <motion.div
                            whileHover={{ scale: 1.02, rotateY: -5 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative h-[500px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                        >
                            <Image
                                src="/aqua-land.jpg"
                                // src="/placeholder.svg?height=800&width=600"
                                alt="Microbiosa Aqua - Oczyszczanie wody"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />

                            {/* Water ripple effect */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-full"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/30 rounded-full"
                            />

                            {/* Floating bubbles */}
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -20, 0],
                                        x: [0, Math.sin(i) * 10, 0],
                                        opacity: [0.3, 0.7, 0.3],
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "easeInOut",
                                        delay: i * 0.3,
                                    }}
                                    className="absolute w-2 h-2 bg-white/60 rounded-full"
                                    style={{
                                        left: `${20 + i * 15}%`,
                                        top: `${30 + i * 10}%`,
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Decorative water drops */}
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                        >
                            <Droplets className="h-6 w-6 text-white/80" />
                        </motion.div>
                    </motion.div>

                    <div>
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center mb-4">
                                <Waves className="h-8 w-8 text-white/90 mr-3" />
                                <span className="text-sm font-medium text-white/80 uppercase tracking-wider">Rozwiązanie dla Wody</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                <span className="text-white">Microbiosa Aqua</span>
                                <br />
                                <span className="text-2xl md:text-3xl text-white/80 font-normal">Naturalne Oczyszczanie Wody</span>
                            </h2>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-lg text-white/90 mb-8 leading-relaxed">
                            Nasze zaawansowane rozwiązanie do uzdatniania wody, które naturalnie oczyszcza i rewitalizuje systemy
                            wodne. Wykorzystując specjalistyczne korzystne mikroorganizmy, Microbiosa Aqua równoważy ekosystemy wodne,
                            redukuje szkodliwe zanieczyszczenia i tworzy zdrowsze środowiska wodne.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-white">Zaawansowane Właściwości:</h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: Sparkles,
                                        title: "Oczyszcza wodę naturalnie",
                                        description: "Eliminuje toksyny bez użycia chemikaliów",
                                    },
                                    {
                                        icon: Fish,
                                        title: "Przywraca ekosystemy wodne",
                                        description: "Wspiera różnorodność biologiczną w wodzie",
                                    },
                                    {
                                        icon: Waves,
                                        title: "Zrównoważone zarządzanie wodą",
                                        description: "Długoterminowe rozwiązanie dla czystej wody",
                                    },
                                    {
                                        icon: Droplets,
                                        title: "Uniwersalne zastosowanie",
                                        description: "Idealne dla stawów, jezior i akwariów",
                                    },
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <benefit.icon className="h-5 w-5 text-white/90 mt-1 flex-shrink-0" />
                                        <div>
                                            <span className="font-medium text-white block">{benefit.title}</span>
                                            <span className="text-sm text-white/70">{benefit.description}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { value: "99%", label: "Czystość wody" },
                                { value: "30", label: "Dni efektu" },
                                { value: "0", label: "Chemikaliów" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={statsVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                                >
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-white/70">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="secondary" size="lg" className="group" asChild>
                                    <Link href="/products?filter=aqua">
                                        Zobacz produkty Aqua
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button variant="outline" size="lg" className="group border-white/30 text-white hover:bg-white/20 hover:text-white" asChild>
                                    <Link href="/about/aqua">
                                        Poznaj Aqua
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
