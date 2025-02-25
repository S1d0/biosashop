'use server'

import {PrismaClient} from "@prisma/client";
import {Product} from "@/lib/product/types";
import {convertToPlain} from "@/lib/utils";

export async function getLatestProducts(): Promise<Product[]> {
    const prisma = new PrismaClient();
    const data = await prisma.product.findMany({
        orderBy: { createdAt: 'desc'}
    })

    return convertToPlain(data);
}