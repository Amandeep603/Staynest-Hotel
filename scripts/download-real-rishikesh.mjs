import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// Complete mapping of all 52 images to 100% REAL Rishikesh photography from Wikimedia Commons
const imagesList = [
  // 1. Hero Image (1920px wide, landscape, dusk/evening Ganga & Laxman Jhula & hills)
  {
    target: 'src/assets/images/hero/hero-rishikesh.webp',
    width: 1920,
    quality: 85,
    title: 'Hero - Panoramic Dusk View of Laxman Jhula & Ganga River',
    photographer: 'Kaustubh Nayyar',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Rishikesh-Lakshman_Jhula_by_Kaustubh_Nayyar.jpg',
  },

  // 2. 4 Popular Areas (800px wide)
  // Laxman Jhula: Iconic bridge & river
  {
    target: 'src/assets/images/destinations/laxman-jhula.webp',
    width: 800,
    quality: 80,
    title: 'Laxman Jhula Suspension Bridge over Holy Ganga',
    photographer: 'Dey.sandip',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Laxman_Jhula_Bridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Laxman_Jhula_Bridge.jpg',
  },
  // Tapovan: Yoga ashrams & mountain slopes
  {
    target: 'src/assets/images/destinations/tapovan.webp',
    width: 800,
    quality: 80,
    title: 'Tapovan Hillside & Ashram Retreats in Rishikesh',
    photographer: 'Dorelal Singh',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Tapovan,_Rishikesh,_Uttarakhand_249137,_India_-_panoramio_(1).jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Tapovan%2C_Rishikesh%2C_Uttarakhand%2C_India_-_panoramio_%281%29.jpg',
  },
  // Ram Jhula / Swarg Ashram: Ram Jhula bridge & river view
  {
    target: 'src/assets/images/destinations/ram-jhula.webp',
    width: 800,
    quality: 80,
    title: 'Ram Jhula and Sacred River Ganga Ghats',
    photographer: 'Krishnav25',
    license: 'CC0 Public Domain',
    source: 'https://commons.wikimedia.org/wiki/File:Ram_jhula_view_of_ganga.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Ram_jhula_view_of_ganga.jpg',
  },
  // Shivpuri: Rafting camp on the white sand beaches
  {
    target: 'src/assets/images/destinations/shivpuri.webp',
    width: 800,
    quality: 80,
    title: 'Shivpuri Riverside Rafting & Beach Camps on Ganga',
    photographer: 'Vvnataraj',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:A_rafting_camp_on_the_banks_of_Ganga.JPG',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/A_rafting_camp_on_the_banks_of_Ganga.JPG',
  },

  // 3. Hotel Images (Riverside views, Himalayan hills, heritage retreats & riverfront rooms)
  // Aloha On The Ganges (Tapovan)
  {
    target: 'src/assets/images/hotels/aloha-1.webp',
    width: 800,
    quality: 80,
    title: 'Aloha On The Ganges - Emerald Green Riverfront',
    photographer: 'ShashwatJain99',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganga_at_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Ganga_at_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/aloha-2.webp',
    width: 800,
    quality: 80,
    title: 'Aloha On The Ganges - Himalayan Foothills & River Curve',
    photographer: 'Kaustubh Nayyar',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Embrace_the_Ganges_by_Kaustubh_Nayyar.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Embrace_the_Ganges_by_Kaustubh_Nayyar.jpg',
  },
  {
    target: 'src/assets/images/hotels/aloha-3.webp',
    width: 800,
    quality: 80,
    title: 'Aloha On The Ganges - Riverside Heritage Vista',
    photographer: 'Arpita Tripathy',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Tera_manjil_temple,_Laxman_Jhula,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Tera_manjil_temple%2C_Laxman_Jhula%2C_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/aloha-4.webp',
    width: 1200,
    quality: 80,
    title: 'Aloha On The Ganges - Panoramic Sacred River & Mountain Panorama (CTA Banner)',
    photographer: 'Kaustubh Nayyar',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:The_Divine_Ganga_(or_Ganges)_River.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/The_Divine_Ganga_%28or_Ganges%29_River.jpg',
  },

  // Taj Rishikesh Resort & Spa (Shivpuri)
  {
    target: 'src/assets/images/hotels/taj-1.webp',
    width: 800,
    quality: 80,
    title: 'Taj Rishikesh - Dramatic Ganga Valley & Mountain Canyon',
    photographer: 'Ashok Prabhakaran',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Devabhoomi.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Devabhoomi.jpg',
  },
  {
    target: 'src/assets/images/hotels/taj-2.webp',
    width: 800,
    quality: 80,
    title: 'Taj Rishikesh - Pristine Holy River at Shivpuri',
    photographer: 'Dr Satendra',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:River_Ganges_at_Shivpuri,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/River_Ganges_at_Shivpuri%2C_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/taj-3.webp',
    width: 800,
    quality: 80,
    title: 'Taj Rishikesh - Natural Pebble Riverbank at Shivpuri',
    photographer: 'Wiki-arun',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Flow_of_purity_and_faith.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Flow_of_purity_and_faith.jpg',
  },
  {
    target: 'src/assets/images/hotels/taj-4.webp',
    width: 800,
    quality: 80,
    title: 'Taj Rishikesh - Himalayan Ridge & Sacred Waters',
    photographer: 'Harshit38',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Riverganga.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Riverganga.jpg',
  },

  // The Roseate Ganges (Shivpuri)
  {
    target: 'src/assets/images/hotels/roseate-1.webp',
    width: 800,
    quality: 80,
    title: 'The Roseate Ganges - Private River Bend at Shivpuri',
    photographer: 'Arkadeep Meta',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Shivpuri.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Shivpuri.jpg',
  },
  {
    target: 'src/assets/images/hotels/roseate-2.webp',
    width: 800,
    quality: 80,
    title: 'The Roseate Ganges - White Sand River Beach in Rishikesh',
    photographer: 'Shubhamanand2580',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganga_beach,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Ganga_beach%2C_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/roseate-3.webp',
    width: 800,
    quality: 80,
    title: 'The Roseate Ganges - Forested Himalayan River Gorge',
    photographer: 'Harshit38',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:The_ganges.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/The_ganges.jpg',
  },
  {
    target: 'src/assets/images/hotels/roseate-4.webp',
    width: 800,
    quality: 80,
    title: 'The Roseate Ganges - Wellness & Hillside Sanctuary',
    photographer: 'Rishikeshresorts',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Healing_and_fun.JPG',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Healing_and_fun.JPG',
  },

  // Divine Resort & Spa (Laxman Jhula)
  {
    target: 'src/assets/images/hotels/divine-resort-1.webp',
    width: 800,
    quality: 80,
    title: 'Divine Resort & Spa - Cliffside View of Laxman Jhula Bridge',
    photographer: 'Madrishh',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Laxman_jhulaa.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Laxman_jhulaa.jpg',
  },
  {
    target: 'src/assets/images/hotels/divine-resort-2.webp',
    width: 800,
    quality: 80,
    title: 'Divine Resort & Spa - Ghats Overlooking Holy Waters',
    photographer: 'आशीष_भटनागर',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganga_ghats,_Laxman_jhula,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Ganga_ghats%2C_Laxman_jhula%2C_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/divine-resort-3.webp',
    width: 800,
    quality: 80,
    title: 'Divine Resort & Spa - Riverfront Terrace & Temple Bells',
    photographer: 'आशीष_भटनागर',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganga_ghats,_Laxman_jhula,_Rishikesh_2.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Ganga_ghats%2C_Laxman_jhula%2C_Rishikesh_2.jpg',
  },
  {
    target: 'src/assets/images/hotels/divine-resort-4.webp',
    width: 800,
    quality: 80,
    title: 'Divine Resort & Spa - Hill Pathway to Bridge',
    photographer: 'Soumya Gupta2706',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Way_to_Laxman_Jhula,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Way_to_Laxman_Jhula%2C_Rishikesh.jpg',
  },

  // Atali Ganga (Shivpuri)
  {
    target: 'src/assets/images/hotels/atali-1.webp',
    width: 800,
    quality: 80,
    title: 'Atali Ganga - Rafting on Turquoise Ganga Waters',
    photographer: 'Goutam1962',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:River_Rafting_in_Ganga_Near_Ram_Jhula_Rishikesh_01.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/River_Rafting_in_Ganga_Near_Ram_Jhula_Rishikesh_01.jpg',
  },
  {
    target: 'src/assets/images/hotels/atali-2.webp',
    width: 800,
    quality: 80,
    title: 'Atali Ganga - Whitewater Rapid Expedition',
    photographer: 'Goutam1962',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:River_Rafting_in_Ganga_Near_Ram_Jhula_Rishikesh_02.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/River_Rafting_in_Ganga_Near_Ram_Jhula_Rishikesh_02.jpg',
  },
  {
    target: 'src/assets/images/hotels/atali-3.webp',
    width: 800,
    quality: 80,
    title: 'Atali Ganga - Himalayan River Navigation',
    photographer: 'Goutam1962',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:River_Rafting_in_Ganga_Near_Ram_Jhula_Rishikesh_03.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/River_Rafting_in_Ganga_Near_Ram_Jhula_Rishikesh_03.jpg',
  },
  {
    target: 'src/assets/images/hotels/atali-4.webp',
    width: 800,
    quality: 80,
    title: 'Atali Ganga - Adventure Rafting along Green Foothills',
    photographer: 'Cordavida',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rishikesh_-_Rafting_%26_Fun_In_Ganga.JPG',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Rishikesh_-_Rafting_%26_Fun_In_Ganga.JPG',
  },

  // Divine Ganga Cottage (Tapovan)
  {
    target: 'src/assets/images/hotels/divine-cottage-1.webp',
    width: 800,
    quality: 80,
    title: 'Divine Ganga Cottage - Boutique River Retreat',
    photographer: 'Deepanshu Mittall',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Laxman_Jhula,_Rishikesh,_Uttarkhand,_India.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Laxman_Jhula%2C_Rishikesh%2C_Uttarkhand%2C_India.jpg',
  },
  {
    target: 'src/assets/images/hotels/divine-cottage-2.webp',
    width: 800,
    quality: 80,
    title: 'Divine Ganga Cottage - Holy River View across Bridge',
    photographer: 'meg and rahul',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rishikesh_view_across_bridge.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Rishikesh_view_across_bridge.jpg',
  },
  {
    target: 'src/assets/images/hotels/divine-cottage-3.webp',
    width: 800,
    quality: 80,
    title: 'Divine Ganga Cottage - Fresh Mountain Air on the Bank',
    photographer: 'Pankaj Kumar Singh',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Bank_of_ganga_in_rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Bank_of_ganga_in_rishikesh.jpg',
  },

  // Modi Yoga Retreat (Muni Ki Reti)
  {
    target: 'src/assets/images/hotels/modi-1.webp',
    width: 800,
    quality: 80,
    title: 'Modi Yoga Retreat - Lush Gardens at Parmarth Niketan',
    photographer: 'Ken Wieland',
    license: 'CC BY-SA 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Gardens_at_Parmarth_Niketan,_Muni_Ki_Reti,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Gardens_at_Parmarth_Niketan%2C_Muni_Ki_Reti%2C_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/modi-2.webp',
    width: 800,
    quality: 80,
    title: 'Modi Yoga Retreat - Spiritual Sanctuary on the Holy River',
    photographer: 'आशीष_भटनागर',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Parmarth_Niketan,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Parmarth_Niketan%2C_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/modi-3.webp',
    width: 800,
    quality: 80,
    title: 'Modi Yoga Retreat - Parmarth Niketan Grand Courtyard',
    photographer: 'Billjones94',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Front_entrance_of_the_Parmarth_Niketan,_in_Rishikesh,_Uttarakhand.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Front_entrance_of_the_Parmarth_Niketan%2C_in_Rishikesh%2C_Uttarakhand.jpg',
  },

  // Ganga Beach Resort (Tapovan)
  {
    target: 'src/assets/images/hotels/ganga-beach-1.webp',
    width: 800,
    quality: 80,
    title: 'Ganga Beach Resort - Direct Riverbank Access',
    photographer: 'Shubhamanand2580',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganga_beach,_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Ganga_beach%2C_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/ganga-beach-2.webp',
    width: 800,
    quality: 80,
    title: 'Ganga Beach Resort - Riverside Shrine & Mountain Views',
    photographer: 'Kanishka Sharma',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:A_temple_situated_on_the_banks_of_river_Ganga_at_Rishikesh,_India.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/06/A_temple_situated_on_the_banks_of_river_Ganga_at_Rishikesh%2C_India.jpg',
  },
  {
    target: 'src/assets/images/hotels/ganga-beach-3.webp',
    width: 800,
    quality: 80,
    title: 'Ganga Beach Resort - Holy Beauty of the Riverbank',
    photographer: 'Abhi713',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Bank_of_ganga_river_showing_the_holy_beauty_rishikesh_temple.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Bank_of_ganga_river_showing_the_holy_beauty_rishikesh_temple.jpg',
  },

  // EllBee Ganga View (Haridwar Road / Rishikesh)
  {
    target: 'src/assets/images/hotels/ellbee-1.webp',
    width: 800,
    quality: 80,
    title: 'EllBee Ganga View - Evening Ganga Aarti at Triveni Ghat',
    photographer: 'Chandrasen Yadav',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:The_Ganga_Aarti.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/The_Ganga_Aarti.jpg',
  },
  {
    target: 'src/assets/images/hotels/ellbee-2.webp',
    width: 800,
    quality: 80,
    title: 'EllBee Ganga View - Holy Lamps and Aarti Ceremonies',
    photographer: 'Bhuvi Uniyal',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganga_Arti_At_Triveni_Ghat_In_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Ganga_Arti_At_Triveni_Ghat_In_Rishikesh.jpg',
  },
  {
    target: 'src/assets/images/hotels/ellbee-3.webp',
    width: 800,
    quality: 80,
    title: 'EllBee Ganga View - Panoramic Ghats & Evening Sky',
    photographer: 'ArmouredCyborg',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Aarti_at_Triveni_Ghat_Rishikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Aarti_at_Triveni_Ghat_Rishikesh.jpg',
  },

  // Zostel Rishikesh (Tapovan)
  {
    target: 'src/assets/images/hotels/zostel-1.webp',
    width: 800,
    quality: 80,
    title: 'Zostel Rishikesh - Famous Beatles Ashram Satsang Hall',
    photographer: 'Guy P Atkinson',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Beatles_Ashram_Satsang_Hall_Rishikesh.JPG',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Beatles_Ashram_Satsang_Hall_Rishikesh.JPG',
  },
  {
    target: 'src/assets/images/hotels/zostel-2.webp',
    width: 800,
    quality: 80,
    title: 'Zostel Rishikesh - Creative Street Murals in Rishikesh',
    photographer: 'Sumita Roy Dutta',
    license: 'CC BY-SA 4.0',
    source: "https://commons.wikimedia.org/wiki/File:Graffiti_in_the_abandoned_Mahesh_Yogi's_Ashram_Muni-ki-Reti_mostly_by_Beatles_fans_DSCN0011.jpg",
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Graffiti_in_the_abandoned_Mahesh_Yogi%27s_Ashram_Muni-ki-Reti_mostly_by_Beatles_fans_DSCN0011.jpg',
  },
  {
    target: 'src/assets/images/hotels/zostel-3.webp',
    width: 800,
    quality: 80,
    title: 'Zostel Rishikesh - Bohemian Heritage & Greenery',
    photographer: 'Sumita Roy Dutta',
    license: 'CC BY-SA 4.0',
    source: "https://commons.wikimedia.org/wiki/File:Graffiti_in_the_abandoned_Mahesh_Yogi's_Ashram_Muni-ki-Reti_mostly_by_Beatles_fans_DSCN0008.jpg",
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Graffiti_in_the_abandoned_Mahesh_Yogi%27s_Ashram_Muni-ki-Reti_mostly_by_Beatles_fans_DSCN0008.jpg',
  },

  // Zostel Plus Rishikesh (Mohanchatti)
  {
    target: 'src/assets/images/hotels/zostel-plus-1.webp',
    width: 800,
    quality: 80,
    title: 'Zostel Plus Rishikesh - Mountain Valley Vista',
    photographer: 'Arpan Mahajan',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rishikesh_(Ganges_View).jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Rishikesh_%28Ganges_View%29.jpg',
  },
  {
    target: 'src/assets/images/hotels/zostel-plus-2.webp',
    width: 800,
    quality: 80,
    title: 'Zostel Plus Rishikesh - Shivalik Himalayan Foothills',
    photographer: 'Vinayaraj',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rishikesh_views_-_during_LGFC_-_VOF_2019_(60).jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Rishikesh_views_-_during_LGFC_-_VOF_2019_%2860%29.jpg',
  },
  {
    target: 'src/assets/images/hotels/zostel-plus-3.webp',
    width: 800,
    quality: 80,
    title: 'Zostel Plus Rishikesh - River Rafting in Valley',
    photographer: 'Sumita Roy Dutta',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:River_rafting_at_Rishikesh_Photographed_By_Sumita_Roy.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/River_rafting_at_Rishikesh_Photographed_By_Sumita_Roy.jpg',
  },

  // The Glasshouse on the Ganges (Near Shivpuri / Byasi)
  {
    target: 'src/assets/images/hotels/glasshouse-1.webp',
    width: 800,
    quality: 80,
    title: 'The Glasshouse on the Ganges - Emerald Riverbend at Kaudiyala',
    photographer: 'Chakumar',
    license: 'CC BY 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganga_at_Kaudiayala.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Ganga_at_Kaudiayala.jpg',
  },
  {
    target: 'src/assets/images/hotels/glasshouse-2.webp',
    width: 800,
    quality: 80,
    title: 'The Glasshouse on the Ganges - Mountain Slopes & River View',
    photographer: 'Chandrabhan70',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Near_shivpuri.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Near_shivpuri.jpg',
  },
  {
    target: 'src/assets/images/hotels/glasshouse-3.webp',
    width: 800,
    quality: 80,
    title: 'The Glasshouse on the Ganges - Lychee Orchards & Tranquil Waters',
    photographer: 'Chandrabhan70',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Shivpuri_riahikesh.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Shivpuri_riahikesh.jpg',
  },

  // Hotel Natraj (Dehradun Road)
  {
    target: 'src/assets/images/hotels/natraj-1.webp',
    width: 800,
    quality: 80,
    title: 'Hotel Natraj - Broad Ganga River at Rishikesh',
    photographer: 'bazatop',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Ganges_at_Rishikesh_-_panoramio.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Ganges_at_Rishikesh_-_panoramio.jpg',
  },
  {
    target: 'src/assets/images/hotels/natraj-2.webp',
    width: 800,
    quality: 80,
    title: 'Hotel Natraj - Sunset over the Sacred River',
    photographer: 'McKay Savage',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:India_-_Rishikesh_-_021_-_sunset_over_the_Ganga_(2090628301).jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/India_-_Rishikesh_-_021_-_sunset_over_the_Ganga_%282090628301%29.jpg',
  },
  {
    target: 'src/assets/images/hotels/natraj-3.webp',
    width: 800,
    quality: 80,
    title: 'Hotel Natraj - Evening on the Ghats of Rishikesh',
    photographer: 'McKay Savage',
    license: 'CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:India_-_Rishikesh_-_018_-_evening_on_the_ghats_(2090623627).jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/India_-_Rishikesh_-_018_-_evening_on_the_ghats_%282090623627%29.jpg',
  },

  // AquaForest Rishikesh (Shivpuri)
  {
    target: 'src/assets/images/hotels/aquaforest-1.webp',
    width: 800,
    quality: 80,
    title: 'AquaForest Rishikesh - Clear Himalayan Waters at Shivpuri',
    photographer: 'GuruGulab',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:River_Ganges_shivpuri.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/River_Ganges_shivpuri.jpg',
  },
  {
    target: 'src/assets/images/hotels/aquaforest-2.webp',
    width: 800,
    quality: 80,
    title: 'AquaForest Rishikesh - Bank of the River Ganga',
    photographer: 'Chandrabhan70',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rishikesh_shivpuri.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Rishikesh_shivpuri.jpg',
  },
  {
    target: 'src/assets/images/hotels/aquaforest-3.webp',
    width: 800,
    quality: 80,
    title: 'AquaForest Rishikesh - Rafting Launch Point & Mountains',
    photographer: 'Goel.tushar042',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Rishikesh_rafting_point.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Rishikesh_rafting_point.jpg',
  },
]

