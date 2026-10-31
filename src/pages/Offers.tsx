import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react'

interface Offer {
  id: string
  title: string
  badge: string
  discount: string
  code: string
  validTill: string
  description: string
  terms: string
  category: string
}

export function Offers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const offers: Offer[] = [
    {
      id: '1',
      title: 'Luxury Riverside Sanctuary Special',
      badge: 'Bestseller',
      discount: '25% OFF',
      code: 'GANGA25',
      validTill: '31 Dec 2026',
      description:
        'Enjoy flat 25% discount on stays of 2 nights or more at Aloha On The Ganges, The Roseate Ganges, and Divine Resort.',
      terms: 'Valid on deluxe river-facing rooms & suites. Complimentary yoga session included.',
      category: 'riverside',
    },
    {
      id: '2',
      title: 'Shivpuri Adventure & White-Water Rafting Combo',
      badge: 'Adventure Deal',
      discount: 'Flat ₹1,500 OFF',
      code: 'RAFT1500',
      validTill: '15 Jan 2027',
      description:
        'Save ₹1,500 on all luxury riverside tent & cottage bookings in Shivpuri, including guided 16km rafting down the Ganges.',
      terms: 'Minimum booking value ₹6,000. Includes equipment, guide & evening bonfire.',
      category: 'camping',
    },
    {
      id: '3',
      title: 'Spiritual Ashram & Yoga Immersion Pass',
      badge: 'Wellness Retreat',
      discount: '30% OFF',
      code: 'YOGA30',
      validTill: '28 Feb 2027',
      description:
        'Special discounts for spiritual seekers staying 5+ nights at verified yoga sanctuaries and wellness ashrams.',
      terms: 'Includes all organic sattvic vegetarian meals and two daily group yoga sessions.',
      category: 'yoga',
    },
    {
      id: '4',
      title: 'Early Bird Weekend Escapes',
      badge: 'Limited Time',
      discount: '20% OFF',
      code: 'RISHIWEEKEND',
      validTill: '31 Mar 2027',
      description:
        'Book at least 14 days in advance for Friday to Sunday getaways and get free room upgrade to higher floor river view.',
      terms: 'Subject to room availability upon check-in. Free cancellation up to 48 hours before arrival.',
      category: 'resort',
    },
  ]

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 section-spacing">
        <div className="site-container">
          
          {/* Header */}
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1257D6] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>StayNest Deals & Coupons</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">
              Exclusive Rishikesh Offers
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2">
              Save more on verified riverside resorts, yoga ashrams, and adventure rafting camps with our seasonal promotion codes.
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => {
              const isCopied = copiedCode === offer.code
              return (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#EEF3FD] text-[#1257D6] text-xs font-bold">
                        {offer.badge}
                      </span>
                      <span className="text-xs text-[#64748B]">Valid till {offer.validTill}</span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#1257D6]">
                        {offer.discount}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A] mb-1.5">{offer.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {offer.description}
                    </p>

                    <div className="bg-[#F8FAFC] border border-[#E5EAF2] p-3 rounded-xl mb-4">
                      <p className="text-[11px] text-[#64748B] italic">Terms: {offer.terms}</p>
                    </div>
                  </div>

                  {/* Coupon Copy & Apply button */}
                  <div className="pt-3 border-t border-[#E5EAF2] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleCopy(offer.code)}
                      className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-dashed border-[#1257D6] bg-[#F4F8FE] text-[#1257D6] hover:bg-[#E8F0FE] text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{offer.code}</span>
                      <span className="text-[10px] text-slate-500 font-sans font-normal ml-1">
                        {isCopied ? 'Copied!' : 'Copy'}
                      </span>
                    </button>

                    <Link
                      to={`/hotels?category=${offer.category}`}
                      className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#1257D6] hover:bg-[#0D47A1] text-white text-xs font-semibold transition-colors"
                    >
                      <span>Explore stays</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
