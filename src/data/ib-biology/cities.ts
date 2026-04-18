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
}

export function citySlugs(): CitySlug[] {
  return Object.keys(cities) as CitySlug[]
}

export function getCity(slug: string): CityConfig | null {
  if (!Object.prototype.hasOwnProperty.call(cities, slug)) return null
  return cities[slug as CitySlug]
}
