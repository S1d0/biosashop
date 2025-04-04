import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert prisma object into regular JS object
export function convertToPlain<T>(value: T ):T {
  return JSON.parse(JSON.stringify(value))
}

export function formatPrice(price: number, currency = "PLN", locale = "pl-PL") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export function formatPricePLN(price: number) {
  const plnValue = price/100;
  return plnValue.toString()+" "+"zł"
}
