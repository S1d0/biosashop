import {z} from 'zod';
import {CustomerEnquiry, customerEnquirySchema} from "@/types/customer-enquiry";

/**
 * Parses a Prisma CustomerEnquiry result through Zod schema
 * to validate and convert to the CustomerEnquiry type
 */
export function parseEnquiry<T>(data: T): CustomerEnquiry {
    try {
        // Parse and validate the data through the schema
        return customerEnquirySchema.parse(data);
    } catch (error) {
        // If there's a validation error, we can log it and provide more context
        if (error instanceof z.ZodError) {
            console.error('Validation error in parseEnquiry:', error.errors);
            throw new Error(`Invalid enquiry data: ${error.errors.map(e => e.message).join(', ')}`);
        }
        throw error;
    }
}

/**
 * Parses an array of Prisma CustomerEnquiry results
 */
export function parseEnquiries<T>(data: T[]): CustomerEnquiry[] {
    return data.map(item => parseEnquiry(item));
}

/**
 * Safely parses a Prisma result, returning null if the input is null
 */
export function parseEnquiryOrNull<T>(data: T | null): CustomerEnquiry | null {
    if (data === null) return null;
    return parseEnquiry(data);
}

// Convert prisma object into regular JS object
export function convertToPlain<T>(value: T ):T {
    return JSON.parse(JSON.stringify(value))
}
