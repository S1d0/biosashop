import { Truck } from "lucide-react"
import {DeliveryInfo, PaymentInfo} from "@/types/order";

interface ShippingStatusProps {
    deliveryInfo: DeliveryInfo
    paymentInfo: PaymentInfo,
    updatedAt: Date | string
}

export function ShippingStatus({ deliveryInfo, paymentInfo, updatedAt }: ShippingStatusProps) {
    const getStatusColor = (delivered: boolean) => {
        return delivered ? "text-green-500" : "text-orange-500"
    }

    const getStatusText = (delivered: boolean, payed: boolean) => {
        if (delivered) return "Dostarczony"
        if (payed) return "W trakcie realizacji"
        return "Oczekuje na płatność"
    }

    const formatDate = (date: Date | string) => {
        const dateObj = typeof date === "string" ? new Date(date) : date
        return dateObj.toLocaleDateString("pl-PL")
    }

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Truck size={20} />
                Status wysyłki
            </h3>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-bold text-lg ${getStatusColor(deliveryInfo.delivered)}`}>
                        {getStatusText(deliveryInfo.delivered, paymentInfo.payed)}
                    </p>
                </div>
                {paymentInfo.paymentMethodDetails && (
                    <div>
                        <p className="text-sm text-gray-500">Metoda płatności</p>
                        <p className="font-medium text-gray-900">{paymentInfo.paymentMethodDetails.type}</p>
                    </div>
                )}
                {deliveryInfo.deliveredAt && (
                    <div>
                        <p className="text-sm text-gray-500">Data dostawy</p>
                        <p className="font-medium text-green-600">{formatDate(deliveryInfo.deliveredAt)}</p>
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