async function downloadAndOptimize(item) {
  const destPath = path.resolve(item.target)
  fs.mkdirSync(path.dirname(destPath), { recursive: true })

  console.log(`Downloading: ${item.title}...`)
  const res = await fetch(item.url, {
    headers: {
      'User-Agent': 'StayNestApp/1.0 (contact@staynest.com; https://staynest.in)',
      Referer: 'https://commons.wikimedia.org/',
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to download ${item.url}: ${res.status} ${res.statusText}`)
  }

  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Use sharp to resize and save as WebP
  await sharp(buffer)
    .resize({ width: item.width, withoutEnlargement: true })
    .webp({ quality: item.quality })
    .toFile(destPath)

  const stats = fs.statSync(destPath)
  console.log(`✓ Saved ${item.target} (${Math.round(stats.size / 1024)} KB)`)
}

async function main() {
  console.log(`Starting download of ${imagesList.length} real Rishikesh images...`)
  let succeeded = 0
  let failed = 0

  for (let i = 0; i < imagesList.length; i++) {
    const item = imagesList[i]
    try {
      await downloadAndOptimize(item)
      succeeded++
    } catch (err) {
      console.error(`✗ Error downloading ${item.title}:`, err.message)
      failed++
    }
    // Small delay to be respectful to Wikimedia Commons servers
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  console.log(`\nFinished: ${succeeded} succeeded, ${failed} failed.`)

  // Generate updated credits.md
  let creditsMarkdown = `# Image Credits & Licences — StayNest Rishikesh

All photography used across StayNest is 100% genuine photography of **Rishikesh, Uttarakhand, India** (the sacred Ganga River, Laxman Jhula, Ram Jhula, Tapovan, Parmarth Niketan, Triveni Ghat, and Shivpuri). All images are freely licensed under Creative Commons or Public Domain.

No generic European, Alpine, Grand Canyon, or tropical island photography is used. Every image is stored locally as optimized WebP in \`src/assets/images/\`.

---

| Asset Path | Location & Subject in Rishikesh | Photographer / Creator | License | Wikimedia Source Link |
| :--- | :--- | :--- | :--- | :--- |
`

  for (const item of imagesList) {
    creditsMarkdown += `| \`${item.target}\` | ${item.title} | ${item.photographer} | ${item.license} | [View on Wikimedia Commons](${item.source}) |\n`
  }

  creditsMarkdown += `\n---\n*Updated on: October 30, 2026*\n`

  fs.writeFileSync('credits.md', creditsMarkdown, 'utf8')
  console.log('✓ Updated credits.md successfully!')
}

main()

