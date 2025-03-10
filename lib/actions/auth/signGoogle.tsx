'use server'
import {signIn} from "@/auth";
import {AuthError} from "next-auth";
import {revalidatePath} from "next/cache";

export async function signGoogle() {
    try {
        await signIn("google")
        revalidatePath("/account")
    } catch(err){
        if (err instanceof AuthError) {
            console.log("Error while signing in by google")
        }
        throw err;
    }
}