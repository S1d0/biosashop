import {z} from 'zod'

export type SignInFormData = {
    email: string,
    password: string
}

export type SignWithMagicLinkData = {
    email: string,
}

export const SignWithMagicLinkSchema = z.object({
    email: z.string().email({ message: "Podaj poprawny adres email"})
})

// Define the sign-in form schema
export const SignInSchema = z.object({
    email: z.string().email({ message: "Podaj poprawny adres email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

// Define the sign-in form state type
export type SignInFormState = {
    errors?: {
        email?: string[]
        password?: string[]
        _form?: string[]
    }
    inputs?: SignInFormData
    success?: boolean
    message?: string
}

export type SignWithMagicLinkState = {
    errors?: {
        email?: string[]
        _form?: string[]
    }
    inputs?: SignWithMagicLinkData
    success?: boolean
    message?: string
}
// Define the sign-in form schema
export const SignUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid [email] address" }),
    password: z
        .string()
        .min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' })
        .regex(/[a-zA-Z]/, { message: 'Hasło musi posiadać co najmniej jedną literę.' })
        .regex(/[0-9]/, { message: 'Hasło musi posiadać co najmniej jedną cyfrę.'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Hasło musi posiadać co najmniej jeden znak specjalny',
        })
        .trim(),})

// Define the sign-in form state type
export type SignUpFormState = {
    errors?: {
        email?: string[]
        password?: string[]
        _form?: string[]
    },
    inputs?: SignUpFormData
    success?: boolean
    message?: string
}

export type SignUpFormData = {
    email: string,
    password: string
}