export interface LocalArea {
  id: string
  name: string
  slug: string
  displayName: string
  state: string
  description: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  localKeywords: string[]
  nearbyAreas: string[]
  transportLinks: string[]
  demographics: {
    schools: string[]
    colleges: string[]
    populationDensity: 'high' | 'medium' | 'low'
    studentPopulation: 'high' | 'medium' | 'low'
  }
  uniqueSellingPoints: string[]
  localTestimonials: string[]
  centerAddress?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export const delhiNCRAreas: LocalArea[] = [
  {
    id: 'gurgaon',
    name: 'Gurgaon',
    slug: 'best-biology-coaching-gurgaon',
    displayName: 'Gurgaon (Gurugram)',
    state: 'Haryana',
    description:
      'Premier NEET Biology coaching in Gurgaon with AIIMS expert faculty. Join 500+ successful students from Cyber City, DLF, and Sector 14-56 areas.',
    metaTitle: 'Best Biology Coaching in Gurgaon | NEET Classes | Cerebrum Biology Academy',
    metaDescription:
      'Top-rated biology coaching in Gurgaon for NEET 2025. Expert AIIMS faculty, 98% success rate. Serving DLF, Cyber City, Sector 14-56. Book free demo class!',
    keywords: [
      'best biology coaching gurgaon',
      'NEET coaching gurgaon',
      'biology tuition gurgaon',
      'best biology teacher gurgaon',
      'medical entrance coaching gurgaon',
      'NEET biology classes gurgaon',
    ],
    localKeywords: [
      'biology coaching in cyber city',
      'NEET classes DLF gurgaon',
      'biology tutor sector 14 gurgaon',
      'medical coaching udyog vihar',
      'biology coaching golf course road',
      'NEET coaching sector 56 gurgaon',
    ],
    nearbyAreas: [
      'DLF Cyber City',
      'Sector 14',
      'Sector 29',
      'Sector 56',
      'Golf Course Road',
      'Udyog Vihar',
      'MG Road',
      'Sector 32',
    ],
    transportLinks: [
      'Gurgaon Metro',
      'Rapid Metro',
      'DLF Cyber City Metro',
      'Udyog Vihar Metro',
      'Golf Course Road Metro',
    ],
    demographics: {
      schools: [
        'DPS Gurgaon',
        'Amity International School',
        'The Shri Ram School',
        'Heritage Xperiential Learning School',
      ],
      colleges: ['IIMT College', 'Ansal University', 'SRM University Haryana'],
      populationDensity: 'high',
      studentPopulation: 'high',
    },
    uniqueSellingPoints: [
      'Only biology coaching center with 100% AIIMS faculty in Gurgaon',
      'Metro-connected location near Cyber City',
      'Special weekend batches for working parents',
      'Dedicated doubt sessions for Gurgaon students',
      '24/7 online support for busy Gurgaon families',
    ],
    localTestimonials: ['1', '2', '4'], // IDs from testimonials data
    centerAddress: 'Plot No. 123, Sector 14, Near Metro Station, Gurgaon - 122001',
    coordinates: { lat: 28.4595, lng: 77.0266 },
  },
  {
    id: 'noida',
    name: 'Noida',
    slug: 'best-biology-tuition-noida',
    displayName: 'Noida',
    state: 'Uttar Pradesh',
    description:
      'Best biology tuition in Noida for Class 9-12 and NEET droppers. Located in Sector 18 with easy access from all sectors. 95% students score 160+ in Biology.',
    metaTitle: 'Best Biology Tuition Noida | NEET Biology Teacher | Cerebrum Academy',
    metaDescription:
      'Top biology tuition in Noida for NEET preparation. Expert faculty, personalized attention, proven results. Serving Sector 18, 62, 63. Call now for admission!',
    keywords: [
      'best biology tuition noida',
      'biology teacher noida',
      'NEET coaching noida',
      'biology coaching noida',
      'medical entrance coaching noida',
      'biology tutor class 11 12 noida',
    ],
    localKeywords: [
      'biology coaching sector 18 noida',
      'NEET classes sector 62 noida',
      'biology tuition sector 63',
      'medical coaching city centre noida',
      'biology teacher greater noida west',
      'NEET coaching sector 137 noida',
    ],
    nearbyAreas: [
      'Sector 18',
      'Sector 62',
      'Sector 63',
      'City Centre',
      'Sector 137',
      'Greater Noida West',
      'Sector 104',
      'Sector 76',
    ],
    transportLinks: [
      'Noida Metro',
      'Sector 18 Metro',
      'Botanical Garden Metro',
      'Noida City Centre Metro',
      'Golf Course Metro',
    ],
    demographics: {
      schools: [
        'DPS Noida',
        'Amity International School Noida',
        'Lotus Valley International School',
        'Genesis Global School',
      ],
      colleges: [
        'Amity University Noida',
        'AKGEC',
        'JSS Academy',
        'Bennett University Greater Noida',
      ],
      populationDensity: 'high',
      studentPopulation: 'high',
    },
    uniqueSellingPoints: [
      'Sector 18 location - accessible from entire Noida',
      'Special coaching for CBSE and UP Board students',
      'Integration with local school curriculum',
      'Parent-teacher meeting every month',
      'Free transportation from major sectors',
    ],
    localTestimonials: ['2', '3', '5'],
    centerAddress: 'A-25, Sector 18, Near Atta Market, Noida - 201301',
    coordinates: { lat: 28.5355, lng: 77.391 },
  },
  {
    id: 'faridabad',
    name: 'Faridabad',
    slug: 'biology-coaching-faridabad-neet',
    displayName: 'Faridabad',
    state: 'Haryana',
    description:
      'Expert biology coaching in Faridabad for NEET droppers and Class 11-12 students. Located in Sector 15 with proven track record of medical admissions.',
    metaTitle: 'Biology Coaching Faridabad | NEET Droppers Batch | Best Biology Teacher',
    metaDescription:
      'Specialized biology coaching in Faridabad for NEET preparation. Expert faculty from AIIMS, small batch sizes, guaranteed results. Sector 15 location.',
    keywords: [
      'biology coaching faridabad',
      'NEET coaching faridabad',
      'biology teacher faridabad',
      'medical entrance coaching faridabad',
      'biology tuition faridabad',
      'NEET droppers batch faridabad',
    ],
    localKeywords: [
      'biology coaching sector 15 faridabad',
      'NEET classes old faridabad',
      'medical coaching sector 21 faridabad',
      'biology tutor neelam chowk',
      'NEET coaching ballabhgarh',
      'biology classes sector 16 faridabad',
    ],
    nearbyAreas: [
      'Sector 15',
      'Sector 21',
      'Old Faridabad',
      'Neelam Chowk',
      'Ballabhgarh',
      'Sector 16',
      'Sector 12',
      'NIT Faridabad',
    ],
    transportLinks: [
      'Faridabad Metro',
      'Neelam Chowk Metro',
      'Bata Chowk Metro',
      'Escorts Mujesar Metro',
    ],
    demographics: {
      schools: ['DPS Faridabad', 'Modern School', 'MVN School', 'Vidya Niketan School'],
      colleges: ['NIT Faridabad', 'JMI Faridabad', 'Manav Rachna University'],
      populationDensity: 'high',
      studentPopulation: 'medium',
    },
    uniqueSellingPoints: [
      'Specialized dropper batches with counseling support',
      'Integration with NIT Faridabad for advanced labs',
      'Focus on Haryana state quota counseling',
      '1-on-1 mentorship for every student',
      'Weekend intensive programs available',
    ],
    localTestimonials: ['3', '4'],
    centerAddress: 'SCO 45, Sector 15, Near NIT, Faridabad - 121007',
    coordinates: { lat: 28.4089, lng: 77.3178 },
  },
  {
    id: 'ghaziabad',
    name: 'Ghaziabad',
    slug: 'best-biology-teacher-ghaziabad',
    displayName: 'Ghaziabad',
    state: 'Uttar Pradesh',
    description:
      'Best biology teacher in Ghaziabad with 15+ years experience. Specialized coaching for Class 9-12 CBSE and NEET preparation. Located in Raj Nagar Extension.',
    metaTitle: 'Best Biology Teacher Ghaziabad | NEET Biology Classes | Cerebrum Academy',
    metaDescription:
      'Find the best biology teacher in Ghaziabad for NEET coaching. Expert faculty, proven results, small batches. Serving Raj Nagar, Indirapuram, Vasundhara.',
    keywords: [
      'best biology teacher ghaziabad',
      'biology coaching ghaziabad',
      'NEET coaching ghaziabad',
      'biology tuition ghaziabad',
      'medical entrance coaching ghaziabad',
      'biology classes ghaziabad',
    ],
    localKeywords: [
      'biology teacher raj nagar extension',
      'NEET coaching indirapuram',
      'biology tuition vasundhara ghaziabad',
      'medical coaching crossings republik',
      'biology classes kaushambi',
      'NEET coaching govindpuram',
    ],
    nearbyAreas: [
      'Raj Nagar Extension',
      'Indirapuram',
      'Vasundhara',
      'Crossings Republik',
      'Kaushambi',
      'Govindpuram',
      'Raj Nagar',
      'Shakti Khand',
    ],
    transportLinks: [
      'Delhi Metro (Dilshad Garden)',
      'Kaushambi Metro',
      'Anand Vihar Metro',
      'New Ashok Nagar Metro',
    ],
    demographics: {
      schools: ['DPS Ghaziabad', 'Ryan International', 'Cambridge School', 'Somerville School'],
      colleges: ['ITS Engineering College', 'ABES Engineering College', 'AKGEC'],
      populationDensity: 'high',
      studentPopulation: 'high',
    },
    uniqueSellingPoints: [
      'Personal mentorship from 15+ years experienced faculty',
      'Special focus on UP state quota and private colleges',
      'Weekend doubt clearing sessions',
      'Free pickup and drop facility in nearby areas',
      'Separate batches for Hindi and English medium students',
    ],
    localTestimonials: ['1', '5'],
    centerAddress: 'Shop No. 15, Raj Nagar Extension, Near Metro Station, Ghaziabad - 201017',
    coordinates: { lat: 28.6692, lng: 77.4538 },
  },
  {
    id: 'greater-noida',
    name: 'Greater Noida',
    slug: 'biology-tutor-greater-noida',
    displayName: 'Greater Noida',
    state: 'Uttar Pradesh',
    description:
      'Professional biology tutor in Greater Noida for personalized NEET coaching. Small batches, individual attention, flexible timings for working families.',
    metaTitle: 'Biology Tutor Greater Noida | Personal NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Expert biology tutor in Greater Noida offering personalized NEET coaching. Flexible timings, small batches, proven results. Book consultation now!',
    keywords: [
      'biology tutor greater noida',
      'personal biology coaching greater noida',
      'NEET tutor greater noida',
      'biology teacher greater noida',
      'medical entrance coaching greater noida',
      'private biology tuition greater noida',
    ],
    localKeywords: [
      'biology coaching alpha 1 greater noida',
      'NEET classes beta 2 greater noida',
      'biology tutor knowledge park',
      'medical coaching techzone greater noida',
      'biology classes gamma 1 greater noida',
      'NEET coaching pari chowk',
    ],
    nearbyAreas: [
      'Alpha 1',
      'Beta 2',
      'Gamma 1',
      'Delta 1',
      'Knowledge Park',
      'Techzone',
      'Pari Chowk',
      'Ecotech Extension',
    ],
    transportLinks: [
      'Pari Chowk Metro',
      'Knowledge Park Metro',
      'Alpha 1 Metro',
      'Greater Noida Metro',
    ],
    demographics: {
      schools: ['Shiv Nadar School', 'Jaypee Public School', 'Delhi Public School Greater Noida'],
      colleges: [
        'Jaypee Institute',
        'Shiv Nadar University',
        'Bennett University',
        'Galgotias University',
      ],
      populationDensity: 'medium',
      studentPopulation: 'high',
    },
    uniqueSellingPoints: [
      'Personalized coaching with flexible timings',
      'Integration with nearby engineering colleges for practical learning',
      'Special programs for students from premium schools',
      'Online + offline hybrid model available',
      'Career counseling and college admission guidance',
    ],
    localTestimonials: ['2', '4'],
    centerAddress: 'Plot A-15, Alpha 1, Greater Noida - 201308',
    coordinates: { lat: 28.4744, lng: 77.504 },
  },
  {
    id: 'delhi-central',
    name: 'Central Delhi',
    slug: 'biology-coaching-central-delhi',
    displayName: 'Central Delhi',
    state: 'Delhi',
    description:
      'Premium biology coaching in Central Delhi for serious NEET aspirants. Located near Connaught Place with easy metro connectivity from all parts of Delhi.',
    metaTitle: 'Biology Coaching Central Delhi | NEET Classes CP | Best Faculty Delhi',
    metaDescription:
      'Premium biology coaching in Central Delhi near Connaught Place. Top AIIMS faculty, excellent results, metro connected. Best for serious NEET aspirants.',
    keywords: [
      'biology coaching central delhi',
      'NEET coaching connaught place',
      'biology classes karol bagh',
      'medical coaching rajendra place',
      'biology tuition patel nagar',
      'best biology teacher central delhi',
    ],
    localKeywords: [
      'biology coaching near cp metro',
      'NEET classes rajiv chowk',
      'biology tuition karol bagh metro',
      'medical coaching new delhi station',
      'biology coaching pahar ganj',
      'NEET classes dev nagar',
    ],
    nearbyAreas: [
      'Connaught Place',
      'Karol Bagh',
      'Rajendra Place',
      'Patel Nagar',
      'Paharganj',
      'Dev Nagar',
      'Rajouri Garden',
      'Kirti Nagar',
    ],
    transportLinks: [
      'Rajiv Chowk Metro',
      'Karol Bagh Metro',
      'Rajendra Place Metro',
      'Patel Nagar Metro',
      'New Delhi Railway Station',
    ],
    demographics: {
      schools: [
        'Sardar Patel Vidyalaya',
        'Bharatiya Vidya Bhavan',
        'Modern School Barakhamba Road',
      ],
      colleges: ['Lady Shri Ram College', 'Hansraj College', 'St. Stephens College'],
      populationDensity: 'high',
      studentPopulation: 'high',
    },
    uniqueSellingPoints: [
      'Premium location with metro connectivity from entire Delhi',
      'Evening batches for students from premier schools',
      'Library and study hall facilities',
      'Regular interaction with medical professionals',
      'Scholarship programs for economically weaker students',
    ],
    localTestimonials: ['1', '3', '5'],
    centerAddress: '2nd Floor, Radial Road 6, Connaught Place, New Delhi - 110001',
    coordinates: { lat: 28.6315, lng: 77.2167 },
  },
]

export const getAreaBySlug = (slug: string): LocalArea | undefined => {
  return delhiNCRAreas.find((area) => area.slug === slug)
}

export const getAllAreaSlugs = (): string[] => {
  return delhiNCRAreas.map((area) => area.slug)
}
