/**
 * Noida Metro Station Data for SEO, AEO, and GEO Landing Pages
 * Covers Blue Line, Aqua Line, and connections to Noida and Greater Noida
 *
 * Blue Line: Dwarka to Noida Electronic City (via central Delhi)
 * Aqua Line: Noida Sector 51 to Greater Noida Depot
 * Magenta Line: Botanical Garden interchange
 */

export interface NoidaMetroStation {
  name: string
  slug: string
  line: 'Blue' | 'Aqua' | 'Magenta'
  lineColor: string
  nearbyAreas: string[]
  landmarks: string[]
  description: string
  walkingTime: string
  coordinates: { lat: number; lng: number }
  // AEO - Voice search phrases
  voiceSearchPhrases: string[]
}

export const noidaMetroStations: Record<string, NoidaMetroStation> = {
  // BLUE LINE (Delhi Metro - Noida Section)
  // Stations listed from Delhi towards Noida

  'noida-sector-15-metro': {
    name: 'Noida Sector 15',
    slug: 'noida-sector-15-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Sector 15', 'Sector 16', 'Film City', 'Old Noida'],
    landmarks: ['Sector 15 Market', 'Film City Road', 'Sector 15 Residential'],
    description:
      'Noida Sector 15 Metro is one of the first stations entering Noida from Delhi. Students from Old Noida sectors are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.585, lng: 77.31 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 15 Metro Noida',
      'Biology classes accessible from Sector 15 Metro',
    ],
  },
  'noida-sector-16-metro': {
    name: 'Noida Sector 16',
    slug: 'noida-sector-16-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Sector 16', 'Sector 15', 'Sector 17', 'Film City'],
    landmarks: ['Sector 16 Market', 'Residential Area', 'Metro Station'],
    description:
      'Noida Sector 16 Metro serves the established residential sectors of Old Noida, whose students are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.578, lng: 77.315 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 16 Metro',
      'Biology tuition accessible from Sector 16 station',
    ],
  },
  'noida-sector-18-metro': {
    name: 'Noida Sector 18',
    slug: 'noida-sector-18-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Sector 18', 'Atta Market', 'GIP Mall', 'Wave Mall'],
    landmarks: ['Atta Market', 'Great India Place', 'Wave Mall', 'Brahmaputra'],
    description:
      'Noida Sector 18 Metro is the commercial heart of Noida, near Atta Market and GIP Mall. Students from this busy area are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.57, lng: 77.32 },
    voiceSearchPhrases: [
      'NEET coaching near Atta Market Metro',
      'Biology classes near Sector 18 Metro Noida',
      'NEET institute near GIP Mall Metro',
    ],
  },
  'botanical-garden-metro': {
    name: 'Botanical Garden',
    slug: 'botanical-garden-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Botanical Garden', 'Sector 37', 'Sector 38', 'Interchange Point'],
    landmarks: ['Botanical Garden', 'Blue-Magenta Interchange', 'Sector 37'],
    description:
      'Botanical Garden Metro is a key interchange station between Blue and Magenta lines. Students across South Delhi and Noida are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.5635, lng: 77.334 },
    voiceSearchPhrases: [
      'NEET coaching near Botanical Garden Metro',
      'Biology classes accessible from Blue-Magenta interchange',
    ],
  },
  'golf-course-metro': {
    name: 'Golf Course',
    slug: 'golf-course-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Golf Course', 'Sector 38', 'Sector 39'],
    landmarks: ['Noida Golf Course', 'Sector 38 Market', 'Residential Area'],
    description:
      'Golf Course Metro serves the upscale golf course area of Noida. Premium residents here seek quality NEET coaching.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.558, lng: 77.34 },
    voiceSearchPhrases: [
      'NEET coaching near Golf Course Metro Noida',
      'Biology classes for Golf Course area students',
    ],
  },
  'noida-city-centre-metro': {
    name: 'Noida City Centre',
    slug: 'noida-city-centre-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['City Centre', 'Sector 32', 'Sector 33', 'Commercial Hub'],
    landmarks: ['City Centre Mall', 'Commercial Complex', 'Sector 32 Market'],
    description:
      'Noida City Centre Metro is a major commercial hub. Students from surrounding sectors are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.574, lng: 77.356 },
    voiceSearchPhrases: [
      'NEET coaching near Noida City Centre Metro',
      'Biology institute near City Centre Mall',
    ],
  },
  'noida-sector-34-metro': {
    name: 'Noida Sector 34',
    slug: 'noida-sector-34-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Sector 34', 'Sector 33', 'Sector 35'],
    landmarks: ['Sector 34 Market', 'Residential Area', 'Metro Station'],
    description:
      'Noida Sector 34 Metro serves residential sectors in central Noida, whose students are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.58, lng: 77.362 },
    voiceSearchPhrases: ['NEET coaching near Sector 34 Metro', 'Biology classes in central Noida'],
  },
  'noida-sector-52-metro': {
    name: 'Noida Sector 52',
    slug: 'noida-sector-52-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Sector 52', 'Sector 53', 'Sector 51'],
    landmarks: ['Sector 52 Market', 'Commercial Area', 'Residential Blocks'],
    description:
      'Noida Sector 52 Metro is near the Blue-Aqua interchange area. Students can connect to both metro lines from here.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.59, lng: 77.37 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 52 Metro',
      'Biology classes near Blue-Aqua interchange',
    ],
  },
  'noida-sector-61-metro': {
    name: 'Noida Sector 61',
    slug: 'noida-sector-61-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Sector 61', 'Sector 60', 'Sector 62'],
    landmarks: ['Sector 61 Market', 'IT Offices', 'Metro Station'],
    description:
      'Noida Sector 61 Metro serves Sectors 60-62, whose students are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.61, lng: 77.375 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 61 Metro Noida',
      'Biology classes adjacent to Sector 61 station',
    ],
  },
  'noida-sector-62-metro': {
    name: 'Noida Sector 62',
    slug: 'noida-sector-62-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Sector 62', 'Electronic City', 'NSEZ', 'IT Hub'],
    landmarks: ['Electronic City', 'NSEZ', 'HCL Campus', 'Sector 62 Blue Line station'],
    description:
      'Sector 62 (Electronic City) is the IT hub of Noida, serving thousands of professionals and students daily. Cerebrum serves Sector 62 families through live online NEET classes — no commute needed.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.627, lng: 77.372 },
    voiceSearchPhrases: [
      'online NEET coaching for Noida Sector 62 (Electronic City)',
      'Best online NEET classes for Electronic City Noida',
      'online Biology coaching for Noida Sector 62',
    ],
  },
  'noida-electronic-city-metro': {
    name: 'Noida Electronic City',
    slug: 'noida-electronic-city-metro',
    line: 'Blue',
    lineColor: '#0066B3',
    nearbyAreas: ['Electronic City', 'Sector 63', 'IT Park', 'NSEZ'],
    landmarks: ['Electronic City', 'IT Companies', 'NSEZ Gate', 'Tech Hub'],
    description:
      'Noida Electronic City Metro is the terminal station of Blue Line in Noida. Cerebrum serves this major IT hub through live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.635, lng: 77.37 },
    voiceSearchPhrases: [
      'NEET coaching near Electronic City Metro',
      'Biology classes in Noida IT hub',
    ],
  },

  // AQUA LINE (Noida Metro - Greater Noida Section)
  // Stations listed from Noida towards Greater Noida

  'sector-51-metro': {
    name: 'Sector 51',
    slug: 'sector-51-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 51', 'Sector 50', 'Sector 52'],
    landmarks: ['Sector 51 Market', 'Aqua Line Start', 'Residential Area'],
    description:
      'Sector 51 Metro is the starting point of Aqua Line. Students from this area are served by Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.575, lng: 77.355 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 51 Metro',
      'Biology classes accessible from Aqua Line',
    ],
  },
  'sector-76-metro': {
    name: 'Sector 76',
    slug: 'sector-76-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 76', 'Sector 77', 'Sector 75', 'Premium Societies'],
    landmarks: ['Mahagun Mywoods', 'Amrapali Zodiac', 'Premium Towers'],
    description:
      'Sector 76 Metro serves the premium residential sectors along the Aqua Line corridor. Many NEET aspirants from here choose Cerebrum live online NEET classes.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.54, lng: 77.39 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 76 Metro',
      'Biology classes for Mahagun Mywoods students',
    ],
  },
  'sector-101-metro': {
    name: 'Sector 101',
    slug: 'sector-101-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 101', 'Sector 100', 'Expressway', 'Premium Projects'],
    landmarks: ['Noida Expressway', 'Sector 101 Commercial', 'IT Parks'],
    description:
      'Sector 101 Metro serves the premium expressway sectors. Students from ATS and Supertech societies use this station.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.51, lng: 77.41 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 101 Metro',
      'Biology classes for Expressway residents',
    ],
  },
  'sector-137-metro': {
    name: 'Sector 137',
    slug: 'sector-137-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 137', 'Sector 138', 'ATS', 'Supertech', 'Mahagun'],
    landmarks: ['ATS Destinaire', 'ATS Le Grandiose', 'Supertech Supernova', 'Mahagun'],
    description:
      'Sector 137 Metro serves one of the most premium sectors in Noida. ATS Destinaire, Supertech, and Mahagun residents use this station.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.48, lng: 77.43 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 137 Metro',
      'Biology classes for ATS Destinaire students',
      'NEET tuition near Sector 137 station',
    ],
  },
  'sector-142-metro': {
    name: 'Sector 142',
    slug: 'sector-142-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 142', 'Sector 143', 'Noida Extension Border'],
    landmarks: ['Extension Border', 'New Development', 'Metro Station'],
    description:
      'Sector 142 Metro is near the Noida Extension border. Students from developing sectors use this station.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.46, lng: 77.45 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 142 Metro',
      'Biology classes near Noida Extension',
    ],
  },
  'sector-143-metro': {
    name: 'Sector 143',
    slug: 'sector-143-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 143', 'Sector 144', 'Extension Start'],
    landmarks: ['Noida Extension Start', 'New Projects', 'Metro Station'],
    description:
      'Sector 143 Metro marks the beginning of Noida Extension area. Growing student population from new projects.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.45, lng: 77.46 },
    voiceSearchPhrases: [
      'NEET coaching near Sector 143 Metro',
      'Biology classes in Noida Extension area',
    ],
  },
  'sector-144-metro': {
    name: 'Sector 144',
    slug: 'sector-144-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 144', 'Sector 145', 'Noida Extension'],
    landmarks: ['Extension Area', 'New Development', 'Metro Station'],
    description: 'Sector 144 Metro serves the Noida Extension area with new residential projects.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.44, lng: 77.47 },
    voiceSearchPhrases: ['NEET coaching accessible from Sector 144 Metro'],
  },
  'sector-145-metro': {
    name: 'Sector 145',
    slug: 'sector-145-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 145', 'Sector 146', 'Gaur City Approach'],
    landmarks: ['Gaur City Approach', 'Extension Area', 'Metro Station'],
    description:
      'Sector 145 Metro is approaching Gaur City area. Many students from Noida Extension use this station.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.43, lng: 77.48 },
    voiceSearchPhrases: ['NEET coaching near Gaur City Metro'],
  },
  'sector-146-metro': {
    name: 'Sector 146',
    slug: 'sector-146-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 146', 'Sector 147', 'Gaur City', 'Supertech'],
    landmarks: ['Near Gaur City', 'Supertech Ecovillage', 'Metro Station'],
    description:
      'Sector 146 Metro is near Gaur City and Supertech Ecovillage. High student density area.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.42, lng: 77.49 },
    voiceSearchPhrases: ['NEET coaching near Supertech Ecovillage Metro'],
  },
  'sector-147-metro': {
    name: 'Sector 147',
    slug: 'sector-147-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 147', 'Sector 148', 'Gaur City', 'Ace City'],
    landmarks: ['Gaur City Mall', 'Ace Divino', 'Metro Station'],
    description:
      'Sector 147 Metro is closest to Gaur City Mall and Ace City. Major student hub in Noida Extension.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.41, lng: 77.5 },
    voiceSearchPhrases: [
      'NEET coaching near Gaur City Mall Metro',
      'Biology classes for Ace City students',
    ],
  },
  'sector-148-metro': {
    name: 'Sector 148',
    slug: 'sector-148-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Sector 148', 'Greater Noida Border', 'Extension End'],
    landmarks: ['GN Border', 'Extension Terminal Area', 'Metro Station'],
    description:
      'Sector 148 Metro is near the Greater Noida border, serving the far end of Noida Extension.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.4, lng: 77.51 },
    voiceSearchPhrases: ['NEET coaching accessible from Sector 148 Metro'],
  },
  'knowledge-park-2-metro': {
    name: 'Knowledge Park II',
    slug: 'knowledge-park-2-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Knowledge Park', 'Greater Noida', 'Universities', 'IT Hub'],
    landmarks: ['Galgotias University', 'Sharda University', 'IT Companies'],
    description:
      "Knowledge Park II Metro is Greater Noida's educational hub. University students and families use this station.",
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.38, lng: 77.52 },
    voiceSearchPhrases: [
      'NEET coaching near Knowledge Park Metro',
      'Biology classes for Galgotias students',
    ],
  },
  'pari-chowk-metro': {
    name: 'Pari Chowk',
    slug: 'pari-chowk-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Pari Chowk', 'Greater Noida Central', 'Commercial Hub'],
    landmarks: ['Pari Chowk Roundabout', 'Commercial Center', 'Shopping Hub'],
    description:
      'Pari Chowk Metro is the commercial heart of Greater Noida. Students from surrounding areas access metro here.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.37, lng: 77.53 },
    voiceSearchPhrases: [
      'NEET coaching accessible from Pari Chowk Metro',
      'Biology classes in Greater Noida',
    ],
  },
  'alpha-1-metro': {
    name: 'Alpha 1',
    slug: 'alpha-1-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Alpha 1', 'Alpha 2', 'Greater Noida Sectors'],
    landmarks: ['Alpha 1 Market', 'Alpha Commercial Belt', 'Residential'],
    description: 'Alpha 1 Metro serves the established Alpha sectors of Greater Noida.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.36, lng: 77.54 },
    voiceSearchPhrases: ['NEET coaching for Alpha Greater Noida students'],
  },
  'alpha-2-metro': {
    name: 'Alpha 2',
    slug: 'alpha-2-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Alpha 2', 'Alpha 1', 'Commercial Area'],
    landmarks: ['Alpha 2 Commercial', 'Residential Blocks', 'Metro Station'],
    description: 'Alpha 2 Metro serves residential and commercial areas of Greater Noida.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.355, lng: 77.545 },
    voiceSearchPhrases: ['NEET coaching accessible from Alpha 2 Metro'],
  },
  'delta-1-metro': {
    name: 'Delta 1',
    slug: 'delta-1-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Delta 1', 'Industrial Area', 'Greater Noida'],
    landmarks: ['Delta Industrial', 'Factories', 'Residential'],
    description: 'Delta 1 Metro serves the industrial sectors of Greater Noida.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.35, lng: 77.55 },
    voiceSearchPhrases: ['NEET coaching for Delta Greater Noida students'],
  },
  'gnida-office-metro': {
    name: 'GNIDA Office',
    slug: 'gnida-office-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['GNIDA', 'Greater Noida Admin', 'Government Offices'],
    landmarks: ['GNIDA Office', 'Administrative Hub', 'Government Complex'],
    description: 'GNIDA Office Metro serves the administrative heart of Greater Noida.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.345, lng: 77.555 },
    voiceSearchPhrases: ['NEET coaching accessible from GNIDA Metro'],
  },
  'depot-metro': {
    name: 'Depot',
    slug: 'depot-metro',
    line: 'Aqua',
    lineColor: '#00CED1',
    nearbyAreas: ['Depot Area', 'Greater Noida Terminal', 'End Station'],
    landmarks: ['Metro Depot', 'Terminal Station', 'Greater Noida End'],
    description: 'Depot Metro is the terminal station of Aqua Line in Greater Noida.',
    walkingTime: 'Live online classes — no commute',
    coordinates: { lat: 28.34, lng: 77.56 },
    voiceSearchPhrases: ['NEET coaching for far Greater Noida students'],
  },
}

// Helper Functions

export function getNoidaMetroBySlug(slug: string): NoidaMetroStation | undefined {
  return noidaMetroStations[slug]
}

export function getAllNoidaMetroSlugs(): string[] {
  return Object.keys(noidaMetroStations)
}

export function getNoidaMetrosByLine(line: NoidaMetroStation['line']): string[] {
  return Object.entries(noidaMetroStations)
    .filter(([, station]) => station.line === line)
    .map(([slug]) => slug)
}

export function getNearestNoidaMetroStations(): string[] {
  // Return Blue Line stations serving the Noida Sector 62 (Electronic City) area
  return [
    'noida-sector-62-metro',
    'noida-sector-61-metro',
    'noida-electronic-city-metro',
    'noida-sector-52-metro',
    'noida-sector-34-metro',
  ]
}

export function getBlueLineStations(): string[] {
  return getNoidaMetrosByLine('Blue')
}

export function getAquaLineStations(): string[] {
  return getNoidaMetrosByLine('Aqua')
}

// Get voice search phrases for a metro station
export function getMetroVoiceSearchPhrases(slug: string): string[] {
  return noidaMetroStations[slug]?.voiceSearchPhrases || []
}
