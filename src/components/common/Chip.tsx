import React from 'react'
import {
  Wifi,
  Waves,
  Utensils,
  Wind,
  Car,
  Mountain,
  Coffee,
  Flame,
  Dumbbell,
  Tv,
  Flower2,
  Sun,
  Check,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../../lib/utils'

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string
  icon?: LucideIcon | React.ReactNode
  variant?: 'default' | 'outlined' | 'subtle' | 'active'
  className?: string
  interactive?: boolean
  selected?: boolean
}

// Auto-detect icon based on common Rishikesh hotel amenities
const getAmenityIcon = (name: string): LucideIcon => {
  const lower = name.toLowerCase()
  if (lower.includes('wifi') || lower.includes('internet')) return Wifi
  if (lower.includes('ganga') || lower.includes('river') || lower.includes('lake') || lower.includes('water')) return Waves
  if (lower.includes('pool') || lower.includes('swimming')) return Sparkles
  if (lower.includes('yoga') || lower.includes('meditation') || lower.includes('spiritual')) return Sun
  if (lower.includes('spa') || lower.includes('ayurveda') || lower.includes('massage')) return Flower2
  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('breakfast') || lower.includes('dining')) return Utensils
  if (lower.includes('ac') || lower.includes('air condition') || lower.includes('climate')) return Wind
  if (lower.includes('park') || lower.includes('car') || lower.includes('valet')) return Car
  if (lower.includes('mountain') || lower.includes('hill') || lower.includes('valley')) return Mountain
  if (lower.includes('coffee') || lower.includes('tea')) return Coffee
  if (lower.includes('bonfire') || lower.includes('campfire') || lower.includes('fire')) return Flame
  if (lower.includes('gym') || lower.includes('fitness')) return Dumbbell
  if (lower.includes('tv') || lower.includes('television')) return Tv
  if (lower.includes('safe') || lower.includes('security')) return ShieldCheck
  return Check
}

export const Chip: React.FC<ChipProps> = ({
  name,
  icon,
  variant = 'default',
  className,
  interactive = false,
  selected = false,
  onClick,
  ...props
}) => {
  const renderIcon = () => {
    if (React.isValidElement(icon)) return icon
    if (typeof icon === 'function') {
      const IconComp = icon as LucideIcon
      return <IconComp className="w-3.5 h-3.5 shrink-0" />
    }
    const DefaultIcon = getAmenityIcon(name)
    return <DefaultIcon className="w-3.5 h-3.5 shrink-0 text-slate-500" />
  }

  // Exact rule: height 28px, text 12px, px-2.5, whitespace-nowrap
  const baseStyles =
    'h-[28px] px-2.5 text-[12px] font-medium whitespace-nowrap rounded-md inline-flex items-center gap-1.5 transition-colors select-none'

  const variantStyles = {
    default:
      'bg-[#F8FAFC] text-slate-700 border border-[#E5EAF2] hover:bg-slate-100 hover:text-[#0F172A]',
    outlined:
      'bg-white text-slate-700 border border-[#E5EAF2] hover:border-[#1257D6]/40 hover:text-[#1257D6]',
    subtle:
      'bg-[#EAF1FD] text-[#1257D6] border border-[#D0E1FD]',
    active:
      'bg-[#1257D6] text-white border border-[#1257D6]',
  }

  const activeVariant = selected ? 'active' : variant

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[activeVariant],
        interactive && 'cursor-pointer hover:shadow-2xs active:scale-95',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {renderIcon()}
      <span className="truncate">{name}</span>
    </span>
  )
}

