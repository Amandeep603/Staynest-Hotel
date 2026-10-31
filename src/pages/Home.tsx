import { Navbar } from '../components/layout/Navbar'
import { Hero } from '../components/home/Hero'
import { SearchBar } from '../components/home/SearchBar'
import { TrustStrip } from '../components/home/TrustStrip'
import { PopularAreas } from '../components/home/PopularAreas'
import { HandpickedHotels } from '../components/home/HandpickedHotels'
import { CtaBanner } from '../components/home/CtaBanner'
import { InspirationSection } from '../components/home/InspirationSection'
import { CategorySection } from '../components/home/CategorySection'
import { TestimonialsSection } from '../components/home/TestimonialsSection'
import { AppBanner } from '../components/home/AppBanner'
import { Footer } from '../components/layout/Footer'

export function Home() {
  return (
    <div className="min-h-screen bg-page flex flex-col selection:bg-[#EAF1FD] selection:text-[#1257D6]">
      {/* 1. Sticky White Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Full-width Hero with Rishikesh evening landscape & navy gradient */}
        <Hero />

        {/* 3. Floating Search Bar (overlaps hero bottom with -mt-8) */}
        <SearchBar />

        {/* 4. Trust Strip (Verified stays, Secure booking, 24/7 support) */}
        <TrustStrip />

        {/* 5. Popular Areas in Rishikesh (4-card row) */}
        <PopularAreas />

        {/* 6. Handpicked Hotels in Rishikesh (3 vertical cards) */}
        <HandpickedHotels />

        {/* 7. CTA Banner (Your next getaway starts here.) */}
        <CtaBanner />

        {/* 8. Inspiration & Stats Section (A little inspiration for your next escape.) */}
        <InspirationSection />

        {/* 9. Explore Stays by Category (7 category pills) */}
        <CategorySection />

        {/* 10. Customer Reviews & Testimonials */}
        <TestimonialsSection />

        {/* 11. Mobile App Download Banner */}
        <AppBanner />
      </main>

      {/* 12. 5-Column Footer */}
      <Footer />
    </div>
  )
}
