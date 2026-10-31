# StayNest - Rishikesh Hotel Booking Platform

A pixel-perfect, responsive hotel booking web application replicating the **StayNest** design system, crafted exclusively for **Rishikesh (Uttarakhand, India)**.

From luxury cliffside resorts overlooking the holy Ganga, serene yoga ashrams in Tapovan, to riverside adventure rafting campsites in Shivpuri — every stay, price, area, and image is dedicated 100% to Rishikesh.

---

## 🌟 Key Features

### 1. Home Page
- **Sticky Navbar**: StayNest custom 3-tower blue building logo, active nav indicator with solid pill underline, *"List your property"* outlined button with home icon, and *"Sign in"* dropdown.
- **Hero Section**: High-resolution dusk view of a luxury riverside resort on the Ganges, dark navy gradient overlay, category tracker (`HOTELS, RESORTS, HOMESTAYS & MORE`), bold headline (`Find your perfect stay.`), subtext, and blue accent bar.
- **Floating Search Bar**: Overlaps the hero with deep elevation shadow. Interactive popovers for:
  - **Where to?**: Rishikesh-only localities (*Tapovan, Laxman Jhula, Ram Jhula, Shivpuri, Swarg Ashram, Triveni Ghat*).
  - **Check-in & Check-out**: Interactive date pickers.
  - **Guests**: Interactive counter modal with `+` / `-` controls for Adults, Children, and Rooms.
  - **Search**: Navigates to `/hotels` with prefilled query parameters.
- **Trust Strip**: 3 quality badges (*Verified stays, Secure booking, 24/7 support*).
- **Popular Areas in Rishikesh**: 4-card row (*Laxman Jhula, Tapovan, Ram Jhula / Swarg Ashram, Shivpuri*) with dark bottom gradient, realistic local starting prices (`From ₹1,800 - ₹4,500/night`), and circular arrow buttons linking to area stays.
- **Handpicked Hotels**: 3 horizontal cards with local WebP images, interactive wishlist heart toggle button, gold star ratings, blue rating score badges, location pins, amenity chips, and *"View rooms →"* action buttons.
- **CTA Banner**: Soft blue gradient card (`#EBF3FE` to `#D8E8FD`), *"Your next getaway starts here."* headline, *"Explore stays →"* button, and panoramic resort image seamlessly fading into the card.
- **Footer**: Brand tagline (*Comfort in every stay*), multi-column navigation (*Quick Links, Support, Company*), 4 circular social icons (*Instagram, Facebook, YouTube, LinkedIn*), and interactive travel inspiration newsletter subscription with instant feedback.

### 2. Search & Filter Page (`/hotels`)
- **Compact Header Search**: Prefilled from URL query parameters (`area`, `checkin`, `checkout`, `guests`) with instant search update.
- **Left Filter Sidebar** (Desktop sticky sidebar + mobile slide-over drawer):
  - **Price Range Slider**: Interactive range filter from ₹1,000 to ₹30,000/night.
  - **Guest Rating**: Filter by 4.8+ Exceptional, 4.5+ Wonderful, 4.0+ Very Good, or All.
  - **Localities**: Checkboxes for Tapovan, Laxman Jhula, Ram Jhula, and Shivpuri.
  - **Amenities**: Filter by River view, Pool, Wi-Fi, Breakfast, and Yoga.
  - **Property Types**: Resort, Boutique Hotel, Ashram & Wellness, Luxury Campsite, Backpacker Hostel.
  - **Reset Filters**: One-click reset button.
- **Sort Dropdown**: Sort by *Recommended (Popularity)*, *Price: Low to High*, *Price: High to Low*, or *Rating: High to Low*.
- **Empty State**: Friendly feedback screen when no stays match filter criteria, with a clear-filters button.

### 3. Hotel Details Page (`/hotels/:slug`)
- **Breadcrumb Navigation**: Home > Hotels in Rishikesh > Hotel Name.
- **Interactive Image Gallery**: Large active preview + thumbnail column + mobile swipe row.
- **Authentic Information**: Riverbank distance, full Rishikesh address, rating badge, and property tags.
- **Amenities Showcase**: Grid of amenities with intelligent matching `lucide-react` icons.
- **Room Selection**: Multiple room tiers (*Deluxe Room, Ganga Facing Suite, Luxury Villa*) with room size, bed configurations, included perks, and pricing.
- **Instant Booking Modal**: Interactive reservation popup collecting guest details and generating a confirmed booking reference (`SN-RSH-XXXXXX`).

