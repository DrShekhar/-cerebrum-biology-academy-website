/**
 * Faridabad Metro Station Data for SEO Landing Pages
 * Violet Line (Delhi Metro) extending to Faridabad
 * Targets searches like "NEET coaching near Bata Chowk metro"
 */

export interface FaridabadMetroStation {
  name: string
  slug: string
  line: 'Violet'
  lineColor: string
  nearbyAreas: string[]
  landmarks: string[]
  description: string
  walkingTime: string
  coordinates: { lat: number; lng: number }
}

export const faridabadMetroStations: Record<string, FaridabadMetroStation> = {
  // VIOLET LINE (Delhi Metro - Faridabad Section)
  // Stations listed from Delhi border towards Ballabgarh

  'badarpur-border-metro': {
    name: 'Badarpur Border',
    slug: 'badarpur-border-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Badarpur', 'Tughlakabad', 'Delhi Border'],
    landmarks: ['Badarpur Border', 'Delhi-Faridabad Border', 'NH-44'],
    description:
      'Badarpur Border Metro is the first station entering Faridabad from Delhi on the Violet Line. Students from Badarpur and Tughlakabad areas access our Sector 17 center via this station.',
    walkingTime: '35 minutes from our center',
    coordinates: { lat: 28.4944, lng: 77.3033 },
  },
  'nhpc-chowk-metro': {
    name: 'NHPC Chowk',
    slug: 'nhpc-chowk-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Sector 31', 'Sector 32', 'NHPC Colony'],
    landmarks: ['NHPC Chowk', 'NHPC Office Complex', 'Sector 31 Market'],
    description:
      'NHPC Chowk Metro serves the NHPC Colony and Sectors 31-32. Students from NHPC families and government employees access our coaching center from this station.',
    walkingTime: '30 minutes from our center',
    coordinates: { lat: 28.4789, lng: 77.3067 },
  },
  'mewala-maharajpur-metro': {
    name: 'Mewala Maharajpur',
    slug: 'mewala-maharajpur-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Sector 27', 'Sector 28', 'Mewala Village'],
    landmarks: ['Mewala Maharajpur Junction', 'Sector 27 Industrial Area', 'NH-44'],
    description:
      'Mewala Maharajpur Metro serves Sectors 27 and 28. Students from industrial and residential areas near this station access our Sector 17 center easily.',
    walkingTime: '25 minutes from our center',
    coordinates: { lat: 28.4611, lng: 77.3100 },
  },
  'sector-28-metro': {
    name: 'Sector 28',
    slug: 'sector-28-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Sector 28', 'Sector 29', 'Commercial Area'],
    landmarks: ['Sector 28 Metro Station', 'Commercial Complex', 'Mathura Road'],
    description:
      'Sector 28 Metro is a key commercial hub in Faridabad. Students from Sectors 28-29 and nearby commercial areas access our coaching center via this station.',
    walkingTime: '20 minutes from our center',
    coordinates: { lat: 28.4467, lng: 77.3133 },
  },
  'badkhal-mor-metro': {
    name: 'Badkhal Mor',
    slug: 'badkhal-mor-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Badkhal', 'Sector 19', 'Sector 20', 'Surajkund'],
    landmarks: ['Badkhal Mor Junction', 'Badkhal Lake Road', 'Surajkund Road'],
    description:
      'Badkhal Mor Metro serves the Badkhal and Surajkund areas. Students from these scenic residential areas access our Sector 17 center via this station.',
    walkingTime: '15 minutes from our center',
    coordinates: { lat: 28.4333, lng: 77.3167 },
  },
  'old-faridabad-metro': {
    name: 'Old Faridabad',
    slug: 'old-faridabad-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Old Faridabad', 'Railway Road', 'Main Market'],
    landmarks: ['Old Faridabad Railway Station', 'Main Market', 'Bus Stand'],
    description:
      'Old Faridabad Metro serves the historic heart of the city. Students from business families and the old city area access our coaching center from this central station.',
    walkingTime: '12 minutes from our center',
    coordinates: { lat: 28.4200, lng: 77.3200 },
  },
  'neelam-chowk-metro': {
    name: 'Neelam Chowk Ajronda',
    slug: 'neelam-chowk-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Ajronda', 'Sector 15', 'Neelam Apartments', 'Crown Heights'],
    landmarks: ['Neelam Chowk', 'Crown Plaza', 'Apeejay School', 'Ajronda Junction'],
    description:
      'Neelam Chowk Ajronda Metro is centrally located, serving Sector 15, Ajronda, and Crown Heights areas. Just 8 minutes from our center!',
    walkingTime: '8 minutes from our center',
    coordinates: { lat: 28.4089, lng: 77.3178 },
  },
  'bata-chowk-metro': {
    name: 'Bata Chowk',
    slug: 'bata-chowk-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Sector 16', 'Sector 17', 'NIT Faridabad'],
    landmarks: ['Bata Chowk', 'Bata Factory', 'NIT Complex', 'HUDA Complex'],
    description:
      'Bata Chowk Metro is the CLOSEST station to our Sector 17 center - just 5 minutes walk! Students from all over Faridabad use this station to reach us.',
    walkingTime: '5 minutes from our center',
    coordinates: { lat: 28.4050, lng: 77.3150 },
  },
  'escorts-mujesar-metro': {
    name: 'Escorts Mujesar',
    slug: 'escorts-mujesar-metro',
    line: 'Violet',
    lineColor: '#9400D3',
    nearbyAreas: ['Ballabgarh', 'Mujesar', 'Greater Faridabad', 'Sector 75-89'],
    landmarks: ['Escorts Factory', 'Mujesar Village', 'Ballabgarh Road', 'Greater Faridabad Junction'],
    description:
      'Escorts Mujesar Metro is the terminal station serving Ballabgarh and all of Greater Faridabad (Sectors 75-89). Students from BPTP, Omaxe, RPS, and other premium townships access our center from here.',
    walkingTime: '15 minutes from our center',
    coordinates: { lat: 28.3933, lng: 77.3117 },
  },
}

// Helper functions
export function getFaridabadMetroBySlug(slug: string): FaridabadMetroStation | undefined {
  return faridabadMetroStations[slug]
}

export function getAllFaridabadMetroSlugs(): string[] {
  return Object.keys(faridabadMetroStations)
}

export function getFaridabadMetrosByLine(): string[] {
  // All Faridabad metros are Violet Line
  return Object.keys(faridabadMetroStations)
}

// Get stations nearest to our center (for highlighting)
export function getNearestMetroStations(): string[] {
  return ['bata-chowk-metro', 'neelam-chowk-metro', 'old-faridabad-metro']
}

// Get metro stations serving Greater Faridabad townships
export function getGreaterFaridabadMetros(): string[] {
  return ['escorts-mujesar-metro']
}
