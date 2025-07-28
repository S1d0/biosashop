export interface InPostPoint {
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
    items: InPostPoint[]
    errors: string | null
    message: string | null
}
