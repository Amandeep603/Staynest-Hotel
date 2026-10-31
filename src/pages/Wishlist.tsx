import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HotelCard } from '../components/home/HotelCard'
import { hotels } from '../data/hotels'
import { getWishlist, WISHLIST_CHANGE_EVENT } from '../lib/wishlist'
import { Heart, Trash2, ArrowRight } from 'lucide-react'

export function Wishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => getWishlist())

  useEffect(() => {
    const handleSync = () => {
      setWishlistIds(getWishlist())
    }
    window.addEventListener(WISHLIST_CHANGE_EVENT, handleSync)
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, handleSync)
  }, [])

  const savedHotels = hotels.filter((h) => wishlistIds.includes(h.id))

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your saved hotels?')) {
      localStorage.setItem('staynest_wishlist', JSON.stringify([]))
      window.dispatchEvent(new CustomEvent(WISHLIST_CHANGE_EVENT, { detail: [] }))
    }
  }

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 section-spacing">
        <div className="site-container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1257D6] mb-1">
                <Heart className="w-3.5 h-3.5 fill-[#1257D6]" />
                <span>Saved Collection</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Your Saved Stays in Rishikesh
              </h1>
              <p className="text-sm text-[#64748B] mt-1">
                {savedHotels.length} {savedHotels.length === 1 ? 'property' : 'properties'} saved for your upcoming spiritual or adventure getaway.
              </p>
            </div>

            {savedHotels.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 transition-colors self-start sm:self-end cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear all saved</span>
              </button>
            )}
          </div>

          {/* Content Grid or Empty State */}
          {savedHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {savedHotels.map((hotel) => (
                <div key={hotel.id} className="h-full">
                  <HotelCard hotel={hotel} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-8 sm:p-12 text-center max-w-md mx-auto shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center mx-auto shadow-2xs">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0F172A]">Your wishlist is currently empty</h2>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 leading-relaxed">
                  Browse our curated riverside resorts, yoga retreats, and heritage ashrams in Rishikesh and tap the heart icon to save your favorites.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/hotels"
                  className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-[#1257D6] hover:bg-[#0D47A1] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
                >
                  <span>Explore stays</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

