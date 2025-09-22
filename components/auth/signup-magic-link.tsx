'use client'
import Form from "next/form";
import React, {useActionState} from "react";
import signWithMagicLink from "@/lib/actions/auth/sign-magic-link";
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
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Podaj swój email"
                            defaultValue={state.inputs?.email}
                            disabled={pending}
                            required
                        />
                        {state.errors?.email && (
                            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
                        )}
                    </div>
                    
                    {state.errors?._form && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-200">
                            <p className="text-sm text-red-600">{state.errors._form[0]}</p>
                        </div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={pending}>
                        {pending ? (
                            <div className='flex gap-2 items-center'>
                                <Loader2 className="h-4 w-4 animate-spin"/>
                                <p>Wysyłam link...</p>
                            </div>
                        ) : (
                            <p>Wyślij link</p>
                        )}
                    </Button>
                </div>
            </Form>
        </section>
    )
}
