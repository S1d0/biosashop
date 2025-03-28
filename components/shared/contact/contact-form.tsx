"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {sendContact} from "@/lib/actions/contact/contact"
import { useFormStatus } from "react-dom"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import {ContactEnquiryState} from "@/types/customer-enquiry";


const initialState: ContactEnquiryState = {
    success: false,
    errors: null,
    message: ""
}

export function EnquiryForm({ onSuccess }: { onSuccess?: () => void }) {
    const [state, formAction] = useActionState(sendContact, initialState)
    const router = useRouter()
    const navigationTriggeredRef = useRef(false)

    // Handle successful form submission
    useEffect(() => {
        if (state.success && !navigationTriggeredRef.current) {
            // Mark that we've triggered navigation to prevent multiple navigations
            navigationTriggeredRef.current = true

            // Show success toast immediately
            toast.success("Wiadomość wysłana!", {
                description: "Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.",
                duration: 2000,
            })

            if(onSuccess) {
                onSuccess()
            } else {
                router.push("/")
            }
        }
    }, [state.success, router, onSuccess])

    return (
        <div className="w-full">
            {state.message && !state.success && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">{state.message}</div>
            )}
            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Imię</Label>
                    <Input id="name" name="name" aria-describedby="name-error" />
                    {state.errors?.name && (
                        <p id="name-error" className="text-sm text-red-500">
                            {state.errors.name}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jan@example.com" aria-describedby="email-error" />
                    {state.errors?.email && (
                        <p id="email-error" className="text-sm text-red-500">
                            {state.errors.email}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Numer telefonu (opcjonalnie)</Label>
                    <Input id="phone" name="phone" placeholder="+48 123 456 789" aria-describedby="phone-error" />
                    {state.errors?.phone && (
                        <p id="phone-error" className="text-sm text-red-500">
                            {state.errors.phone}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Wiadomość</Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Twoja wiadomość..."
                        className="min-h-[120px]"
                        aria-describedby="message-error"
                    />
                    {state.errors?.message && (
                        <p id="message-error" className="text-sm text-red-500">
                            {state.errors.message}
                        </p>
                    )}
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wysyłanie...
                </>
            ) : (
                "Wyślij wiadomość"
            )}
        </Button>
    )
}

