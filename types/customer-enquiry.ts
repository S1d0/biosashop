import {z} from "zod";


// Prisma Schema with Validation
export const EnquiryStatus = z.enum(["PENDING", "IN_PROGRESS", "RESPONDED", "RESOLVED", "SPAM"]);
export const insertCustomerEnquirySchema = z.object({
    name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
    email: z.string().nonempty('Email nie może być pusty'),
    message: z.string().nonempty('Wiadomość nie może być pusta'),
    phone: z.string().min(9, 'Numer telefonu nie może być pusty'),
    status: z.optional(EnquiryStatus),
})

export const customerEnquirySchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
    phone: z.string(),
    status: EnquiryStatus,
    createdAt: z.date(),
    updatedAt: z.date()
});

export type CustomerEnquiry = z.infer<typeof customerEnquirySchema>;

// Contact Form type
export type ContactEnquiryState = {
    success: boolean;
    errors: {
        name?: string[] | undefined;
        email?: string[] | undefined;
        phone?: string[] | undefined;
        message?: string[] | undefined;
    } | null;
    message?: string;
}

