import { z } from 'zod'
import {insertProductFamilySchema, insertProductVariantSchema} from "@/lib/validators";

export type ProductVariant = z.infer<typeof insertProductVariantSchema> & {
    id: string;
    createdAt: Date;
    familyId: string;
}

export type ProductFamily = z.infer<typeof insertProductFamilySchema> & {
    id: string;
    createdAt: Date;
    variants: ProductVariant[];
}

export const viewModeEnum = {
    LIST: "list",
    GRID: "grid"
}
