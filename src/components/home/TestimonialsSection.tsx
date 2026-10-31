import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import poolViewImg from '../../assets/images/hotels/taj-1.webp'
import priyaImg from '../../assets/images/testimonials/priya.webp'
import rahulImg from '../../assets/images/testimonials/rahul.webp'
import ananyaImg from '../../assets/images/testimonials/ananya.webp'
import vikramImg from '../../assets/images/testimonials/vikram.webp'

interface Testimonial {
  id: string
  name: string
  city: string
  avatar: string
  rating: number
  quote: string
  stay: string
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      city: 'Delhi, India',
      avatar: priyaImg,
      rating: 5.0,
      stay: 'Aloha On The Ganges',
      quote:
        'StayNest made booking our Rishikesh retreat seamless! Waking up to morning yoga right beside the holy Ganga and the infinity pool views were simply unforgettable. Highly recommended!',
    },
    {
      id: '2',
      name: 'Rahul Mehta',
      city: 'Bengaluru, India',
      avatar: rahulImg,
      rating: 4.9,
      stay: 'Camp AquaForest & Rafting',
      quote:
        'Booked our Shivpuri white-water rafting trip and luxury river camp through StayNest. Verified photos and accurate pricing made planning our Himalayan adventure effortless and safe!',
    },
    {
      id: '3',
      name: 'Ananya Deshmukh',
      city: 'Mumbai, India',
      avatar: ananyaImg,
      rating: 5.0,
      stay: 'Modi Yoga Retreat',
      quote:
        'A truly transformative Ayurvedic wellness escape in Tapovan. Authentic vegetarian sattvic meals, serene meditation halls, and peaceful riverfront sunsets away from all city noise.',
    },
    {
      id: '4',
      name: 'Vikram Sengupta',
      city: 'Kolkata, India',
      avatar: vikramImg,
      rating: 4.8,
      stay: 'Divine Ganga Resort',
      quote:
        'Uninterrupted views of Laxman Jhula right from our private balcony. The staff arranged evening Parmarth Niketan Aarti boat transfers for our family. Exceptional hospitality!',
    },
  ]

  // Pair index: 0 -> pair [0, 1], 1 -> pair [1, 2], 2 -> pair [2, 3]
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 2 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 2 ? 0 : prev + 1))
  }

  const firstReview = testimonials[currentIndex]
  const secondReview = testimonials[(currentIndex + 1) % testimonials.length]

  return (
    <section className="w-full section-spacing" id="reviews">
      <div className="site-container">
        {/* Header with Heading & Working Navigation Buttons */}
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#0F172A] tracking-tight leading-tight">
              What our customers say
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-1">
              Real stories from travellers across the world.
            </p>
          </div>

          {/* Prev/Next Arrow Buttons (Working) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-[#E5EAF2] bg-white flex items-center justify-center text-[#0F172A] hover:bg-slate-50 hover:border-[#1257D6] hover:text-[#1257D6] transition-colors cursor-pointer shadow-2xs"
              aria-label="Previous customer review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-[#E5EAF2] bg-white flex items-center justify-center text-[#0F172A] hover:bg-slate-50 hover:border-[#1257D6] hover:text-[#1257D6] transition-colors cursor-pointer shadow-2xs"
              aria-label="Next customer review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop (>=1024px): 3 visible (Review 1 | Center Image Card | Review 2)
            Tablet (768px - 1023px): 2 reviews side-by-side (Review 1 | Review 2)
            Mobile (<768px): 1 visible with smooth carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          
          {/* Card 1: Customer Review 1 */}
          <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
            <div>
              {/* User Avatar + Name + City + 5 Stars & Rating */}
              <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-2.5 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={firstReview.avatar}
                    alt={firstReview.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E5EAF2] shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight truncate">
                      {firstReview.name}
                    </h3>
                    <p className="text-[12px] text-[#64748B] leading-tight mt-0.5">
                      {firstReview.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 px-2 py-1 rounded-md border border-[#E5EAF2]">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#F5A524] fill-[#F5A524]" />
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-[#0F172A]">
                    {firstReview.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-[13px] sm:text-[14px] text-[#334155] leading-relaxed italic">
                &ldquo;{firstReview.quote}&rdquo;
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-[#E5EAF2] text-[11px] font-semibold text-[#1257D6]">
              Stayed at {firstReview.stay}
            </div>
          </div>

          {/* Card 2: Center Image Card (Desktop >= 1024px only) */}
          <div className="hidden lg:block rounded-2xl overflow-hidden shadow-sm h-full min-h-[220px] relative group border border-[#E5EAF2]">
            <img
              src={poolViewImg}
              alt="Himalayan mountain resort and poolside view overlooking Ganga in Rishikesh"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-block text-[10px] uppercase font-bold tracking-wider bg-[#1257D6] px-2 py-0.5 rounded-sm mb-1">
                Featured View
              </span>
              <h4 className="text-[15px] font-bold leading-tight drop-shadow-sm">
                Taj Rishikesh Resort & Spa
              </h4>
              <p className="text-[12px] text-slate-200 drop-shadow-sm">
                Sacred river bend & infinity pool
              </p>
            </div>
          </div>

          {/* Card 3: Customer Review 2 (Tablet & Desktop) */}
          <div className="hidden md:flex bg-white rounded-2xl border border-[#E5EAF2] p-5 sm:p-6 shadow-sm flex-col justify-between h-full">
            <div>
              {/* User Avatar + Name + City + 5 Stars & Rating */}
              <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-2.5 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={secondReview.avatar}
                    alt={secondReview.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E5EAF2] shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight truncate">
                      {secondReview.name}
                    </h3>
                    <p className="text-[12px] text-[#64748B] leading-tight mt-0.5">
                      {secondReview.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 px-2 py-1 rounded-md border border-[#E5EAF2]">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#F5A524] fill-[#F5A524]" />
                    ))}
                  </div>
                  <span className="text-[12px] font-bold text-[#0F172A]">
                    {secondReview.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-[13px] sm:text-[14px] text-[#334155] leading-relaxed italic">
                &ldquo;{secondReview.quote}&rdquo;
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-[#E5EAF2] text-[11px] font-semibold text-[#1257D6]">
              Stayed at {secondReview.stay}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
