/**
 * North Delhi Area Data for SEO Landing Pages
 * Used by both server (generateMetadata) and client components
 */

export interface NorthDelhiAreaDetails {
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

export const areaDetails: Record<string, NorthDelhiAreaDetails> = {
  rohini: {
    name: 'Rohini',
    fullName: 'Rohini (All Sectors), North Delhi',
    description: 'Largest planned sub-city with 35+ sectors',
    heroDescription:
      'Rohini is one of the largest planned residential sub-cities in Asia with over 35 sectors. Home to DPS Rohini students and educated families seeking quality NEET coaching with proven results.',
    nearbyMetro: ['Rohini West Metro', 'Rohini East Metro', 'Pitampura Metro', 'Rithala Metro'],
    landmarks: ['Adventure Island', 'Metro Walk Mall', 'DPS Rohini', 'Rohini Court Complex'],
    schools: ['DPS Rohini', 'Ryan International', 'Cambridge School', 'Mount Carmel'],
    highlights: ['All Sectors Covered', 'DPS Students', 'Metro Connected', 'Large Population'],
    type: 'residential',
    pincode: '110085',
  },
  pitampura: {
    name: 'Pitampura',
    fullName: 'Pitampura, North Delhi',
    description: 'Premium locality with famous TV Tower',
    heroDescription:
      'Pitampura is one of North Delhis most prestigious localities, known for the iconic TV Tower and proximity to Netaji Subhash Place commercial hub. Educated families here seek premium NEET coaching.',
    nearbyMetro: ['Pitampura Metro', 'Netaji Subhash Place Metro', 'Kohat Enclave Metro'],
    landmarks: ['Pitampura TV Tower', 'Netaji Subhash Place', 'Metro Mall', 'Madhuban Chowk'],
    schools: ['DPS Rohini', 'Mount Carmel', 'Cambridge School', 'Ryan International'],
    highlights: ['TV Tower Landmark', 'NSP Near', 'Metro Hub', 'Premium Locality'],
    type: 'posh',
    pincode: '110034',
  },
  'model-town': {
    name: 'Model Town',
    fullName: 'Model Town, North Delhi',
    description: 'Posh residential area near DU North Campus',
    heroDescription:
      'Model Town is one of North Delhis most sought-after residential areas, adjacent to Delhi University North Campus. Home to educated families, professors, and professionals seeking quality education.',
    nearbyMetro: ['Model Town Metro', 'GTB Nagar Metro', 'Vishwavidyalaya Metro'],
    landmarks: ['Model Town Market', 'DU North Campus', 'Model Town Park', 'GTB Hospital'],
    schools: ['St. Marks School', 'Bal Bharati', 'DAV Public School', 'Cambridge School'],
    highlights: ['Near DU', 'Posh Area', 'Educated Families', 'Well Planned'],
    type: 'posh',
    pincode: '110009',
  },
  'shalimar-bagh': {
    name: 'Shalimar Bagh',
    fullName: 'Shalimar Bagh, North Delhi',
    description: 'Large residential colony with good schools',
    heroDescription:
      'Shalimar Bagh is a well-established residential colony with multiple blocks (AD, BG, etc.) and excellent schools. Families here prioritize quality education and seek proven coaching institutes.',
    nearbyMetro: ['Shalimar Bagh Metro', 'Azadpur Metro', 'Netaji Subhash Place Metro'],
    landmarks: ['Shalimar Bagh Market', 'Ring Road', 'Azadpur Mandi', 'Club Road'],
    schools: ['DAV Public School', 'Ryan International', 'Mount Abu School', 'Apeejay School'],
    highlights: ['Large Colony', 'Good Schools', 'Metro Access', 'Established Area'],
    type: 'residential',
    pincode: '110088',
  },
  'ashok-vihar': {
    name: 'Ashok Vihar',
    fullName: 'Ashok Vihar, North Delhi',
    description: 'Established colony near Netaji Subhash Place',
    heroDescription:
      'Ashok Vihar is a well-established residential colony near Netaji Subhash Place commercial hub. Students from Phase 1-4 areas seek quality NEET coaching with personalized attention.',
    nearbyMetro: ['Netaji Subhash Place Metro', 'Shalimar Bagh Metro', 'Ashok Park Main Metro'],
    landmarks: ['Netaji Subhash Place', 'Ashok Vihar Market', 'Wazirpur Industrial Area'],
    schools: ['DAV Public School', 'Ryan International', 'Modern School', 'Cambridge School'],
    highlights: ['NSP Adjacent', 'Commercial Hub', 'Good Connectivity', 'Old Colony'],
    type: 'residential',
    pincode: '110052',
  },
  'gtb-nagar': {
    name: 'GTB Nagar',
    fullName: 'GTB Nagar, North Delhi',
    description: 'Student hub near Delhi University North Campus',
    heroDescription:
      'GTB Nagar (Guru Tegh Bahadur Nagar) is famous as a student hub adjacent to DU North Campus. High concentration of coaching centers and student accommodations make it a competitive environment.',
    nearbyMetro: ['GTB Nagar Metro', 'Vishwavidyalaya Metro', 'Model Town Metro'],
    landmarks: ['DU North Campus', 'Hudson Lane', 'GTB Hospital', 'Bungalow Road'],
    schools: ['Various DU Schools', 'St. Marks School', 'Khalsa College'],
    highlights: ['DU Adjacent', 'Student Hub', 'Coaching Area', 'High Competition'],
    type: 'coaching-hub',
    pincode: '110009',
  },
  'mukherjee-nagar': {
    name: 'Mukherjee Nagar',
    fullName: 'Mukherjee Nagar, North Delhi',
    description: 'Famous coaching hub for competitive exams',
    heroDescription:
      'Mukherjee Nagar is Indias most famous coaching destination, primarily for UPSC and government exams. Students from across India come here, creating a highly competitive environment.',
    nearbyMetro: ['GTB Nagar Metro', 'Vishwavidyalaya Metro'],
    landmarks: ['Coaching Centers', 'Hudson Lane', 'Batra Cinema', 'GTB Hospital'],
    schools: ['Various Schools', 'Study Hostels', 'PG Accommodations'],
    highlights: ['UPSC Hub', 'Competitive Environment', 'Student Density', 'Coaching Capital'],
    type: 'coaching-hub',
    pincode: '110009',
  },
  'kamla-nagar': {
    name: 'Kamla Nagar',
    fullName: 'Kamla Nagar, North Delhi',
    description: 'Vibrant area near DU campus',
    heroDescription:
      'Kamla Nagar is famous for its vibrant market and proximity to Delhi University. A popular hangout for students, it also has a significant coaching presence for various exams.',
    nearbyMetro: ['Vishwavidyalaya Metro', 'Civil Lines Metro'],
    landmarks: ['Kamla Nagar Market', 'DU North Campus', 'Spark Mall', 'Maurice Nagar'],
    schools: ['Hindu College Area', 'SRCC Area', 'Miranda House Area'],
    highlights: ['DU Adjacent', 'Youth Hub', 'Shopping Area', 'Student Life'],
    type: 'commercial',
    pincode: '110007',
  },
  'kingsway-camp': {
    name: 'Kingsway Camp',
    fullName: 'Kingsway Camp, North Delhi',
    description: 'Residential area near DU and GTB Hospital',
    heroDescription:
      'Kingsway Camp is a residential area strategically located near Delhi University and GTB Hospital. Educated families and medical professionals seek quality NEET coaching here.',
    nearbyMetro: ['GTB Nagar Metro', 'Vishwavidyalaya Metro'],
    landmarks: ['GTB Hospital', 'DU North Campus', 'Kingsway Camp Market'],
    schools: ['Various Schools', 'St. Marks School', 'DAV Public School'],
    highlights: ['Near DU', 'Hospital Area', 'Educated Families', 'Medical Students'],
    type: 'residential',
    pincode: '110009',
  },
  'adarsh-nagar': {
    name: 'Adarsh Nagar',
    fullName: 'Adarsh Nagar, North Delhi',
    description: 'Centrally located residential area',
    heroDescription:
      'Adarsh Nagar is a well-connected residential area in North Delhi with metro access. Students from here can easily access coaching centers across Delhi.',
    nearbyMetro: ['Adarsh Nagar Metro', 'Azadpur Metro', 'Model Town Metro'],
    landmarks: ['Adarsh Nagar Market', 'Azadpur Mandi', 'GTB Nagar Border'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya', 'Ryan International'],
    highlights: ['Metro Connected', 'Central Location', 'Good Access', 'Affordable'],
    type: 'residential',
    pincode: '110033',
  },
  wazirpur: {
    name: 'Wazirpur',
    fullName: 'Wazirpur, North Delhi',
    description: 'Industrial-residential area with growing population',
    heroDescription:
      'Wazirpur is known for its industrial area but also has significant residential colonies. Growing demand for quality coaching from families in the area.',
    nearbyMetro: ['Netaji Subhash Place Metro', 'Shalimar Bagh Metro'],
    landmarks: ['Wazirpur Industrial Area', 'Ashok Vihar Border', 'Lawrence Road'],
    schools: ['DAV Public School', 'Ryan International', 'Government Schools'],
    highlights: ['Industrial Area', 'Affordable', 'Growing Population', 'Budget Friendly'],
    type: 'commercial',
    pincode: '110052',
  },
  'prashant-vihar': {
    name: 'Prashant Vihar',
    fullName: 'Prashant Vihar, North Delhi',
    description: 'Quiet residential area in Rohini zone',
    heroDescription:
      'Prashant Vihar is a peaceful residential area in the Rohini zone, known for its educated families and well-maintained colonies seeking quality NEET preparation.',
    nearbyMetro: ['Rohini West Metro', 'Pitampura Metro'],
    landmarks: ['Prashant Vihar Market', 'Rohini Sector 7 Border', 'Madhuban Chowk'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati'],
    highlights: ['Peaceful Area', 'Rohini Zone', 'Good Connectivity', 'Educated Families'],
    type: 'residential',
    pincode: '110085',
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

export function getAreaBySlug(slug: string): NorthDelhiAreaDetails | undefined {
  return areaDetails[slug]
}

export function getAllAreaSlugs(): string[] {
  return Object.keys(areaDetails)
}
