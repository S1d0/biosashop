"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Award, Globe } from "lucide-react"

export default function AboutPage() {
    const stats = [
        { icon: Users, value: "10,000+", label: "Zadowolonych Klientów" },
        { icon: Leaf, value: "50,000+", label: "Hektarów Odnowionych" },
        { icon: Award, value: "15+", label: "Lat Doświadczenia" },
        { icon: Globe, value: "25+", label: "Krajów" },
    ]

    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        O <span className="text-primary">Microbiosa</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Jesteśmy pionierami w dziedzinie ekologicznych rozwiązań biotechnologicznych. Nasze produkty pomagają
                        przywrócić naturalną równowagę w środowisku.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
