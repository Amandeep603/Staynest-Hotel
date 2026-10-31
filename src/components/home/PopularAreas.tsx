import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { popularAreas } from '../../data/areas'

export function PopularAreas() {
  return (
    <section className="w-full section-spacing" id="destinations">
      <div className="site-container">
        {/* Section Header: Title 24px bold, Link right "View all areas →" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#0F172A] tracking-tight leading-tight">
              Popular areas in Rishikesh
            </h2>
            <p className="text-[14px] text-[#64748B] mt-1">
              Find serene riverside ghats, vibrant cafe streets, and jungle camps.
            </p>
          </div>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1257D6] hover:text-[#0D47A1] transition-colors shrink-0 group self-start sm:self-end"
          >
            <span>View all areas</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 4 Cards: Desktop 4 cols, Tablet 2 cols, Mobile 1 col with horizontal snap-scroll option */}
        <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pb-3 sm:pb-0 scrollbar-none">
          {popularAreas.map((area) => (
            <Link
              key={area.id}
              to={`/hotels?area=${area.slug}`}
              className="group relative aspect-[16/10] w-[82vw] sm:w-auto shrink-0 snap-start rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer block border border-[#E5EAF2]"
            >
              {/* Image Background with smooth hover zoom */}
              <img
                src={area.image}
                alt={`Popular locality ${area.name} in Rishikesh, Uttarakhand`}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Bottom Dark Navy Gradient Overlay matching screenshot */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent transition-opacity duration-300" />

              {/* Card Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-4.5 flex items-end justify-between gap-2 z-10">
                <div className="min-w-0 flex-1">
                  {/* Area naam 22px bold white, wrap allowed so naam poora dikhe */}
                  <h3 className="text-lg lg:text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-blue-100 transition-colors drop-shadow-sm">
                    {area.name}
                  </h3>
                  {/* From ₹X/night */}
                  <p className="text-[13px] sm:text-[14px] text-slate-200/95 font-medium mt-0.5 drop-shadow-sm">
                    {area.tagline}
                  </p>
                </div>

                {/* Right-bottom circular arrow button 36px (frosted white) */}
                <div className="w-[36px] h-[36px] rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1257D6] group-hover:border-white transition-all duration-300 shrink-0 shadow-sm">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
