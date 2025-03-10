'use server'

import {prisma} from "@/db/db";
import {User, userSchema} from "@/types/user";

export async function findByEmail(email: string): Promise<User> {

    const rawData = await prisma.user.findUnique({
        where: {email: email},
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            password: true
        }
    })

    return userSchema.parse(rawData);
}