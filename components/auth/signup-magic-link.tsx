'use client'
import Form from "next/form";
import React, {useActionState} from "react";
import signWithMagicLink from "@/components/auth/sign-magic-link";
import {SignWithMagicLinkState} from "@/lib/actions/auth/types";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export function SignupMagicLinkForm() {
    const initState: SignWithMagicLinkState = {}
    const [state, action, pending] = useActionState(signWithMagicLink, initState)

    return (
        <section id="magic-link-form">
            <Form action={action}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Podaj swój email"
                        defaultValue={state.inputs?.email}
                        required
                    />
                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending
                            ? (
                                <div className='flex gap-2 items-center'>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    <p>Wysyłam link do {state.inputs?.email}...</p>
                                </div>
                            )
                            : (<p>Wyślij link</p>)}
                    </Button>
                </div>
            </Form>
        </section>
    )
}