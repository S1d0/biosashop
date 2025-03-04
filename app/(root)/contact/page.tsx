import { EnquiryForm } from "@/components/shared/contact/contact-form"
import { redirect } from "next/navigation"

export default function ContactPage() {
    return (
        <main className="container mx-auto py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <EnquiryForm onSuccess={() => redirect("/")} />
            </div>
        </main>
    )
}

