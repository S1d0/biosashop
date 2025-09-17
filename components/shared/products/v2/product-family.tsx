'use client'

import type { ProductFamily } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ChevronRight, Package } from "lucide-react"
import ProductVariant from "@/components/shared/products/v2/product-variant";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
};

export default function ProductFamilyPage({ family }: { family: ProductFamily }) {
    const sortedVariants = family.variants
        .sort((a, b) => a.price - b.price);
        
    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Enhanced Header */}
            <motion.div 
                variants={itemVariants}
                className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between bg-gradient-to-r from-primary/5 via-transparent to-primary/5 p-6 rounded-xl border border-primary/10"
            >
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-3xl font-bold text-primary">{family.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                        {family.description}
                    </p>
                    
                    {/* Price range */}
                    {sortedVariants.length > 1 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Cena od:</span>
                            <span className="font-bold text-primary text-base">
                                {(sortedVariants[0].price / 100).toFixed(2)} zł
                            </span>
                            <span>do</span>
                            <span className="font-bold text-primary text-base">
                                {(sortedVariants[sortedVariants.length - 1].price / 100).toFixed(2)} zł
                            </span>
                        </div>
                    )}
                </div>
                
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Button 
                        variant="outline" 
                        className="group w-full md:w-auto border-primary/20 hover:border-primary/40 hover:bg-primary/5 shadow-md" 
                        asChild
                    >
                        <Link href={`/products?filter=${family.id}`}>
                            Zobacz wszystkie produkty
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
            
            {/* Enhanced Product Grid */}
            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                {sortedVariants.map((variant, index) => (
                    <motion.div
                        key={variant.id}
                        variants={itemVariants}
                        custom={index}
                        className="h-full"
                    >
                        <ProductVariant variant={variant} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

