import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface RatingBadgeProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
  showStar?: boolean
  className?: string
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showStar = false,
  className,
}) => {
  const formattedRating = Number(rating).toFixed(1)

  const sizeStyles = {
    sm: 'text-[11px] font-bold px-1.5 py-0.5 rounded',
    md: 'text-[12px] font-bold px-2 py-0.5 rounded-md',
  }

  return (
    <div className={cn('inline-flex items-center gap-1.5 shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-1 bg-[#EAF1FD] text-[#1257D6] whitespace-nowrap leading-none',
          sizeStyles[size]
        )}
      >
        {showStar && <Star className="w-3 h-3 fill-current text-current shrink-0" />}
        <span>{formattedRating}</span>
      </span>

      {reviewCount !== undefined && (
        <span className="text-[12px] text-[#64748B] whitespace-nowrap">
          ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  )
}
