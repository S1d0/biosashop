'use server'

import {signIn} from "@/auth";
import {SignInResponse} from "next-auth/react";
import {SignInFormState, SignInSchema} from "@/types/auth/signin";
import {SignInError} from "@auth/core/errors";
import {CredentialsSignin} from "next-auth";

export async function signInAction(prevState: SignInFormState, formData: FormData): Promise<SignInFormState> {
    const validateFields = SignInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    // Get validated data
    const {email, password} = validateFields.data
    try {
        // Attempt to sign in with authjs credentials
        const result: SignInResponse = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        })

        // If there's an error with authentication
        if(result?.error) {
            return {
                errors: {
                    _form: ["Ups niepoprawne dane, email lub hasło"]
                }
            }
        }
        return {
            success: true,
        }
    } catch(err) {
        if(err instanceof CredentialsSignin) {
            return {
                errors: {
                    _form: ["Ups... Błędny email lub hasło"]
                }
            }
        }
        return {
            errors: {
                _form: ["Ups coś poszło nie tak... Daj nam szansę i spróbuj jeszcze raz"]
            }
        }
    }
}