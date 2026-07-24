import type { LocalityCuesProps } from '@/components/seo/LocalityCues'

/**
 * Locality-cue configs for the 5 highest-value Delhi NCR hub pages.
 * Surfaces real area names, feeder schools, metro stations, and local
 * competitors — content Google needs to distinguish each page from
 * boilerplate templates.
 */

export type DelhiNCRLocalityKey = 'rohini' | 'south-extension' | 'gurugram' | 'noida' | 'faridabad'

export const delhiNCRLocalityCues: Record<DelhiNCRLocalityKey, LocalityCuesProps> = {
  rohini: {
    cityName: 'Rohini, North Delhi',
    cityShortName: 'Rohini',
    introCopy:
      'Cerebrum Rohini at 211 Vikas Surya Tower, DC Chowk, Sector 9 serves North Delhi NEET aspirants from Sectors 5 through 18, Pitampura, Shalimar Bagh, Adarsh Nagar and Wazirpur — with AIIMS-trained biology faculty in 15–20 student batches.',
    feederSchools: [
      { name: 'DPS Rohini', area: 'Sector 19' },
      { name: 'DAV Public School Rohini', area: 'Sector 14' },
      { name: 'Bal Bharati Public School', area: 'Pitampura' },
      { name: 'Maharaja Agrasen Public School', area: 'Rohini' },
      { name: 'Cambridge School Rohini', area: 'Sector 9' },
      { name: 'Apeejay School Pitampura', area: 'Pitampura' },
    ],
    subAreas: [
      { name: 'Sector 9 / DC Chowk', description: 'Cerebrum centre location' },
      { name: 'Sectors 5–8', description: 'Old Rohini residential' },
      { name: 'Sectors 13–18', description: 'New Rohini, Avantika' },
      { name: 'Pitampura', description: '3 km · adjacent NW Delhi' },
      { name: 'Shalimar Bagh', description: '5 km · many of our students live here' },
      { name: 'Adarsh Nagar / Wazirpur', description: 'Also served by our Rohini centre' },
    ],
    metroStations: [
      { name: 'Rohini West', line: 'Red Line (closest)' },
      { name: 'Rohini East', line: 'Red Line' },
      { name: 'Pitampura', line: 'Red Line' },
      { name: 'Kohat Enclave', line: 'Red Line' },
      { name: 'Inderlok (interchange)', line: 'Red + Green Line' },
    ],
    localCompetitors: [
      { brand: 'Allen Rohini', note: 'Sector 18, 4 km' },
      { brand: 'Aakash Rohini', note: '~6 km' },
      { brand: 'FIITJEE Pitampura', note: 'Generalist, 4 km' },
      { brand: 'Career Launcher Rohini', note: 'Multi-subject' },
    ],
  },

  'south-extension': {
    cityName: 'South Extension, South Delhi',
    cityShortName: 'South Extension',
    introCopy:
      "Cerebrum's flagship South Extension centre at Block D, Part 2 serves South Delhi NEET aspirants from Defence Colony, Lajpat Nagar, Greater Kailash, Hauz Khas, Saket, Vasant Kunj, INA and Sarojini Nagar — all within 30-minute reach. AIIMS-trained Dr. Shekhar C Singh personally teaches Pinnacle batches.",
    feederSchools: [
      { name: 'Sanskriti School', area: 'Chanakyapuri · 4 km' },
      { name: "Mother's International School", area: 'Near AIIMS · 3 km' },
      { name: 'DPS Mathura Road', area: 'New Friends Colony · 5 km' },
      { name: 'Modern School', area: 'Barakhamba Road · 6 km' },
      { name: 'Springdales Pusa Road', area: 'Pusa Road · 7 km' },
      { name: 'Tagore International', area: 'Vasant Vihar · 5 km' },
    ],
    subAreas: [
      { name: 'South Extension Part 1 & 2', description: 'Cerebrum centre location' },
      { name: 'Defence Colony', description: '2 km · 8 min' },
      { name: 'Lajpat Nagar', description: '3 km · 10 min' },
      { name: 'Greater Kailash (M, N, S blocks)', description: '3 km · 10 min' },
      { name: 'Hauz Khas', description: '4 km · 12 min' },
      { name: 'Saket', description: '6 km · 18 min' },
      { name: 'Vasant Kunj', description: '8 km · 22 min' },
      { name: 'INA / Sarojini Nagar', description: '2 km · 8 min' },
    ],
    metroStations: [
      { name: 'South Extension', line: 'Pink Line (closest, 5 min walk)' },
      { name: 'AIIMS', line: 'Yellow Line (1.5 km)' },
      { name: 'Lajpat Nagar (interchange)', line: 'Pink + Violet Line' },
      { name: 'INA', line: 'Yellow + Pink Line' },
      { name: 'Hauz Khas (interchange)', line: 'Yellow + Magenta Line' },
    ],
    localCompetitors: [
      {
        brand: 'Allen South Delhi',
        note: 'Lajpat Nagar / Saket',
      },
      {
        brand: 'Aakash',
        note: 'Punjabi Bagh + multiple Delhi',
      },
      { brand: 'FIITJEE Kalu Sarai', note: '4 km · generalist' },
      { brand: 'PhysicsWallah and Unacademy Vidyapeeth', note: 'Online + select offline' },
    ],
  },

  gurugram: {
    cityName: 'Gurugram',
    cityShortName: 'Gurugram',
    introCopy:
      'Cerebrum Gurugram at Unit 17, M2K Corporate Park, Sector 51 serves Gurugram NEET aspirants from DLF Phases 1–5, Sushant Lok, MG Road, Golf Course Road, Sohna Road, and Sectors 14 through 65 — covering all of Gurugram NCR.',
    feederSchools: [
      { name: 'GD Goenka World School', area: 'Sohna Road · 7 km' },
      { name: 'Suncity School', area: 'Sector 54 · 2 km' },
      { name: 'Shri Ram School Aravali', area: 'Aravali Hills · 10 km' },
      { name: 'Pathways World School', area: 'Aravali · 12 km' },
      { name: 'DPS Sector 45', area: 'Sector 45 · 5 km' },
      { name: 'Heritage Xperiential School', area: 'Sector 62 · 6 km' },
    ],
    subAreas: [
      { name: 'Sector 51 (Cerebrum centre)', description: 'Mayfield Garden · M2K' },
      { name: 'DLF Phase 1–5', description: '3–8 km from centre' },
      { name: 'Sushant Lok', description: '4 km · 12 min' },
      { name: 'MG Road / Cyber Hub', description: '5 km · 15 min' },
      { name: 'Golf Course Road', description: '5 km · 15 min' },
      { name: 'Sohna Road', description: '8 km · 20 min' },
      { name: 'Sectors 14, 29, 31, 45, 56', description: 'Old + New Gurugram' },
      { name: 'New Gurgaon / Manesar', description: 'Online preferred' },
    ],
    metroStations: [
      { name: 'Sector 54 Chowk (Rapid Metro)', line: 'Closest · adjacent' },
      { name: 'HUDA City Centre', line: 'Yellow Line · 3 km' },
      { name: 'IFFCO Chowk', line: 'Yellow Line · 4 km' },
      { name: 'Sector 53–54', line: 'Rapid Metro (adjacent)' },
      { name: 'MG Road', line: 'Yellow Line · 5 km' },
    ],
    localCompetitors: [
      {
        brand: 'Allen Gurugram',
        note: 'Sector 14 + Sector 56',
      },
      { brand: 'Aakash', note: 'Sector 27 · large batches' },
      { brand: 'FIITJEE Gurugram', note: 'Generalist NEET + JEE' },
      { brand: 'Kota chains like Allen and Resonance Gurugram', note: 'Sector 14 area' },
    ],
  },

  noida: {
    cityName: 'Noida',
    cityShortName: 'Noida',
    introCopy:
      'Cerebrum serves Noida NEET aspirants from Sectors 18, 50, 62, 75, 78, 100, 110, and Greater Noida West through live online classes — with AIIMS-trained biology faculty in IST evening batches that fit Noida school schedules. Nearest walk-in centre: South Extension, New Delhi.',
    feederSchools: [
      { name: 'DPS Noida', area: 'Sector 30 · 8 km' },
      { name: 'Cambridge International School', area: 'Sector 27 · 6 km' },
      { name: 'Amity International School', area: 'Sector 44 · 4 km' },
      { name: 'Lotus Valley International', area: 'Sector 126 · 12 km' },
      { name: 'Genesis Global School', area: 'Sector 132' },
      { name: 'Apeejay School Noida', area: 'Sector 16A · 8 km' },
    ],
    subAreas: [
      { name: 'Sector 62', description: 'Electronic City · IT hub' },
      { name: 'Sector 18 (Atta Market)', description: 'Main commercial hub' },
      { name: 'Sectors 50–75', description: 'Central Noida' },
      { name: 'Sectors 75, 78, 100, 110', description: 'Residential clusters' },
      { name: 'Sector 16A / 16B', description: 'Established residential' },
      { name: 'Greater Noida West (Noida Extension)', description: '15 km' },
      { name: 'Greater Noida', description: 'Online preferred' },
    ],
    metroStations: [
      { name: 'Sector 62 (Electronic City)', line: 'Blue Line' },
      { name: 'Noida Sector 52', line: 'Aqua Line (Sector 51 interchange)' },
      { name: 'Botanical Garden', line: 'Blue + Magenta Line · 8 km' },
      { name: 'Noida City Centre', line: 'Blue Line · 5 km' },
      { name: 'Sector 18', line: 'Blue Line · 7 km' },
    ],
    localCompetitors: [
      {
        brand: 'Allen Noida',
        note: 'Sector 50 + Sector 18',
      },
      { brand: 'Aakash', note: 'Sector 18 · large batches' },
      { brand: 'FIITJEE Noida', note: 'Sector 62 · generalist' },
      { brand: 'PhysicsWallah and Unacademy Noida', note: 'Multiple sectors' },
    ],
  },

  faridabad: {
    cityName: 'Faridabad',
    cityShortName: 'Faridabad',
    introCopy:
      'Cerebrum Faridabad at SCF-130, HUDA Market, Sector 17 serves Faridabad NEET aspirants from Sectors 15 through 89, NIT Faridabad, Ballabgarh, Old Faridabad, and BPTP Parklands — all within 5 minutes of Bata Chowk Metro on the Violet Line.',
    feederSchools: [
      { name: 'Apeejay School Faridabad', area: 'Sector 15 · 2 km' },
      { name: 'DPS Faridabad', area: 'Sector 19 · 3 km' },
      { name: 'Modern Vidya Niketan', area: 'Sector 17 · adjacent' },
      { name: 'St Anthony Senior Secondary', area: 'Sector 16A · 2 km' },
      { name: 'Manav Rachna International', area: 'Sector 14 · 3 km' },
      { name: 'Aravalli Hills Convent', area: 'Sector 28 · 4 km' },
    ],
    subAreas: [
      { name: 'Sector 17 (Cerebrum centre)', description: 'HUDA Market' },
      { name: 'Sectors 15, 16, 16A', description: '1–2 km' },
      { name: 'Sector 19, 21', description: '2–3 km' },
      { name: 'NIT Faridabad', description: '5 km · old town' },
      { name: 'Old Faridabad', description: '5 km' },
      { name: 'Sectors 75–89', description: 'Greater Faridabad' },
      { name: 'BPTP Parklands / Omaxe Heights', description: 'Premium residential' },
      { name: 'Ballabgarh', description: '12 km · Online preferred' },
    ],
    metroStations: [
      { name: 'Bata Chowk', line: 'Violet Line (closest, 5 min walk)' },
      { name: 'Neelam Chowk Ajronda', line: 'Violet Line' },
      { name: 'Old Faridabad', line: 'Violet Line' },
      { name: 'Badkhal Mor', line: 'Violet Line' },
      { name: 'Sant Surdas (Sihi)', line: 'Violet Line · Greater Fbd' },
    ],
    localCompetitors: [
      {
        brand: 'Allen Faridabad',
        note: 'Sector 15 · 2 km',
      },
      { brand: 'Aakash', note: 'Sector 16A · generalist' },
      { brand: 'FIITJEE Faridabad', note: 'NIT 1 · multi-subject' },
      { brand: 'Career Launcher', note: 'Sector 21' },
    ],
  },
}
