"use client"

import  { Truck } from "lucide-react"
import { motion } from "framer-motion";

export default function CheckoutSummarySkeleton() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-50 dark:bg-slate-900 overflow-hidden">
            <div className="relative w-64 h-32">
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ x: "-150%" }}
                    animate={{ x: "150%" }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="relative"
                    >
                        <Truck className="w-24 h-24 text-slate-800 dark:text-slate-200" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>
                {/* Road */}
                <div className="absolute bottom-6 w-full h-0.5 bg-slate-400 dark:bg-slate-600" />
            </div>
            <motion.p
                className="mt-4 text-xl font-semibold text-slate-700 dark:text-slate-300"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
                Twoje zamówienie jest w drodze!
            </motion.p>
            <p className="text-sm text-slate-500 dark:text-slate-400">(A przynajmniej podsumowanie zamówienia.)</p>
        </div>
    );

}