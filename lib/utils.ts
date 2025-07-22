import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlain<T>(value: T ):T {
  return JSON.parse(JSON.stringify(value))
}

export function formatPricePLN(price: number) {
  const plnValue = price/100;
  return plnValue.toString()+" "+"zł"
}

export function formatPhoneNumber(phone: string | undefined | null): string {
  if (!phone || !/^\d{9}$/.test(phone)) {
    return phone || "" // Zwraca oryginalną wartość, jeśli nie jest to 9-cyfrowy numer
  }
  return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
}
