import { z } from "zod";

// Shipping address schema for JSON field
export const shippingAddressSchema = z.object({
    fullName: z
        .string()
        .min(2, "Imię i nazwisko musi mieć co najmniej 2 znaki")
        .max(100, "Imię i nazwisko nie może być dłuższe niż 100 znaków"),
    email: z.string().email("Nieprawidłowy format adresu email").min(1, "Email jest wymagany"),
    address: z
        .string()
        .min(5, "Adres musi mieć co najmniej 5 znaków")
        .max(200, "Adres nie może być dłuższy niż 200 znaków"),
    city: z
        .string()
        .min(2, "Miasto musi mieć co najmniej 2 znaki")
        .max(100, "Miasto nie może być dłuższe niż 100 znaków"),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie XX-XXX (np. 00-000)"),
    phone: z
        .string()
        .regex(/^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/, "Nieprawidłowy numer telefonu. Użyj formatu: 123 456 789 lub +48 123 456 789"),
});

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
