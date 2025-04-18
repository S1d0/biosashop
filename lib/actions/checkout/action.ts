'use server'
import {CartItem} from "@/components/shared/cart/cart-provider";
import {CreateOrder, CreateOrderItem, createOrderItemSchema, createOrderSchema, Order} from "@/types/order";
import {prisma} from "@/db/db";


export async function createCheckout(items: CartItem[]): Promise<void> {
    // 1. Create order items
    const orderItems: CreateOrderItem[] = items.map(cartItem => {
        const total = cartItem.quantity * cartItem.product.price;
        const image = cartItem.product.images[0]
        return createOrderItemSchema.parse({
            name: cartItem.product.name,
            productId: cartItem.product.id,
            image: image,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            totalPrice: total,

        })
    })


    // 2. Create order
    const totalPrice = orderItems.reduce((total, orderItem) => total = total + orderItem.totalPrice, 0)
    const order: CreateOrder = createOrderSchema.parse({
        totalPrice: totalPrice,
        payed: false,
        delivered: false,
        items: orderItems
    });

    // 3. Save order with items
    try {
        // const created = await prisma.order.create({
        //     data: {
        //         totalPrice: order.totalPrice,
        //         payed: order.payed,
        //         delivered: order.delivered,
        //         items: {
        //             create: orderItems.map((item) => ({
        //                 name: item.name,
        //                 productId: item.productId,
        //                 image: item.image,
        //                 price: item.price,
        //                 quantity: item.quantity,
        //                 totalPrice: item.totalPrice
        //         })),
        //         },
        //     },
        //     include: {
        //         items: true
        //     }
        // })
        const created: Order = await prisma.order.create({
            data: order,
            include: {
                items: true
            }
        })
    } catch (error) {
        console.error('Error while creating order: ', error)
        throw error;
    }
}