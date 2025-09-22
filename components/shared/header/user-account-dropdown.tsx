'use client'

import {useEffect, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import type { User as SupabaseUser } from "@supabase/supabase-js"
import {createClient} from "@/supabase/client";
import {useRouter} from "next/navigation";
import {LogIn, LogOut, Package, User} from "lucide-react";
import Link from "next/link";
import LoginModal from "@/components/auth/login-modal";

export default function UserAccountDropdown() {
    const [user, setUser] = useState<SupabaseUser | null>()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const supabaseClient = createClient()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabaseClient.auth.getUser()
            setUser(user)
            setIsLoading(false)
        }

        getUser()

        const {
            data: { subscription },
        } = supabaseClient.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
            setIsLoading(false)
        })
        return () => subscription.unsubscribe()

    }, [supabaseClient.auth])

    const getUserInitial = (user: SupabaseUser) => {
        if (user.user_metadata?.full_name) {
            return user.user_metadata.full_name.charAt(0).toUpperCase()
        }
        if (user.email) {
            return user.email.charAt(0).toUpperCase()
        }
        return "U"
    }

    const handleLogout = async () => {
        await supabaseClient.auth.signOut()
        router.push("/")
    }

    if (isLoading) {
        return (
            <Button variant="ghost" size="sm" className="h-9 w-9 px-0" disabled>
                <User className="h-4 w-4" />
            </Button>
        )
    }

    if (!user && !isLoading) {
        return (
            <>
                <Button variant="ghost" size="sm" onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Zaloguj się
                </Button>
                <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
            </>
    )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {getUserInitial(user!)}
                    </div>
                    <span className="sr-only">Open user menu</span>
                </Button> 
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/moja-biosa" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        Moje zamówienia
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Wyloguj się
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}