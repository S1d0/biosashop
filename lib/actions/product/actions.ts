'use server'

import {Product} from "@/types/product";
import {convertToPlain} from "@/lib/utils";
import {prisma} from "@/db/db";
import {notFound} from "next/navigation";

export async function getLatestProducts(): Promise<Product[]> {
    const data = await prisma.product.findMany({
        orderBy: { createdAt: 'desc'}
    })

    return convertToPlain(data);
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product> {

    const rawProd = await prisma.product.findFirst({
        where: {slug: slug}
    })
    if(!rawProd){
        notFound()
    }
    return convertToPlain(rawProd);
}