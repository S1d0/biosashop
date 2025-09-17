'use server'

import {createClient} from "@/supabase/server";
import {SignWithMagicLinkData, SignWithMagicLinkSchema, SignWithMagicLinkState} from "@/lib/actions/auth/types";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export default async function signWithMagicLink(state: SignWithMagicLinkState, formData: FormData) {
    const origin = (await headers()).get('origin')

    const supabase = await createClient()
    const rawEmail: SignWithMagicLinkData = {
        email: formData.get('email') as string,
    }
    const validateFormFields = SignWithMagicLinkSchema.safeParse(rawEmail)

    if(!validateFormFields.success){
        return {
            success: false,
            errors: validateFormFields.error.errors,
            inputs: rawEmail
        } as SignWithMagicLinkState
    }

    const email = validateFormFields.data.email
    const {data, error} = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: `${origin}/`
            }
        })

    if (error) {
        console.log(error)
        redirect('/')
    }

    redirect(`/notification/email/${email}`)
}