/**
 * IB Biology city-level configs for dynamic city landing pages.
 *
 * Each city drives:
 *  - metadata (title, description, keywords)
 *  - local currency pricing display
 *  - IB World Schools list for internal linking + local trust
 *  - timezone, country code for schema.org
 *  - LocalBusiness/Service JSON-LD
 *
 * Add a new city by adding a new entry — no new component code needed.
 */

export type CitySlug =
  | 'london'
  | 'singapore'
  | 'dubai'
  | 'hong-kong'
  | 'toronto'
  | 'vancouver'
  | 'sydney'
  | 'melbourne'
  | 'new-york'
  | 'boston'
  | 'geneva'
  | 'zurich'
  | 'amsterdam'
  | 'bangkok'
  | 'kuala-lumpur'
  // India — home market
  | 'delhi'
  | 'gurugram'
  | 'mumbai'
  | 'bangalore'
  | 'pune'
  | 'hyderabad'
  | 'noida'
  | 'chennai'

export interface CityConfig {
  slug: CitySlug
  city: string
  country: string
  countryCode: string
  region: string
  timezoneAbbr: string
  currency: { code: string; symbol: string }
  pricing: { perHour: number; perHourText: string }
  ibSchools: string[]
  neighbourhoods: string[]
  localHook: string
  /** Optional in-person centre details — shown instead of the default online-only messaging. */
  inPersonCentre?: {
    name: string
    address: string
  }
  /** Optional annual package line (typical for Indian market) shown in the hero meta row. */
  annualPackage?: string
  /** Optional companion page (e.g., the pre-existing /ib-igcse-biology-tuition-gurugram hub) */
  companionPage?: { title: string; href: string }
}

