"use server"

import {ProductFamily, ProductVariant} from "@/types/product";
import {prisma} from "@/db/db";
import {notFound} from "next/navigation";
import {convertToPlain} from "@/lib/converters/prisma-converters";

export async function getProductFamilies(): Promise<ProductFamily[]> {
    const rawData = await prisma.productFamily.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            variants: true,
        },
    })

    return convertToPlain(rawData)
}

export async function getProductVariant(slug: string): Promise<ProductVariant> {
    const rawData = await prisma.productVariant.findFirst({
        where: { slug : slug }
    })

    if(!rawData) {
        notFound()
    }

    return convertToPlain(rawData);
}