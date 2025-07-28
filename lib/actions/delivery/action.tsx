'use server'

import {DeliveryState} from "@/components/checkout/v3/checkout-delivery";
import {DeliveryMethod, DeliveryOption} from "@/types/delivery";
import {CreateDeliveryInfo, deliveryInfoSchema, OrderItem, orderSchema} from "@/types/order";
import {InPostPoint} from "@/types/inpost";
import {prisma} from "@/db/db";

function getDeliveryDate(deliveryMethod: DeliveryMethod) {
    const now = new Date()
    switch (deliveryMethod) {
        case "standard":
            return addDays(now, 6)
        case "express":
            return addDays(now, 2)
        case "parcel_locker":
            return addDays(now, 3)
        default: throw new Error(`Unknown delivery method: ${deliveryMethod}`)
    }
}

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)

export async function updateDeliveryInfo(initState: DeliveryState, formData: FormData): Promise<DeliveryState> {
    const orderId = formData.get('orderId') as string;
    const deliveryMethod = formData.get('deliveryMethod') as DeliveryMethod;
    const notes = formData.get('deliveryNotes') as string;

    const rawOrderWithItems = await prisma.order.findFirst({
        where: { id: orderId },
    })
    if(!rawOrderWithItems) {
        return {
            success: false,
            errors: null,
            message: "Zamówienie nie zostało znalezione",
            inputs: null,
        }
    }

    const order = orderSchema.parse(rawOrderWithItems)
    const rawDeliveryOption = await fetchDeliveryOption(order.items)
        .then(options => options.find(option => option.method === deliveryMethod))
    if(!rawDeliveryOption) {
        return {
            success: false,
            errors: null,
            message: "Przykro nam ale tego dostawcy nie obsługujemy",
            inputs: null,
        }

    }

    const deliveryOption = deliveryInfoSchema.parse(rawDeliveryOption)
    const deliveryEta = getDeliveryDate(deliveryOption.method)
    let createDeliveryInfo: CreateDeliveryInfo = {
        method: deliveryOption.method,
        price: deliveryOption.price,
        estimatedDeliveryDate: deliveryEta,
        notes: notes
    }

    if(deliveryMethod === "parcel_locker" && formData.has("inPostPoint")) {
        const inpostRaw = formData.get("inPostPoint") as string
        const inPostPoinst: InPostPoint = JSON.parse(inpostRaw)
        createDeliveryInfo = {
            ...createDeliveryInfo,
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

export async function fetchDeliveryOption(orderItems: OrderItem[]): Promise<DeliveryOption[]> {
    // Check if any item has name containing M, L, or XL
    const hasLargeItems = orderItems.some(item =>
        /\b(M|L|XL)\b/i.test(item.name)
    );

    // Check if there are 5 or more items
    const hasTooManyItems = orderItems.length >= 5;
    const onlySpecialDelivery = orderItems.length >= 5 && hasLargeItems

    // Filter delivery options based on conditions
    let availableOptions = await prisma.deliveryOption.findMany();

    if(onlySpecialDelivery) {
        return availableOptions.filter(option => option.method === "pickup" || option.method === "company")
    }

    if(!hasTooManyItems && !hasLargeItems) {
        return availableOptions
            .filter(option => option.method !== "company")
            .map(option => {
                if(option.method !== "pickup" && option.method !== "parcel_locker") {
                    return  {
                        ...option,
                        price: option.price - 1000
                    }
                } else return option
            });
    }

    // If has 5 or more items, remove express and inpost
    if (hasTooManyItems) {
        availableOptions = availableOptions.filter(option =>
            option.method !== "parcel_locker" && option.method !== "company"
        );

        if(hasLargeItems) {
            availableOptions = availableOptions
                .filter(option => option.method !== "express")
                .map(option => {
                        if(option.method !== "pickup") {
                            return  {
                                ...option,
                                price: option.price + 1000
                            }
                        } else return option
                    }
                )
        }
        return availableOptions;
    }

    // If has large items (M, L, XL), remove inpost and company
    if (hasLargeItems) {
        availableOptions = availableOptions
            .filter(option => option.method !== "parcel_locker" && option.method !== "company")
            .map(option => {
                if(option.method !== "pickup") {
                    return  {
                        ...option,
                        price: option.price + 1000
                    }
                } else return option
            });
    }


    return Promise.resolve(availableOptions);
}