/**
 * East Delhi Area Data for SEO Landing Pages
 * Used by both server (generateMetadata) and client components
 */

export interface EastDelhiAreaDetails {
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

export const areaDetails: Record<string, EastDelhiAreaDetails> = {
  'laxmi-nagar': {
    name: 'Laxmi Nagar',
    fullName: 'Laxmi Nagar, East Delhi',
    description: 'Famous coaching hub with highest coaching density in East Delhi',
    heroDescription:
      'Laxmi Nagar is East Delhis most famous coaching destination, known for its high concentration of coaching institutes. While many opt for mass coaching here, serious NEET aspirants prefer quality over quantity at Cerebrum Academy.',
    nearbyMetro: ['Laxmi Nagar Metro', 'Nirman Vihar Metro', 'Preet Vihar Metro'],
    landmarks: ['Laxmi Nagar Market', 'V3S Mall', 'Nirman Vihar Complex'],
    schools: ['DAV Public School', 'Ryan International', 'DPS Laxmi Nagar'],
    highlights: ['Coaching Hub', 'Metro Connected', 'High Student Density', 'Commercial Center'],
    type: 'coaching-hub',
    pincode: '110092',
  },
  'preet-vihar': {
    name: 'Preet Vihar',
    fullName: 'Preet Vihar, East Delhi',
    description: 'Premium residential area with top schools',
    heroDescription:
      'Preet Vihar is one of East Delhis most sought-after residential localities, home to DPS students and educated families. Students here seek quality NEET coaching with personalized attention.',
    nearbyMetro: ['Preet Vihar Metro', 'Karkardooma Metro'],
    landmarks: ['Preet Vihar Market', 'DPS Preet Vihar', 'Karkardooma Court'],
    schools: ['DPS Preet Vihar', 'Ryan International', 'Cambridge School'],
    highlights: ['DPS Students', 'Premium Area', 'Metro Access', 'Family Locality'],
    type: 'residential',
    pincode: '110092',
  },
  'mayur-vihar-phase-1': {
    name: 'Mayur Vihar Phase 1',
    fullName: 'Mayur Vihar Phase 1, East Delhi',
    description: 'Largest DDA colony with excellent metro connectivity',
    heroDescription:
      'Mayur Vihar Phase 1 is one of the largest DDA colonies in East Delhi with direct metro connectivity. Home to educated middle-class families seeking quality NEET preparation for their children.',
    nearbyMetro: ['Mayur Vihar Phase 1 Metro', 'Mayur Vihar Extension Metro'],
    landmarks: ['Mayur Vihar Extension', 'Patparganj Road', 'Phase 1 Market'],
    schools: ['DAV Public School', 'Apeejay School', 'Mount Carmel School'],
    highlights: ['DDA Colony', 'Metro Hub', 'Large Population', 'Growing Demand'],
    type: 'residential',
    pincode: '110091',
  },
  'mayur-vihar-phase-2': {
    name: 'Mayur Vihar Phase 2',
    fullName: 'Mayur Vihar Phase 2, East Delhi',
    description: 'Established residential area near Akshardham',
    heroDescription:
      'Mayur Vihar Phase 2 is an established residential locality near the famous Akshardham Temple. Families here value education and seek quality NEET coaching for their aspiring doctors.',
    nearbyMetro: ['Mayur Vihar Phase 2 Metro', 'Akshardham Metro'],
    landmarks: ['Akshardham Temple', 'Phase 2 Market', 'NH-24'],
    schools: ['Ryan International', 'DAV Public School', 'Bal Bharati'],
    highlights: ['Near Akshardham', 'Established Colony', 'Good Schools', 'Family Area'],
    type: 'residential',
    pincode: '110091',
  },
  'mayur-vihar-phase-3': {
    name: 'Mayur Vihar Phase 3',
    fullName: 'Mayur Vihar Phase 3, East Delhi',
    description: 'Growing residential area with new developments',
    heroDescription:
      'Mayur Vihar Phase 3 is a rapidly developing residential area with new housing complexes. Growing student population seeking affordable yet quality NEET coaching options.',
    nearbyMetro: ['New Ashok Nagar Metro', 'Noida Sector 15 Metro'],
    landmarks: ['Phase 3 Market', 'Noida Link Road', 'DND Flyway'],
    schools: ['Apeejay School', 'DAV Public School', 'Kendriya Vidyalaya'],
    highlights: ['Growing Area', 'Affordable Housing', 'Student Population', 'Noida Connection'],
    type: 'residential',
    pincode: '110096',
  },
  patparganj: {
    name: 'Patparganj',
    fullName: 'Patparganj, East Delhi',
    description: 'Industrial-residential area with IT hub',
    heroDescription:
      'Patparganj is a unique mix of industrial and residential areas, including the famous IP Extension. Home to corporate families and IT professionals seeking quality education for their children.',
    nearbyMetro: ['IP Extension Metro', 'Mayur Vihar Extension Metro'],
    landmarks: ['IP Extension', 'Patparganj Industrial Area', 'Mother Dairy'],
    schools: ['DPS IP Extension', 'Ryan International', 'Cambridge School'],
    highlights: ['IP Extension', 'IT Hub', 'Corporate Families', 'Mixed Development'],
    type: 'residential',
    pincode: '110092',
  },
  'ip-extension': {
    name: 'IP Extension',
    fullName: 'IP Extension, East Delhi',
    description: 'Upscale residential colony in East Delhi',
    heroDescription:
      'IP Extension (Indraprastha Extension) is one of East Delhis most upscale residential colonies. Home to professionals, businessmen, and families from top schools seeking premium NEET coaching.',
    nearbyMetro: ['IP Extension Metro', 'Mayur Vihar Phase 1 Metro'],
    landmarks: ['IP Estate', 'Jaypee Greens', 'IP Market'],
    schools: ['DPS IP Extension', 'Amity International', 'The Indian School'],
    highlights: ['Premium Colony', 'Educated Families', 'Good Schools', 'Professional Area'],
    type: 'posh',
    pincode: '110092',
  },
  karkardooma: {
    name: 'Karkardooma',
    fullName: 'Karkardooma, East Delhi',
    description: 'Legal hub with Karkardooma Court Complex',
    heroDescription:
      'Karkardooma is known for its large court complex and is home to many legal professionals and their families. Students here seek quality education with disciplined environment.',
    nearbyMetro: ['Karkardooma Metro', 'Anand Vihar Metro'],
    landmarks: ['Karkardooma Court Complex', 'Anand Vihar ISBT', 'Karkardooma Market'],
    schools: ['DAV Public School', 'Ryan International', 'Modern School'],
    highlights: ['Court Area', 'Legal Professionals', 'Metro Connected', 'Growing Demand'],
    type: 'commercial',
    pincode: '110092',
  },
  shakarpur: {
    name: 'Shakarpur',
    fullName: 'Shakarpur, East Delhi',
    description: 'Dense residential area near Laxmi Nagar coaching hub',
    heroDescription:
      'Shakarpur is a densely populated residential area adjacent to the Laxmi Nagar coaching hub. Budget-conscious students here often seek quality alternatives to mass coaching centers.',
    nearbyMetro: ['Laxmi Nagar Metro', 'Nirman Vihar Metro'],
    landmarks: ['Shakarpur Khas', 'Laxmi Nagar Border', 'Old Kondli Road'],
    schools: ['Sarvodaya Vidyalaya', 'DAV Public School', 'Govt Schools'],
    highlights: ['Near Coaching Hub', 'Affordable Area', 'Student Housing', 'Dense Population'],
    type: 'residential',
    pincode: '110092',
  },
  'anand-vihar': {
    name: 'Anand Vihar',
    fullName: 'Anand Vihar, East Delhi',
    description: 'Major transport hub with ISBT terminal',
    heroDescription:
      'Anand Vihar is a major transport hub with the Inter-State Bus Terminal and Railway Station. Students from UP and neighboring states access coaching centers here.',
    nearbyMetro: ['Anand Vihar Metro', 'Anand Vihar ISBT Metro', 'Kaushambi Metro'],
    landmarks: ['Anand Vihar ISBT', 'Anand Vihar Railway Station', 'Kaushambi'],
    schools: ['DAV Public School', 'Ryan International', 'Cambridge School'],
    highlights: ['ISBT Terminal', 'Railway Station', 'Metro Hub', 'Transport Center'],
    type: 'commercial',
    pincode: '110092',
  },
  'nirman-vihar': {
    name: 'Nirman Vihar',
    fullName: 'Nirman Vihar, East Delhi',
    description: 'Busy commercial and residential area',
    heroDescription:
      'Nirman Vihar is a vibrant commercial and residential area with excellent metro connectivity. Growing demand for quality NEET coaching from students in the area.',
    nearbyMetro: ['Nirman Vihar Metro', 'Laxmi Nagar Metro'],
    landmarks: ['Nirman Vihar Complex', 'V3S Mall', 'Krishna Nagar Border'],
    schools: ['DAV Public School', 'Ryan International', 'Bal Bharati'],
    highlights: ['Commercial Hub', 'Metro Access', 'Shopping Area', 'Good Connectivity'],
    type: 'commercial',
    pincode: '110092',
  },
  'pandav-nagar': {
    name: 'Pandav Nagar',
    fullName: 'Pandav Nagar, East Delhi',
    description: 'Affordable residential locality',
    heroDescription:
      'Pandav Nagar is an affordable residential area in East Delhi. Students here often look for quality NEET coaching that provides value for money with good results.',
    nearbyMetro: ['Mother Dairy Metro', 'IP Extension Metro'],
    landmarks: ['Mother Dairy Complex', 'Pandav Nagar Market', 'IP Extension Border'],
    schools: ['Sarvodaya Vidyalaya', 'Govt Schools', 'Private Schools'],
    highlights: ['Affordable Area', 'Near Mother Dairy', 'Budget Friendly', 'Student Housing'],
    type: 'residential',
    pincode: '110091',
  },
  'krishna-nagar': {
    name: 'Krishna Nagar',
    fullName: 'Krishna Nagar, East Delhi',
    description: 'Historic East Delhi locality with famous market',
    heroDescription:
      'Krishna Nagar is one of the oldest and most established localities in East Delhi, known for its vibrant market and strong business community. Families here prioritize quality education.',
    nearbyMetro: ['Krishna Nagar Metro', 'Jhilmil Metro'],
    landmarks: ['Krishna Nagar Market', 'Famous Sweets Shops', 'Lal Quarter'],
    schools: ['DAV Public School', 'Cambridge School', 'Ryan International'],
    highlights: ['Historic Area', 'Business Families', 'Famous Market', 'Established Locality'],
    type: 'residential',
    pincode: '110051',
  },
  'vivek-vihar': {
    name: 'Vivek Vihar',
    fullName: 'Vivek Vihar, East Delhi',
    description: 'Residential colony near Anand Vihar',
    heroDescription:
      'Vivek Vihar is a well-established residential colony near Anand Vihar with good schools and educated families seeking quality NEET preparation options.',
    nearbyMetro: ['Anand Vihar Metro', 'Karkardooma Metro'],
    landmarks: ['Vivek Vihar Market', 'GTB Hospital', 'Dilshad Garden Border'],
    schools: ['DAV Public School', 'Ryan International', 'Bloom Public School'],
    highlights: ['Residential Colony', 'Near GTB Hospital', 'Educated Families', 'Good Schools'],
    type: 'residential',
    pincode: '110095',
  },
  'dilshad-garden': {
    name: 'Dilshad Garden',
    fullName: 'Dilshad Garden, East Delhi',
    description: 'Large residential area with metro connectivity',
    heroDescription:
      'Dilshad Garden is a large residential area with metro connectivity and growing demand for quality coaching. Students from nearby areas also access coaching centers here.',
    nearbyMetro: ['Dilshad Garden Metro', 'Jhilmil Metro'],
    landmarks: ['Dilshad Garden Market', 'GTB Hospital', 'Jhilmil Industrial Area'],
    schools: ['Ryan International', 'DAV Public School', 'Kendriya Vidyalaya'],
    highlights: ['Metro Connected', 'Large Area', 'Growing Population', 'Affordable'],
    type: 'residential',
    pincode: '110095',
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

export function getAreaBySlug(slug: string): EastDelhiAreaDetails | undefined {
  return areaDetails[slug]
}

export function getAllAreaSlugs(): string[] {
  return Object.keys(areaDetails)
}
