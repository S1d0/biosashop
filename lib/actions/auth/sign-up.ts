'use server'

import {SignUpFormData, SignUpFormState, SignUpSchema} from "@/lib/actions/auth/types";
import {createClient} from "@/supabase/server";


export async function signUpAction(signUpFormState: SignUpFormState, formData: FormData) {
    // 1. Validate fields
    const rawData: SignUpFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    const validationResult = SignUpSchema.safeParse(rawData)

    if (!validationResult.success) {
        return {
            success: false,
            errors: validationResult.error.flatten().fieldErrors,
            inputs: rawData
        } as SignUpFormState
    }

    // 2. Signup user
    const {email, password} = validationResult.data;

    const supabase = await createClient()
    const {error} = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) {
        return {
            success: false,
            message: "Nieudana rejestracja, spróbuj później"
        }
    }

    return {
        success: true,
        message: `Super! Konto dla ${email} zostało utworzone.`,
        inputs: rawData
    } as SignUpFormState
}