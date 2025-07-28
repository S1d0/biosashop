"use client"

import { motion } from "framer-motion"
import { EnquiryForm } from "@/components/shared/contact/contact-form"
import { Mail, Phone, MapPin, Clock, Send, Copy, Check } from "lucide-react"
import { useState } from "react"
import {Variants} from "motion";
import Link from "next/link";

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

const floatingVariants = {
    animate: {
        y: [-10, 10, -10],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
        },
    },
} as Variants

export default function Contact() {
    const [copiedItem, setCopiedItem] = useState<string | null>(null)

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedItem(type)
            setTimeout(() => setCopiedItem(null), 2000)
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-amber-50 via-background to-orange-50 dark:from-background dark:via-card dark:to-background relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: "2s" }}
                    className="absolute top-40 right-20 w-16 h-16 bg-amber-300/20 dark:bg-amber-400/20 rounded-full"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: "4s" }}
                    className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-300/20 dark:bg-orange-400/20 rounded-full"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: "1s" }}
                    className="absolute bottom-40 right-10 w-24 h-24 bg-yellow-300/20 dark:bg-yellow-400/20 rounded-full"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto py-12 px-4 relative z-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6 shadow-lg"
                    >
                        <Send className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-amber-600 dark:from-primary dark:to-amber-300 bg-clip-text text-transparent mb-4">
                        Skontaktuj się z nami
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Masz pytania? Chcesz dowiedzieć się więcej? Jesteśmy tutaj, aby Ci pomóc!
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground">Email</h3>
                                        <p className="text-muted-foreground">kontakt@firma.pl</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => copyToClipboard("kontakt@firma.pl", "email")}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg hover:bg-primary/10"
                                    title="Kopiuj email"
                                >
                                    {copiedItem === "email" ? (
                                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-primary" />
                                    )}
                                </motion.button>
                            </div>
                            {copiedItem === "email" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-sm text-green-600 dark:text-green-400 font-medium"
                                >
                                    ✓ Email skopiowany!
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-green-500/10 dark:bg-green-400/10 rounded-lg flex items-center justify-center mr-4">
                                        <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-card-foreground">Telefon</h3>
                                        <p className="text-muted-foreground">+48 123 456 789</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => copyToClipboard("+48 123 456 789", "phone")}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg hover:bg-green-500/10 dark:hover:bg-green-400/10"
                                    title="Kopiuj numer telefonu"
                                >
                                    {copiedItem === "phone" ? (
                                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    )}
                                </motion.button>
                            </div>
                            {copiedItem === "phone" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-sm text-green-600 dark:text-green-400 font-medium"
                                >
                                    ✓ Numer telefonu skopiowany!
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-500/10 dark:bg-purple-400/10 rounded-lg flex items-center justify-center mr-4">
                                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-card-foreground">Adres</h3>
                                    <p className="text-muted-foreground">
                                        ul. Przykładowa 123
                                        <br />
                                        00-000 Warszawa
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-orange-500/10 dark:bg-orange-400/10 rounded-lg flex items-center justify-center mr-4">
                                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-card-foreground">Godziny pracy</h3>
                                    <p className="text-muted-foreground">
                                        Pn-Pt: 9:00 - 17:00
                                        <br />
                                        Sb: 10:00 - 14:00
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-card p-8 rounded-2xl shadow-xl border border-border relative overflow-hidden"
                        >
                            {/* Decorative gradient */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-orange-500"></div>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-card-foreground mb-2">Wyślij nam wiadomość</h2>
                                <p className="text-muted-foreground">
                                    Wypełnij formularz poniżej, a skontaktujemy się z Tobą jak najszybciej.
                                </p>
                            </div>

                            <EnquiryForm />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Additional Info Section */}
                <motion.div variants={itemVariants} className="mt-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-gradient-to-r from-primary to-amber-600 dark:from-primary dark:to-amber-400 rounded-2xl p-8 text-primary-foreground shadow-xl"
                    >
                        <h3 className="text-2xl font-bold mb-4">Potrzebujesz szybkiej odpowiedzi?</h3>
                        <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
                            Sprawdź naszą sekcję FAQ lub skontaktuj się z nami bezpośrednio przez telefon w godzinach pracy.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors duration-200 shadow-lg"
                        >
                            <Link href="/faq">
                                Zobacz FAQ
                            </Link>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    )
}
