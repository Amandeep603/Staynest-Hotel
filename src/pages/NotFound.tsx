import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Compass, Home, Search, MapPin, Tag, ArrowRight } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
        <div className="max-w-lg w-full text-center space-y-6">
          {/* Compass Icon Badge */}
          <div className="w-20 h-20 rounded-full bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center mx-auto shadow-sm border border-[#E5EAF2]">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1257D6]">
              Error 404
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Lost along the holy river?
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-md mx-auto">
              The page or trail you are following has drifted down the Ganges or does not exist. Let&apos;s guide you back to our curated stays and sacred retreats in Rishikesh.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#1257D6] hover:bg-[#0D47A1] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/hotels"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 bg-white hover:bg-slate-50 border border-[#E5EAF2] text-[#0F172A] text-sm font-semibold rounded-xl transition-colors shadow-2xs"
            >
              <Search className="w-4 h-4 text-[#1257D6]" />
              <span>Browse All Stays</span>
            </Link>
          </div>

          {/* Popular Links Cards */}
          <div className="pt-6 border-t border-[#E5EAF2] text-left">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3 text-center sm:text-left">
              Popular Rishikesh Sections
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/destinations"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E5EAF2] hover:border-[#1257D6] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1257D6]" />
                  <span className="text-xs font-semibold text-[#0F172A]">Popular Areas</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1257D6] transition-colors" />
              </Link>

              <Link
                to="/offers"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E5EAF2] hover:border-[#1257D6] transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-[#1257D6]" />
                  <span className="text-xs font-semibold text-[#0F172A]">Rishikesh Deals</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1257D6] transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

