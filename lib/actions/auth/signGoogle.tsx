'use server'
import {signIn} from "@/auth";

export async function signGoogle(initState, formData: FormData) {
    try{
        await signIn("google")
        return {
            message: "Udało się"
        }
    } catch(err){
        console.log(err)
        throw new Error("Ups cos poszło nie tak")
    }
}