'use server'
import {CartItem} from "@/components/shared/cart/cart-provider";
import {CreateOrder, CreateOrderItem, createOrderItemSchema, createOrderSchema, Order} from "@/types/order";
import {prisma} from "@/db/db";
import {convertToPlain} from "@/lib/utils";
import { createClient } from '@/supabase/server'
import {redirect} from "next/navigation";

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
    });

    // 3 Add user
    const supabase = await createClient();
    const {data, error} = await  supabase.auth.signInAnonymously()
    if(error) {
        console.error("Error occured while signInAnonymously:", error)
        throw error;
    }

    if(data.user === null) {
        console.error("User not created");
        throw  error;
    }

    order.userId = data.user.id;

    // 4. Save order with items
    try {
        const rawOrder = await prisma.order.create({
            data: {
                ...order,
                items: {
                    create: orderItems
                }
            },
            include: {
                items: true
            }
        })
        const createdOrder: Order = convertToPlain(rawOrder) as Order
        redirect(`/checkout/${createdOrder.id}`)
    } catch (error) {
        console.error('Error while creating order: ', error)
        throw error;
    }
}