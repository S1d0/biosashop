"use server"


import {InpostPointState} from "@/types/inpost";

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

interface InPostApiResponse {
    items: InPostPoint[]
    count: number
    page: number
    per_page: number
    total_pages: number
}

export async function getInPostPoints(query: string, locationQuery: string | null): Promise<InpostPointState> {
    const apiUrl = "https://api-shipx-pl.easypack24.net/v1/points"
    const params = new URLSearchParams()

    console.log("Geolocation ", locationQuery)

    if(locationQuery) {
        params.append("relative_point", locationQuery.replace(/\s/g, ""))
    } else {
        const isPostalCode = /\d/.test(query) && query.includes("-")
        if (isPostalCode) {
            params.append("relative_post_code", query.replace(/\s/g, ""))
        } else {
            params.append("city", query)
        }
    }

    params.append("limit", "5")
    const response = await fetch(`${apiUrl}?${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const data: InPostApiResponse = await response.json()
    return {
        success: true,
        errors: null,
        message: null,
        items: data.items
    }

}