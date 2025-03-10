import { z } from "zod";

// Simple user schema with core fields from the model
export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable().optional(),
    email: z.string().email(),
    image: z.string().nullable().optional(),
    role: z.string(),
    password: z.string().nullable().optional(),
});

export const safeUserSchema = userSchema.omit({password: true})

// Type definition derived from the schema
export type User = z.infer<typeof userSchema>;
export type SafeUser = z.infer<typeof safeUserSchema>;