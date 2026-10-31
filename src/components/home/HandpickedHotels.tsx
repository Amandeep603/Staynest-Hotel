import { hotels } from '../../data/hotels'
import { HotelCard } from './HotelCard'
import { SectionHeader } from '../common/SectionHeader'

export function HandpickedHotels() {
  // Select top 3 flagship Rishikesh properties for the homepage feature row
  const handpicked = [
    hotels.find((h) => h.id === 'aloha-on-the-ganges') || hotels[0],
    hotels.find((h) => h.id === 'the-roseate-ganges') || hotels[1],
    hotels.find((h) => h.id === 'divine-resort-spa') || hotels[2],
  ]

  return (
    <section className="w-full section-spacing" id="hotels">
      <div className="site-container">
        {/* Reusable Section Header: title, subtitle, "View all hotels →" */}
        <SectionHeader
          title="Handpicked hotels"
          subtitle="Curated stays for every kind of traveller."
          actionText="View all hotels"
          actionHref="/hotels"
        />

        {/* Responsive Grid: 1 col mobile (<640), 2 tablet (640-1023), 3 desktop (>=1024), equal height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {handpicked.map((hotel) => (
            <div key={hotel.id} className="h-full">
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
