import {z} from "zod";

export const signUpFormSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters").trim(),
        email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
    })

// Type for the sign-up form data
export type SignUpFormData = z.infer<typeof signUpFormSchema>

export type SignUpFormState = {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        _form?: string[]
    }
    message?: string
}

