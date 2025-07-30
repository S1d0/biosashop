import {DeliveryInfo, PaymentInfo} from "@/types/order";
import {ShippingAddress} from "@/types/address";
import {MapPin, Phone} from "lucide-react";
import {formatPhoneNumber} from "@/lib/utils";
import {PickupInfo} from "@/components/summary/pickup-info";
import {ShippingStatus} from "@/components/summary/shipping-status";

interface ShippingSummaryProps {
    deliveryInfo: DeliveryInfo,
    paymentInfo: PaymentInfo,
    shippingAddress: ShippingAddress,
    updatedAt?: Date
}

export default function ShippingSummary({deliveryInfo, paymentInfo, shippingAddress, updatedAt}: ShippingSummaryProps) {
    return (
        <>
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MapPin size={20}/>
                    {deliveryInfo.method === "pickup"
                        ? <p>Dane kontaktowe</p>
                        : <p>Adres dostawy</p>
                    }
                </h3>
                <div className="space-y-3">
                    <div>
                        <p className="font-medium text-gray-900">{shippingAddress.fullName}</p>
                        {shippingAddress.phone && (
                            <p className="text-gray-600 mt-1 flex items-center gap-2">
                                <Phone size={14} className="text-gray-500"/>
                                {formatPhoneNumber(shippingAddress.phone)}
                            </p>
                        )}
                    </div>
                    <div>
                        <p className="text-gray-600">{shippingAddress.address}</p>
                        <p className="text-gray-600">
                            {shippingAddress.postalCode} {shippingAddress.city}
                        </p>
                    </div>
                    {shippingAddress.email && (
                        <div>
                            <p className="text-gray-600">{shippingAddress.email}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Shipping Status */}
            {updatedAt && (
                <>
                    {deliveryInfo.method === "pickup" ? (
                        <PickupInfo paymentInfo={paymentInfo} updatedAt={updatedAt} />
                    ) : (
                        <ShippingStatus deliveryInfo={deliveryInfo} paymentInfo={paymentInfo} updatedAt={updatedAt} />
                    )}
                </>
            )}
        </>
    )
}

