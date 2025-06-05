import { z } from 'zod';

export const insertProductFamilySchema = z.object({
    name: z.string().min(2, 'Nazwa musi zawierać co najmniej 3 znaki'),
    category: z.string().min(2, "Kategoria musi zawierać co najmniej 3 znaki"),
    description: z.string().min(10, "Opis musi zawierac co najmniej 10 znaków"),
    slug: z.string().min(3, 'Slug musi zawierać co najmniej 3 znaki'),
    image: z.string().min(10,"Zdjęcie musi wskazywać na element w folderze /products")
})

export const insertProductVariantSchema = z.object({
    name: z.string().min(2, 'Nazwa musi zawierać co najmniej 3 znaki'),
    features: z.array(z.string()).min(1, "Kategoria musi zawierać co najmniej 3 znaki"),
    description: z.string().min(10, "Opis musi zawierac co najmniej 10 znaków"),
    images: z.array(z.string()).min(1, "Wariant produktu musi mieć co najmniej jedno zdjęcie"),
    price: z.coerce.number().nonnegative("Cena nie może być mniejsza niż -1"),
    sku: z.string(),
    slug: z.string().min(3, 'Slug musi zawierać co najmniej 3 znaki'),
    stock: z.number().nonnegative("Ilość produktów nie może być mniejsza niż -1"),
    size: z.string().min(2, 'Rozmiar musi zawierać co najmniej 2 znaki'),
    cldImage: z.string().regex(/^https:\/\/res\.cloudinary\.com\//, "Must be a valid cloudinary address")
})

export const EnquiryStatus = z.enum(["PENDING", "IN_PROGRESS", "RESPONDED", "RESOLVED", "SPAM"]);
export const insertCustomerEnquirySchema = z.object({
    name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
    email: z.string().nonempty('Email nie może być pusty'),
    message: z.string().nonempty('Wiadomość nie może być pusta'),
    phone: z.string().min(9, 'Numer telefonu nie może być pusty'),
    status: z.optional(EnquiryStatus),
})