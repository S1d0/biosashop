import { MapPin } from "lucide-react"
import {PaymentInfo} from "@/types/order";

interface PickupInfoProps {
    paymentInfo: PaymentInfo
    updatedAt: Date | string
}

export function PickupInfo({ paymentInfo, updatedAt }: PickupInfoProps) {
    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === "string" ? new Date(date) : date
        return dateObj.toLocaleDateString("pl-PL")
    }

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Odbiór osobisty
            </h3>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-bold text-lg ${paymentInfo.payed ? "text-orange-500" : "text-gray-500"}`}>
                        {paymentInfo.payed ? "Zamówienie jest przygotowywane" : "Oczekuje na płatność"}
                    </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <p className="text-blue-800 font-medium">📍 Zamówienie należy odebrać osobiście w naszym sklepie</p>
                    <p className="text-blue-700 text-sm mt-1">
                        Skontaktujemy się z Tobą, gdy zamówienie będzie gotowe do odbioru
                    </p>
                </div>
                {paymentInfo.paymentMethodDetails && (
                    <div>
                        <p className="text-sm text-gray-500">Metoda płatności</p>
                        <p className="font-medium text-gray-900">{paymentInfo.paymentMethodDetails.type}</p>
                    </div>
                )}
                <div>
                    <p className="text-sm text-gray-500">Ostatnia aktualizacja</p>
                    <p className="text-gray-600">{formatDate(updatedAt)}</p>
                </div>
            </div>
        </div>
    )
}
