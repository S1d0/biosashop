'use server'

import {SignInFormData, SignInFormState, SignInSchema} from "@/lib/actions/auth/types";
import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";


export async function signInAction(state: SignInFormState, formData: FormData) {
    const rawData: SignInFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    const validatedFormFields = SignInSchema.safeParse(rawData);
    const supabase = await createClient()

    if(validatedFormFields.error) {
        return {
            success: false,
            errors: validatedFormFields.error.flatten().fieldErrors,
            inputs: rawData
        } as SignInFormState
    }
    const { password, email } = validatedFormFields.data
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return {
            success: false,
            message: "Błędny email lub hasło"
        } 
    }

    redirect('/private')
}