/**
 * Ghaziabad Metro Stations Data
 * Covers Blue Line extension and Red Line
 *
 * Blue Line: Dwarka Sector 21 - Vaishali (via Noida)
 * Red Line: Dilshad Garden - New Bus Adda (Shaheed Sthal)
 */

export interface GhaziabadMetroStation {
  name: string
  slug: string
  line: 'Blue' | 'Red'
  lineColor: string
  nearbyAreas: string[]
  landmarks: string[]
  description: string
  walkingTime: string
  coordinates: { lat: number; lng: number }
  voiceSearchPhrases: string[]
}

export const ghaziabadMetroStations: GhaziabadMetroStation[] = [
  // BLUE LINE (Vaishali Extension)
  {
    name: 'Vaishali',
    slug: 'vaishali-metro',
    line: 'Blue',
    lineColor: 'bg-blue-600',
    nearbyAreas: ['vaishali', 'indirapuram', 'vasundhara', 'kaushambi'],
    landmarks: ['Mahagun Metro Mall', 'Ramprastha Greens', 'Sector 4 Market'],
    description: 'Blue Line terminus serving Vaishali, Indirapuram, and Vasundhara areas',
    walkingTime: '5-15 min to nearby areas',
    coordinates: { lat: 28.6458, lng: 77.3376 },
    voiceSearchPhrases: [
      'NEET coaching near Vaishali Metro',
      'Biology classes at Vaishali station',
      'NEET tuition Vaishali Metro area',
    ],
  },
  {
    name: 'Kaushambi',
    slug: 'kaushambi-metro',
    line: 'Blue',
    lineColor: 'bg-blue-600',
    nearbyAreas: ['kaushambi', 'indirapuram', 'vaishali', 'sahibabad'],
    landmarks: ['Anand Vihar ISBT', 'Kaushambi Commercial Complex', 'East Delhi border'],
    description: 'Blue Line station connecting Ghaziabad to Delhi via Anand Vihar',
    walkingTime: '5-10 min to nearby areas',
    coordinates: { lat: 28.6503, lng: 77.3147 },
    voiceSearchPhrases: [
      'NEET coaching near Kaushambi Metro',
      'Biology classes Kaushambi station',
      'NEET tuition near Anand Vihar',
    ],
  },

  // RED LINE (Ghaziabad Section)
  {
    name: 'Dilshad Garden',
    slug: 'dilshad-garden-metro',
    line: 'Red',
    lineColor: 'bg-red-600',
    nearbyAreas: ['sahibabad', 'shalimar-garden'],
    landmarks: ['Dilshad Garden Colony', 'Delhi-Ghaziabad border', 'GT Road'],
    description: 'Red Line station at Delhi-Ghaziabad border',
    walkingTime: '10-15 min to Ghaziabad areas',
    coordinates: { lat: 28.6757, lng: 77.3192 },
    voiceSearchPhrases: [
      'NEET coaching near Dilshad Garden Metro',
      'Biology classes Delhi-Ghaziabad border',
      'NEET tuition Dilshad Garden area',
    ],
  },
  {
    name: 'Shyam Park',
    slug: 'shyam-park-metro',
    line: 'Red',
    lineColor: 'bg-red-600',
    nearbyAreas: ['sahibabad', 'mohan-nagar', 'shalimar-garden'],
    landmarks: ['Sahibabad Industrial Area', 'Shyam Park locality', 'GT Road'],
    description: 'Red Line station serving Sahibabad industrial area',
    walkingTime: '10 min to nearby areas',
    coordinates: { lat: 28.6804, lng: 77.3421 },
    voiceSearchPhrases: [
      'NEET coaching near Shyam Park Metro',
      'Biology classes Sahibabad area',
      'NEET tuition near GT Road Ghaziabad',
    ],
  },
  {
    name: 'Mohan Nagar',
    slug: 'mohan-nagar-metro',
    line: 'Red',
    lineColor: 'bg-red-600',
    nearbyAreas: ['mohan-nagar', 'sahibabad', 'vijay-nagar', 'pratap-vihar'],
    landmarks: ['RDC Raj Nagar', 'Mohan Nagar Market', 'GT Road junction'],
    description: 'Major Red Line station serving central Ghaziabad',
    walkingTime: '5-10 min to nearby areas',
    coordinates: { lat: 28.6892, lng: 77.3598 },
    voiceSearchPhrases: [
      'NEET coaching near Mohan Nagar Metro',
      'Biology classes Mohan Nagar Ghaziabad',
      'NEET tuition central Ghaziabad',
    ],
  },
  {
    name: 'Arthala',
    slug: 'arthala-metro',
    line: 'Red',
    lineColor: 'bg-red-600',
    nearbyAreas: ['pratap-vihar', 'mohan-nagar', 'vijay-nagar'],
    landmarks: ['Arthala locality', 'Raj Nagar District Centre', 'GT Road'],
    description: 'Red Line station serving Arthala and nearby areas',
    walkingTime: '10 min to nearby areas',
    coordinates: { lat: 28.6981, lng: 77.3712 },
    voiceSearchPhrases: [
      'NEET coaching near Arthala Metro',
      'Biology classes Arthala Ghaziabad',
      'NEET tuition Raj Nagar area',
    ],
  },
  {
    name: 'Hindon River',
    slug: 'hindon-river-metro',
    line: 'Red',
    lineColor: 'bg-red-600',
    nearbyAreas: ['govindpuram', 'raj-nagar-extension', 'shaheed-sthal'],
    landmarks: ['Hindon River', 'Trans-Hindon areas', 'NH-58 nearby'],
    description: 'Red Line station near Hindon River serving Trans-Hindon areas',
    walkingTime: '10-15 min to nearby areas',
    coordinates: { lat: 28.7068, lng: 77.3845 },
    voiceSearchPhrases: [
      'NEET coaching near Hindon River Metro',
      'Biology classes Trans-Hindon Ghaziabad',
      'NEET tuition near NH-58',
    ],
  },
  {
    name: 'Shaheed Sthal (New Bus Adda)',
    slug: 'shaheed-sthal-metro',
    line: 'Red',
    lineColor: 'bg-red-600',
    nearbyAreas: ['shaheed-sthal', 'raj-nagar-extension', 'govindpuram'],
    landmarks: ['New Bus Adda', 'NH-58', 'Raj Nagar Extension entry'],
    description: 'Red Line terminus serving Raj Nagar Extension and NH-58 corridor',
    walkingTime: '5-15 min to nearby areas',
    coordinates: { lat: 28.7156, lng: 77.3967 },
    voiceSearchPhrases: [
      'NEET coaching near Shaheed Sthal Metro',
      'Biology classes New Bus Adda Ghaziabad',
      'NEET tuition Raj Nagar Extension',
    ],
  },
]

// Helper Functions
export function getGhaziabadMetroBySlug(slug: string): GhaziabadMetroStation | undefined {
  return ghaziabadMetroStations.find((station) => station.slug === slug)
}

export function getAllGhaziabadMetroSlugs(): string[] {
  return ghaziabadMetroStations.map((station) => station.slug)
}

export function getGhaziabadMetrosByLine(line: 'Blue' | 'Red'): GhaziabadMetroStation[] {
  return ghaziabadMetroStations.filter((station) => station.line === line)
}

export function getGhaziabadMetrosNearArea(areaSlug: string): GhaziabadMetroStation[] {
  return ghaziabadMetroStations.filter((station) => station.nearbyAreas.includes(areaSlug))
}
