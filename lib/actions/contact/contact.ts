'use server'

import {revalidatePath} from "next/cache";
import {prisma} from "@/db/db";
import {convertToPlain} from "@/lib/utils";
import {CustomerEnquiry} from "@/types/customer";
import {insertCustomerEnquirySchema} from "@/lib/validators";


export async function sendContact(prevState: any, formData: FormData) {
        const validatedFields = insertCustomerEnquirySchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
        })

        if(!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Proszę poprawić błędy w formularzu.",
            }
        }

        const newEnquiry = await prisma.customerEnquiry.create({
            data: validatedFields.data
        });

    try {
        revalidatePath("/")
        return {
            message: `Dziękujemy ${newEnquiry.name} za wiadomość! Niedługo do Ciebie się odezwiemy!`,
            success: true,
            errors: null
        }
    } catch (err) {
        console.log(err)
        return {
            message: `Ups coś poszło nie tak, spróbuj później lub zadzwoń do nas`,
            success: false,
            errors: { }
        }
    }
}

export async function getEnquiries(): Promise<CustomerEnquiry[]> {
    const rawData = await prisma.customerEnquiry.findMany({
        orderBy: {updatedAt: "desc"},
    })

    return convertToPlain(rawData)
}