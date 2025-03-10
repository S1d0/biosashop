'use server'

import {prisma} from "@/db/db";
import {signIn} from "@/auth";
import {signUpFormSchema, SignUpFormState} from "@/types/auth/signup";
import {hashPassword} from "@/lib/actions/auth/hasher";

export async function signUpAction(state:SignUpFormState, formData: FormData): Promise<SignUpFormState> {

    // 1. Validate fields
    const validationResult  = signUpFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if(!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }
    const {name, email, password} = validationResult.data;

    // 2. Create user
    const hashedPassword = await hashPassword(password)
    const data = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                role: 'user'
            }
    })

    console.log("User created successfully. Password: {}, hashedPassword: {}", password, hashedPassword)

    // signIn and get session
    await signIn("credentials", {
        email: data.email,
        password: password
    })

    return {
        message: "User registered successfully",
    }
}