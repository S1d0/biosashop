import { type NextRequest } from 'next/server'
import { updateSession } from '@/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Only match paths that actually need authentication checks:
         * - API routes that need auth
         * - Protected pages like /moja-biosa
         * - Auth-related pages
         * Exclude static files, images, and public pages
         */
        "/admin/:path*",
        "/moja-biosa/:path*",
        "/api/:path*", 
        "/auth/:path*",
        "/oauth/:path*",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$).*)",
    ],
}
