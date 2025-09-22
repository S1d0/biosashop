import {SignInForm} from "@/components/auth/signin-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
    return (
        <section id="login-page">
            <div className={"flex flex-col gap-6 mx-auto md:max-w-xl py-8 md:py-20"}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Zaloguj się i przejdź do swoich zamówień
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={'flex flex-col gap-2'}>
                        <SignInForm />
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
        </section>
    )
}