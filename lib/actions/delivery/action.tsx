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
        case "company":
            return addDays(now, 3)
        case "pickup":
            return null
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
    const rawDeliveryOption = await filterDeliveryOption(order.items)
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

export async function getDeliveryOptions(): Promise<DeliveryOption[]> {
    return prisma.deliveryOption.findMany();
}

function containsLargeItems(orderItems: OrderItem[]) {
    const largeSizes = ["5L", "10L", "20L"]
    return orderItems.some(item => largeSizes.includes(item.size))
}

function containsManyItemWithSize(orderItems: OrderItem[], size: string, limit: number = 4) {
    // should count all quantity for items size
    return orderItems
        .filter(item => item.size === size)
        .reduce((total, item) => total + item.quantity, 0) > limit
}

function qualifiesForParcelLocker(orderItems: OrderItem[]) {
    return orderItems.every(item => item.size === "1L" && item.quantity <= 20)
}
function extractLiters(sizeStr: string): number {
    const match = sizeStr.match(/(\d+(?:\.\d+)?)L/i);
    return match ? parseFloat(match[1]) : 0;
}

function qualifiesForCompanyDelivery(orderItems: OrderItem[], limit: number): boolean {
    return orderItems
        .map(item => extractLiters(item.size) * item.quantity)
        .reduce((total, liters) => total + liters, 0) > limit;
}

function containsTotalVolumeBiggerThan(orderItems: OrderItem[], limit: number): boolean {
    return orderItems
        .map(item => extractLiters(item.size) * item.quantity)
        .reduce((total, liters) => total + liters, 0) >= limit;
}

function qualifiesForLargeOptionFee(orderItems: OrderItem[]) {
    return containsLargeItems(orderItems) && (
        containsManyItemWithSize(orderItems, "5L", 10)
        || containsManyItemWithSize(orderItems, "10L", 5)
        || containsManyItemWithSize(orderItems, "20L", 3)
        || containsTotalVolumeBiggerThan(orderItems, 50)
    )
}

function qualifiesForAdditionalFee2(orderItems: OrderItem[], limit: number = 50) {
    return containsTotalVolumeBiggerThan(orderItems, limit)
}

function adjustDeliveryFee(options: DeliveryOption[], priceAdjust: number = 2500, excluded: DeliveryMethod[] = ["parcel_locker", "company", "pickup"]): DeliveryOption[] {
    const adjusted: DeliveryOption[] =
    options
        .filter(op => !excluded.includes(op.method as DeliveryMethod))
        .map(o => ({
            ...o,
            price: o.price + priceAdjust
         })
        )
    const notAdjusted: DeliveryOption[] = options.filter(option => excluded.includes(option.method as DeliveryMethod));
    return adjusted.concat(...notAdjusted);
}

export async function filterDeliveryOption(orderItems: OrderItem[]): Promise<DeliveryOption[]> {
    const ADDITIONAL_FEE= 2500;
    const ADDITIONAL_FEE_FOR_LARGE_ORDER = 4900;
    const COMPANY_DELIVER_LITER_LIMIT = 250;
    const allOptions = await getDeliveryOptions();
    const canUseParcelLocker = qualifiesForParcelLocker(orderItems)
    const canUseCompanyDelivery = qualifiesForCompanyDelivery(orderItems, COMPANY_DELIVER_LITER_LIMIT)
    const canUseLargeOptionFee = qualifiesForLargeOptionFee(orderItems)

    if(canUseParcelLocker) {
        let optionsFitForParcel: DeliveryOption[] = [
            allOptions.find(option => option.method === "pickup") as DeliveryOption,
            allOptions.find(option => option.method === "parcel_locker") as DeliveryOption,
            allOptions.find(option => option.method === "standard") as DeliveryOption,
            allOptions.find(option => option.method === "express") as DeliveryOption,
        ]
        if(qualifiesForAdditionalFee2(orderItems, 10)) {
            optionsFitForParcel = adjustDeliveryFee(optionsFitForParcel, 1000,  ["pickup"])
        }

        return Promise.resolve(optionsFitForParcel)
    }

    if(canUseCompanyDelivery) {
        const optionsForCompanyDelivery = [
            allOptions.find(option => option.method === "pickup") as DeliveryOption,
            allOptions.find(option => option.method === "company") as DeliveryOption,
        ]

        return Promise.resolve(optionsForCompanyDelivery)
    }

    if(canUseLargeOptionFee) {
        const options = [
            allOptions.find(option => option.method === "pickup") as DeliveryOption,
            allOptions.find(option => option.method === "standard") as DeliveryOption,
            allOptions.find(option => option.method === "express") as DeliveryOption,
        ]
        const adjustedOptions: DeliveryOption[] = adjustDeliveryFee(options, ADDITIONAL_FEE_FOR_LARGE_ORDER, ["pickup"])
        return Promise.resolve(adjustedOptions)
    }

    if(containsTotalVolumeBiggerThan(orderItems, 21)) {
        const options = [
            allOptions.find(option => option.method === "pickup") as DeliveryOption,
            allOptions.find(option => option.method === "standard") as DeliveryOption,
            allOptions.find(option => option.method === "express") as DeliveryOption,
        ]

        const adjustedOptions: DeliveryOption[] = adjustDeliveryFee(options, ADDITIONAL_FEE, ["pickup"])
        return Promise.resolve(adjustedOptions)
    }

    const standardOptions: DeliveryOption[] = allOptions.filter(option => option.method !== "company" && option.method !== "parcel_locker")
    return Promise.resolve(standardOptions)
}
