import { z } from "zod";
import {shippingAddressSchema} from "@/types/address";
import {DeliveryMethod} from "@/types/delivery";

// Schema to transform String date retrieve from DB using Prisma
export const dateSchema = z.union([
    z.date(),
    z.string().transform((str) => new Date(str))
]);

// OrderItem Zod schema
export const orderItemSchema = z.object({
    productId: z.string().uuid(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    quantity: z.number().int().positive(),
    totalPrice: z.number().int()
});

export const parcelLockerSchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
})

// Delivery method information for JSON field in prisma Order model
export const deliveryInfoSchema = z.object({
    method: DeliveryMethod.default("standard"),
    price: z.number().int().positive(), // Price in cents
    notes: z.string().optional(),
    parcelLocker: parcelLockerSchema.optional().nullable(),
    estimatedDeliveryDate: dateSchema.optional().nullable(),
    trackingNumber: z.string().optional().nullable(),
    carrier: z.string().optional().nullable(),
    delivered: z.boolean().default(false),
    deliveredAt: dateSchema.optional().nullable()
})

export const createDeliveryInfoSchema = deliveryInfoSchema.omit({
    delivered: true,
    deliveredAt: true,
    trackingNumber: true,
}).extend({
    parcelLocker: parcelLockerSchema.optional().nullable()
})
export const paymentMethodDetailsSchema = z
    .object({
        type: z.string(), // e.g., card, blik
        last4: z.string().optional(), // Last 4 digits of card
        brand: z.string().optional(), // e.g., visa, mastercard
    })

export const paymentInfoSchema = z.object({
    status: z.enum(["pending", "processing", "succeeded", "failed", "canceled", "requires_action"]),
    amount: z.number().int().positive(),
    currency: z.string().default("pln"),
    paymentIntentId: z.string().optional(),
    sessionId: z.string().optional(),
    paymentMethodDetails: paymentMethodDetailsSchema.nullable(),
    failureReason: z.string().optional(),
    receiptUrl: z.string().url().nullable(),
    payed: z.boolean().default(false),
    payedAt: dateSchema.nullable(),
    createdAt: dateSchema.nullable(),
    updatedAt: dateSchema.nullable(),
})

// Order Zod schema
export const orderSchema = z.object({
    id: z.string().uuid(),
    status: z.enum(["pending", "paid", "shipped", "delivered", "cancelled"]).default("pending"),
    userId: z.string().uuid().optional().nullable(),
    shippingAddress: shippingAddressSchema.optional().nullable(),
    items: z.array(orderItemSchema),
    totalPrice: z.number().int(),

    // Structured information
    deliveryInfo: deliveryInfoSchema.nullable(),
    paymentInfo: paymentInfoSchema.nullable(),

    createdAt: z.date(),
    updatedAt: z.date()
});

// For creating a new Order (without id which will be generated)
export const createOrderSchema = orderSchema
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    })
    .extend({
        userId: z.string().uuid().optional(),
        shippingAddress: shippingAddressSchema.optional(),
        totalPrice: z.number().int(),
        items: z.array(orderItemSchema),
        deliveryInfo: deliveryInfoSchema.optional(),
        paymentInfo: paymentInfoSchema.optional(),
    });

// Type definitions based on the schemas
export type OrderItem = z.infer<typeof orderItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type PaymentInfo = z.infer<typeof paymentInfoSchema>;

export type CreateDeliveryInfo = z.infer<typeof createDeliveryInfoSchema>
export type ParcelLocker = z.infer<typeof parcelLockerSchema>;
export type DeliveryInfo = z.infer<typeof deliveryInfoSchema>;


// Order Summary type for payment verification results
export type OrderSummary = {
    success: boolean
    paymentStatus?: string
    customerEmail?: string
    order?: Order
    error?: PaymentError
}

// Error type for payment verification errors
export type PaymentError = {
    error: string
    details?: string
}

export type PaymentMethodDetails = z.infer<typeof paymentMethodDetailsSchema>
