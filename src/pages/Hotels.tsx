import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HotelCard } from '../components/home/HotelCard'
import { hotels } from '../data/hotels'
import {
  MapPin,
  Calendar,
  Users,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import { cn } from '../lib/utils'

export function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL query params
  const areaParam = searchParams.get('area') || 'all'
  const categoryParam = searchParams.get('category') || ''
  const checkinParam = searchParams.get('checkin') || '12 Nov 2026'
  const checkoutParam = searchParams.get('checkout') || '15 Nov 2026'
  const guestsParam = searchParams.get('guests') || '2'

  // Top Search Bar state
  const [searchArea, setSearchArea] = useState<string>(areaParam)
  const [searchCheckin, setSearchCheckin] = useState<string>(checkinParam)
  const [searchCheckout, setSearchCheckout] = useState<string>(checkoutParam)
  const [searchGuests, setSearchGuests] = useState<string>(guestsParam)

  // Keep state in sync with URL
  useEffect(() => {
    setSearchArea(areaParam)
    setSearchCheckin(checkinParam)
    setSearchCheckout(checkoutParam)
    setSearchGuests(guestsParam)
  }, [areaParam, checkinParam, checkoutParam, guestsParam])

  // Filter States
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    areaParam && areaParam !== 'all' && areaParam !== 'rishikesh'
      ? [areaParam]
      : []
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam && categoryParam !== 'all' ? [categoryParam] : []
  )
  const [priceMax, setPriceMax] = useState<number>(30000)
  const [minRating, setMinRating] = useState<number>(0)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating-desc'>('popular')

  // Keep categories in sync with categoryParam
  useEffect(() => {
    if (categoryParam && categoryParam !== 'all') {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  // Category Options
  const categoryOptions = [
    { id: 'riverside', label: 'Riverside Stays' },
    { id: 'yoga', label: 'Yoga & Wellness' },
    { id: 'ashram', label: 'Ashram Stays' },
    { id: 'camping', label: 'Camping & Rafting' },
    { id: 'resort', label: 'Luxury Resorts' },
    { id: 'homestay', label: 'Homestays' },
  ]

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Rishikesh Areas list for filters
  const areaOptions = [
    { id: 'tapovan', label: 'Tapovan' },
    { id: 'laxman-jhula', label: 'Laxman Jhula' },
    { id: 'ram-jhula', label: 'Ram Jhula' },
    { id: 'shivpuri', label: 'Shivpuri' },
  ]

  // Amenity Options
  const amenityOptions = [
    'River view',
    'Pool',
    'Wi-Fi',
    'Breakfast',
    'Yoga',
  ]

  // Property Type Options
  const propertyTypeOptions = [
    'Resort',
    'Boutique Hotel',
    'Ashram & Wellness',
    'Luxury Campsite',
    'Backpacker Hostel',
  ]

  // Handle Area Checkbox Toggle
  const toggleArea = (id: string) => {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  // Handle Amenity Checkbox Toggle
  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    )
  }

  // Handle Property Type Toggle
  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  // Handle Category Toggle
  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedAreas([])
    setSelectedCategories([])
    setPriceMax(30000)
    setMinRating(0)
    setSelectedAmenities([])
    setSelectedPropertyTypes([])
    setSortBy('popular')
    setSearchParams({ area: 'all', checkin: searchCheckin, checkout: searchCheckout, guests: searchGuests })
  }

  // Apply Top Search
  const handleTopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams({
      area: searchArea,
      checkin: searchCheckin,
      checkout: searchCheckout,
      guests: searchGuests,
    })
    if (searchArea && searchArea !== 'all' && searchArea !== 'rishikesh') {
      setSelectedAreas([searchArea])
    } else {
      setSelectedAreas([])
    }
  }

  // Filter & Sort Logic
  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        // Area filter: checks selectedAreas array or URL area
        if (selectedAreas.length > 0) {
          const areaMatch = selectedAreas.some((a) =>
            hotel.area.toLowerCase().replace(/\s+/g, '-').includes(a.toLowerCase()) ||
            a.toLowerCase().includes(hotel.area.toLowerCase().replace(/\s+/g, '-'))
          )
          if (!areaMatch) return false
        } else if (areaParam && areaParam !== 'all' && areaParam !== 'rishikesh') {
          const areaMatch =
            hotel.area.toLowerCase().replace(/\s+/g, '-').includes(areaParam.toLowerCase()) ||
            areaParam.toLowerCase().includes(hotel.area.toLowerCase().replace(/\s+/g, '-'))
          if (!areaMatch) return false
        }

        // Category filter: checks selectedCategories array or URL param
        if (selectedCategories.length > 0) {
          const catMatch = selectedCategories.some((cat) => {
            const c = cat.toLowerCase()
            return (
              hotel.category?.toLowerCase() === c ||
              hotel.tags.some((t) => t.toLowerCase() === c) ||
              (c === 'camping' && (hotel.category === 'camping' || hotel.tags.includes('rafting')))
            )
          })
          if (!catMatch) return false
        } else if (categoryParam && categoryParam !== 'all') {
          const cat = categoryParam.toLowerCase()
          const catMatch =
            hotel.category?.toLowerCase() === cat ||
            hotel.tags.some((t) => t.toLowerCase() === cat) ||
            (cat === 'camping' && (hotel.category === 'camping' || hotel.tags.includes('rafting')))
          if (!catMatch) return false
        }

        // Price filter
        if (hotel.pricePerNight > priceMax) return false

        // Rating filter
        if (minRating > 0 && hotel.rating < minRating) return false

        // Amenities filter (must contain all selected amenities)
        if (selectedAmenities.length > 0) {
          const hasAllAmenities = selectedAmenities.every((amenity) =>
            hotel.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
          )
          if (!hasAllAmenities) return false
        }

        // Property type filter
        if (selectedPropertyTypes.length > 0) {
          if (!hotel.propertyType || !selectedPropertyTypes.includes(hotel.propertyType)) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight
        if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight
        if (sortBy === 'rating-desc') return b.rating - a.rating
        // 'popular' default: by rating * reviews
        return b.rating * b.reviewsCount - a.rating * a.reviewsCount
      })
  }, [
    selectedAreas,
    areaParam,
    selectedCategories,
    categoryParam,
    priceMax,
    minRating,
    selectedAmenities,
    selectedPropertyTypes,
    sortBy,
  ])

  // Subtle loading skeletons state during search / filter updates
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 250)
    return () => clearTimeout(timer)
  }, [
    selectedAreas,
    selectedCategories,
    priceMax,
    minRating,
    selectedAmenities,
    selectedPropertyTypes,
    sortBy,
    areaParam,
    categoryParam,
  ])

  // Active filter count
  const activeFilterCount =
    selectedAreas.length +
    selectedCategories.length +
    (priceMax < 30000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedAmenities.length +
    selectedPropertyTypes.length

  // Filter Sidebar Content (shared between desktop sidebar and mobile drawer)
  const renderFilterSidebar = () => (
    <div className="space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-navy text-base">Filters</h3>
        </div>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Price Range */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold text-navy text-xs uppercase tracking-wider">
            Max Price / night
          </label>
          <span className="font-extrabold text-primary text-sm">
            ₹{priceMax.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={30000}
          step={500}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-muted mt-1">
          <span>₹1,000</span>
          <span>₹15,000</span>
          <span>₹30,000+</span>
        </div>
      </div>

      {/* 2. Star Rating */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-2.5">
          Guest Rating
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.8, label: '4.8+ Exceptional' },
            { val: 4.5, label: '4.5+ Wonderful' },
            { val: 4.0, label: '4.0+ Very Good' },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => setMinRating(r.val)}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors border',
                minRating === r.val
                  ? 'bg-primary-light text-primary border-primary/50 font-bold'
                  : 'bg-white text-slate-700 border-border hover:bg-page'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Locality / Area */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-2.5">
          Rishikesh Area
        </h4>
        <div className="space-y-2">
          {areaOptions.map((area) => {
            const isChecked = selectedAreas.includes(area.id)
            return (
              <label
                key={area.id}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 hover:text-navy cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArea(area.id)}
                  className="rounded border-slate-300 text-primary focus:ring-primary/30 w-4 h-4 cursor-pointer"
                />
                <span>{area.label}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 4. Stay Category */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-2.5">
          Stay Category
        </h4>
        <div className="space-y-2">
          {categoryOptions.map((cat) => {
            const isChecked = selectedCategories.includes(cat.id)
            return (
              <label
                key={cat.id}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 hover:text-navy cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(cat.id)}
                  className="rounded border-slate-300 text-primary focus:ring-primary/30 w-4 h-4 cursor-pointer"
                />
                <span>{cat.label}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 5. Popular Amenities */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-2.5">
          Amenities
        </h4>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity)
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 hover:text-navy cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded border-slate-300 text-primary focus:ring-primary/30 w-4 h-4 cursor-pointer"
                />
                <span>{amenity}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 5. Property Type */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-2.5">
          Property Type
        </h4>
        <div className="space-y-2">
          {propertyTypeOptions.map((type) => {
            const isChecked = selectedPropertyTypes.includes(type)
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 hover:text-navy cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => togglePropertyType(type)}
                  className="rounded border-slate-300 text-primary focus:ring-primary/30 w-4 h-4 cursor-pointer"
                />
                <span>{type}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      {/* Compact Prefilled Top Search Bar */}
      <section className="bg-white border-b border-border py-4 shadow-2xs">
        <div className="site-container">
          <form
            onSubmit={handleTopSearchSubmit}
            className="bg-page border border-border rounded-xl p-2 sm:p-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 items-center"
          >
            {/* Area */}
            <div className="lg:col-span-4 flex items-center gap-2.5 px-3 py-1.5 bg-white rounded-lg border border-border/70">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase font-bold text-muted">Destination</span>
                <select
                  value={searchArea}
                  onChange={(e) => setSearchArea(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-navy focus:outline-none cursor-pointer"
                >
                  <option value="all">All Rishikesh</option>
                  <option value="tapovan">Tapovan</option>
                  <option value="laxman-jhula">Laxman Jhula</option>
                  <option value="ram-jhula">Ram Jhula</option>
                  <option value="shivpuri">Shivpuri</option>
                </select>
              </div>
            </div>

            {/* Check-in */}
            <div className="lg:col-span-3 flex items-center gap-2.5 px-3 py-1.5 bg-white rounded-lg border border-border/70">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase font-bold text-muted">Dates</span>
                <input
                  type="text"
                  value={`${searchCheckin} - ${searchCheckout}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('-')
                    if (parts[0]) setSearchCheckin(parts[0].trim())
                    if (parts[1]) setSearchCheckout(parts[1].trim())
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-navy focus:outline-none"
                  placeholder="Dates"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="lg:col-span-3 flex items-center gap-2.5 px-3 py-1.5 bg-white rounded-lg border border-border/70">
              <Users className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase font-bold text-muted">Guests</span>
                <select
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-navy focus:outline-none cursor-pointer"
                >
                  <option value="1">1 Adult · 1 Room</option>
                  <option value="2">2 Adults · 1 Room</option>
                  <option value="3">3 Adults · 1 Room</option>
                  <option value="4">4 Guests · 2 Rooms</option>
                  <option value="5">5+ Guests · Multi-room</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full h-10 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Content: Left Filter Sidebar + Right Stays Listing */}
      <main className="flex-1 py-8">
        <div className="site-container">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between gap-4 mb-4">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-border font-semibold text-xs sm:text-sm text-navy shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Mobile Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-white border border-border rounded-lg px-2.5 py-1.5 text-navy focus:outline-none"
              >
                <option value="popular">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Desktop Left Sidebar Filters */}
            <aside className="hidden lg:block lg:col-span-1 bg-white rounded-2xl border border-border p-5 shadow-xs sticky top-24">
              {renderFilterSidebar()}
            </aside>

            {/* Right Side: Results Header & Hotel Cards */}
            <div className="lg:col-span-3 space-y-5">
              {/* Desktop Results Header */}
              <div className="bg-white rounded-xl border border-border px-5 py-3.5 shadow-2xs flex items-center justify-between">
                <div>
                  <h1 className="text-base sm:text-lg font-extrabold text-navy">
                    {filteredHotels.length} {filteredHotels.length === 1 ? 'stay' : 'stays'} available in Rishikesh
                  </h1>
                  <p className="text-xs text-muted mt-0.5">
                    Prices include taxes and fees · Verified Rishikesh properties
                  </p>
                </div>

                {/* Sort Dropdown */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-muted">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-xs sm:text-sm font-semibold bg-page hover:bg-slate-100 border border-border rounded-xl px-3.5 py-2 text-navy focus:outline-none appearance-none pr-8 cursor-pointer"
                    >
                      <option value="popular">Recommended</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating-desc">Rating: High to Low</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Hotel Cards List: Skeletons while loading, or Grid / Empty State */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-border overflow-hidden shadow-2xs animate-pulse flex flex-col"
                    >
                      <div className="h-48 bg-slate-200" />
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="h-5 bg-slate-200 rounded w-3/4" />
                          <div className="h-4 bg-slate-200 rounded w-1/2" />
                          <div className="h-3.5 bg-slate-200 rounded w-2/5" />
                          <div className="flex gap-2 pt-1">
                            <div className="h-6 w-16 bg-slate-100 rounded-md" />
                            <div className="h-6 w-20 bg-slate-100 rounded-md" />
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="h-6 w-24 bg-slate-200 rounded" />
                          <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-16 bg-white rounded-2xl border border-border p-8 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-navy mb-1.5">
                    No properties match your exact filters
                  </h2>
                  <p className="text-sm text-muted max-w-md mx-auto mb-5 leading-relaxed">
                    We could not find any stays matching all of your filter criteria in Rishikesh. Try widening your price range or clearing filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Clear all filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-navy/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
                <h3 className="font-bold text-navy text-base">Filter Stays</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderFilterSidebar()}
            </div>

            <div className="pt-4 border-t border-border mt-6">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-primary text-white font-semibold text-sm rounded-xl"
              >
                Show {filteredHotels.length} Stays
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
