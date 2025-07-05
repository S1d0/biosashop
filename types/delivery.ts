import { z } from "zod";

export const DeliveryName = z.enum(["standard", "express", "inpost"]);

export const deliveryOptionSchema = z.object({
    name: DeliveryName,
    price: z.number(),
    description: z.string(),
})

export type DeliveryOption = z.infer<typeof deliveryOptionSchema>;