import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface RatingStarsProps {
  rating?: number
  maxStars?: number
  size?: number
  className?: string
  showAriaLabel?: boolean
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating = 5,
  maxStars = 5,
  size = 14,
  className,
  showAriaLabel = true,
}) => {
  return (
    <div
      className={cn('inline-flex items-center gap-0.5 text-[#F5A524]', className)}
      role="img"
      aria-label={showAriaLabel ? `Rated ${rating} out of ${maxStars} stars` : undefined}
    >
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="fill-[#F5A524] text-[#F5A524] shrink-0"
        />
      ))}
    </div>
  )
}

