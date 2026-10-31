import React from 'react'
import { Hotel, Users, Star } from 'lucide-react'
import gangaGhatImg from '../../assets/images/destinations/ram-jhula.webp'
import laxmanJhulaImg from '../../assets/images/destinations/laxman-jhula.webp'
import yogaAartiImg from '../../assets/images/destinations/tapovan.webp'

export const InspirationSection: React.FC = () => {
  return (
    <section className="w-full section-spacing overflow-hidden" id="inspiration">
      <div className="site-container">
        {/* 2 columns on desktop, mobile stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 3 Overlapping Tilted Rounded Photos (-6deg, 0, +5deg) */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-8">
            <div className="relative w-full max-w-[460px] h-[340px] sm:h-[380px]">
              
              {/* Photo 1: Ganga Ghat (-6deg tilt) */}
              <div className="absolute left-0 bottom-4 w-[58%] h-[70%] rounded-2xl overflow-hidden shadow-xl border-4 border-white -rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
                <img
                  src={gangaGhatImg}
                  alt="Holy Ganga River Ghat and evening Aarti in Rishikesh"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px] text-white font-medium">
                  Ganga Ghat
                </div>
              </div>

              {/* Photo 2: Laxman Jhula Bridge (0deg tilt, elevated shadow) */}
              <div className="absolute left-[26%] top-0 w-[56%] h-[72%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-0 hover:scale-105 transition-transform duration-500 z-20">
                <img
                  src={laxmanJhulaImg}
                  alt="Iconic Laxman Jhula suspension bridge over the Ganges"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px] text-white font-medium">
                  Laxman Jhula
                </div>
              </div>

              {/* Photo 3: Yoga & Ashram (+5deg tilt) */}
              <div className="absolute right-0 bottom-2 w-[54%] h-[68%] rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-5 hover:rotate-0 transition-transform duration-500 z-30">
                <img
                  src={yogaAartiImg}
                  alt="Historic Beatles Ashram and Yoga Retreat in Rishikesh"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px] text-white font-medium">
                  Yoga Retreat
                </div>
              </div>

              {/* Decorative soft ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/40 via-orange-50/30 to-transparent rounded-full blur-2xl -z-10" />
            </div>
          </div>

          {/* Right Column: Eyebrow + Heading + Text + 3 Stats with Dividers */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              {/* Orange Eyebrow */}
              <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.15em] text-[#EA580C]">
                EXPLORE. DREAM. DISCOVER.
              </p>

              {/* Heading */}
              <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#0F172A] tracking-tight leading-[1.15]">
                A little inspiration for your next escape.
              </h2>

              {/* Subtext */}
              <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed max-w-xl">
                Find amazing stays on the banks of the Ganga, in the foothills of the Himalayas.
              </p>
            </div>

            {/* 3 Stats Row with Dividers */}
            <div className="pt-6 border-t border-[#E5EAF2] grid grid-cols-3 divide-x divide-[#E5EAF2] text-left">
              
              {/* Stat 1: 150+ Stays */}
              <div className="pr-3 sm:pr-5">
                <div className="w-10 h-10 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center text-[#EA580C] mb-2 shadow-2xs">
                  <Hotel className="w-5 h-5 text-[#EA580C]" />
                </div>
                <div className="text-[18px] sm:text-[22px] font-bold text-[#0F172A] leading-tight">
                  150+
                </div>
                <div className="text-[12px] sm:text-[13px] text-[#64748B] leading-tight mt-0.5">
                  Stays in Rishikesh
                </div>
              </div>

              {/* Stat 2: 10K+ Happy travellers */}
              <div className="px-3 sm:px-5">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#1257D6] mb-2 shadow-2xs">
                  <Users className="w-5 h-5 text-[#1257D6]" />
                </div>
                <div className="text-[18px] sm:text-[22px] font-bold text-[#0F172A] leading-tight">
                  10K+
                </div>
                <div className="text-[12px] sm:text-[13px] text-[#64748B] leading-tight mt-0.5">
                  Happy travellers
                </div>
              </div>

              {/* Stat 3: 98% Positive reviews */}
              <div className="pl-3 sm:pl-5">
                <div className="w-10 h-10 rounded-full bg-[#FEFCE8] border border-[#FEF08A] flex items-center justify-center text-[#CA8A04] mb-2 shadow-2xs">
                  <Star className="w-5 h-5 fill-[#CA8A04] text-[#CA8A04]" />
                </div>
                <div className="text-[18px] sm:text-[22px] font-bold text-[#0F172A] leading-tight">
                  98%
                </div>
                <div className="text-[12px] sm:text-[13px] text-[#64748B] leading-tight mt-0.5">
                  Positive reviews
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
