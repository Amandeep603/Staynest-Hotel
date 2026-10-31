import type { PopularArea } from '../types'
import laxmanJhulaImg from '../assets/images/destinations/laxman-jhula.webp'
import tapovanImg from '../assets/images/destinations/tapovan.webp'
import ramJhulaImg from '../assets/images/destinations/ram-jhula.webp'
import shivpuriImg from '../assets/images/destinations/shivpuri.webp'

export const popularAreas: PopularArea[] = [
  {
    id: 'laxman-jhula',
    slug: 'laxman-jhula',
    name: 'Laxman Jhula',
    tagline: 'From ₹3,200/night',
    startingPrice: 3200,
    hotelCount: 34,
    image: laxmanJhulaImg,
    description: 'Iconic suspension bridge, cliffside cafes & boutique river retreats.',
  },
  {
    id: 'tapovan',
    slug: 'tapovan',
    name: 'Tapovan',
    tagline: 'From ₹2,400/night',
    startingPrice: 2400,
    hotelCount: 42,
    image: tapovanImg,
    description: 'Vibrant cafe culture, world-famous yoga ashrams & lush mountain slopes.',
  },
  {
    id: 'ram-jhula',
    slug: 'ram-jhula',
    name: 'Ram Jhula / Swarg Ashram',
    tagline: 'From ₹1,800/night',
    startingPrice: 1800,
    hotelCount: 28,
    image: ramJhulaImg,
    description: 'Spiritual heart of Rishikesh, Parmarth Niketan Ganga Aarti & serene ashrams.',
  },
  {
    id: 'shivpuri',
    slug: 'shivpuri',
    name: 'Shivpuri',
    tagline: 'From ₹4,500/night',
    startingPrice: 4500,
    hotelCount: 25,
    image: shivpuriImg,
    description: 'White water rafting hub, luxury riverside camps & private beach bonfires.',
  },
]
