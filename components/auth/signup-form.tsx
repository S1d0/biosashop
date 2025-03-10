"use client"

import React, {useActionState, useState} from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import {SignUpFormState} from "@/types/auth/signup";
import {signUpAction} from "@/lib/actions/auth/signup";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const initState: SignUpFormState = {}
    const [state, action, pending] = useActionState(signUpAction, initState)


    return (
        <div className="space-y-4 py-2">
            {/* Email/Password Sign-Up Form */}
            <form action={action}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                        />
                        {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                        />
                        {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
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
                        {state?.errors?.password && <p className="text-sm text-destructive">{state.errors.password}</p>}
                    </div>
                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Rejestrowanie...
                            </>
                        ) : (
                            "Utwórz konto"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

