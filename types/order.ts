
import { z } from "zod";

// OrderItem Zod schema
export const orderItemSchema = z.object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    orderId: z.string().uuid(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    quantity: z.number().int().positive(),
    totalPrice: z.number().int()
});

// For creating a new OrderItem (without id and orderId which will be generated)
export const createOrderItemSchema = orderItemSchema
    .omit({ id: true, orderId: true })
    .extend({
        productId: z.string().uuid(),
        name: z.string(),
        image: z.string(),
        price: z.number(),
        quantity: z.number().int().positive(),
        totalPrice: z.number().int()
    });

// Shipping address schema for JSON field
export const shippingAddressSchema = z.object({
    fullName: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string()
});

// Payment result schema for JSON field
export const paymentResultSchema = z.object({
    id: z.string(),
    status: z.string(),
    email_address: z.string().email().optional(),
    update_time: z.string().optional()
});

// Order Zod schema
export const orderSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid().optional(),
    shippingAddress: shippingAddressSchema.optional(),
    paymentMethod: z.string().optional(),
    paymentResult: paymentResultSchema.optional(),
    items: z.array(orderItemSchema),
    totalPrice: z.number().int(),
    shippingPrice: z.number().int().optional(),
    payed: z.boolean().default(false),
    payedAt: z.date().optional(), // Making optional with transform
    delivered: z.boolean().default(false),
    deliveredAt: z.date().optional(), // Making optional with transform
    createdAt: z.date(),
    updatedAt: z.date()
});

// For creating a new Order (without id which will be generated)
export const createOrderSchema = orderSchema
    .omit({
        id: true,
        payedAt: true,
        deliveredAt: true,
        createdAt: true,
        updatedAt: true,
        items: true
    })
    .extend({
        userId: z.string().uuid().optional(),
        shippingAddress: shippingAddressSchema.optional(),
        paymentMethod: z.string().optional(),
        totalPrice: z.number().int(),
        shippingPrice: z.number().int().optional()
    });

// For updating an Order's payment status
export const updateOrderPaymentSchema = z.object({
    payed: z.boolean(),
    payedAt: z.date(),
    paymentResult: paymentResultSchema
});

// For updating an Order's delivery status
export const updateOrderDeliverySchema = z.object({
    delivered: z.boolean(),
    deliveredAt: z.date()
});

// Type definitions based on the schemas
export type OrderItem = z.infer<typeof orderItemSchema>;
export type CreateOrderItem = z.infer<typeof createOrderItemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type PaymentResult = z.infer<typeof paymentResultSchema>;