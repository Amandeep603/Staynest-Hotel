import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ctaResortImg from '../../assets/images/hotels/aloha-4.webp'

export function CtaBanner() {
  return (
    <section className="w-full section-spacing" id="offers">
      <div className="site-container">
        {/* Banner Card: rounded-2xl, bg gradient #EAF1FD -> #F5F8FC */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EAF1FD] via-[#F1F6FD] to-[#F5F8FC] border border-[#DCE7F7] shadow-sm flex flex-col md:flex-row md:items-center justify-between min-h-[140px] md:min-h-[120px]">
          
          {/* Mobile-only Top Image Banner (stacks nicely on mobile) */}
          <div className="relative w-full h-44 overflow-hidden md:hidden">
            <img
              src={ctaResortImg}
              alt="Panoramic sacred Ganga river and mountain view in Rishikesh"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#EAF1FD] via-transparent to-transparent" />
          </div>

          {/* Left Content Group: Heading + Subtitle + Explore stays button */}
          <div className="relative z-10 px-6 sm:px-8 py-6 md:py-8 w-full md:max-w-[62%] lg:max-w-[65%] flex flex-col items-start gap-3.5">
            <div>
              {/* Heading: 24-26px bold */}
              <h2 className="text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-[#0F172A] tracking-tight leading-tight">
                Your next getaway starts here.
              </h2>
              {/* Subtitle */}
              <p className="text-[13px] sm:text-[14px] text-[#64748B] leading-relaxed mt-1 max-w-lg">
                Explore amazing hotels at the best prices, with exclusive offers.
              </p>
            </div>

            {/* "Explore stays →" Button */}
            <div className="pt-1">
              <Link
                to="/hotels"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#1257D6] hover:bg-[#0D47A1] active:bg-[#0B57D0] text-white text-[14px] font-semibold shadow-xs hover:shadow transition-all group cursor-pointer whitespace-nowrap"
              >
                <span>Explore stays</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Desktop Right Side: Wide Ganga-resort image with smooth mask-image fade from left */}
          <div className="hidden md:block absolute top-0 right-0 bottom-0 w-[42%] lg:w-[45%] overflow-hidden pointer-events-none">
            <img
              src={ctaResortImg}
              alt="Panoramic sacred Ganga river and mountain view in Rishikesh"
              className="w-full h-full object-cover object-right"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,1) 65%)',
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,1) 65%)',
              }}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
