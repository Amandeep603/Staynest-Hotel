import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { hotels } from '../data/hotels'
import { Chip } from '../components/common/Chip'
import { RatingBadge } from '../components/common/RatingBadge'
import { RatingStars } from '../components/common/RatingStars'
import { Button } from '../components/common/Button'
import { isInWishlist, toggleWishlist, WISHLIST_CHANGE_EVENT } from '../lib/wishlist'
import {
  MapPin,
  Share2,
  Heart,
  CheckCircle2,
  Users,
  Bed,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Waves,
  Maximize2,
} from 'lucide-react'
import { cn } from '../lib/utils'

export function HotelDetails() {
  const { id } = useParams<{ id: string }>()
  const hotel = hotels.find((h) => h.id === id || h.slug === id) || hotels[0]

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Wishlist sync
  const [isWishlisted, setIsWishlisted] = useState<boolean>(() => isInWishlist(hotel.id))
  useEffect(() => {
    const handleSync = () => setIsWishlisted(isInWishlist(hotel.id))
    window.addEventListener(WISHLIST_CHANGE_EVENT, handleSync)
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, handleSync)
  }, [hotel.id])

  // Booking Card States
  const [nights, setNights] = useState<number>(3)
  const [checkInStr] = useState<string>('12 Nov 2026')
  const [checkOutStr] = useState<string>('15 Nov 2026')
  const [guestCount, setGuestCount] = useState<number>(2)

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    hotel.rooms && hotel.rooms.length > 0 ? hotel.rooms[0].id : 'default'
  )
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingRefId, setBookingRefId] = useState<string>('')

  // Guest details form
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')

  const selectedRoom =
    hotel.rooms?.find((r) => r.id === selectedRoomId) ||
    hotel.rooms?.[0] || {
      id: 'default',
      name: 'Deluxe Room',
      price: hotel.pricePerNight,
      capacity: 2,
      maxGuests: 2,
      bedType: '1 King Bed',
      sizeSqFt: 350,
      features: ['Free Wi-Fi', 'Complimentary Breakfast', 'River View', 'Air Conditioned'],
    }

  // Price calculations: nights x price + 12% GST
  const roomPricePerNight = selectedRoom.price || hotel.pricePerNight
  const subtotal = roomPricePerNight * nights
  const taxAmount = Math.round(subtotal * 0.12)
  const totalPayable = subtotal + taxAmount

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ref = `SN-RSH-${Math.floor(100000 + Math.random() * 900000)}`
    setBookingRefId(ref)
    setBookingSuccess(true)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: hotel.name, url: window.location.href }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Lightbox handlers
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1))
  }
  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 py-6 sm:py-8">
        <div className="site-container">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4 flex-wrap">
            <Link to="/" className="hover:text-[#1257D6] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/hotels" className="hover:text-[#1257D6] transition-colors">
              Hotels in Rishikesh
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#0F172A] truncate max-w-xs">{hotel.name}</span>
          </nav>

          {/* Hotel Title & Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {hotel.badge && (
                  <span className="bg-[#EAF1FD] text-[#1257D6] text-xs font-bold px-2.5 py-0.5 rounded-md">
                    {hotel.badge}
                  </span>
                )}
                {hotel.category && (
                  <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-md capitalize">
                    {hotel.category} stay
                  </span>
                )}
                <span className="text-xs text-[#64748B] flex items-center gap-1 font-medium">
                  <Waves className="w-3.5 h-3.5 text-[#1257D6]" />
                  <span>{hotel.distanceToGanga || 'Ganga Riverfront'}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">
                {hotel.name}
              </h1>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#64748B] mt-2.5 flex-wrap">
                <RatingStars rating={hotel.rating} size={14} />
                <RatingBadge rating={hotel.rating} size="sm" />
                <span>({hotel.reviewsCount.toLocaleString()} reviews)</span>
                <span>·</span>
                <div className="flex items-center gap-1 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-[#1257D6] shrink-0" />
                  <span>{hotel.address}</span>
                </div>
              </div>
            </div>

            {/* Share and Wishlist Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleShare}
                className="w-10 h-10 rounded-xl bg-white border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:text-[#1257D6] hover:border-[#1257D6]/50 transition-colors shadow-2xs cursor-pointer"
                aria-label="Share this hotel"
                title="Share property"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(hotel.id)}
                className="w-10 h-10 rounded-xl bg-white border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:text-red-500 hover:border-red-200 transition-colors shadow-2xs cursor-pointer"
                aria-label="Save to wishlist"
                title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
              >
                <Heart
                  className={cn(
                    'w-4 h-4 transition-colors',
                    isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-600'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Interactive Image Gallery with Lightbox trigger */}
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden h-[340px] sm:h-[420px]">
              
              {/* Main Active Large Photo */}
              <div
                onClick={() => setLightboxOpen(true)}
                className="md:col-span-2 h-full overflow-hidden bg-slate-100 relative group cursor-pointer"
              >
                <img
                  src={hotel.images[activeImageIndex] || hotel.featuredImage}
                  alt={`${hotel.name} in ${hotel.area}, Rishikesh`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5 text-[#1257D6]" />
                    <span>View fullscreen lightbox</span>
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg backdrop-blur-xs">
                  Photo {activeImageIndex + 1} of {hotel.images.length}
                </span>
              </div>

              {/* Thumbnails Column 1 */}
              <div className="hidden md:flex flex-col gap-3 h-full">
                {hotel.images.slice(1, 3).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx + 1)}
                    className={cn(
                      'h-1/2 overflow-hidden bg-slate-100 rounded-xl relative cursor-pointer group text-left border border-[#E5EAF2]',
                      activeImageIndex === idx + 1 && 'ring-2 ring-[#1257D6] ring-offset-2'
                    )}
                  >
                    <img
                      src={img}
                      alt={`${hotel.name} view ${idx + 2}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>

              {/* Thumbnails Column 2 */}
              <div className="hidden md:flex flex-col gap-3 h-full">
                {(hotel.images[3] ? [hotel.images[3]] : [hotel.images[0]]).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (hotel.images[3]) setActiveImageIndex(3)
                      else setLightboxOpen(true)
                    }}
                    className={cn(
                      'h-full overflow-hidden bg-slate-100 rounded-xl relative cursor-pointer group text-left border border-[#E5EAF2]',
                      activeImageIndex === 3 && 'ring-2 ring-[#1257D6] ring-offset-2'
                    )}
                  >
                    <img
                      src={img}
                      alt={`${hotel.name} view 4`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-white text-xs font-bold gap-1 group-hover:bg-black/45 transition-colors">
                      <Maximize2 className="w-4 h-4" />
                      <span>All {hotel.images.length} Photos</span>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Fullscreen Lightbox Modal */}
          {lightboxOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl flex flex-col items-center">
                <img
                  src={hotel.images[activeImageIndex] || hotel.featuredImage}
                  alt={`${hotel.name} fullscreen`}
                  className="max-w-full max-h-[75vh] object-contain rounded-xl"
                />
                <div className="mt-3 text-white text-sm font-medium">
                  {hotel.name} — Photo {activeImageIndex + 1} of {hotel.images.length}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Main 2-Column Content Layout: Left 8 cols Details, Right 4 cols Sticky Booking Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Description */}
              <section className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0F172A] mb-3">About this Rishikesh Stay</h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {hotel.description}
                </p>
              </section>

              {/* Amenities Grid */}
              <section className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">Property Amenities</h2>
                <div className="flex flex-wrap gap-2.5">
                  {hotel.amenities.map((amenity) => (
                    <Chip key={amenity} name={amenity} />
                  ))}
                </div>
              </section>

              {/* Rooms List with Select Button */}
              <section className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm" id="rooms">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-[#0F172A]">Available Room Options</h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                    Select your preferred room to calculate total pricing and reserve instantly.
                  </p>
                </div>

                <div className="space-y-4">
                  {hotel.rooms && hotel.rooms.length > 0 ? (
                    hotel.rooms.map((room) => {
                      const isSelected = selectedRoom.id === room.id
                      return (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoomId(room.id)}
                          className={cn(
                            'p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row justify-between gap-4',
                            isSelected
                              ? 'border-[#1257D6] bg-[#EEF3FD]/40 ring-1 ring-[#1257D6]'
                              : 'border-[#E5EAF2] hover:border-slate-300 hover:bg-slate-50/50'
                          )}
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-[#0F172A] text-base">{room.name}</h3>
                              {isSelected && (
                                <span className="bg-[#1257D6] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Selected
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-[#64748B] flex-wrap">
                              <span className="flex items-center gap-1">
                                <Bed className="w-3.5 h-3.5 text-slate-500" />
                                {room.bedType}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-slate-500" />
                                Max {room.capacity || room.maxGuests} Guests
                              </span>
                              {room.sizeSqFt && <span>{room.sizeSqFt} sq. ft.</span>}
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 text-xs text-slate-700">
                              {room.features.map((feat, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Price & Select Button */}
                          <div className="flex sm:flex-col justify-between sm:items-end sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E5EAF2] shrink-0">
                            <div className="sm:text-right">
                              <div className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                                ₹{room.price.toLocaleString()}
                              </div>
                              <span className="text-xs text-[#64748B]">per night</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedRoomId(room.id)
                              }}
                              className={cn(
                                'h-9 px-4 rounded-lg text-xs font-semibold transition-all mt-2 cursor-pointer',
                                isSelected
                                  ? 'bg-[#1257D6] text-white'
                                  : 'border border-[#D0E1FD] bg-[#F4F8FE] text-[#1257D6] hover:bg-[#E8F0FE]'
                              )}
                            >
                              {isSelected ? 'Room Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="p-4 rounded-xl border border-[#E5EAF2] bg-slate-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-[#0F172A]">Deluxe Ganga Valley Room</h3>
                          <p className="text-xs text-[#64748B]">King Bed · 2 Guests · Free Breakfast</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-[#0F172A]">₹{hotel.pricePerNight.toLocaleString()}</span>
                          <span className="text-xs text-[#64748B] block">/ night</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right 4 Cols: Sticky Booking Card with Calculation */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm sticky top-24 space-y-4">
                
                {/* Header Price */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                        ₹{roomPricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#64748B]"> / night</span>
                    </div>
                    {hotel.originalPrice && (
                      <span className="text-xs text-[#64748B] line-through">
                        ₹{hotel.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    Best price guaranteed for Rishikesh
                  </p>
                </div>

                {/* Reservation Summary */}
                <div className="space-y-2.5 text-xs text-slate-700 border-t border-b border-[#E5EAF2] py-4">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Selected Room</span>
                    <span className="font-semibold text-[#0F172A] truncate max-w-[170px]">
                      {selectedRoom.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Check-in</span>
                    <span className="font-semibold text-[#0F172A]">{checkInStr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Check-out</span>
                    <span className="font-semibold text-[#0F172A]">{checkOutStr}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Duration</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={nights <= 1}
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-[#0F172A]">{nights} nights</span>
                      <button
                        type="button"
                        disabled={nights >= 14}
                        onClick={() => setNights(nights + 1)}
                        className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Guests</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={guestCount <= 1}
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-[#0F172A]">{guestCount} adults</span>
                      <button
                        type="button"
                        disabled={guestCount >= 6}
                        onClick={() => setGuestCount(guestCount + 1)}
                        className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total Price Calculation: nights x price + taxes */}
                <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-[#E5EAF2]">
                  <div className="flex justify-between">
                    <span>₹{roomPricePerNight.toLocaleString()} × {nights} nights</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#64748B]">
                    <span>Taxes & GST (12%)</span>
                    <span>₹{taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E5EAF2] flex justify-between font-bold text-sm text-[#0F172A]">
                    <span>Total payable</span>
                    <span className="text-[#1257D6]">₹{totalPayable.toLocaleString()}</span>
                  </div>
                </div>

                {/* "Book now" button */}
                <Button
                  fullWidth
                  size="lg"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full text-base font-bold shadow-xs"
                >
                  Book now
                </Button>

                <div className="text-center space-y-1">
                  <p className="text-[11px] text-[#64748B]">
                    No immediate payment required · Free cancellation up to 48 hours
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Booking Confirmation Dummy Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E5EAF2] shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setBookingModalOpen(false)
                setBookingSuccess(false)
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1257D6]">
                    Instant Reservation
                  </span>
                  <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">
                    Confirm your stay at {hotel.name}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {selectedRoom.name} · {nights} nights · ₹{totalPayable.toLocaleString()} total
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Full Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full h-10 px-3.5 text-sm rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1257D6] focus:border-[#1257D6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Email Address (for instant voucher) *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full h-10 px-3.5 text-sm rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1257D6] focus:border-[#1257D6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Phone Number (WhatsApp confirmation) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-10 px-3.5 text-sm rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1257D6] focus:border-[#1257D6]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" fullWidth size="lg">
                    Confirm & Complete Booking
                  </Button>
                </div>
              </form>
            ) : (
              /* Success Screen */
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Booking Confirmed!</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Your reservation at <strong className="text-[#0F172A]">{hotel.name}</strong> is confirmed.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-[#E5EAF2] p-4 rounded-xl text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Booking Reference:</span>
                    <span className="font-mono font-bold text-[#1257D6]">{bookingRefId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Guest:</span>
                    <span className="font-semibold text-[#0F172A]">{guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Room:</span>
                    <span className="font-semibold text-[#0F172A]">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Check-in Date:</span>
                    <span className="font-semibold text-[#0F172A]">{checkInStr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Total Amount:</span>
                    <span className="font-bold text-[#0F172A]">₹{totalPayable.toLocaleString()} (Pay at hotel)</span>
                  </div>
                </div>

                <Button
                  fullWidth
                  onClick={() => {
                    setBookingModalOpen(false)
                    setBookingSuccess(false)
                  }}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
