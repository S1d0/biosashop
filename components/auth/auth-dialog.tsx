"use client"

import React, { useState } from "react"
import { SignInForm } from "@/components/auth/signin-form"
import SignUpForm  from "@/components/auth/signup-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {Separator} from "@/components/ui/separator";
import {SignGoogle} from "@/components/auth/signin-google";

type AuthMode = "signin" | "signup"

interface AuthDialogProps {
    defaultMode?: AuthMode
    triggerLabel?: string
    className?: string
}

export function  AuthDialog({ defaultMode = "signin", triggerLabel = "Sign In", className }: AuthDialogProps) {
    const [mode, setMode] = useState<AuthMode>(defaultMode)
    const [open, setOpen] = useState(false)

    const handleModeSwitch = () => {
        setMode(mode === "signin" ? "signup" : "signin")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className={className}>{triggerLabel}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="relative">
                    <DialogTitle>{mode === "signin" ? "Zaloguj się do konta" : "Utwórz nowe konto"}</DialogTitle>
                    <DialogDescription>
                        {mode === "signin"
                            ? "Zaloguj się do konta i uzyskaj dostęp do zamówień"
                            : "Zarejestruj się i zarządzaj zamówieniami"}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <SignGoogle/>
                    <div className="relative">
                        <div className="absolute inset-1 flex items-center">
                            <Separator className="w-full"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-3 text-muted-foreground">Lub kontynuj z</span>
                        </div>
                    </div>
                    {mode === "signin" ? (
                        <SignInForm onSuccess={() => setOpen(false)} variant="dialog"/>
                    ) : (
                        <SignUpForm/>
                    )}

                    <div className="mt-4 text-center text-sm">
                        {mode === "signin" ? (
                            <p>
                                Nie masz konta? {"  "}
                                <button type="button" onClick={handleModeSwitch}
                                        className="text-primary hover:underline font-medium">
                                    Zarejestruj się
                                </button>
                            </p>
                        ) : (
                            <p>
                                Już masz konto?{" "}
                                <button type="button" onClick={handleModeSwitch}
                                        className="text-primary hover:underline font-medium">
                                    Zaloguj się
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

