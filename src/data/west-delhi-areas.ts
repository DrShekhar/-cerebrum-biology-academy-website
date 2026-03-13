/**
 * West Delhi Area Data for SEO Landing Pages
 * Used by both server (generateMetadata) and client components
 */

export interface WestDelhiAreaDetails {
  name: string
  fullName: string
  description: string
  heroDescription: string
  nearbyMetro: string[]
  landmarks: string[]
  schools: string[]
  highlights: string[]
  type: 'coaching-hub' | 'posh' | 'residential' | 'commercial'
  pincode: string
}

export const areaDetails: Record<string, WestDelhiAreaDetails> = {
  dwarka: {
    name: 'Dwarka',
    fullName: 'Dwarka (All Sectors), West Delhi',
    description: 'Largest sub-city in Asia with 29 sectors',
    heroDescription:
      'Dwarka is one of the largest sub-cities in Asia with 29 planned sectors. Home to DPS Dwarka students and educated families near IGI Airport seeking quality NEET coaching with proven results.',
    nearbyMetro: [
      'Dwarka Sector 21 Metro',
      'Dwarka Metro',
      'Dwarka Mor Metro',
      'Uttam Nagar Metro',
    ],
    landmarks: ['IGI Airport', 'Dwarka Sector 21', 'Pacific Mall', 'Vegas Mall'],
    schools: ['DPS Dwarka', 'Mount Carmel', 'Ryan International', 'Modern School Dwarka'],
    highlights: ['All 29 Sectors', 'Airport Area', 'Metro Connected', 'Planned City'],
    type: 'residential',
    pincode: '110075',
  },
  janakpuri: {
    name: 'Janakpuri',
    fullName: 'Janakpuri, West Delhi',
    description: 'Premium residential area with top schools',
    heroDescription:
      'Janakpuri is one of West Delhis most prestigious residential areas, home to DPS Janakpuri and affluent families. High demand for quality NEET coaching with personalized attention.',
    nearbyMetro: ['Janakpuri West Metro', 'Janakpuri East Metro', 'Dwarka Mor Metro'],
    landmarks: ['Janakpuri District Centre', 'DPS Janakpuri', 'Unity One Mall', 'C Block Market'],
    schools: ['DPS Janakpuri', 'DAV Public School', 'Ryan International', 'Mount Carmel'],
    highlights: ['DPS Janakpuri', 'District Centre', 'Premium Area', 'Business Families'],
    type: 'posh',
    pincode: '110058',
  },
  'rajouri-garden': {
    name: 'Rajouri Garden',
    fullName: 'Rajouri Garden, West Delhi',
    description: 'Commercial and coaching hub in West Delhi',
    heroDescription:
      'Rajouri Garden is a major commercial hub known for its markets and coaching centers. Students from surrounding areas access coaching institutes here, creating a competitive environment.',
    nearbyMetro: ['Rajouri Garden Metro', 'Kirti Nagar Metro', 'Tagore Garden Metro'],
    landmarks: ['Rajouri Garden Market', 'Main Market', 'City Centre Mall', 'TDI Mall'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School', 'Modern School'],
    highlights: ['Commercial Hub', 'Coaching Area', 'Shopping Destination', 'Metro Connected'],
    type: 'commercial',
    pincode: '110027',
  },
  vikaspuri: {
    name: 'Vikaspuri',
    fullName: 'Vikaspuri, West Delhi',
    description: 'Large residential colony with good schools',
    heroDescription:
      'Vikaspuri is a large residential area in West Delhi with multiple blocks and good schools. Affordable housing attracts middle-class families seeking quality NEET preparation.',
    nearbyMetro: ['Uttam Nagar East Metro', 'Janakpuri West Metro'],
    landmarks: ['Vikaspuri Main Road', 'Vikaspuri Market', 'Outer Ring Road'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School', 'Bal Bharati'],
    highlights: ['Large Area', 'Affordable', 'Metro Access', 'Growing Population'],
    type: 'residential',
    pincode: '110018',
  },
  'uttam-nagar': {
    name: 'Uttam Nagar',
    fullName: 'Uttam Nagar, West Delhi',
    description: 'Densely populated area with high student demand',
    heroDescription:
      'Uttam Nagar is one of the most densely populated areas in Delhi with high demand for affordable coaching. Students here seek quality NEET preparation with value for money.',
    nearbyMetro: ['Uttam Nagar West Metro', 'Uttam Nagar East Metro', 'Nawada Metro'],
    landmarks: ['Uttam Nagar Market', 'West Enclave', 'Milap Nagar', 'Indira Park'],
    schools: ['DAV Public School', 'Government Schools', 'Private Schools', 'Ryan International'],
    highlights: ['High Density', 'Budget Friendly', 'Metro Hub', 'Student Area'],
    type: 'residential',
    pincode: '110059',
  },
  'tilak-nagar': {
    name: 'Tilak Nagar',
    fullName: 'Tilak Nagar, West Delhi',
    description: 'Established residential colony with metro access',
    heroDescription:
      'Tilak Nagar is an established residential colony in West Delhi with excellent metro connectivity. Families here value education and seek quality NEET coaching institutes.',
    nearbyMetro: ['Tilak Nagar Metro', 'Subhash Nagar Metro', 'Janakpuri East Metro'],
    landmarks: ['Tilak Nagar Market', 'Metro Station', 'Govt. Hospital', 'Community Centre'],
    schools: ['DAV Public School', 'Bal Bharati', 'Ryan International', 'Cambridge School'],
    highlights: ['Old Colony', 'Metro Connected', 'Commercial Mix', 'Established Area'],
    type: 'residential',
    pincode: '110018',
  },
  'subhash-nagar': {
    name: 'Subhash Nagar',
    fullName: 'Subhash Nagar, West Delhi',
    description: 'Residential area with metro station',
    heroDescription:
      'Subhash Nagar is a residential area with its own metro station, providing excellent connectivity. Students can easily access coaching centers across Delhi.',
    nearbyMetro: ['Subhash Nagar Metro', 'Tilak Nagar Metro', 'Rajouri Garden Metro'],
    landmarks: ['Subhash Nagar Metro Station', 'Main Market', 'Community Centre'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati', 'Cambridge School'],
    highlights: ['Metro Station', 'Residential', 'Good Schools', 'Central Location'],
    type: 'residential',
    pincode: '110027',
  },
  'paschim-vihar': {
    name: 'Paschim Vihar',
    fullName: 'Paschim Vihar, West Delhi',
    description: 'Large residential colony with multiple blocks',
    heroDescription:
      'Paschim Vihar is a large residential colony with multiple blocks (A1, A2, B1, B2, etc.). Home to educated families seeking quality NEET coaching for their children.',
    nearbyMetro: ['Paschim Vihar West Metro', 'Paschim Vihar East Metro', 'Madipur Metro'],
    landmarks: ['Paschim Vihar Market', 'A Block Market', 'Metro Walk', 'District Park'],
    schools: ['DAV Public School', 'Ryan International', 'Mount Carmel', 'Cambridge School'],
    highlights: ['Multiple Blocks', 'Residential', 'Metro Access', 'Good Schools'],
    type: 'residential',
    pincode: '110063',
  },
  'punjabi-bagh': {
    name: 'Punjabi Bagh',
    fullName: 'Punjabi Bagh, West Delhi',
    description: 'Premium residential area with business families',
    heroDescription:
      'Punjabi Bagh is one of West Delhis most affluent areas, known for its wide roads and business families. Students here demand premium NEET coaching with personalized attention.',
    nearbyMetro: ['Punjabi Bagh Metro', 'Shivaji Park Metro', 'ESI Hospital Metro'],
    landmarks: ['Club Road', 'Punjabi Bagh Club', 'Ring Road', 'West Punjabi Bagh'],
    schools: ['DAV Public School', 'Ryan International', 'Modern School', 'Cambridge School'],
    highlights: ['Premium Area', 'Business Families', 'Club Road', 'Posh Locality'],
    type: 'posh',
    pincode: '110026',
  },
  'hari-nagar': {
    name: 'Hari Nagar',
    fullName: 'Hari Nagar, West Delhi',
    description: 'Residential area near Janakpuri',
    heroDescription:
      'Hari Nagar is a residential area adjacent to Janakpuri, offering more affordable housing options. Students from here access coaching centers in Janakpuri and Rajouri Garden.',
    nearbyMetro: ['Janakpuri West Metro', 'Tilak Nagar Metro'],
    landmarks: ['Hari Nagar Clock Tower', 'Main Road', 'Community Centre', 'Gurudwara'],
    schools: ['DAV Public School', 'Government Schools', 'Ryan International', 'Private Schools'],
    highlights: ['Near Janakpuri', 'Affordable', 'Metro Connected', 'Residential'],
    type: 'residential',
    pincode: '110064',
  },
  'kirti-nagar': {
    name: 'Kirti Nagar',
    fullName: 'Kirti Nagar, West Delhi',
    description: 'Known for famous furniture market',
    heroDescription:
      'Kirti Nagar is famous for Asias largest furniture market but also has significant residential areas. Business families here seek quality education for their children.',
    nearbyMetro: ['Kirti Nagar Metro', 'Moti Nagar Metro', 'Rajouri Garden Metro'],
    landmarks: ['Kirti Nagar Furniture Market', 'Metro Station', 'Industrial Area'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School', 'Private Schools'],
    highlights: ['Furniture Hub', 'Commercial Area', 'Metro Access', 'Business Families'],
    type: 'commercial',
    pincode: '110015',
  },
  'moti-nagar': {
    name: 'Moti Nagar',
    fullName: 'Moti Nagar, West Delhi',
    description: 'Residential area with commercial activity',
    heroDescription:
      'Moti Nagar is a mixed residential and commercial area with its own metro station. Students benefit from excellent connectivity to coaching centers across Delhi.',
    nearbyMetro: ['Moti Nagar Metro', 'Kirti Nagar Metro', 'Ramesh Nagar Metro'],
    landmarks: ['Moti Nagar Metro Station', 'Main Road', 'Industrial Area', 'Market'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati', 'Private Schools'],
    highlights: ['Metro Station', 'Mixed Use', 'Good Connectivity', 'Affordable'],
    type: 'residential',
    pincode: '110015',
  },
}

export const courseOptions = [
  {
    name: 'Class 11+12 Comprehensive',
    duration: '2 Years',
    fee: '₹1,20,000',
    features: ['Complete NEET Biology', 'NCERT + Advanced', 'Mock Tests', 'Doubt Sessions'],
  },
  {
    name: 'Class 12 Intensive',
    duration: '1 Year',
    fee: '₹75,000',
    features: ['Class 12 Biology', 'Revision + Practice', 'Test Series', 'PYQ Analysis'],
  },
  {
    name: 'Dropper Batch',
    duration: '1 Year',
    fee: '₹85,000',
    features: ['Complete Revision', 'Daily Tests', 'Personal Mentor', 'Doubt Priority'],
  },
]

export function getAreaBySlug(slug: string): WestDelhiAreaDetails | undefined {
  return areaDetails[slug]
}

export function getAllAreaSlugs(): string[] {
  return Object.keys(areaDetails)
}