export const cities: Record<CitySlug, CityConfig> = {
  london: {
    slug: 'london',
    city: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    region: 'Greater London',
    timezoneAbbr: 'GMT/BST',
    currency: { code: 'GBP', symbol: '£' },
    pricing: { perHour: 55, perHourText: '£55–75/hr' },
    ibSchools: [
      'Southbank International School',
      'ACS Hillingdon International',
      "King's College School",
      'ICS London',
      'Dwight School London',
      'Halcyon London International School',
    ],
    neighbourhoods: ['Kensington', 'Chelsea', 'Hampstead', 'Richmond', 'Canary Wharf', 'Wimbledon'],
    localHook:
      'London has the densest concentration of IB World Schools in the UK and our tutors work across all of them. We run live sessions aligned to UK school timetables and offer same-day WhatsApp support before school mocks.',
  },
  singapore: {
    slug: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    region: 'Singapore',
    timezoneAbbr: 'SGT',
    currency: { code: 'SGD', symbol: 'S$' },
    pricing: { perHour: 110, perHourText: 'S$100–150/hr' },
    ibSchools: [
      'United World College of South East Asia',
      'Singapore American School',
      'Dulwich College Singapore',
      'Tanglin Trust School',
      'Stamford American International School',
      'Canadian International School',
      'GESS International',
    ],
    neighbourhoods: ['Bukit Timah', 'Orchard', 'Tanjong Pagar', 'Holland Village', 'Sentosa'],
    localHook:
      'Singapore is one of the strongest IB markets globally — more than 40% of local IB schools rank in the global top 100. We time our live sessions for SGT and are used to the 11-subject HSC/NCEA-adjacent choice patterns Singapore students face.',
  },
  dubai: {
    slug: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    region: 'Dubai',
    timezoneAbbr: 'GST',
    currency: { code: 'AED', symbol: 'AED' },
    pricing: { perHour: 210, perHourText: 'AED 180–280/hr' },
    ibSchools: [
      'Dubai American Academy',
      'GEMS World Academy',
      'Raffles World Academy',
      'Dubai International Academy',
      'Jumeirah College',
      'Uptown International School',
    ],
    neighbourhoods: [
      'Jumeirah',
      'Downtown Dubai',
      'Dubai Marina',
      'Arabian Ranches',
      'Emirates Hills',
    ],
    localHook:
      "Dubai's IB community is concentrated around Jumeirah and Downtown. Our GST-aligned batches accommodate the Sunday–Thursday school week, and we offer in-Dubai demo meetings on request.",
  },
  'hong-kong': {
    slug: 'hong-kong',
    city: 'Hong Kong',
    country: 'Hong Kong SAR',
    countryCode: 'HK',
    region: 'Hong Kong',
    timezoneAbbr: 'HKT',
    currency: { code: 'HKD', symbol: 'HK$' },
    pricing: { perHour: 620, perHourText: 'HK$500–750/hr' },
    ibSchools: [
      'Hong Kong International School',
      'Chinese International School',
      'German Swiss International School',
      'Li Po Chun United World College',
      'Renaissance College',
      'Canadian International School of Hong Kong',
    ],
    neighbourhoods: ['Mid-Levels', 'Repulse Bay', 'Pok Fu Lam', 'Sai Kung', 'Kowloon Tong'],
    localHook:
      "Hong Kong is one of the most competitive IB markets in Asia. Our tutors have supported students through LPCUWC's rigorous Year-13 final term and the application cycle to HKU, CUHK, and HKUST medicine.",
  },
  toronto: {
    slug: 'toronto',
    city: 'Toronto',
    country: 'Canada',
    countryCode: 'CA',
    region: 'Ontario',
    timezoneAbbr: 'EST/EDT',
    currency: { code: 'CAD', symbol: 'CA$' },
    pricing: { perHour: 70, perHourText: 'CA$65–90/hr' },
    ibSchools: [
      'Branksome Hall',
      'Rosedale Heights School of the Arts',
      'Monarch Park Collegiate Institute',
      'Bishop Strachan School',
      'Victoria Park Collegiate',
    ],
    neighbourhoods: ['Rosedale', 'Forest Hill', 'Yorkville', 'Leaside', 'Etobicoke'],
    localHook:
      'Toronto has the largest concentration of Canadian IB World Schools. Our EST-aligned sessions fit after-school Canadian schedules and our tutors have specific experience with University of Toronto and McGill admissions.',
  },
  vancouver: {
    slug: 'vancouver',
    city: 'Vancouver',
    country: 'Canada',
    countryCode: 'CA',
    region: 'British Columbia',
    timezoneAbbr: 'PST/PDT',
    currency: { code: 'CAD', symbol: 'CA$' },
    pricing: { perHour: 70, perHourText: 'CA$65–90/hr' },
    ibSchools: [
      'Mulgrave School',
      'Stratford Hall',
      'Pearson College UWC',
      'Southpointe Academy',
      'West Point Grey Academy',
    ],
    neighbourhoods: ['West Vancouver', 'Point Grey', 'Kerrisdale', 'Richmond', 'Burnaby'],
    localHook:
      'Vancouver students benefit from our PST batches and BC-specific guidance on UBC and SFU biology pathways. Our tutors know the Mulgrave / Stratford Hall IA schedule inside-out.',
  },
  sydney: {
    slug: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    countryCode: 'AU',
    region: 'New South Wales',
    timezoneAbbr: 'AEST/AEDT',
    currency: { code: 'AUD', symbol: 'A$' },
    pricing: { perHour: 85, perHourText: 'A$75–110/hr' },
    ibSchools: [
      'International Grammar School',
      'Kambala',
      'The Scots College',
      "Pymble Ladies' College",
      'Newington College',
    ],
    neighbourhoods: ['Ultimo', 'Double Bay', 'Rose Bay', 'Mosman', 'Chatswood'],
    localHook:
      'Sydney IB students often balance HSC and IB pathway decisions. We help students who have already chosen IB maximise HL scores for medicine at Sydney, UNSW, and Monash.',
  },
  melbourne: {
    slug: 'melbourne',
    city: 'Melbourne',
    country: 'Australia',
    countryCode: 'AU',
    region: 'Victoria',
    timezoneAbbr: 'AEST/AEDT',
    currency: { code: 'AUD', symbol: 'A$' },
    pricing: { perHour: 85, perHourText: 'A$75–110/hr' },
    ibSchools: [
      "Methodist Ladies' College",
      'Tintern Grammar',
      'Wesley College',
      'Carey Baptist Grammar',
      'Kilvington Grammar',
    ],
    neighbourhoods: ['Toorak', 'Kew', 'Camberwell', 'Brighton', 'Glen Iris'],
    localHook:
      'Our Melbourne IB tutors are experienced with the Wesley and MLC IA calendar and offer intensive pre-exam sprints timed to the Victorian school year.',
  },
  'new-york': {
    slug: 'new-york',
    city: 'New York',
    country: 'United States',
    countryCode: 'US',
    region: 'New York',
    timezoneAbbr: 'EST/EDT',
    currency: { code: 'USD', symbol: '$' },
    pricing: { perHour: 75, perHourText: '$65–95/hr' },
    ibSchools: [
      'United Nations International School',
      'Léman Manhattan Preparatory School',
      'International School of Brooklyn',
      'Dwight School New York',
      'British International School of New York',
    ],
    neighbourhoods: [
      'Upper East Side',
      'Upper West Side',
      'Tribeca',
      'Brooklyn Heights',
      'Park Slope',
    ],
    localHook:
      'NYC IB students typically apply to a mix of US highly-selective colleges and UK medicine — our tutors have coached for both pathways out of UNIS and Dwight.',
  },
  boston: {
    slug: 'boston',
    city: 'Boston',
    country: 'United States',
    countryCode: 'US',
    region: 'Massachusetts',
    timezoneAbbr: 'EST/EDT',
    currency: { code: 'USD', symbol: '$' },
    pricing: { perHour: 75, perHourText: '$65–95/hr' },
    ibSchools: [
      'British International School of Boston',
      'Austin Preparatory School',
      'Concord Academy (AP + IB-friendly)',
    ],
    neighbourhoods: ['Back Bay', 'Beacon Hill', 'Cambridge', 'Brookline', 'Newton'],
    localHook:
      'Boston-area IB students are typically targeting top US science programmes. We help them use IB Biology HL as credit leverage at MIT, Harvard, and Tufts pre-med pathways.',
  },
  geneva: {
    slug: 'geneva',
    city: 'Geneva',
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'Geneva',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'CHF', symbol: 'CHF' },
    pricing: { perHour: 85, perHourText: 'CHF 75–110/hr' },
    ibSchools: [
      'International School of Geneva (La Grande Boissière)',
      'Collège du Léman',
      'Institut Le Rosey',
      'International School of Geneva (La Châtaigneraie)',
    ],
    neighbourhoods: ['Champel', 'Eaux-Vives', 'Cologny', 'Versoix', 'Nyon'],
    localHook:
      "Geneva's Ecolint campuses are the historical home of the IB programme. Our tutors are used to the Year-12 MAP + IA timing at Grande Boissière and La Châtaigneraie.",
  },
  zurich: {
    slug: 'zurich',
    city: 'Zurich',
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'Zurich',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'CHF', symbol: 'CHF' },
    pricing: { perHour: 85, perHourText: 'CHF 75–110/hr' },
    ibSchools: [
      'Zurich International School',
      'Inter-Community School Zurich',
      'Swiss International School Zurich',
    ],
    neighbourhoods: ['Kilchberg', 'Wädenswil', 'Enge', 'Küsnacht', 'Zollikon'],
    localHook:
      'Zurich IB students frequently pair their IB Diploma with Swiss medical school applications. Our coaches understand both the German-language Matura equivalency and IB Biology HL pathways.',
  },
  amsterdam: {
    slug: 'amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    region: 'North Holland',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'International School of Amsterdam',
      'Amsterdam International Community School',
      'British School of Amsterdam',
    ],
    neighbourhoods: ['Amstelveen', 'Zuid', 'Oud-Zuid', 'Buitenveldert', 'Haarlem'],
    localHook:
      'The Dutch IB scene is compact and cooperative — students from ISA, AICS, and BSA frequently join our cross-school IB Biology peer groups online.',
  },
  bangkok: {
    slug: 'bangkok',
    city: 'Bangkok',
    country: 'Thailand',
    countryCode: 'TH',
    region: 'Bangkok',
    timezoneAbbr: 'ICT',
    currency: { code: 'THB', symbol: '฿' },
    pricing: { perHour: 1600, perHourText: '฿1,400–2,000/hr' },
    ibSchools: [
      'NIST International School',
      'International School Bangkok',
      'Shrewsbury International School',
      'UWC Thailand',
      'Harrow Bangkok',
    ],
    neighbourhoods: ['Sukhumvit', 'Sathorn', 'Silom', 'Bangna', 'Nichada'],
    localHook:
      'Bangkok IB students straddle Southeast Asian and UK-style admissions. Our tutors have specific experience with NIST and ISB IA calendars and with the Mahidol International medical pathway.',
  },
  'kuala-lumpur': {
    slug: 'kuala-lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    countryCode: 'MY',
    region: 'Kuala Lumpur',
    timezoneAbbr: 'MYT',
    currency: { code: 'MYR', symbol: 'RM' },
    pricing: { perHour: 220, perHourText: 'RM 180–280/hr' },
    ibSchools: [
      'The Alice Smith School',
      'Garden International School',
      "Mont'Kiara International School",
      'International School of Kuala Lumpur',
      "Taylor's International School",
    ],
    neighbourhoods: ['Mont Kiara', 'Bangsar', 'Damansara Heights', 'Ampang Hilir', 'Cyberjaya'],
    localHook:
      "KL's IB community has grown rapidly alongside international school expansion. Our MYT-aligned sessions fit IB schedules at ISKL, Mont'Kiara, and Garden International.",
  },

  // --- India: home market, 220+ IB World Schools, 6,156 IBDP students (2024) ---

  delhi: {
    slug: 'delhi',
    city: 'Delhi',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi NCR',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'American Embassy School',
      'Vasant Valley School',
      'The Shri Ram School',
      'Pathways School Noida',
      'Modern School',
      'Sanskriti School',
      'GD Goenka World School',
      'British School New Delhi',
    ],
    neighbourhoods: [
      'Vasant Vihar',
      'Defence Colony',
      'South Extension',
      'Greater Kailash',
      'Chanakyapuri',
      'Shanti Niketan',
      'Anand Lok',
      'Jor Bagh',
    ],
    localHook:
      'Delhi has one of the largest IB communities in India. Cerebrum runs in-person IB Biology coaching at our South Extension and Rohini centres alongside timezone-matched online sessions — a combination no all-online competitor (TutorChase, Lanterna, Revision Village) can offer locally.',
    inPersonCentre: {
      name: 'Cerebrum Biology Academy — South Extension (Flagship)',
      address: 'D 35, South Extension Part 2, New Delhi 110049',
    },
  },

  gurugram: {
    slug: 'gurugram',
    city: 'Gurugram',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi NCR',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Pathways World School, Aravali',
      'Scottish High International School',
      'DPS International School',
      'Heritage Xperiential Learning School',
      'Shikshantar School',
      'The Shri Ram School, Aravali',
      'GD Goenka Signature School',
    ],
    neighbourhoods: [
      'Sector 51',
      'DLF Phase 1',
      'DLF Phase 5',
      'Sohna Road',
      'Golf Course Road',
      'Golf Course Extension',
      'Sushant Lok',
      'M.G. Road',
    ],
    localHook:
      "Gurugram has India's most concentrated IB school belt — Pathways Aravali, Scottish High, DPS International, and Heritage sit within a 15 km radius. Our Sector 51 centre offers in-person IB Biology classes plus IST-aligned online sessions, with an integrated IB+NEET option not available from global tutoring platforms.",
    inPersonCentre: {
      name: 'Cerebrum Biology Academy — Gurugram',
      address: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018',
    },
    companionPage: {
      title: 'IB & IGCSE Biology Tuition — Gurugram (dedicated hub)',
      href: '/ib-igcse-biology-tuition-gurugram',
    },
  },

  mumbai: {
    slug: 'mumbai',
    city: 'Mumbai',
    country: 'India',
    countryCode: 'IN',
    region: 'Maharashtra',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Dhirubhai Ambani International School (BKC)',
      'JBCN International School',
      'Oberoi International School',
      'Ecole Mondiale World School',
      'BD Somani International School',
      'Bombay International School',
      'Aditya Birla World Academy',
      'Jamnabai Narsee International School',
    ],
    neighbourhoods: ['BKC', 'Bandra', 'Juhu', 'Worli', 'Powai', 'Andheri', 'Goregaon', 'Parel'],
    localHook:
      'Mumbai has the largest concentration of IB World Schools in India — Dhirubhai Ambani International, JBCN, Oberoi, Ecole Mondiale all within Western suburbs. We run IST-aligned online IB Biology coaching for Mumbai students with small-batch live classes and examiner-led IA reviews.',
  },

  bangalore: {
    slug: 'bangalore',
    city: 'Bangalore',
    country: 'India',
    countryCode: 'IN',
    region: 'Karnataka',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Canadian International School',
      'Stonehill International School',
      'Indus International School',
      'The International School Bangalore (TISB)',
      'Bangalore International School',
      'Oakridge International School',
      'Inventure Academy',
    ],
    neighbourhoods: [
      'Whitefield',
      'Koramangala',
      'Indiranagar',
      'HSR Layout',
      'JP Nagar',
      'Hebbal',
      'Sarjapur Road',
      'Electronic City',
    ],
    localHook:
      'Bangalore IB students at TISB, Canadian International, Stonehill, and Indus balance STEM-heavy HL choices. Our online IB Biology coaching is IST-aligned, and our tutors have specific experience with pre-med and biotech pathway coaching popular with Bangalore families.',
  },

  pune: {
    slug: 'pune',
    city: 'Pune',
    country: 'India',
    countryCode: 'IN',
    region: 'Maharashtra',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Mercedes-Benz International School',
      'Symbiosis International School',
      'Indus International School Pune',
      'The Orchid School',
      'Vibgyor Rise School',
      'Pawar Public School',
    ],
    neighbourhoods: [
      'Kalyani Nagar',
      'Koregaon Park',
      'Hinjewadi',
      'Aundh',
      'Balewadi',
      'Viman Nagar',
      'Kharadi',
    ],
    localHook:
      "Pune's IB community is concentrated around MBIS, Symbiosis, and Indus. We run IST online IB Biology classes with dedicated IA mentors, and many of our Pune students choose the dual IB+NEET track for medical school optionality.",
  },

  hyderabad: {
    slug: 'hyderabad',
    city: 'Hyderabad',
    country: 'India',
    countryCode: 'IN',
    region: 'Telangana',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Oakridge International School',
      'Chirec International School',
      'Glendale Academy',
      'Indus International School Hyderabad',
      'Aga Khan Academy',
      'Delhi Public School International',
    ],
    neighbourhoods: [
      'Gachibowli',
      'Banjara Hills',
      'Jubilee Hills',
      'HITEC City',
      'Madhapur',
      'Kondapur',
      'Financial District',
    ],
    localHook:
      "Hyderabad IB students at Oakridge, Chirec, and Glendale often target US pre-med and engineering programmes. Our online IB Biology coaching is IST-aligned with examiner-led Paper 2 drills and IA supervision specific to each school's calendar.",
  },

  noida: {
    slug: 'noida',
    city: 'Noida',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi NCR',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Pathways School Noida',
      'Shiv Nadar School',
      'Step by Step School',
      'Genesis Global School',
      'GD Goenka Public School',
      'Lotus Valley International',
    ],
    neighbourhoods: [
      'Sector 44',
      'Sector 62',
      'Sector 132',
      'Greater Noida',
      'Sector 50',
      'Sector 93',
    ],
    localHook:
      'Noida IB students at Pathways, Shiv Nadar, and Step by Step benefit from our Delhi NCR footprint. Online IST sessions by default; in-person available at our South Extension and Rohini centres within a short Delhi NCR commute.',
  },

  chennai: {
    slug: 'chennai',
    city: 'Chennai',
    country: 'India',
    countryCode: 'IN',
    region: 'Tamil Nadu',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'American International School Chennai',
      'KC High International School',
      'Good Shepherd International School',
      'Sishya School',
      'Akshara Academy',
      'Padma Seshadri Bala Bhavan (IBDP track)',
    ],
    neighbourhoods: [
      'Thiruvanmiyur',
      'East Coast Road (ECR)',
      'Nungambakkam',
      'Anna Nagar',
      'Adyar',
      'Kotturpuram',
    ],
    localHook:
      'Chennai IB students at AISC, KC High, and Good Shepherd often pair IB with SAT and US college applications. We run IST online IB Biology coaching with a specific track for US admissions-aligned Biology HL preparation.',
  },
}

export function citySlugs(): CitySlug[] {
  return Object.keys(cities) as CitySlug[]
}

export function getCity(slug: string): CityConfig | null {
  if (!Object.prototype.hasOwnProperty.call(cities, slug)) return null
  return cities[slug as CitySlug]
}
