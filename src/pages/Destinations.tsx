import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { popularAreas } from '../data/areas'
import { MapPin, ArrowRight, Waves, CheckCircle2 } from 'lucide-react'

export function Destinations() {
  const areaGuides = [
    {
      ...popularAreas[0], // Laxman Jhula
      highlights: [
        'Panoramic views of the historic 1929 suspension bridge',
        'Cliffside organic cafes and German bakeries',
        'Iconic 13-story Trayambakeshwar (Tera Manzil) Temple',
        'Direct foot trails connecting to Tapovan and riverside ghats',
      ],
    },
    {
      ...popularAreas[1], // Tapovan
      highlights: [
        'World capital of Yoga Teacher Training (YTT) and meditation',
        'Trendy bohemian cafe culture and international cuisine',
        'Easy walking access to Secret Waterfall and jungle trails',
        'Panoramic mountain backdrop with Shivalik foothill views',
      ],
    },
    {
      ...popularAreas[2], // Ram Jhula / Swarg Ashram
      highlights: [
        'Parmarth Niketan world-renowned evening Ganga Aarti',
        'Historic Beatles Ashram (Chaurasi Kutia) in Rajaji National Park',
        'Spiritual bookshops, Ayurvedic pharmacies, and serene ashrams',
        'Pedestrian-only peaceful promenade along the holy river',
      ],
    },
    {
      ...popularAreas[3], // Shivpuri
      highlights: [
        'India’s epicenter for white-water rafting on Class III/IV rapids',
        'Private white sand beaches along crystal clear river bends',
        'Luxury riverside campsites and bonfire stargazing',
        'Bungee jumping, zip-lining, and rock climbing activities',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 section-spacing">
        <div className="site-container">
          
          {/* Header */}
          <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1257D6] mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Rishikesh Locality Guide</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">
              Popular Areas in Rishikesh
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2">
              From peaceful spiritual ashrams along sacred ghats to adrenaline-filled rafting beaches, discover the distinct character of each neighborhood in Devbhoomi Rishikesh.
            </p>
          </div>

          {/* Area Guide Cards */}
          <div className="space-y-8">
            {areaGuides.map((area, index) => (
              <div
                key={area.id}
                className="bg-white rounded-2xl border border-[#E5EAF2] overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Left Photo (Aspect 16:10 or full height) */}
                <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] overflow-hidden bg-slate-100">
                  <img
                    src={area.image}
                    alt={`${area.name} in Rishikesh, Uttarakhand`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-bold text-[#0F172A] shadow-xs">
                    Area #{index + 1}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xs p-2.5 rounded-xl text-white flex justify-between items-center text-xs">
                    <span>Starting from</span>
                    <span className="font-bold text-sm">₹{area.startingPrice.toLocaleString()} / night</span>
                  </div>
                </div>

                {/* Right Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1257D6] mb-1">
                      <Waves className="w-3.5 h-3.5" />
                      <span>{area.hotelCount}+ Verified Properties</span>
                    </div>

                    <h2 className="text-2xl font-bold text-[#0F172A] mb-2">{area.name}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {area.description}
                    </p>

                    {/* Highlights list */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-2.5">
                        Area Highlights & Proximity
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {area.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#1257D6] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Browse Button */}
                  <div className="pt-4 border-t border-[#E5EAF2] flex items-center justify-between">
                    <span className="text-xs text-[#64748B]">Ready to explore hotels here?</span>
                    <Link
                      to={`/hotels?area=${area.slug}`}
                      className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl bg-[#1257D6] hover:bg-[#0D47A1] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                    >
                      <span>Browse {area.name} stays</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

