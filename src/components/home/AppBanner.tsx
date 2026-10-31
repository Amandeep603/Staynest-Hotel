import React from 'react'

export const AppBanner: React.FC = () => {
  return (
    <section className="w-full section-spacing" id="app">
      <div className="site-container">
        {/* Banner Card: rounded-2xl light blue */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EAF1FD] via-[#F0F5FD] to-[#F5F8FC] border border-[#DCE7F7] shadow-sm min-h-[160px] flex items-center">
          
          {/* Left Text & App Store Badges */}
          <div className="py-8 sm:py-10 px-6 sm:px-10 z-10 max-w-xl">
            <h2 className="text-[22px] sm:text-[26px] font-bold text-[#0F172A] tracking-tight leading-tight mb-2">
              Book on the go with StayNest
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#64748B] leading-relaxed mb-6">
              Download the app for a faster, smoother and more convenient booking experience.
            </p>

            {/* App Store & Google Play Black Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* App Store Badge */}
              <a
                href="#app-store"
                className="inline-flex items-center gap-2.5 h-[44px] px-4 rounded-xl bg-black text-white hover:bg-slate-900 transition-colors shadow-2xs group"
                aria-label="Download on the App Store"
              >
                {/* Apple SVG */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.07 1.72.04 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-300 leading-none">
                    Download on the
                  </div>
                  <div className="text-[13px] font-semibold text-white leading-tight mt-0.5">
                    App Store
                  </div>
                </div>
              </a>

              {/* Google Play Badge */}
              <a
                href="#google-play"
                className="inline-flex items-center gap-2.5 h-[44px] px-4 rounded-xl bg-black text-white hover:bg-slate-900 transition-colors shadow-2xs group"
                aria-label="Get it on Google Play"
              >
                {/* Play Store SVG */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.42V3.234c0-.53.22-1.03.609-1.42zm11.233 11.235l2.091-2.091-11.83-6.83 9.739 8.921zm0 1.898L5.103 23.868l11.83-6.83-2.091-2.091zm3.176-3.176l2.977 1.718c.854.493.854 1.298 0 1.791l-2.977 1.718-2.148-2.148 2.148-2.148z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-slate-300 leading-none">
                    GET IT ON
                  </div>
                  <div className="text-[13px] font-semibold text-white leading-tight mt-0.5">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Phone Mockup displaying "Find your perfect stay." (hidden on mobile, visible on desktop) */}
          <div className="hidden md:flex absolute right-8 lg:right-16 -bottom-10 items-end justify-center pointer-events-none">
            <div className="w-[210px] lg:w-[230px] rounded-[32px] border-[5px] border-slate-800 bg-slate-900 shadow-2xl p-2 pb-0 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Dynamic Island / Speaker Notch */}
              <div className="w-16 h-3.5 bg-slate-800 rounded-full mx-auto mb-2" />
              
              {/* Screen Content */}
              <div className="rounded-[22px] bg-gradient-to-b from-[#1257D6] to-[#0A388F] text-white p-3.5 pb-8">
                {/* App Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center text-[10px] font-bold">
                      S
                    </div>
                    <span className="text-[12px] font-bold tracking-tight">StayNest</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-1">
                  Rishikesh
                </div>
                <div className="text-[16px] font-bold leading-tight mb-2">
                  Find your perfect stay.
                </div>

                {/* Mini Search Bar Mockup */}
                <div className="bg-white/15 backdrop-blur-xs rounded-lg p-2 text-[10px] text-white/90 mb-3 flex items-center justify-between">
                  <span>Where to? Tapovan</span>
                  <span className="bg-[#1257D6] text-white px-1.5 py-0.5 rounded text-[9px] font-semibold">
                    Go
                  </span>
                </div>

                {/* Mini Hotel Card Mockup */}
                <div className="bg-white text-[#0F172A] rounded-lg p-2 shadow-sm">
                  <div className="text-[10px] font-bold truncate">Aloha on the Ganges</div>
                  <div className="text-[8px] text-[#64748B]">Tapovan · 4.8 ★</div>
                  <div className="text-[10px] font-bold text-[#1257D6] mt-1">₹7,800/night</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
