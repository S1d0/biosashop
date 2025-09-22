'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProductVariant, ProductFamily } from '@/types/product'
import ProductDisplay from '@/components/shared/products/product-display'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Leaf, Droplets, Package, X } from 'lucide-react'

interface ProductsClientProps {
    products: ProductVariant[]
    families: ProductFamily[]
    initialFilter?: string
}

export default function ProductsClient({ products, families, initialFilter }: ProductsClientProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedFilter, setSelectedFilter] = useState<string | null>(initialFilter || null)

    // Update filter when URL changes
    useEffect(() => {
        const filter = searchParams.get('filter')
        setSelectedFilter(filter)
    }, [searchParams])

    // Filter products based on selected family
    const filteredProducts = useMemo(() => {
        if (!selectedFilter) return products
        
        // Find the family by name or slug
        const family = families.find(f => 
            f.name.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            f.slug === selectedFilter ||
            f.id === selectedFilter
        )
        
        if (!family) return products
        
        return products.filter(product => product.familyId === family.id)
    }, [products, families, selectedFilter])

    // Get filter statistics
    const filterStats = useMemo(() => {
        const terraFamily = families.find(f => f.name.toLowerCase().includes('terra'))
        const aquaFamily = families.find(f => f.name.toLowerCase().includes('aqua'))
        
        const terraCount = terraFamily ? products.filter(p => p.familyId === terraFamily.id).length : 0
        const aquaCount = aquaFamily ? products.filter(p => p.familyId === aquaFamily.id).length : 0
        
        return { terraCount, aquaCount, terraFamily, aquaFamily }
    }, [products, families])

    // Update URL when filter changes
    const updateFilter = (filter: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        
        if (filter) {
            params.set('filter', filter)
        } else {
            params.delete('filter')
        }
        
        router.push(`/products?${params.toString()}`, { scroll: false })
    }

    // Get main title based on filter
    const getTitle = () => {
        if (!selectedFilter) return "Wszystkie Produkty"
        
        const family = families.find(f => 
            f.name.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            f.slug === selectedFilter ||
            f.id === selectedFilter
        )
        
        if (family?.name.toLowerCase().includes('terra')) return "Produkty Terra"
        if (family?.name.toLowerCase().includes('aqua')) return "Produkty Aqua"
        
        return family?.name || "Produkty"
    }

    // Get description based on filter
    const getDescription = () => {
        if (!selectedFilter) return null
        
        const family = families.find(f => 
            f.name.toLowerCase().includes(selectedFilter.toLowerCase()) ||
            f.slug === selectedFilter ||
            f.id === selectedFilter
        )
        
        if (family?.name.toLowerCase().includes('terra')) {
            return "Naturalne rozwiązania dla gleby i upraw - wzbogać swoją glebę mikroorganizmami"
        }
        if (family?.name.toLowerCase().includes('aqua')) {
            return "Oczyszczanie wody bez chemikaliów - przywróć naturalną równowagę ekosystemom wodnym"
        }
        
        return family?.description
    }

    return (
        <div className="space-y-8">
            {/* Filter Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-white/10"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Filtruj produkty</h3>
                        <p className="text-sm text-muted-foreground">Wybierz rodzinę produktów, aby zawęzić wyniki</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {/* All Products Button */}
                        <Button
                            variant={!selectedFilter ? "default" : "outline"}
                            onClick={() => updateFilter(null)}
                            className="group"
                        >
                            <Package className="w-4 h-4 mr-2" />
                            Wszystkie ({products.length})
                        </Button>
                        
                        {/* Terra Filter */}
                        {filterStats.terraFamily && (
                            <Button
                                variant={selectedFilter && filterStats.terraFamily.name.toLowerCase().includes(selectedFilter.toLowerCase()) ? "default" : "outline"}
                                onClick={() => updateFilter(filterStats.terraFamily!.id)}
                                className="group"
                            >
                                <Leaf className="w-4 h-4 mr-2 text-green-600" />
                                Terra ({filterStats.terraCount})
                            </Button>
                        )}
                        
                        {/* Aqua Filter */}
                        {filterStats.aquaFamily && (
                            <Button
                                variant={selectedFilter && filterStats.aquaFamily.name.toLowerCase().includes(selectedFilter.toLowerCase()) ? "default" : "outline"}
                                onClick={() => updateFilter(filterStats.aquaFamily!.id)}
                                className="group"
                            >
                                <Droplets className="w-4 h-4 mr-2 text-blue-600" />
                                Aqua ({filterStats.aquaCount})
                            </Button>
                        )}
                    </div>
                </div>
                
                {/* Active Filter Display */}
                {selectedFilter && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex items-center gap-2"
                    >
                        <span className="text-sm text-muted-foreground">Aktywny filtr:</span>
                        <Badge variant="secondary" className="gap-2">
                            {filterStats.terraFamily && selectedFilter && filterStats.terraFamily.name.toLowerCase().includes(selectedFilter.toLowerCase()) && <Leaf className="w-3 h-3 text-green-600" />}
                            {filterStats.aquaFamily && selectedFilter && filterStats.aquaFamily.name.toLowerCase().includes(selectedFilter.toLowerCase()) && <Droplets className="w-3 h-3 text-blue-600" />}
                            {getTitle()}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => updateFilter(null)}
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </Badge>
                    </motion.div>
                )}
            </motion.div>

            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter">{getTitle()}</h1>
                    {getDescription() && (
                        <p className="text-muted-foreground mt-2 max-w-2xl">{getDescription()}</p>
                    )}
                    <p className="text-muted-foreground mt-1">
                        Znaleziono {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : filteredProducts.length < 5 ? 'produkty' : 'produktów'}
                    </p>
                </div>
            </motion.div>

            {/* Products Display */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <ProductDisplay products={filteredProducts} />
            </motion.div>
        </div>
    )
}
