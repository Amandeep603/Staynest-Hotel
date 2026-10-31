import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart, ArrowRight } from 'lucide-react'
import type { Hotel } from '../../types'
import { Chip } from '../common/Chip'
import { RatingStars } from '../common/RatingStars'
import { RatingBadge } from '../common/RatingBadge'
import { Button } from '../common/Button'
import { isInWishlist, toggleWishlist, WISHLIST_CHANGE_EVENT } from '../../lib/wishlist'
import { cn } from '../../lib/utils'

export interface HotelCardProps {
  hotel: Hotel
  className?: string
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, className }) => {
  // Wishlist toggle stored in localStorage with real-time sync
  const [isWishlisted, setIsWishlisted] = useState<boolean>(() => isInWishlist(hotel.id))

  useEffect(() => {
    const handleSync = () => {
      setIsWishlisted(isInWishlist(hotel.id))
    }
    window.addEventListener(WISHLIST_CHANGE_EVENT, handleSync)
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, handleSync)
  }, [hotel.id])

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(hotel.id)
  }

  // Display top 2 amenity chips
  const displayedAmenities = hotel.amenities.slice(0, 2)

  return (
    <article
      className={cn(
        'group bg-white rounded-2xl border border-[#E5EAF2] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full',
        className
      )}
    >
      {/* 1. Image on Top: aspect 16/10 (h-48), rounded-t-2xl, object-cover */}
      <div className="relative w-full aspect-[16/10] sm:h-48 overflow-hidden bg-slate-100 rounded-t-2xl shrink-0">
        <Link
          to={`/hotels/${hotel.slug || hotel.id}`}
          className="block w-full h-full"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={hotel.featuredImage}
            alt={`${hotel.name} in ${hotel.area}, Rishikesh`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Heart Toggle: top-right white circle 36px, working localStorage save */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${hotel.name} from wishlist` : `Add ${hotel.name} to wishlist`}
          className="absolute top-3 right-3 w-[36px] h-[36px] rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 z-10 cursor-pointer"
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors',
              isWishlisted
                ? 'text-red-500 fill-red-500'
                : 'text-slate-500 hover:text-red-500'
            )}
          />
        </button>
      </div>

      {/* 2. Body: p-4 flex-col gap-2, flex-1, equal card height */}
      <div className="p-4 flex flex-col flex-1 gap-2 justify-between">
        
        {/* Upper Details Group */}
        <div className="space-y-2">
          {/* Hotel Name: 17px semibold line-clamp-1 + title */}
          <Link
            to={`/hotels/${hotel.slug || hotel.id}`}
            className="block group-hover:text-[#1257D6] transition-colors"
          >
            <h3
              title={hotel.name}
              className="text-[17px] font-semibold text-[#0F172A] leading-snug line-clamp-1"
            >
              {hotel.name}
            </h3>
          </Link>

          {/* Rating Row: 5 stars + blue rating badge + "(512 reviews)" */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <RatingStars rating={hotel.rating} size={14} />
            <RatingBadge rating={hotel.rating} size="sm" />
            <span className="text-[12px] text-[#64748B] whitespace-nowrap">
              ({hotel.reviewsCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Location Row: Pin icon + Area, Rishikesh */}
          <div className="flex items-center gap-1.5 text-[13px] text-[#64748B]">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{hotel.area}, Rishikesh</span>
          </div>

          {/* Amenity Chips Row: 2 amenity chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            {displayedAmenities.map((amenity) => (
              <Chip key={amenity} name={amenity} />
            ))}
          </div>
        </div>

        {/* 3. Divider & Bottom Row: flex justify-between items-center, mt-auto */}
        <div className="pt-3 mt-auto border-t border-[#E5EAF2] flex items-center justify-between gap-3">
          {/* Price on left: ₹7,800 22px bold + / night 13px muted */}
          <div className="flex items-baseline gap-1 whitespace-nowrap min-w-0">
            <span className="text-[22px] font-bold text-[#0F172A] leading-none">
              ₹{hotel.pricePerNight.toLocaleString()}
            </span>
            <span className="text-[13px] text-[#64748B] font-normal leading-none">
              / night
            </span>
          </div>

          {/* Button on right: "View rooms →" */}
          <Button
            to={`/hotels/${hotel.slug || hotel.id}`}
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shrink-0"
          >
            View rooms
          </Button>
        </div>

      </div>
    </article>
  )
}
