import {z} from 'zod'

// Define the sign-in form schema
export const SignInSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// Define the sign-in form state type
export type SignInFormState = {
    errors?: {
        email?: string[]
        password?: string[]
        _form?: string[]
    }
    success?: boolean
    message?: string
}
