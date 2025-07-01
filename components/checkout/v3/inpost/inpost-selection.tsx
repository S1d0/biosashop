"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Clock, Loader2, MapPin, Search } from "lucide-react"
import { useActionState, useState, useEffect } from "react"
import Form from "next/form"
import { useFormStatus } from "react-dom"
import { getInPostPoints } from "@/lib/actions/inpost/actions"

interface InPostPoint {
    name: string
    type: string[]
    status: string
    location: {
        longitude: number
        latitude: number
    }
    location_type: string
    location_description: string
    opening_hours: string
    address: {
        line1: string
        line2: string
    }
    address_details: {
        city: string
        province: string
        post_code: string
        street: string
        building_number: string
        flat_number: string | null
    }
    phone_number: string | null
    functions: string[]
    easy_access_zone: boolean
    location_247: boolean
    distance?: number
}

export type InpostPointState = {
    success: boolean
    errors: {
        inpost?: string[] | undefined
        query?: string[] | undefined
    } | null
    message?: string
    items: InPostPoint[]
}

const initialInpostPointState: InpostPointState = {
    success: false,
    errors: null,
    message: "",
    items: [],
}

interface InpostSelectionProps {
    onPointSelect?: (point: InPostPoint | null) => void
    selectedPoint?: InPostPoint | null
}

export default function InpostSelection({ onPointSelect, selectedPoint }: InpostSelectionProps) {
    const [state, setInpostState] = useState<InpostPointState>(initialInpostPointState)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchGeoPosition, setGeoPosition] = useState("")
    const [searching, isSearching] = useState(false)
    const [localSelectedPoint, setLocalSelectedPoint] = useState<InPostPoint | null>(selectedPoint || null)
    const [points, setPoints] = useState<InPostPoint[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Use state items or empty array
    const inpostPoints: InPostPoint[] = points

    // Update local selected point when prop changes
    useEffect(() => {
        setLocalSelectedPoint(selectedPoint || null)
    }, [selectedPoint])

    useEffect(() => {
        isSearching(false)
    }, [points]);

    const handlePointSelection = (point: InPostPoint) => {
        setLocalSelectedPoint(point)
        onPointSelect?.(point)
    }

    const handleClearSelection = () => {
        setLocalSelectedPoint(null)
        onPointSelect?.(null)
    }

    const handleSearch = async () => {
        const inpostPointState = await getInPostPoints(searchQuery, null)
        isSearching(true)
        setInpostState(inpostPointState)
        if(inpostPointState.success) {
            setPoints(inpostPointState.items)
        }
    }

    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setErrors((prev) => ({
                ...prev,
                inpost: "Geolokalizacja nie jest obsługiwana przez tę przeglądarkę",
            }))
            return
        }

        setErrors((prev) => ({ ...prev, inpost: "" }))

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                const locationQuery = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`
                setSearchQuery(locationQuery)

                try {
                    const result = await getInPostPoints("",locationQuery)
                    if (result.success && result.items.length > 0) {
                        setPoints(result.items)
                        if (result.items.length === 0) {
                            setErrors((prev) => ({
                                ...prev,
                                inpost: "Nie znaleziono paczkomatów w pobliżu",
                            }))
                        }
                    } else {
                        setPoints([])
                    }
                } catch (error) {
                    setErrors((prev) => ({
                        ...prev,
                        inpost: "Błąd podczas wyszukiwania punktów",
                    }))
                    console.error(error)
                }
            },
            (error) => {
                setErrors((prev) => ({
                    ...prev,
                    inpost: "Nie udało się pobrać lokalizacji. Sprawdź uprawnienia przeglądarki.",
                }))
                console.error(error)
                isSearching(false)
            },
        )
    }


    return (
        <>
            <Card className="bg-muted/20">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Wybierz paczkomat InPost</CardTitle>
                    <CardDescription>Wpisz kod pocztowy lub nazwę miasta, aby znaleźć najbliższe paczkomaty</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!selectedPoint && (
                        <div className="space-y-2">
                            <Label htmlFor="query">Wyszukaj paczkomat</Label>

                            <div className="flex gap-2">
                                <Input
                                    id="query"
                                    name="query"
                                    placeholder="np. 01-016 lub Warszawa"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="flex-1"
                                    minLength={2}
                                />
                                <Button onClick={handleGeolocation} size="sm" className="flex-shrink-0">
                                    <MapPin className="h-4 w-4 mr-1" />
                                </Button>
                            </div>
                            {state.errors?.query && <p className="text-sm text-red-600">{state.errors.query[0]}</p>}
                        </div>)
                    }
                    {/* Show selected point */}
                    {localSelectedPoint && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-blue-900">Wybrany paczkomat</h4>
                                    <div className="text-sm text-blue-800 mt-1">
                                        <div className="font-medium">{localSelectedPoint.name}</div>
                                        <div>
                                            {localSelectedPoint.address.line1}, {localSelectedPoint.address.line2}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleClearSelection}
                                    className="text-blue-700 border-blue-300 hover:bg-blue-100 bg-transparent"
                                >
                                    Zmień
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Search Results */}
                    {inpostPoints.length > 0 && !localSelectedPoint && (
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            <Label className="text-sm font-medium">Dostępne paczkomaty ({inpostPoints.length}):</Label>
                            {inpostPoints.map((point) => (
                                <div
                                    key={point.name}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors `}
                                    onClick={() => handlePointSelection(point)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{point.name}</div>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                {point.address.line1}, {point.address.line2}
                                            </div>
                                            {point.location_description && (
                                                <div className="text-xs text-muted-foreground mt-1">{point.location_description}</div>
                                            )}
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center text-xs">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {point.opening_hours}
                                                </div>
                                                {point.easy_access_zone && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Strefa ułatwionego dostępu
                          </span>
                                                )}
                                            </div>
                                        </div>
                                        {point.distance && <div className="text-xs text-muted-foreground">{point.distance} km</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!searching && inpostPoints.length < 1 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Kliknij przycisk wyszukiwania, aby znaleźć paczkomaty</p>
                        </div>
                    )}

                    {/* No results message */}
                    {state.success && inpostPoints.length === 0 && searchQuery && (
                        <div className="text-center py-8 text-muted-foreground">
                            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Nie znaleziono paczkomatów</p>
                            <p className="text-sm">Spróbuj wpisać inny kod pocztowy lub miasto</p>
                        </div>
                    )}

                    {/* Error messages */}
                    {state.errors?.inpost && <p className="text-sm text-red-600">{state.errors.inpost[0]}</p>}

                    {!state.success && state.message && <p className="text-sm text-red-600">{state.message}</p>}
                </CardContent>
            </Card>
        </>
    )
}