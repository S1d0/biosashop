"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Clock, MapPin } from "lucide-react"
import { useState } from "react"
import { getInPostPoints } from "@/lib/actions/inpost/actions"
import {InPostPoint} from "@/types/inpost";
import {useOrderCheckout} from "@/components/checkout/v3/checkout-provider";


export default function InPostSelection() {
    const [searchQuery, setSearchQuery] = useState("")
    const [points, setPoints] = useState<InPostPoint[]>([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {selectedPoint, setSelectedPoint} = useOrderCheckout()

    const handleSearch = async () => {
        if (!searchQuery.trim() || searchQuery.length < 2) {
            setError("Wpisz co najmniej 2 znaki")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const result = await getInPostPoints(searchQuery, null)
            if (result.success) {
                setPoints(result.items)
                if (result.items.length === 0) {
                    setError("Nie znaleziono paczkomatów")
                }
            } else {
                setError(result.message || "Błąd wyszukiwania")
                setPoints([])
            }
        } catch (err) {
            console.error(err)
            setError("Błąd podczas wyszukiwania")
            setPoints([])
        } finally {
            setIsLoading(false)
        }
    }

    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setError("Geolokalizacja nie jest obsługiwana")
            return
        }

        setIsLoading(true)
        setError("")

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                const locationQuery = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`
                setSearchQuery(locationQuery)

                try {
                    const result = await getInPostPoints("", locationQuery)
                    if (result.success) {
                        setPoints(result.items)
                        if (result.items.length === 0) {
                            setError("Nie znaleziono paczkomatów w pobliżu")
                        }
                    } else {
                        setError("Błąd wyszukiwania")
                        setPoints([])
                    }
                } catch (err) {
                    console.error(err)
                    setError("Błąd podczas wyszukiwania")
                    setPoints([])
                } finally {
                    setIsLoading(false)
                }
            },
            () => {
                setError("Nie udało się pobrać lokalizacji")
                setIsLoading(false)
            },
        )
    }

    const handlePointSelection = (point: InPostPoint) => {
        setSelectedPoint(point)
    }

    const handleClearSelection = () => {
        setSelectedPoint(null)
    }

    return (
        <Card className="bg-muted/20">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg">Wybierz paczkomat InPost</CardTitle>
                <CardDescription>Wpisz kod pocztowy lub nazwę miasta, aby znaleźć najbliższe paczkomaty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Selected Point Display */}
                {selectedPoint ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium text-blue-900">Wybrany paczkomat</h4>
                                <div className="text-sm text-blue-800 mt-1">
                                    <div className="font-medium">{selectedPoint.name}</div>
                                    <div>
                                        {selectedPoint.address.line1}, {selectedPoint.address.line2}
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
                ) : (
                    <>
                        {/* Search Input */}
                        <div className="space-y-2">
                            <Label htmlFor="query">Wyszukaj paczkomat</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="query"
                                    placeholder="np. 01-016 lub Warszawa"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <Button onClick={handleSearch} disabled={isLoading || searchQuery.length < 2} size="sm">
                                    Szukaj
                                </Button>
                                <Button onClick={handleGeolocation} disabled={isLoading} variant="outline" size="sm">
                                    <MapPin className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-sm text-red-600">{error}</p>}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="text-center py-8 text-muted-foreground">
                                <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                                <p>Wyszukiwanie paczkomatów...</p>
                            </div>
                        )}

                        {/* Search Results */}
                        {points.length > 0 && !isLoading && (
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                <Label className="text-sm font-medium">Dostępne paczkomaty ({points.length}):</Label>
                                {points.map((point) => (
                                    <div
                                        key={point.name}
                                        className="p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50"
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!isLoading && points.length === 0 && !error && (
                            <div className="text-center py-8 text-muted-foreground">
                                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>Wpisz kod pocztowy lub kliknij geolokalizację</p>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}