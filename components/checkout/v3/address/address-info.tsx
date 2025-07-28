import {Button} from "@/components/ui/button";
import {ShippingAddress} from "@/types/address";

interface AddressInfoProps {
    address: ShippingAddress,
    onEdit: () => void
}

function formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "")

    // If it starts with 48, format as +48 XXX XXX XXX
    if (digits.startsWith("48") && digits.length === 11) {
        return `+48 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
    }

    // If it's 9 digits (Polish number without country code), add +48
    if (digits.length === 9) {
        return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    }

    // Return original if format doesn't match expected patterns
    return phone
}

export default function AddressInfoDisplay({ address, onEdit }: AddressInfoProps) {

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Informacje o adresie</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-green-800">Adres zapisany</h3>
                    <Button className="hover:text-white hover:shadow-2xl" size="lg" onClick={onEdit}>
                        Edytuj
                    </Button>
                </div>
                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Imię i nazwisko:</strong> {address?.fullName}
                    </p>
                    <p>
                        <strong>Email:</strong> {address?.email}
                    </p>
                    <p>
                        <strong>Adres:</strong> {address?.address}
                    </p>
                    <p>
                        <strong>Miasto:</strong> {address?.city}
                    </p>
                    <p>
                        <strong>Kod pocztowy:</strong> {address?.postalCode}
                    </p>
                    <p>
                        <strong>Telefon:</strong> {address?.phone ? formatPhoneNumber(address.phone) : ""}
                    </p>
                </div>
            </div>
        </div>
    )
}
