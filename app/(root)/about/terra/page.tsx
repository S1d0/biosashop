"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, TrendingUp, Shield, Clock, CheckCircle, ArrowRight, Beaker, Sprout, Globe } from "lucide-react"
import {Variants} from "motion";
import Link from "next/link";
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
} as Variants;

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

export default function TerraProductPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-reen-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center mb-4">
                                <Leaf className="h-8 w-8 text-green-600 mr-3" />
                                <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                >
                                    Rozwiązanie dla Gleby
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                <span className="text-emerald-800/75">Terra Biosa</span>
                                <br />
                                <span className="text-2xl md:text-3xl text-muted-foreground font-normal">Przyszłość Uprawy Gleby</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                Rewolucyjne rozwiązanie mikrobiologiczne, które przekształca każdy teren w żyzny, produktywny ekosystem.
                                Wykorzystaj moc natury do osiągnięcia wyjątkowych rezultatów.
                            </p>
                                <Button size="lg" className="group" asChild>
                                    <Link href='/products'>
                                        Zamów Teraz
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <CldImage
                                    src={"https://res.cloudinary.com/doxpruso9/image/upload/v1753853745/soil2_yiif1q.jpg"}
                                    alt="Terra Biosa - Zdrowa gleba z rosnącymi roślinami"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
                            Dlaczego Terra Biosa?
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Nasze zaawansowane rozwiązanie mikrobiologiczne oferuje kompleksowe podejście do regeneracji gleby
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
                                icon: TrendingUp,
                                title: "Zwiększa Żyzność",
                                description: "Do 300% wzrost produktywności gleby",
                                color: "text-emerald-600",
                                bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
                            },
                            {
                                icon: Shield,
                                title: "Naturalna Ochrona",
                                description: "Eliminuje potrzebę chemicznych nawozów",
                                color: "text-blue-600",
                                bgColor: "bg-blue-100 dark:bg-blue-900/30",
                            },
                            {
                                icon: Clock,
                                title: "Długotrwały Efekt",
                                description: "Działanie do 12 miesięcy",
                                color: "text-purple-600",
                                bgColor: "bg-purple-100 dark:bg-purple-900/30",
                            },
                            {
                                icon: Globe,
                                title: "Eco-Friendly",
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

            {/* Detailed Benefits */}
            <section className="py-20 bg-muted/30">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={itemVariants}>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Kompleksowe Korzyści</h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Beaker,
                                        title: "Zaawansowana Mikrobiologia",
                                        description:
                                            "Zawiera ponad 80 gatunków korzystnych mikroorganizmów, które naturalnie wzbogacają glebę",
                                    },
                                    {
                                        icon: Sprout,
                                        title: "Szybkie Rezultaty",
                                        description: "Pierwsze efekty widoczne już po 2-3 tygodniach od zastosowania",
                                    },
                                    {
                                        icon: CheckCircle,
                                        title: "Uniwersalne Zastosowanie",
                                        description: "Idealne dla rolnictwa, ogrodnictwa, rekultywacji terenów i upraw domowych",
                                    },
                                ].map((benefit, index) => (
                                    <motion.div key={index} variants={itemVariants} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                            <benefit.icon className="h-6 w-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                                            <p className="text-muted-foreground">{benefit.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                                <CldImage
                                    src={"https://res.cloudinary.com/doxpruso9/image/upload/v1753853307/soil_bfbbyd.jpg"}
                                    alt={"Mikroorganizmy dla gleby"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-800/75 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-950/10 text-white">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
                            Gotowy na Rewolucję w Uprawie?
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl mb-8 max-w-2xl mx-auto">
                            Dołącz do tysięcy zadowolonych klientów, którzy już odkryli moc Terra Biosa
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="group" asChild>
                                <Link href='/products'>
                                    Zamów Terra Biosa
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-emerald-600 bg-transparent"
                                asChild
                            >
                                <Link href='/contact'>
                                    Skontaktuj się z Ekspertem
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
