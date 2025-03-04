import {z} from "zod";
import {insertCustomerEnquirySchema} from "@/lib/validators";


export type CustomerEnquiry = z.infer<typeof insertCustomerEnquirySchema> & {
    id: string;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
}