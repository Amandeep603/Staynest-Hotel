import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  LayoutGrid,
  Waves,
  Flower2,
  Landmark,
  Tent,
  Umbrella,
  Home as HomeIcon,
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface CategoryTile {
  slug: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export const CategorySection: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Active state synced with URL ?category=
  const activeCategory = searchParams.get('category') || 'all'

  // 7 Tiles as specified
  const categories: CategoryTile[] = [
    { slug: 'all', label: 'All stays', icon: LayoutGrid },
    { slug: 'riverside', label: 'Riverside', icon: Waves },
    { slug: 'yoga', label: 'Yoga retreats', icon: Flower2 },
    { slug: 'ashram', label: 'Ashram stays', icon: Landmark },
    { slug: 'camping', label: 'Camping & rafting', icon: Tent },
    { slug: 'resort', label: 'Resorts', icon: Umbrella },
    { slug: 'homestay', label: 'Homestays', icon: HomeIcon },
  ]

  const handleCategoryClick = (slug: string) => {
    if (slug === 'all') {
      navigate('/hotels')
    } else {
      navigate(`/hotels?category=${slug}`)
    }
  }

  return (
    <section className="w-full section-spacing" id="categories">
      <div className="site-container">
        {/* Heading + Subtitle */}
        <div className="mb-6">
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#0F172A] tracking-tight leading-tight">
            Explore stays by category
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-1">
            Find the perfect stay, whatever the vibe.
          </p>
        </div>

        {/* 7 Tiles: Desktop 7 cols, Tablet 4 cols, Mobile horizontal scroll */}
        <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-3 pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isSelected = activeCategory === cat.slug

            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => handleCategoryClick(cat.slug)}
                className={cn(
                  'h-[92px] w-[130px] sm:w-auto shrink-0 snap-start rounded-xl border flex flex-col items-center justify-center gap-2 p-3 transition-all duration-200 cursor-pointer text-center group shadow-2xs',
                  isSelected
                    ? 'bg-[#EAF1FD] border-[#1257D6] text-[#1257D6] shadow-xs ring-1 ring-[#1257D6]'
                    : 'bg-white border-[#E5EAF2] text-[#0F172A] hover:border-slate-300 hover:bg-slate-50/70'
                )}
              >
                <div
                  className={cn(
                    'w-[34px] h-[34px] rounded-lg flex items-center justify-center transition-colors',
                    isSelected ? 'text-[#1257D6]' : 'text-[#64748B] group-hover:text-[#1257D6]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    'text-[13px] font-semibold leading-tight whitespace-nowrap',
                    isSelected ? 'text-[#1257D6]' : 'text-[#0F172A] group-hover:text-[#1257D6]'
                  )}
                >
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
