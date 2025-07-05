'use server'

import {DeliveryState} from "@/components/checkout/v3/checkout-delivery";
import {InPostPoint} from "@/types/inpost";
import {CreateDeliveryInfo, deliveryInfoSchema, OrderItem, orderSchema} from "@/types/order";
import {prisma} from "@/db/db";
import {DeliveryOption} from "@/types/delivery";

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
function getDeliveryDate(deliveryMethod: "standard" | "express" | "inpost"): Date {
    const now = new Date()
    switch (deliveryMethod) {
        case "standard":
            return addDays(now, 4)
        case "express":
            return addDays(now, 2)
        case "inpost":
            return addDays(now, 3)
        default:
            throw new Error(`Unknown delivery method: ${deliveryMethod}`)
    }
}

function getDeliveryPrice(deliveryMethod: "standard" | "express" | "inpost"): number {
    switch (deliveryMethod) {
        case "standard":
            return 1990
        case "express":
            return 2990
        case "inpost":
            return 1190
        default:
            throw new Error(`Unknown delivery method: ${deliveryMethod}`)
    }
}

export async function updateShippingInfo(initState: DeliveryState, formData: FormData): Promise<DeliveryState> {
    const orderId = formData.get("orderId") as string
    const method = formData.get("deliveryMethod") as "standard" | "express" | "inpost"
    const deliveryEta = getDeliveryDate(method)
    const price = getDeliveryPrice(method)
    const notes = formData.get("deliveryNotes") as string

    let createDeliveryInfo: CreateDeliveryInfo = {
        method: method,
        price: price,
        estimatedDeliveryDate: deliveryEta,
        notes: notes
    }

    if(method === "inpost") {
        const inpostRaw = formData.get("inPostPoint") as string
        const inPostPoinst: InPostPoint = JSON.parse(inpostRaw)
        createDeliveryInfo = { ...createDeliveryInfo,
            parcelLocker: {
            name: inPostPoinst.name,
            address: inPostPoinst.address.line1 + " " + inPostPoinst.address.line2,
            city: inPostPoinst.address_details.city,
            postalCode: inPostPoinst.address_details.post_code,
            }
        }
    }

    const validatedFields = deliveryInfoSchema.safeParse(createDeliveryInfo)
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Błąd walidacji danych dostawy.",
            inputs: null,
        }
    }

    const rawOrder = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            deliveryInfo: validatedFields.data,
            updatedAt: new Date(),
        }
    })

    const updatedOrder = orderSchema.parse(rawOrder)

    return {
        success: true,
        message: "Sposób dostawy zapisany",
        updatedOrder: updatedOrder,
    } as DeliveryState
}

const deliveryOptions: DeliveryOption[] = [
    {
        name: "standard",
        price: 1990,
        description: "Dostawa standardowa 3-5 dni robocze",
    },
    {
        name: "express",
        price: 2990,
        description: "Dostawa standardowa 3-5 dni robocze",
    },
    {
        name: "inpost",
        price: 1190,
        description: "Dostawa standardowa 3-5 dni robocze",
    },
]

export async function fetchDeliveryOption(orderItems: OrderItem[]): Promise<DeliveryOption[]> {
    // Check if any item has name containing M, L, or XL
    const hasLargeItems = orderItems.some(item =>
        /\b(M|L|XL)\b/i.test(item.name)
    );

    // Check if there are 10 or more items
    const hasTooManyItems = orderItems.length >= 10;

    // Filter delivery options based on conditions
    let availableOptions = [...deliveryOptions];

    // If has large items (M, L, XL), remove inpost
    if (hasLargeItems) {
        availableOptions = availableOptions.filter(option => option.name !== "inpost");
    }

    // If has 10 or more items, remove express and inpost
    if (hasTooManyItems) {
        availableOptions = availableOptions.filter(option =>
            option.name !== "express" && option.name !== "inpost"
        );
    }

    return Promise.resolve(availableOptions);
}