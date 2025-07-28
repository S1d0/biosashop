"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialsPageProps {
    className?: string
}

export default function TestimonialsPage({ className }: TestimonialsPageProps) {
    const testimonials = [
        {
            name: "Jan Kowalski",
            role: "Rolnik",
            content: "Microbiosa Terra całkowicie zmieniła jakość mojej gleby. Plony wzrosły o 40%!",
            rating: 5,
        },
        {
            name: "Anna Nowak",
            role: "Właścicielka stawu",
            content: "Dzięki Microbiosa Aqua mój staw jest krystalicznie czysty przez cały rok.",
            rating: 5,
        },
        {
            name: "Piotr Wiśniewski",
            role: "Ogrodnik",
            content: "Naturalne rozwiązanie, które naprawdę działa. Polecam każdemu!",
            rating: 5,
        },
    ]

    return (
        <section className={className}>
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Co Mówią Nasi <span className="text-primary">Klienci</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
