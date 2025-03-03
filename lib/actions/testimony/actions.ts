import {prisma} from "@/db/db";
import {convertToPlain} from "@/lib/utils";
import {Testimony} from "@/types/testimony";


export async function getTestimonies(count: number): Promise<Testimony[]> {

    const rawData = await prisma.testimony.findMany({
        orderBy: { createdAt: "desc" },
        take: count
    })
    return convertToPlain(rawData)
}