"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, TrendingUp, Shield, Clock } from "lucide-react"
import Image from "next/image"
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
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
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

export default function TerraSection() {
    return (
        <section id="terra" className="py-20 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10" />

            <div className="container px-4 md:px-6 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 md:order-1">
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center mb-4">
                                <Leaf className="h-8 w-8 text-primary mr-3" />
                                <span className="text-sm font-medium text-primary uppercase tracking-wider">Rozwiązanie dla Gleby</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                <span className="text-primary">Microbiosa Terra</span>
                                <br />
                                <span className="text-2xl md:text-3xl text-muted-foreground font-normal">
                  Rewolucja w Uprawie Gleby
                </span>
                            </h2>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Nasze przełomowe rozwiązanie wzbogacające glebę przekształca każdy teren w kwitnący ekosystem. Wypełnione
                            korzystnymi mikroorganizmami, Microbiosa Terra rewitalizuje wyczerpaną glebę, zwiększa dostępność
                            składników odżywczych i wspiera silny wzrost roślin.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Kluczowe Korzyści:</h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: TrendingUp,
                                        title: "Zwiększa strukturę i żyzność gleby",
                                        description: "Poprawia retencję wody i przepuszczalność powietrza",
                                    },
                                    {
                                        icon: Shield,
                                        title: "Zmniejsza potrzebę nawozów chemicznych",
                                        description: "Do 60% redukcja stosowania sztucznych dodatków",
                                    },
                                    {
                                        icon: Leaf,
                                        title: "Wspiera zrównoważone rolnictwo",
                                        description: "Naturalne podejście do uprawy bez szkody dla środowiska",
                                    },
                                    {
                                        icon: Clock,
                                        title: "Długotrwałe działanie",
                                        description: "Efekty widoczne do 12 miesięcy po zastosowaniu",
                                    },
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <benefit.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <span className="font-medium text-foreground block">{benefit.title}</span>
                                            <span className="text-sm text-muted-foreground">{benefit.description}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
                            {[
                                { value: "60%", label: "Mniej nawozów" },
                                { value: "12", label: "Miesięcy działania" },
                                { value: "100%", label: "Naturalne" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={statsVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-4 bg-card/50 rounded-lg border border-border/50"
                                >
                                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button size="lg" className="group" asChild>
                                <Link href="/about/terra">
                                    Poznaj Terra
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="relative order-1 md:order-2">
                        <motion.div
                            whileHover={{ scale: 1.02, rotateY: 5 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative h-[500px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                        >
                            <Image
                                src="/terra-land.jpg"
                                // src="/placeholder.svg?height=800&width=600"
                                alt="Microbiosa Terra - Wzbogacanie gleby"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                            {/* Floating elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                className="absolute top-6 right-6 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-2 rounded-full text-sm font-medium"
                            >
                                Eco-Friendly
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-full text-sm font-medium border border-border/50"
                            >
                                Naturalne Składniki
                            </motion.div>
                        </motion.div>

                        {/* Decorative elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="absolute -top-4 -left-4 w-8 h-8 border-2 border-primary/30 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="absolute -bottom-4 -right-4 w-12 h-12 border-2 border-primary/20 rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
