'use server'

import {SignInFormData, SignInFormState, SignInSchema} from "@/lib/actions/auth/types";
import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";

export async function signInAction(state: SignInFormState, formData: FormData): Promise<SignInFormState> {
    const supabase = await createClient()

    const rawData: SignInFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const validateFormFields = SignInSchema.safeParse(rawData)

    if (!validateFormFields.success) {
        const fieldErrors = validateFormFields.error.flatten().fieldErrors
        return {
            success: false,
            errors: {
                email: fieldErrors.email,
                password: fieldErrors.password,
            },
            inputs: rawData,
        }
    }

    const { email, password } = validateFormFields.data

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        let errorMessage = error.message

        // Handle common authentication errors with user-friendly messages
        if (error.message.includes("Invalid login credentials")) {
            errorMessage = "Nieprawidłowy email lub hasło. Sprawdź swoje dane i spróbuj ponownie."
        } else if (error.message.includes("Email not confirmed")) {
            errorMessage = "Twoje konto nie zostało jeszcze potwierdzone. Sprawdź swoją skrzynkę email."
        } else if (error.message.includes("Too many requests")) {
            errorMessage = "Zbyt wiele prób logowania. Spróbuj ponownie za kilka minut."
        } else if (error.message.includes("User not found")) {
            errorMessage = "Nie znaleziono konta z tym adresem email. Sprawdź email lub zarejestruj się."
        }

        return {
            success: false,
            errors: {
                _form: [errorMessage],
            },
            inputs: rawData,
        }
    }

    redirect("/moja-biosa")
}
