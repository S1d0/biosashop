import {z} from "zod";

const currency = z.number().int("Cena musi być integerem").nonnegative("Cena nie może być ujemna")

export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Produckt jest wymagany'),
    name: z.string().min(1, 'Nazwa jest wymagana'),
    quantity: z.number().int().gt(0, 'Ilość nie może być mniejsza niż zero'),
    image: z.string().min(1, 'Zdjęcie jest wymagane'),
    price: currency
})

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    sessionCartId: z.string().min(1, 'Session jest wymagane'),
    userId: z.string().optional().nullable()
})

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
