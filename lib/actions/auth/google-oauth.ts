'use server'
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";

const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    url = `${url}/oauth/callback/`
    return url
}

export async function signGoogle() {
    console.log("Logowanie google")
    const supabase = await createClient()
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: getURL(),
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        })

        if(error) {
            console.log('Error:', error)
            redirect('/login')
        }

        if(data.url) {
            redirect(data.url)
        }

    } catch(err){
         console.log("Error while signing in by google:{}", err)
        throw err;
    }
}
