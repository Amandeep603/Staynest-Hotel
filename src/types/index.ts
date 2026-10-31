export interface RoomOption {
  id: string
  name: string
  price: number
  originalPrice?: number
  capacity: number
  maxGuests?: number
  bedType: string
  sizeSqFt?: number
  features: string[]
  image?: string
}

export type HotelCategory = 'riverside' | 'yoga' | 'ashram' | 'camping' | 'resort' | 'homestay'

export interface Hotel {
  id: string
  name: string
  slug: string
  tagline?: string
  area: string // e.g., 'Tapovan', 'Laxman Jhula', 'Ram Jhula', 'Shivpuri'
  address: string
  rating: number
  reviewsCount: number
  reviewCount?: number
  pricePerNight: number
  originalPrice?: number
  category: HotelCategory
  featuredImage: string
  images: string[]
  amenities: string[]
  description: string
  tags: string[] // e.g. 'riverside', 'yoga', 'budget', 'luxury', 'rafting'
  propertyType?: string // 'Resort' | 'Boutique Hotel' | 'Ashram & Wellness' | 'Luxury Campsite' | 'Backpacker Hostel'
  badge?: string // e.g., 'Ganga View', 'Top Rated', 'Luxury Resort'
  distanceToGanga?: string
  rooms: RoomOption[]
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface PopularArea {
  id: string
  name: string
  slug: string
  tagline: string // e.g., 'From ₹3,200/night'
  startingPrice: number
  hotelCount: number
  image: string
  description: string
}

export interface SearchParams {
  area?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  priceRange?: [number, number]
}
