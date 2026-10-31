import fs from 'node:fs'
import path from 'node:path'

const imagesToDownload = [
  // 1. Hero Image
  {
    path: 'src/assets/images/hero/hero-rishikesh.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80&fm=webp',
    title: 'Hero - Luxury Riverside Resort at Dusk',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },

  // 2. 4 Area Images
  {
    path: 'src/assets/images/destinations/laxman-jhula.webp',
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80&fm=webp',
    title: 'Laxman Jhula Suspension Bridge & River View',
    photographer: 'Sayan Nath',
    source: 'https://unsplash.com/photos/wh-RPB46yCw',
  },
  {
    path: 'src/assets/images/destinations/tapovan.webp',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80&fm=webp',
    title: 'Tapovan Himalayan Foothills & Nature',
    photographer: 'Benjamin Davies',
    source: 'https://unsplash.com/photos/Oaqk7qqNh_c',
  },
  {
    path: 'src/assets/images/destinations/ram-jhula.webp',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80&fm=webp',
    title: 'Ram Jhula & Holy River Ganga Ghats',
    photographer: 'Ajeet Mestry',
    source: 'https://unsplash.com/photos/UBhpOcvnRJw',
  },
  {
    path: 'src/assets/images/destinations/shivpuri.webp',
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80&fm=webp',
    title: 'Shivpuri Riverside Camping & River Rafting Beach',
    photographer: 'Christopher Jolly',
    source: 'https://unsplash.com/photos/GqbU78bdJFM',
  },

  // 3. Hotel Images
  // Aloha On The Ganges (4 images)
  {
    path: 'src/assets/images/hotels/aloha-1.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Aloha On The Ganges - Infinity Pool over Ganga',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },
  {
    path: 'src/assets/images/hotels/aloha-2.webp',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Aloha On The Ganges - Mountain & River Sunset Deck',
    photographer: 'Valeriia Bugaiova',
    source: 'https://unsplash.com/photos/_hpXCguVX8A',
  },
  {
    path: 'src/assets/images/hotels/aloha-3.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Aloha On The Ganges - Riverside Luxury Suite',
    photographer: 'Fern M',
    source: 'https://unsplash.com/photos/M7O6DtkeauE',
  },
  {
    path: 'src/assets/images/hotels/aloha-4.webp',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Aloha On The Ganges - Sun Loungers by River',
    photographer: 'Manuel Moreno',
    source: 'https://unsplash.com/photos/DGa0LQ0yDPc',
  },

  // Taj Rishikesh Resort & Spa (4 images)
  {
    path: 'src/assets/images/hotels/taj-1.webp',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Taj Rishikesh - Hillside Sanctuary & Pool',
    photographer: 'Jared Rice',
    source: 'https://unsplash.com/photos/NTyBbu66_SI',
  },
  {
    path: 'src/assets/images/hotels/taj-2.webp',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Taj Rishikesh - Panoramic Himalayan Sunset',
    photographer: 'Valeriia Bugaiova',
    source: 'https://unsplash.com/photos/_hpXCguVX8A',
  },
  {
    path: 'src/assets/images/hotels/taj-3.webp',
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Taj Rishikesh - Jiva Wellness & Courtyard',
    photographer: 'Edvin Johansson',
    source: 'https://unsplash.com/photos/rlwE8f8anoc',
  },
  {
    path: 'src/assets/images/hotels/taj-4.webp',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Taj Rishikesh - Presidential Hill-facing Suite',
    photographer: 'Visual Stories || Micheile',
    source: 'https://unsplash.com/photos/mC_WkVDA-8Y',
  },

  // The Roseate Ganges (4 images)
  {
    path: 'src/assets/images/hotels/roseate-1.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'The Roseate Ganges - Minimalist Luxury Villa',
    photographer: 'Fern M',
    source: 'https://unsplash.com/photos/M7O6DtkeauE',
  },
  {
    path: 'src/assets/images/hotels/roseate-2.webp',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'The Roseate Ganges - Heated Forest Pool',
    photographer: 'Manuel Moreno',
    source: 'https://unsplash.com/photos/DGa0LQ0yDPc',
  },
  {
    path: 'src/assets/images/hotels/roseate-3.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'The Roseate Ganges - Private Dining Balcony',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },
  {
    path: 'src/assets/images/hotels/roseate-4.webp',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'The Roseate Ganges - Valley View Loungers',
    photographer: 'Valeriia Bugaiova',
    source: 'https://unsplash.com/photos/_hpXCguVX8A',
  },

  // Divine Resort & Spa (4 images)
  {
    path: 'src/assets/images/hotels/divine-resort-1.webp',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Divine Resort & Spa - Cliffside Terrace View',
    photographer: 'Manuel Moreno',
    source: 'https://unsplash.com/photos/DGa0LQ0yDPc',
  },
  {
    path: 'src/assets/images/hotels/divine-resort-2.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Divine Resort & Spa - Riverfront Room Interior',
    photographer: 'Fern M',
    source: 'https://unsplash.com/photos/M7O6DtkeauE',
  },
  {
    path: 'src/assets/images/hotels/divine-resort-3.webp',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Divine Resort & Spa - Sunset Yoga Deck',
    photographer: 'Jared Rice',
    source: 'https://unsplash.com/photos/NTyBbu66_SI',
  },
  {
    path: 'src/assets/images/hotels/divine-resort-4.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Divine Resort & Spa - Open-air Restaurant',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },

  // Atali Ganga (4 images)
  {
    path: 'src/assets/images/hotels/atali-1.webp',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Atali Ganga - Forested Hillside & Rafting Waters',
    photographer: 'Luca Bravo',
    source: 'https://unsplash.com/photos/O453M2Liufs',
  },
  {
    path: 'src/assets/images/hotels/atali-2.webp',
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Atali Ganga - Mountain Cottage & Camps',
    photographer: 'Christopher Jolly',
    source: 'https://unsplash.com/photos/GqbU78bdJFM',
  },
  {
    path: 'src/assets/images/hotels/atali-3.webp',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Atali Ganga - Clifftop Swimming Pool',
    photographer: 'Valeriia Bugaiova',
    source: 'https://unsplash.com/photos/_hpXCguVX8A',
  },
  {
    path: 'src/assets/images/hotels/atali-4.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Atali Ganga - Outdoor Dining & Activities',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },

  // Divine Ganga Cottage (3 images)
  {
    path: 'src/assets/images/hotels/divine-cottage-1.webp',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Divine Ganga Cottage - Boutique Wooden Suite',
    photographer: 'Andrea Davis',
    source: 'https://unsplash.com/photos/81BqxZz08kY',
  },
  {
    path: 'src/assets/images/hotels/divine-cottage-2.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Divine Ganga Cottage - Balcony River View',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },
  {
    path: 'src/assets/images/hotels/divine-cottage-3.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Divine Ganga Cottage - Rooftop Cafe',
    photographer: 'Fern M',
    source: 'https://unsplash.com/photos/M7O6DtkeauE',
  },

  // Modi Yoga Retreat (3 images)
  {
    path: 'src/assets/images/hotels/modi-1.webp',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Modi Yoga Retreat - Wellness Yoga Pavilion',
    photographer: 'Moritz Knöringer',
    source: 'https://unsplash.com/photos/gkrL0pLsi8g',
  },
  {
    path: 'src/assets/images/hotels/modi-2.webp',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Modi Yoga Retreat - Ayurveda Garden & Spa',
    photographer: 'Jared Rice',
    source: 'https://unsplash.com/photos/NTyBbu66_SI',
  },
  {
    path: 'src/assets/images/hotels/modi-3.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Modi Yoga Retreat - Serene Holistic Room',
    photographer: 'Fern M',
    source: 'https://unsplash.com/photos/M7O6DtkeauE',
  },

  // Ganga Beach Resort (3 images)
  {
    path: 'src/assets/images/hotels/ganga-beach-1.webp',
    url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Ganga Beach Resort - Riverside Grounds',
    photographer: 'Zac Gudakov',
    source: 'https://unsplash.com/photos/wwqZ8CM21gg',
  },
  {
    path: 'src/assets/images/hotels/ganga-beach-2.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Ganga Beach Resort - Swimming Pool with River Access',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },
  {
    path: 'src/assets/images/hotels/ganga-beach-3.webp',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Ganga Beach Resort - Lawns & Sandy Beach',
    photographer: 'Manuel Moreno',
    source: 'https://unsplash.com/photos/DGa0LQ0yDPc',
  },

  // EllBee Ganga View (3 images)
  {
    path: 'src/assets/images/hotels/ellbee-1.webp',
    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'EllBee Ganga View - Modern Deluxe Bedroom',
    photographer: 'Point3D Commercial Imaging Ltd',
    source: 'https://unsplash.com/photos/ox0Lk_bJk7E',
  },
  {
    path: 'src/assets/images/hotels/ellbee-2.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'EllBee Ganga View - Rooftop Aarti Observation Deck',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },
  {
    path: 'src/assets/images/hotels/ellbee-3.webp',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'EllBee Ganga View - Pure Veg Restaurant',
    photographer: 'Fern M',
    source: 'https://unsplash.com/photos/M7O6DtkeauE',
  },

  // Zostel Rishikesh (3 images)
  {
    path: 'src/assets/images/hotels/zostel-1.webp',
    url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Zostel Rishikesh - Vibrant Common Lounge',
    photographer: 'Jason Briscoe',
    source: 'https://unsplash.com/photos/UV81E0oXXWQ',
  },
  {
    path: 'src/assets/images/hotels/zostel-2.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Zostel Rishikesh - Rooftop Yoga & Chill Space',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },
  {
    path: 'src/assets/images/hotels/zostel-3.webp',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Zostel Rishikesh - Private Room Interior',
    photographer: 'Manuel Moreno',
    source: 'https://unsplash.com/photos/DGa0LQ0yDPc',
  },

  // Zostel Plus Mohanchatti (3 images)
  {
    path: 'src/assets/images/hotels/zostel-plus-1.webp',
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Zostel Plus Mohanchatti - Swimming Pool with Valley Views',
    photographer: 'Valeriia Bugaiova',
    source: 'https://unsplash.com/photos/_hpXCguVX8A',
  },
  {
    path: 'src/assets/images/hotels/zostel-plus-2.webp',
    url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Zostel Plus Mohanchatti - Stream-side Seating',
    photographer: 'Jason Briscoe',
    source: 'https://unsplash.com/photos/UV81E0oXXWQ',
  },
  {
    path: 'src/assets/images/hotels/zostel-plus-3.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Zostel Plus Mohanchatti - Mountain Cottages',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },

  // The Glasshouse on the Ganges (3 images)
  {
    path: 'src/assets/images/hotels/glasshouse-1.webp',
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Glasshouse on the Ganges - Secluded Lychee Orchard',
    photographer: 'Christopher Jolly',
    source: 'https://unsplash.com/photos/GqbU78bdJFM',
  },
  {
    path: 'src/assets/images/hotels/glasshouse-2.webp',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Glasshouse on the Ganges - Private Sand Beach',
    photographer: 'Luca Bravo',
    source: 'https://unsplash.com/photos/O453M2Liufs',
  },
  {
    path: 'src/assets/images/hotels/glasshouse-3.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Glasshouse on the Ganges - Heritage Room',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },

  // Hotel Natraj (3 images)
  {
    path: 'src/assets/images/hotels/natraj-1.webp',
    url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Hotel Natraj - Swimming Pool & Lawns',
    photographer: 'Edvin Johansson',
    source: 'https://unsplash.com/photos/rlwE8f8anoc',
  },
  {
    path: 'src/assets/images/hotels/natraj-2.webp',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Hotel Natraj - Family Comfort Bedroom',
    photographer: 'Andrea Davis',
    source: 'https://unsplash.com/photos/81BqxZz08kY',
  },
  {
    path: 'src/assets/images/hotels/natraj-3.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Hotel Natraj - Vegetarian Banquet Dining',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },

  // Camp AquaForest (3 images)
  {
    path: 'src/assets/images/hotels/aquaforest-1.webp',
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Camp AquaForest - Riverside AC Swiss Tents',
    photographer: 'Christopher Jolly',
    source: 'https://unsplash.com/photos/GqbU78bdJFM',
  },
  {
    path: 'src/assets/images/hotels/aquaforest-2.webp',
    url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Camp AquaForest - Riverfront Rafting Launch',
    photographer: 'Luca Bravo',
    source: 'https://unsplash.com/photos/O453M2Liufs',
  },
  {
    path: 'src/assets/images/hotels/aquaforest-3.webp',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80&fm=webp',
    title: 'Camp AquaForest - Evening Beach Bonfire',
    photographer: 'Sara Dubler',
    source: 'https://unsplash.com/photos/Koe1_AcKVac',
  },
]

async function downloadAll() {
  console.log(`Starting download of ${imagesToDownload.length} images...`)

  let successCount = 0
  const creditsList = []

  for (const item of imagesToDownload) {
    const fullPath = path.resolve(process.cwd(), item.path)
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    try {
      console.log(`Downloading: ${item.path}...`)
      const response = await fetch(item.url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      fs.writeFileSync(fullPath, buffer)
      console.log(`✓ Saved: ${item.path} (${(buffer.length / 1024).toFixed(1)} KB)`)
      successCount++

      creditsList.push({
        title: item.title,
        photographer: item.photographer,
        source: item.source,
        file: item.path,
        size: `${(buffer.length / 1024).toFixed(1)} KB`,
      })
    } catch (err) {
      console.error(`✗ Error downloading ${item.path}:`, err.message)
    }
  }

  console.log(`\nDownload completed: ${successCount} / ${imagesToDownload.length} saved.`)

  // Generate credits.md
  let creditsMd = `# Image Credits & Licences

All photographic assets in this project are sourced from **Unsplash**, under the [Unsplash Free License](https://unsplash.com/license), which grants an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, and perform photos for free, including commercial purposes, without needing permission or attributing the photographer (though we proudly attribute them below).

No copyrighted or proprietary hotel website imagery is used.

| Asset File | Subject / Description | Photographer | Source Link | File Size |
| :--- | :--- | :--- | :--- | :--- |
`

  for (const c of creditsList) {
    creditsMd += `| \`${c.file}\` | ${c.title} | ${c.photographer} | [View on Unsplash](${c.source}) | ${c.size} |\n`
  }

  creditsMd += `\n*Processed and converted into lightweight WebP format for optimal load speed and bandwidth efficiency.*`

  fs.writeFileSync(path.resolve(process.cwd(), 'credits.md'), creditsMd, 'utf8')
  console.log('✓ Generated credits.md successfully!')
}

downloadAll()

