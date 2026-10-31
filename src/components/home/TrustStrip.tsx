import { ShieldCheck, Lock, Headphones } from 'lucide-react'

export function TrustStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Verified stays',
      subtitle: 'Quality checked properties',
    },
    {
      icon: Lock,
      title: 'Secure booking',
      subtitle: 'Your information is protected',
    },
    {
      icon: Headphones,
      title: '24/7 support',
      subtitle: "We're here whenever you need help",
    },
  ]

  return (
    <section className="w-full bg-[#F5F8FC] mt-6 py-6 lg:h-[88px] flex items-center border-y border-[#E5EAF2]/60">
      <div className="site-container w-full">
        {/* Desktop: single row / Mobile: clean stacked items without any horizontal scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="flex items-center gap-3.5 justify-start sm:justify-center"
              >
                {/* 40px icon circle */}
                <div className="w-10 h-10 rounded-full bg-white border border-[#E5EAF2] shadow-2xs flex items-center justify-center shrink-0 text-[#1257D6]">
                  <Icon className="w-5 h-5 text-[#1257D6]" strokeWidth={2} />
                </div>

                {/* 2-line text */}
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0F172A] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#64748B] leading-tight mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
