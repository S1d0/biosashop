import NextAuth, {AuthError} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import {compare} from "bcrypt-ts-edge";
import {z} from "zod";
import {findByEmail} from "@/lib/actions/user/userAction";
import Google from "@auth/core/providers/google";

// Define the credentials schema using Zod
const credentialsSchema = z.object({
    email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must be mex 16 characters long")
})

const credentialsProvider = Credentials({
    credentials: {
        email: {label: 'Email', type: 'string'},
        password: {label: 'Password', type: 'password'},
    },
    async authorize(credentials) {
        if (!credentials) {
            return null;
        }

        // Validate credentials
        const validatedCreds = credentialsSchema.safeParse(credentials);

        if (!validatedCreds.success) {
            throw new AuthError(validatedCreds.error.flatten().fieldErrors)
        }

        const {email, password} = validatedCreds.data;
        const user = await findByEmail(email);

        if (!user || user.password == null) {
            // No user found, so this is their first attempt to login
            return null;
        }

        const isMatch = await compare(password, user.password)
        if (!isMatch) {
            return null;
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    },
})


export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        credentialsProvider,
        Google
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return "/"
        }
    }
})