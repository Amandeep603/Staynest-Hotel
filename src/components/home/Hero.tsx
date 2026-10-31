import heroImg from '../../assets/images/hero/hero-rishikesh.webp'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-navy">
      {/* Height: 360px desktop / 420px mobile */}
      <div className="relative w-full h-[420px] lg:h-[360px] overflow-hidden">
        {/* Background Image: Ganga + Rishikesh hills (evening/dusk, wide) */}
        <img
          src={heroImg}
          alt="Sacred Ganga River and Himalayan Foothills in Rishikesh at evening dusk"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Left-to-right dark navy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/75 to-[#0F172A]/20" />

        {/* Content: Left-aligned and Vertically Centered */}
        <div className="relative site-container h-full flex flex-col justify-center">
          <div className="max-w-2xl text-white">
            {/* Eyebrow: 12px, tracking-widest */}
            <p className="text-[12px] font-bold uppercase tracking-widest text-white/90 mb-2">
              HOTELS, RESORTS, HOMESTAYS & MORE
            </p>

            {/* Heading: 56px desktop, 36px mobile, bold, white, 2 lines */}
            <h1 className="text-[36px] sm:text-[44px] lg:text-[56px] font-bold tracking-tight leading-[1.08] text-white mb-2.5 max-w-[360px] sm:max-w-xl">
              Find your <br className="sm:hidden" />
              perfect stay.
            </h1>

            {/* Subtext */}
            <p className="text-[15px] sm:text-[16px] text-white/90 font-normal leading-normal">
              Great hotels. Better prices. Book with confidence.
            </p>

            {/* Chhoti blue underline */}
            <div className="w-14 h-1 bg-[#1257D6] rounded-full mt-3 shadow-xs" />
          </div>
        </div>
      </div>
    </section>
  )
}
