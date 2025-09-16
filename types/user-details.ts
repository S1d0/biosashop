import { z } from "zod";

export const userDetailsSchema = z.object({
    email: z.string(),
    customerId: z.string(),
})

export type UserDetails = z.infer<typeof userDetailsSchema>;