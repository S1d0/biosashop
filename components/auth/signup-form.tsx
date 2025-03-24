'use client'

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {useActionState, useEffect, useState} from "react";
import {Eye, EyeOff, Loader2} from "lucide-react";
import Form from "next/form";
import {SignGoogle} from "@/components/auth/signin-google";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {signUpAction} from "@/lib/actions/auth/sign-up";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {SignUpFormState} from "@/lib/actions/auth/types";

export function SignUpForm({
                               className,
                               ...props
                           }: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)
    const initState: SignUpFormState = {}
    const [state, action, pending] = useActionState(signUpAction, initState)

    const {toast} = useToast()

    useEffect(() => {
        if (state?.success) {
            toast({
                title: "Twoje konto zostało utworzone",
                description: `${state.message}`,
            })
            const redirectTimer = setTimeout(() => {
                router.push("/private")
            }, 500)
            return () => clearTimeout(redirectTimer)
        }

    }, [state?.success, state.message, router, toast])

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Rejestracja</CardTitle>
                    <CardDescription>
                        Zarejestruj się i śledź swoje zamówienia
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                    {!state.success && state.message && (
                        <section className="mb-4 rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
                            <p>{state.message}</p>
                        </section>
                    )}
                    <section>
                        <Form action={action}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        defaultValue={state.inputs?.email}
                                    />
                                    {state?.errors?.email && (
                                        <p id="email-error" className="text-sm text-destructive mt-1">
                                            {state.errors.email[0]}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <div>
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
                                                    <EyeOff className="h-4 w-4 text-muted-foreground"
                                                            aria-hidden="true"/>
                                                ) : (
                                                    <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true"/>
                                                )}
                                                <span
                                                    className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                            </Button>
                                        </div>
                                        {state.errors?.password && (
                                            <section
                                                className="mt-2 rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
                                                {state.errors.password.map((err, key) => <p key={key}>{err}</p>)}
                                            </section>
                                        )}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={pending}>
                                    {pending
                                        ? (
                                            <div className='flex gap-2 items-ce'>
                                                <Loader2 className="h-4 w-4 animate-spin"/>
                                                <p>Rejestrowanie...</p>
                                            </div>
                                        )
                                        : (<p>Zarejestruj</p>)}
                                </Button>
                            </div>
                        </Form>
                    </section>
                    <section>
                        <div className="relative my-4">
                            <Separator/>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-background px-2 text-muted-foreground text-sm">Lub kontynuj z</span>
                            </div>
                        </div>
                        <SignGoogle/>
                    </section>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Masz już konto?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary/90">
                            Zaloguj się
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
