/**
 * South Delhi Metro Station Data for SEO Landing Pages
 * Targets searches like "NEET coaching near Hauz Khas metro"
 */

export interface MetroStation {
  name: string
  slug: string
  line: 'Yellow' | 'Magenta' | 'Violet' | 'Blue' | 'Pink' | 'Green'
  lineColor: string
  nearbyAreas: string[]
  landmarks: string[]
  description: string
  walkingTime: string
}

export const metroStations: Record<string, MetroStation> = {
  'hauz-khas-metro': {
    name: 'Hauz Khas',
    slug: 'hauz-khas-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Hauz Khas', 'Green Park', 'Kalu Sarai', 'SDA', 'Gulmohar Park'],
    landmarks: ['Hauz Khas Village', 'Deer Park', 'IIT Delhi', 'Green Park Market'],
    description:
      'Hauz Khas Metro is a major interchange station on the Yellow and Magenta lines, providing excellent connectivity to coaching hubs in South Delhi.',
    walkingTime: '5-10 minutes from our center',
  },
  'iit-delhi-metro': {
    name: 'IIT Delhi',
    slug: 'iit-delhi-metro',
    line: 'Magenta',
    lineColor: '#CC0066',
    nearbyAreas: ['Kalu Sarai', 'Ber Sarai', 'Katwaria Sarai', 'SDA', 'Hauz Khas'],
    landmarks: ['IIT Delhi Main Gate', 'SDA Market', 'JNU', 'Kalu Sarai Coaching Hub'],
    description:
      'IIT Delhi Metro station is the closest to the famous Kalu Sarai coaching hub, making it the most convenient for NEET aspirants.',
    walkingTime: '2-5 minutes from our center',
  },
  'green-park-metro': {
    name: 'Green Park',
    slug: 'green-park-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Green Park', 'Hauz Khas', 'Safdarjung Enclave', 'Andrews Ganj'],
    landmarks: ['Green Park Market', 'Aurobindo Market', 'AIIMS', 'Safdarjung Hospital'],
    description:
      'Green Park Metro on the Yellow Line offers easy access to premium residential areas and coaching centers in South Delhi.',
    walkingTime: '10-15 minutes from our center',
  },
  'aiims-metro': {
    name: 'AIIMS',
    slug: 'aiims-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['AIIMS', 'Kidwai Nagar', 'Andrews Ganj', 'Safdarjung Enclave'],
    landmarks: ['AIIMS Hospital', 'Safdarjung Hospital', 'INA Market', 'Dilli Haat'],
    description:
      'AIIMS Metro station connects to premier medical institutions, making it ideal for aspiring medical students.',
    walkingTime: '15-20 minutes from our center',
  },
  'greater-kailash-metro': {
    name: 'Greater Kailash',
    slug: 'greater-kailash-metro',
    line: 'Magenta',
    lineColor: '#CC0066',
    nearbyAreas: ['Greater Kailash', 'CR Park', 'East of Kailash', 'Kalkaji'],
    landmarks: ['GK M Block Market', 'CR Park Market', 'Archana Complex'],
    description:
      'Greater Kailash Metro serves the affluent GK area, home to students from top schools seeking quality NEET coaching.',
    walkingTime: '20-25 minutes from our center',
  },
  'saket-metro': {
    name: 'Saket',
    slug: 'saket-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Saket', 'Malviya Nagar', 'Hauz Khas', 'Panchsheel Park'],
    landmarks: ['Select City Walk', 'DLF Place', 'Saket District Centre'],
    description:
      'Saket Metro on the Yellow Line provides connectivity to the rapidly developing Saket area with growing demand for NEET coaching.',
    walkingTime: '15-20 minutes from our center',
  },
  'malviya-nagar-metro': {
    name: 'Malviya Nagar',
    slug: 'malviya-nagar-metro',
    line: 'Yellow',
    lineColor: '#FFCC00',
    nearbyAreas: ['Malviya Nagar', 'Saket', 'Panchsheel Park', 'Sheikh Sarai'],
    landmarks: ['Malviya Nagar Market', 'Shivalik', 'Panchshila Club'],
    description:
      'Malviya Nagar Metro serves the affordable coaching and student hub area in South Delhi.',
    walkingTime: '15-20 minutes from our center',
  },
  'rk-puram-metro': {
    name: 'RK Puram',
    slug: 'rk-puram-metro',
    line: 'Magenta',
    lineColor: '#CC0066',
    nearbyAreas: ['RK Puram', 'Munirka', 'Vasant Vihar', 'Moti Bagh'],
    landmarks: ['DPS RK Puram', 'Bhikaji Cama Place', 'Africa Avenue'],
    description:
      'RK Puram Metro connects the large government colony with excellent access to coaching centers near IIT Delhi.',
    walkingTime: '10-15 minutes from our center',
  },
  'munirka-metro': {
    name: 'Munirka',
    slug: 'munirka-metro',
    line: 'Magenta',
    lineColor: '#CC0066',
    nearbyAreas: ['Munirka', 'JNU', 'RK Puram', 'Vasant Vihar'],
    landmarks: ['JNU Campus', 'Munirka Village', 'Nelson Mandela Marg'],
    description:
      'Munirka Metro serves the vibrant student hub near JNU, popular among NEET aspirants from across India.',
    walkingTime: '10-12 minutes from our center',
  },
  'kalkaji-mandir-metro': {
    name: 'Kalkaji Mandir',
    slug: 'kalkaji-mandir-metro',
    line: 'Violet',
    lineColor: '#8000FF',
    nearbyAreas: ['Kalkaji', 'CR Park', 'Govind Puri', 'Nehru Place'],
    landmarks: ['Kalkaji Temple', 'Lotus Temple', 'Nehru Place IT Hub'],
    description:
      'Kalkaji Mandir Metro is an interchange station connecting Violet and Magenta lines, serving students from South-East Delhi.',
    walkingTime: '25-30 minutes from our center',
  },
  'nehru-place-metro': {
    name: 'Nehru Place',
    slug: 'nehru-place-metro',
    line: 'Violet',
    lineColor: '#8000FF',
    nearbyAreas: ['Nehru Place', 'Kalkaji', 'East of Kailash', 'Alaknanda'],
    landmarks: ['Nehru Place IT Market', 'Lotus Temple', 'CR Park'],
    description:
      'Nehru Place Metro serves the IT hub area with students from nearby residential colonies seeking NEET coaching.',
    walkingTime: '25-30 minutes from our center',
  },
  'lajpat-nagar-metro': {
    name: 'Lajpat Nagar',
    slug: 'lajpat-nagar-metro',
    line: 'Violet',
    lineColor: '#8000FF',
    nearbyAreas: ['Lajpat Nagar', 'Defence Colony', 'South Extension', 'GK'],
    landmarks: ['Central Market', 'Defence Colony Flyover', 'South Ex Market'],
    description:
      'Lajpat Nagar Metro connects the bustling commercial area with Defence Colony and GK, serving many NEET aspirants.',
    walkingTime: '20-25 minutes from our center',
  },
}

export function getMetroBySlug(slug: string): MetroStation | undefined {
  return metroStations[slug]
}

export function getAllMetroSlugs(): string[] {
  return Object.keys(metroStations)
}
