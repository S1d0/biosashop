import {prisma} from "@/db/db";
import {notFound} from "next/navigation";
import {convertToPlain} from "@/lib/utils";
import {Order} from "@/types/order";

export default async function fetchOrder(id: string): Promise<Order> {
    try {
        // 1. Get order from db
        const rawOrder = await prisma.order.findUnique({
            where: {id: id},
            include: {items: true}
        });

        if(!rawOrder) {
            notFound()
        }

        // 2. Convert to plain
        const order: Order = convertToPlain(rawOrder) as Order
        console.log(order)

        return order
    } catch (error) {
        console.error('Error while fetching order: ', error)
        throw error;
    }
}