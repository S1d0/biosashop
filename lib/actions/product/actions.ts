"use cache"

import {ProductFamily, ProductVariant} from "@/types/product";
import {convertToPlain} from "@/lib/utils";
import {prisma} from "@/db/db";
import {notFound} from "next/navigation";
import {cache} from "react";

export const getProductFamilies: () => Promise<ProductFamily[]> = cache(async () => {
    const rawData = await prisma.productFamily.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            variants: true,
        },
    })

    return convertToPlain(rawData)
})

export async function getProductVariant(slug: string): Promise<ProductVariant> {
    const rawData = await prisma.productVariant.findFirst({
        where: { slug : slug }
    })

    if(!rawData) {
        notFound()
    }

    return convertToPlain(rawData);
}