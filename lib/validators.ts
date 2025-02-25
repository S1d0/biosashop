import { z } from 'zod';

export const insertProductSchema = z.object({
    name: z.string().min(2, 'Nazwa musi zawierać co najmniej 3 znaki'),
    slug : z.string().min(2, 'Slug musi zawierać co najmniej 3 znaki'),
    category: z.string().min(2, "Kategoria musi zawierać co najmniej 3 znaki"),
    brand: z.string(),
    description: z.string(),
    stock: z.number().nonnegative("Ilość produktów nie może być mniejsza niż -1"),
    price: z.coerce.number().nonnegative("Cena nie może być mniejsza niż -1"),
    images: z.array(z.string()).min(0, "Produkt musi mieć co najmniej jedno zdjęcie"),
    isFeatured: z.boolean(),
    favourite: z.boolean(),
    banner: z.string()
})
