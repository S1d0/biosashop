"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Search, ChevronDown, HelpCircle, Mail, ArrowLeft} from "lucide-react"
import Link from "next/link";
import {Variants} from "motion";

interface FAQItem {
    id: string
    question: string
    answer: string
    category: string
}

const faqData: FAQItem[] = [
    {
        id: "1",
        question: "Jak mogę złożyć zamówienie?",
        answer:
            "Zamówienie możesz złożyć na kilka sposobów: przez naszą stronę internetową, telefonicznie pod numerem +48 123 456 789, lub wysyłając email na kontakt@firma.pl. Proces zamówienia online jest bardzo prosty - wystarczy wybrać produkty, dodać je do koszyka i przejść przez proces płatności.",
        category: "Zamówienia",
    },
    {
        id: "2",
        question: "Jakie są dostępne metody płatności?",
        answer:
            "Akceptujemy różne metody płatności: przelewy bankowe, płatności kartą (Visa, Mastercard), BLIK, PayPal oraz płatność za pobraniem. Wszystkie płatności online są zabezpieczone certyfikatem SSL.",
        category: "Płatności",
    },
    {
        id: "3",
        question: "Ile czasu trwa dostawa?",
        answer:
            "Standardowa dostawa trwa 2-3 dni robocze. Dostawa ekspresowa (następny dzień roboczy) jest dostępna za dodatkową opłatą. Wysyłamy zamówienia od poniedziałku do piątku. Otrzymasz numer śledzenia przesyłki na email.",
        category: "Dostawa",
    },
    {
        id: "4",
        question: "Czy mogę zwrócić produkt?",
        answer:
            "Tak, masz 14 dni na zwrot produktu bez podania przyczyny. Produkt musi być w stanie nienaruszonym, w oryginalnym opakowaniu. Koszty zwrotu pokrywa klient, chyba że produkt był uszkodzony lub niezgodny z zamówieniem.",
        category: "Zwroty",
    },
    {
        id: "5",
        question: "Jak sprawdzić status mojego zamówienia?",
        answer:
            "Status zamówienia możesz sprawdzić logując się na swoje konto na naszej stronie. Dodatkowo wysyłamy automatyczne powiadomienia email o każdej zmianie statusu zamówienia oraz numer do śledzenia przesyłki.",
        category: "Zamówienia",
    },
    {
        id: "6",
        question: "Czy oferujecie gwarancję na produkty?",
        answer:
            "Wszystkie nasze produkty objęte są 24-miesięczną gwarancją producenta. W przypadku produktów Terra i Aqua oferujemy dodatkowo 12 miesięcy rozszerzonej gwarancji. Szczegóły gwarancji znajdziesz w dokumentacji produktu.",
        category: "Gwarancja",
    },
    {
        id: "7",
        question: "Czy produkty są ekologiczne?",
        answer:
            "Tak! Wszystkie nasze produkty z kolekcji Terra są w 100% biodegradowalne i wykonane z materiałów odnawialnych. Produkty Aqua wykorzystują zaawansowane technologie oszczędzania wody. Posiadamy certyfikaty ekologiczne ISO 14001.",
        category: "Ekologia",
    },
    {
        id: "8",
        question: "Jak skontaktować się z obsługą klienta?",
        answer:
            "Obsługa klienta jest dostępna od poniedziałku do piątku w godzinach 9:00-17:00. Możesz skontaktować się z nami telefonicznie (+48 123 456 789), przez email (kontakt@firma.pl) lub chat na stronie internetowej.",
        category: "Kontakt",
    },
]

const categories = ["Wszystkie", "Zamówienia", "Płatności", "Dostawa", "Zwroty", "Gwarancja", "Ekologia", "Kontakt"]

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie")
    const [openItems, setOpenItems] = useState<string[]>([])

    const filteredFAQs = faqData.filter((item) => {
        const matchesSearch =
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "Wszystkie" || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const toggleItem = (id: string) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    } as Variants

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    } as Variants

    return (
        <main className="min-h-screen bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-background dark:via-card dark:to-background">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [-15, 15, -15],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                    className="absolute top-32 left-16 w-24 h-24 bg-primary/10 rounded-full"
                />
                <motion.div
                    animate={{
                        y: [20, -20, 20],
                        rotate: [0, -15, 15, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute top-64 right-24 w-16 h-16 bg-amber-300/20 dark:bg-amber-400/20 rounded-full"
                />
                <motion.div
                    animate={{
                        y: [-10, 10, -10],
                        x: [-5, 5, -5],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                    className="absolute bottom-32 left-1/3 w-20 h-20 bg-orange-300/15 dark:bg-orange-400/15 rounded-full"
                />
            </div>

            <div className="container mx-auto py-12 px-4 relative z-10">
                <div className="hidden md:block mb-6">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Wróć do sklepu
                    </Link>
                </div>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg"
                    >
                        <HelpCircle className="w-10 h-10 text-primary-foreground" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-amber-600 dark:from-primary dark:to-amber-300 bg-clip-text text-transparent mb-4">
                        Często zadawane pytania
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Znajdź odpowiedzi na najczęściej zadawane pytania. Jeśli nie znajdziesz tego czego szukasz, skontaktuj się z
                        nami!
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto mb-12">
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Szukaj w FAQ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-4 py-3 text-lg border-2 border-border focus:border-primary focus:ring-primary/20 rounded-xl"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full transition-all duration-200 ${
                                    selectedCategory === category
                                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                        : "hover:bg-primary/10 hover:border-primary"
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </motion.div>
                </motion.div>

                {/* FAQ Items */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
                    {filteredFAQs.length === 0 ? (
                        <motion.div variants={itemVariants} className="text-center py-12 bg-card rounded-2xl border border-border">
                            <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-card-foreground mb-2">Brak wyników</h3>
                            <p className="text-muted-foreground">
                                Nie znaleźliśmy FAQ pasujących do Twojego wyszukiwania. Spróbuj innych słów kluczowych.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFAQs.map((faq) => (
                                <motion.div
                                    key={faq.id}
                                    variants={itemVariants}
                                    className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <button
                                        onClick={() => toggleItem(faq.id)}
                                        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 rounded-xl transition-colors duration-200"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {faq.category}
                        </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-card-foreground pr-4">{faq.question}</h3>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex-shrink-0"
                                        >
                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openItems.includes(faq.id) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6">
                                                    <div className="pt-4 border-t border-border">
                                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="max-w-4xl mx-auto mt-16"
                >
                    <div className="bg-gradient-to-r from-primary to-amber-600 dark:from-primary dark:to-amber-400 rounded-2xl p-8 text-center text-primary-foreground shadow-xl">
                        <h3 className="text-2xl font-bold mb-4">Nie znalazłeś odpowiedzi?</h3>
                        <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                            Nasz zespół obsługi klienta jest gotowy, aby Ci pomóc. Skontaktuj się z nami w dogodny dla Ciebie sposób.
                        </p>

                        <div className="max-w-2xl mx-auto">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="secondary"
                                    className="w-full bg-background/20 hover:bg-background/30 text-primary-foreground border-0 backdrop-blur-sm"
                                >
                                    <Link href="/contact">
                                        <div className={"flex items-center gap-2"}>
                                            <Mail className="w-4 h-4 mr-2" />
                                            <p>Napisz lub zadzwonń</p>
                                        </div>
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
