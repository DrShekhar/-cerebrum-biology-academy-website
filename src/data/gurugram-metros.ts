/**
 * Gurugram Metro Station Data for SEO Landing Pages
 * Includes Yellow Line (Delhi Metro) and Rapid Metro (Gurugram)
 * Targets searches like "NEET coaching near HUDA City Centre metro"
 */

export interface GurugramMetroStation {
  name: string
  slug: string
  line: 'Yellow' | 'Rapid Metro' | 'Aqua'
  lineColor: string
  nearbyAreas: string[]
  landmarks: string[]
  description: string
  walkingTime: string
  coordinates: { lat: number; lng: number }
}

export const gurugramMetroStations: Record<string, GurugramMetroStation> = {
  // YELLOW LINE (Delhi Metro extending to Gurugram)
  'huda-city-centre-metro': {
    name: 'HUDA City Centre',
    slug: 'huda-city-centre-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Sector 43', 'Sector 44', 'Sector 56', 'Sushant Lok', 'South City 1'],
    landmarks: ['HUDA City Centre', 'Sector 43 Market', 'MGF Mega City Mall', 'Galaxy Hotel'],
    description:
      'HUDA City Centre is the terminal station of Delhi Metro Yellow Line in Gurugram, connecting directly to our center in Sector 51 within 15 minutes.',
    walkingTime: '15 minutes from our center',
    coordinates: { lat: 28.4595, lng: 77.0724 },
  },
  'iffco-chowk-metro': {
    name: 'IFFCO Chowk',
    slug: 'iffco-chowk-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Sector 14', 'Sector 29', 'MG Road', 'DLF Phase 1', 'Old Gurugram'],
    landmarks: ['IFFCO Chowk', 'Signature Tower', 'JMD Megapolis', 'Leisure Valley'],
    description:
      'IFFCO Chowk Metro is a major junction connecting Yellow Line with Rapid Metro, providing excellent connectivity to all parts of Gurugram.',
    walkingTime: '20 minutes from our center',
    coordinates: { lat: 28.4724, lng: 77.0724 },
  },
  'mg-road-metro': {
    name: 'MG Road',
    slug: 'mg-road-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['MG Road', 'DLF Phase 1', 'DLF Phase 2', 'Sikanderpur'],
    landmarks: ['Sahara Mall', 'MGF Metropolis', 'Bristol Hotel', 'MG Road Commercial'],
    description:
      "MG Road Metro connects Gurugram's main commercial corridor to Delhi. Students from MG Road area can reach our center via Rapid Metro connection.",
    walkingTime: '25 minutes from our center',
    coordinates: { lat: 28.4796, lng: 77.0826 },
  },
  'sikanderpur-metro': {
    name: 'Sikanderpur',
    slug: 'sikanderpur-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Cyber City', 'DLF Phase 2', 'DLF Phase 3', 'Golf Course Road'],
    landmarks: ['DLF Cyber Hub', 'Sikanderpur Junction', 'Building 10 Cyber City'],
    description:
      'Sikanderpur Metro serves DLF Cyber City and connects to Rapid Metro, making it convenient for students from premium areas to reach our coaching center.',
    walkingTime: '25 minutes from our center',
    coordinates: { lat: 28.4824, lng: 77.0896 },
  },
  'guru-dronacharya-metro': {
    name: 'Guru Dronacharya',
    slug: 'guru-dronacharya-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['DLF Phase 1', 'DLF Phase 2', 'Cyber City', 'Udyog Vihar'],
    landmarks: ['DLF Galleria', 'Qutab Plaza', 'Bristol Chowk'],
    description:
      'Guru Dronacharya Metro serves DLF Phase 1 and 2, connecting elite residential areas to coaching centers via metro and Rapid Metro network.',
    walkingTime: '30 minutes from our center',
    coordinates: { lat: 28.4825, lng: 77.0962 },
  },
  'arjan-garh-metro': {
    name: 'Arjan Garh',
    slug: 'arjan-garh-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Ghitorni', 'Vasant Kunj', 'Delhi Border'],
    landmarks: ['Arjan Garh Village', 'Vasant Kunj Border'],
    description:
      'Arjan Garh Metro connects South Delhi to Gurugram, useful for students traveling from Vasant Kunj area to our Gurugram center.',
    walkingTime: '35 minutes from our center',
    coordinates: { lat: 28.4872, lng: 77.1101 },
  },

  // RAPID METRO (Gurugram Rapid Metro)
  'sector-54-chowk-rapid-metro': {
    name: 'Sector 54 Chowk',
    slug: 'sector-54-chowk-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['Sector 54', 'Golf Course Road', 'DLF Phase 5', 'Sector 53'],
    landmarks: ['Sector 54 Chowk', 'Golf Course Road', 'Central Plaza', 'One Horizon Centre'],
    description:
      'Sector 54 Chowk Rapid Metro serves the ultra-premium Golf Course Road area. Elite families here prefer our personalized NEET coaching.',
    walkingTime: '10 minutes from our center',
    coordinates: { lat: 28.4475, lng: 77.0670 },
  },
  'sector-55-56-rapid-metro': {
    name: 'Sector 55-56',
    slug: 'sector-55-56-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['Sector 55', 'Sector 56', 'Sector 57', 'South City 2', 'Sector 49'],
    landmarks: ['Sector 55-56 Market', 'Raheja Mall', 'Tulip Garden'],
    description:
      'Sector 55-56 Rapid Metro is the closest metro station to our center in Sector 51. Just 5 minutes walk!',
    walkingTime: '5 minutes from our center',
    coordinates: { lat: 28.4389, lng: 77.0573 },
  },
  'sector-42-43-rapid-metro': {
    name: 'Sector 42-43',
    slug: 'sector-42-43-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['Sector 42', 'Sector 43', 'Sushant Lok', 'HUDA City Centre'],
    landmarks: ['Sector 42-43 Market', 'Sushant Lok Market', 'Galaxy Hotel'],
    description:
      'Sector 42-43 Rapid Metro connects to HUDA City Centre Yellow Line, providing seamless access from Delhi to our coaching center.',
    walkingTime: '12 minutes from our center',
    coordinates: { lat: 28.4524, lng: 77.0701 },
  },
  'phase-1-rapid-metro': {
    name: 'Phase 1',
    slug: 'phase-1-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['DLF Phase 1', 'MG Road', 'Sikanderpur', 'DLF Phase 2'],
    landmarks: ['DLF Galleria', 'Qutab Plaza', 'MG Road'],
    description:
      'Phase 1 Rapid Metro serves DLF Phase 1, connecting elite residential areas to our NEET coaching center in Sector 51.',
    walkingTime: '20 minutes from our center',
    coordinates: { lat: 28.4744, lng: 77.0856 },
  },
  'phase-2-rapid-metro': {
    name: 'Phase 2',
    slug: 'phase-2-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['DLF Phase 2', 'DLF Phase 3', 'Cyber Hub', 'Sikanderpur'],
    landmarks: ['Cyber Hub', 'DLF Phase 2 Market', 'Sikanderpur Metro'],
    description:
      'Phase 2 Rapid Metro connects DLF Phase 2 and Cyber City to our coaching center, ideal for students from IT families.',
    walkingTime: '22 minutes from our center',
    coordinates: { lat: 28.4786, lng: 77.0896 },
  },
  'phase-3-rapid-metro': {
    name: 'Phase 3',
    slug: 'phase-3-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['DLF Phase 3', 'DLF Phase 4', 'Galleria Market', 'Nathupur'],
    landmarks: ['Phase 3 Market', 'Sahara Mall', 'Galleria Market DLF 4'],
    description:
      'Phase 3 Rapid Metro serves DLF Phase 3 and 4, connecting premium residential areas to our NEET Biology coaching center.',
    walkingTime: '18 minutes from our center',
    coordinates: { lat: 28.4683, lng: 77.0823 },
  },
  'moulsari-avenue-rapid-metro': {
    name: 'Moulsari Avenue',
    slug: 'moulsari-avenue-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['DLF Phase 3', 'DLF Cyber City', 'Sikanderpur'],
    landmarks: ['Moulsari Avenue', 'DLF Gateway Tower', 'Building 5 Cyber City'],
    description:
      'Moulsari Avenue Rapid Metro serves DLF corporate areas, convenient for students whose parents work in Cyber City.',
    walkingTime: '20 minutes from our center',
    coordinates: { lat: 28.4755, lng: 77.0886 },
  },
  'cyber-city-rapid-metro': {
    name: 'Cyber City',
    slug: 'cyber-city-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['DLF Cyber City', 'DLF Phase 2', 'Sikanderpur', 'Golf Course Road'],
    landmarks: ['DLF Cyber Hub', 'Infinity Tower', 'Building 8'],
    description:
      "Cyber City Rapid Metro serves Gurugram's IT hub. Many students from families working in Fortune 500 companies take NEET coaching at our center.",
    walkingTime: '25 minutes from our center',
    coordinates: { lat: 28.4948, lng: 77.0889 },
  },
  'belvedere-towers-rapid-metro': {
    name: 'Belvedere Towers',
    slug: 'belvedere-towers-rapid-metro',
    line: 'Rapid Metro',
    lineColor: '#FF6600',
    nearbyAreas: ['DLF Phase 3', 'Golf Course Road', 'Belvedere Park'],
    landmarks: ['Belvedere Towers', 'Belvedere Park', 'DLF Golf Course'],
    description:
      'Belvedere Towers Rapid Metro serves the ultra-premium Golf Course Road segment with luxury residential towers.',
    walkingTime: '15 minutes from our center',
    coordinates: { lat: 28.4617, lng: 77.0756 },
  },
}

// Helper functions
export function getGurugramMetroBySlug(slug: string): GurugramMetroStation | undefined {
  return gurugramMetroStations[slug]
}

export function getAllGurugramMetroSlugs(): string[] {
  return Object.keys(gurugramMetroStations)
}

export function getGurugramMetrosByLine(line: GurugramMetroStation['line']): string[] {
  return Object.entries(gurugramMetroStations)
    .filter(([_, station]) => station.line === line)
    .map(([slug]) => slug)
}