---

## 🎨 Design System & Tokens

Sampled directly from the StayNest UI reference:

| Token | Value | Usage |
| :--- | :--- | :--- |
| **Primary Blue** | `#0B57D0` (hover `#0949B2`, active `#1257D6`) | Buttons, active navigation underline, links |
| **Primary Light** | `#E8F0FE` | Rating badge background, icon circles |
| **Dark Navy** | `#0F172A` | Headings, high-contrast text |
| **Muted Slate** | `#64748B` | Subtitles, labels, reviews count |
| **Page Background** | `#F5F8FC` | Main body & background surface |
| **Card Surface** | `#FFFFFF` | Hotel cards, floating search bar, modals |
| **Border Color** | `#E5EAF2` | Card borders, dividers, inputs |
| **Star Gold** | `#F5A524` | Review stars & ratings |
| **Card Radius** | `16px` (`rounded-2xl`) | Cards, search bar, modals |
| **Button Radius** | `10px` - `12px` (`rounded-xl`) | Action buttons |
| **Container Width** | `1200px` | Centered layout container |

---

## 📂 Project Architecture

```
src/
├── assets/
│   └── images/
│       ├── hero/              # Hero background (hero-rishikesh.webp)
│       ├── destinations/      # 4 local areas (laxman-jhula, tapovan, etc.)
│       └── hotels/            # 14 hotels x 3-4 WebP images each (52 local assets)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Sticky navigation, logo, links, mobile menu
│   │   └── Footer.tsx         # Brand story, columns, socials, newsletter
│   ├── home/
│   │   ├── Hero.tsx           # Full-width banner with dark navy overlay
│   │   ├── SearchBar.tsx      # Floating interactive search card & popovers
│   │   ├── TrustStrip.tsx     # 3 verified stay guarantee badges
│   │   ├── PopularAreas.tsx   # 4-card row for Rishikesh areas
│   │   ├── HotelCard.tsx      # Reusable horizontal hotel card
│   │   ├── HandpickedHotels.tsx # 3 featured flagship Rishikesh stays
│   │   └── CtaBanner.tsx      # Light blue gradient promotional strip
│   └── common/
│       ├── Button.tsx         # Reusable button with variants & sizes
│       ├── RatingBadge.tsx    # Star rating badge & count pill
│       ├── AmenityChip.tsx    # Intelligent icon-matching amenity chip
│       └── SectionHeader.tsx  # Section title + subtitle + action link
├── pages/
│   ├── Home.tsx               # Homepage layout
│   ├── Hotels.tsx             # Hotel search, multi-filter & sorting
│   └── HotelDetails.tsx       # Hotel detail page with room tiers & booking
├── data/
│   ├── hotels.ts              # 14 authentic Rishikesh hotels & resorts
│   └── areas.ts               # 4 curated Rishikesh localities
├── types/
│   └── index.ts               # TypeScript interfaces (Hotel, Area, RoomOption, etc.)
├── lib/
│   └── utils.ts               # cn class merger utility (clsx + tailwind-merge)
├── styles/
│   └── index.css              # Tailwind base, CSS variables, Inter typography
├── App.tsx                    # Routes, Router, and ScrollToTop
└── main.tsx                   # React root entrypoint
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS + Custom Design Tokens
- **Routing**: React Router (`react-router-dom` v7)
- **Icons**: `lucide-react`
- **Typography**: Inter (Google Fonts)
- **Asset Optimization**: WebP (52 local images, 0 hotlinking)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

### 3. Production Build & Verification
```bash
npm run build
```

---

## 📷 Image Attribution & Licences
All imagery is sourced from **Unsplash** under the **Unsplash Free License** (non-copyrighted stock photography, safe for commercial use). Complete photographer attribution, source links, and asset file paths are documented in [`credits.md`](./credits.md).
#   S t a y n e s t - H o t e l  
 