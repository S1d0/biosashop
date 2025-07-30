"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Fish, Sparkles, ArrowRight, Shield, Clock } from "lucide-react"
import Link from "next/link";
import {Variants} from "motion";
import {CldImage} from "next-cloudinary";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            duration: 0.6,
        },
    },
} as Variants

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
} as Variants

export default function AquaProductPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-sky-50/50 to-cyan-50/30 dark:from-blue-950/20 dark:to-cyan-950/10">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center mb-4">
                                <Droplets className="h-8 w-8 text-blue-600 mr-3" />
                                <Badge
                                    variant="secondary"
                                    className="bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400"
                                >
                                    Rozwiązanie dla Wody
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-slate-600">Aqua Biosa</span>
                                <br />
                                <span className="text-2xl md:text-3xl text-muted-foreground font-normal">Czysta Woda Naturalnie</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                Zaawansowane rozwiązanie mikrobiologiczne do naturalnego oczyszczania wody. Przywróć równowagę
                                ekosystemom wodnym bez użycia chemikaliów.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="group bg-sky-200 hover:bg-sky-500">
                                    Zamów Teraz
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">

                                <CldImage
                                    src={"https://res.cloudinary.com/doxpruso9/image/upload/v1753854195/aqua1_anydf4.jpg"}
                                    alt="Aqua Biosa - Czysta woda z roślinami wodnymi"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />

                                {/* Animated water ripples */}
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
                            Dlaczego Aqua Biosa?
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Przełomowa technologia mikrobiologiczna do naturalnego oczyszczania i rewitalizacji systemów wodnych
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            {
                                icon: Sparkles,
                                title: "99% Czystości",
                                description: "Eliminuje zanieczyszczenia i toksyny",
                                color: "text-slate-600",
                                bgColor: "bg-slate-100 dark:bg-slate-900/30",
                            },
                            {
                                icon: Fish,
                                title: "Bezpieczne dla Życia",
                                description: "Nie szkodzi rybom ani roślinom wodnym",
                                color: "text-green-600",
                                bgColor: "bg-green-100 dark:bg-green-900/30",
                            },
                            {
                                icon: Clock,
                                title: "Szybkie Działanie",
                                description: "Efekty widoczne w 7-14 dni",
                                color: "text-purple-600",
                                bgColor: "bg-purple-100 dark:bg-purple-900/30",
                            },
                            {
                                icon: Shield,
                                title: "Bez Chemikaliów",
                                description: "100% naturalne składniki",
                                color: "text-emerald-600",
                                bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
                            },
                        ].map((feature, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <div
                                            className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                                        >
                                            <feature.icon className={`h-8 w-8 ${feature.color}`} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Applications Section */}
            <section className="py-20 bg-muted/30">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
                            Zastosowania Aqua Biosa
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                title: "Stawy i Jeziora",
                                description:
                                    "Oczyszcza naturalne zbiorniki wodne, eliminuje zakwity glonów i przywraca przejrzystość wody",
                                image: "https://res.cloudinary.com/doxpruso9/image/upload/v1753854387/aqua2_swqml8.jpg"
                            },
                            {
                                title: "Akwaria",
                                description: "Utrzymuje zdrowe środowisko dla ryb, redukuje potrzebę częstych wymian wody",
                                image: "https://res.cloudinary.com/doxpruso9/image/upload/v1753854934/fish_xdtbhu.jpg",
                            },
                            {
                                title: "Baseny Kąpielowe",
                                description: "Naturalna alternatywa dla chloru, bezpieczna dla skóry i oczu",
                                image: "https://res.cloudinary.com/doxpruso9/image/upload/v1753855379/swim2_iweymt.jpg",
                            },
                        ].map((application, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-48">
                                        <CldImage
                                            src={application.image}
                                            alt={application.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-semibold mb-3">{application.title}</h3>
                                        <p className="text-muted-foreground">{application.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-sky-700/50 to-sky-200/30 dark:from-blue-950/20 dark:to-cyan-950/10 text-white">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
                            Czas na Czystą Wodę!
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl mb-8 max-w-2xl mx-auto">
                            Przekonaj się, jak Aqua Biosa może zmienić jakość Twojej wody
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="group" asChild>
                                <Link href="/products">
                                    Zamów Aqua Biosa
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-slate-600 bg-transparent"
                                asChild
                            >
                                <Link href="/contact">
                                    Bezpłatna Konsultacja
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
