'use client'

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React, {useActionState, useState} from "react";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {signInAction} from "@/lib/actions/auth/sign-in";
import {SignInFormState} from "@/lib/actions/auth/types";
import Form from "next/form";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import {SignGoogle} from "@/components/auth/signin-google";

export function SignInForm({
                               className,
                               ...props
                           }: React.ComponentPropsWithoutRef<"div">) {
    const [showPassword, setShowPassword] = useState(false)
    const initState: SignInFormState = {}
    const [state, action, pending] = useActionState(signInAction, initState)

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Zaloguj się i przejdź do swoich zamówień
                    </CardDescription>
                </CardHeader>
                <CardContent className={'flex flex-col gap-2'}>
                    {!state?.success && state?.message && (
                        <div className="mb-4 bg-pri rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
                            <p>{state.message}</p>
                        </div>
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
                                        placeholder="Podaj swój email"
                                        defaultValue={state.inputs?.email}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm text-muted-foreground underline-offset-4 hover:underline"
                                        >
                                            Zapomniałeś hasła?
                                        </a>
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder={'Podaj swoje hasło'}
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
                                {pending ? (
                                            <div>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                Logowanie...
                                            </div>
                                        )
                                        : (<p>Zaloguj</p>)}
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
                        Nie masz konta?{" "}
                        <Link href="/signup" className="underline underline-offset-4 hover:text-primary/90">
                            Zarejestruj się
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
