"use client"

import { useActionState } from "react"
import { signInAction} from "@/lib/actions/auth/signin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {SignInFormState} from "@/types/auth/signin";

interface SignInFormProps {
    onSuccess?: () => void
    variant?: "page" | "dialog"
}

export function SignInForm({ onSuccess, variant = "page" }: SignInFormProps) {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const initialState: SignInFormState = {}
    const [state, action, pending] = useActionState(signInAction, initialState)


    // Handle successful sign-in
    useEffect(() => {
        if (state?.success) {
            if (onSuccess) {
                onSuccess()
            } else {
                router.push("/")
                router.refresh()
            }
        }
    }, [state?.success, onSuccess, router])

    // The original form action - no need for a custom wrapper
    // This avoids the error by letting useActionState handle the result

    const FormContent = (
        <>
            {state?.errors?._form && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{state.errors._form[0]}</AlertDescription>
                </Alert>
            )}
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    aria-describedby={state?.errors?.email ? "email-error" : undefined}
                />
                {state?.errors?.email && (
                    <p id="email-error" className="text-sm text-destructive mt-1">
                        {state.errors.email[0]}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        Odzyskaj hasło?
                    </a>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        aria-describedby={state?.errors?.password ? "password-error" : undefined}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        )}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                </div>
                {state?.errors?.password && (
                    <p id="password-error" className="text-sm text-destructive mt-1">
                        {state.errors.password[0]}
                    </p>
                )}
            </div>
        </>
    )

    if (variant === "dialog") {
        return (
            <form action={action} className="space-y-4">
                {FormContent}
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "Signing in..." : "Sign in"}
                </Button>
            </form>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="text-center">
                    <h2 className="text-lg font-medium">Sign in with credentials</h2>
                </div>
            </CardHeader>
            <form action={action}>
                <CardContent className="space-y-4">{FormContent}</CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? "Signing in..." : "Sign in"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

