"use client"

import { useRouter } from "next/navigation"
import { EnquiryForm } from "@/components/shared/contact/contact-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function ContactModal() {
    const router = useRouter()

    const handleSuccess = () => {
        // Navigate to home with success parameter as fallback
        router.push("/?contactSuccess=true")
    }

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent className="sm:max-w-[500px]">
                <EnquiryForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    )
}
