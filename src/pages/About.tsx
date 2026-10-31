import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ShieldCheck, Heart, Sparkles, Award, CheckCircle2, ArrowRight } from 'lucide-react'
import aboutHeroImg from '../assets/images/hotels/aloha-2.webp'

export function About() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Verified Rishikesh Stays',
      description:
        'Every resort, ashram, and riverside camp on StayNest is personally visited, safety-checked, and authenticated by our local Uttarakhand team.',
    },
    {
      icon: Heart,
      title: 'Devbhoomi Hospitality',
      description:
        'We celebrate the ancient culture of Garhwal hospitality. From organic sattvic farm meals to morning Ganga Aarti setups, our partners deliver soulful experiences.',
    },
    {
      icon: Award,
      title: 'Transparent Pricing Guarantee',
      description:
        'No hidden booking charges, surprise resort fees, or deceptive photo angles. What you see is exactly what awaits you by the holy river.',
    },
  ]

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-navy text-white py-16 sm:py-24 overflow-hidden">
          <img
            src={aboutHeroImg}
            alt="Scenic foothills and Ganga river valley in Rishikesh"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />

          <div className="relative site-container max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider text-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#1257D6]" />
              <span>Our Story & Mission</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
              Connecting Travellers with the Soul of Rishikesh.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              StayNest was born on the riverbanks of the holy Ganga with a simple mission: to help pilgrims, yogis, and adventure seekers find authentic, verified stays across Rishikesh, Uttarakhand.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="section-spacing">
          <div className="site-container">
            
            {/* 3 Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {pillars.map((p, i) => {
                const Icon = p.icon
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Deep Narrative & Rishikesh Focus */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1257D6]">
                  Exclusively Devbhoomi Uttarakhand
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                  Why We Focus Exclusively on Rishikesh
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Unlike nationwide booking portals that treat every destination the same, we believe Rishikesh requires deep local reverence. The distance from your balcony to the holy river matters. The quietness of a yoga hall matters. The rapids safety credentials of a Shivpuri camp matter.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  By dedicating 100% of our platform exclusively to Rishikesh, we can guarantee up-to-date riverfront access information, genuine reviews from fellow meditators and rafters, and round-the-clock on-ground support right in Tapovan and Ram Jhula.
                </p>

                <div className="pt-2">
                  <Link
                    to="/hotels"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#1257D6] hover:bg-[#0D47A1] text-white text-sm font-semibold transition-colors shadow-xs"
                  >
                    <span>Browse curated stays</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E5EAF2] p-6 rounded-2xl space-y-4 text-xs text-slate-700">
                <h3 className="font-bold text-sm text-[#0F172A]">Our Local Promise:</h3>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Zero plastic waste support with participating riverfront lodges</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct coordination with certified Ganga Aarti guides & ashram priests</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Verified IRF (International Rafting Federation) safety certified guides</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Local help desk stationed at Tapovan for immediate on-arrival assistance</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
