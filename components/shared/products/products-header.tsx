'use client'

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Grid2X2, List } from "lucide-react";

interface ProductsHeaderProps {
    title: string;
    productsCount: number;
    viewMode?: 'grid' | 'list';
    onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export default function ProductsHeader({
                                           title,
                                           productsCount,
                                           viewMode = 'grid',
                                           onViewModeChange
                                       }: ProductsHeaderProps) {

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tighter">{title}</h1>
                <p className="text-muted-foreground mt-1">
                    Znaleziono {productsCount} {productsCount === 1 ? 'produkt' : productsCount < 5 ? 'produkty' : 'produktów'}
                </p>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-md">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="icon"
                        className="rounded-r-none"
                        onClick={() => {
                            if (onViewModeChange) {
                                onViewModeChange('grid');
                            }
                        }}
                    >
                        <Grid2X2 className="h-4 w-4" />
                        <span className="sr-only">Widok siatki</span>
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="icon"
                        className="rounded-l-none"
                        onClick={() => {
                            if (onViewModeChange) {
                                onViewModeChange('list');
                            }
                        }}
                    >
                        <List className="h-4 w-4" />
                        <span className="sr-only">Widok listy</span>
                    </Button>
                </div>

                <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sortuj według" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Najnowsze</SelectItem>
                        <SelectItem value="price-low">Cena: rosnąco</SelectItem>
                        <SelectItem value="price-high">Cena: malejąco</SelectItem>
                        <SelectItem value="name-asc">Nazwa: A-Z</SelectItem>
                        <SelectItem value="name-desc">Nazwa: Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}