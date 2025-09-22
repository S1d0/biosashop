'use server'

import {createClient} from "@/supabase/server";
import {SignWithMagicLinkData, SignWithMagicLinkSchema, SignWithMagicLinkState} from "@/lib/actions/auth/types";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function signWithMagicLink(state: SignWithMagicLinkState, formData: FormData) {
    try {
        // Get origin and email in parallel
        const [headerResult, emailValue] = await Promise.all([
            headers().then(h => h.get('origin')),
            Promise.resolve(formData.get('email') as string)
        ])
        
        const origin = headerResult
        const rawEmail: SignWithMagicLinkData = { email: emailValue }
        
        // Validate input first before creating client
        const validateFormFields = SignWithMagicLinkSchema.safeParse(rawEmail)
        if (!validateFormFields.success) {
            return {
                success: false,
                errors: validateFormFields.error.flatten().fieldErrors,
                inputs: rawEmail
            } as SignWithMagicLinkState
        }

        // Create client and send magic link
        const supabase = await createClient()
        const email = validateFormFields.data.email
        
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: `${origin}/oauth/confirm`
            }
        })

        if (error) {
            console.error('Magic link error:', error.message)
            return {
                success: false,
                errors: { _form: ['Failed to send magic link. Please try again.'] },
                inputs: rawEmail
            } as SignWithMagicLinkState
        }

    } catch (err) {
        console.error('Unexpected error:', err)
        return {
            success: false,
            errors: { _form: ['An unexpected error occurred. Please try again.'] },
            inputs: { email: formData.get('email') as string }
        } as SignWithMagicLinkState
    }

    redirect(`/notification/email/${encodeURIComponent(formData.get('email') as string)}`)
}