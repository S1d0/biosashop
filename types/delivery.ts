import { z } from "zod";

export const DeliveryMethod= z.enum(["standard", "express", "parcel_locker", "pickup", "company"]);

export const deliveryOptionSchema = z.object({
    method: DeliveryMethod.default("standard"),
    name: z.string(),
    price: z.number(),
    description: z.string(),
})

export type DeliveryOption = z.infer<typeof deliveryOptionSchema>;
export type DeliveryMethod = z.infer<typeof DeliveryMethod>;