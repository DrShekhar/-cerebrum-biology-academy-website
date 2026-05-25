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
  // 2026 P0 expansion — additive only (no edits to existing pages)
  | 'tokyo'
  | 'osaka'
  | 'seoul'
  | 'shanghai'
  | 'beijing'
  | 'shenzhen'
  | 'houston'
  | 'chicago'
  | 'san-francisco'
  | 'paris'
  // India — home market
  | 'delhi'
  | 'gurugram'
  | 'mumbai'
  | 'bangalore'
  | 'pune'
  | 'hyderabad'
  | 'noida'
  | 'chennai'
  | 'south-delhi'
  | 'faridabad'
  | 'rohini'
  | 'ghaziabad'
  | 'kolkata'
  // 2026 Rich-country EU + CH expansion (Phase 1 — 15 NEW city pages;
  // geneva, zurich, amsterdam already configured above)
  | 'basel'
  | 'zug'
  | 'lausanne'
  | 'frankfurt'
  | 'berlin'
  | 'munich'
  | 'duesseldorf'
  | 'hamburg'
  | 'the-hague'
  | 'rotterdam'
  | 'eindhoven'
  | 'stockholm'
  | 'malmo'
  | 'gothenburg'
  | 'dublin'
  // Phase 6 — global gap-fill (6 cities)
  | 'brussels'
  | 'copenhagen'
  | 'vienna'
  | 'taipei'
  | 'manila'
  | 'jakarta'

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

  // --- 2026 P0 expansion: 8 missing global IB markets ---

  tokyo: {
    slug: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Tokyo / Kanto',
    timezoneAbbr: 'JST',
    currency: { code: 'JPY', symbol: '¥' },
    pricing: { perHour: 12500, perHourText: '¥10,000–15,000/hr' },
    ibSchools: [
      'American School in Japan (ASIJ)',
      'Tokyo International School',
      'Saint Maur International School (Yokohama)',
      'Yokohama International School',
      'Aoba-Japan International School',
      'Nishimachi International School',
      'KAIS International School',
    ],
    neighbourhoods: ['Minato', 'Shibuya', 'Setagaya', 'Meguro', 'Shinagawa', 'Yokohama'],
    localHook:
      "Tokyo's IB community is concentrated around Minato (Roppongi/Azabu), Setagaya, and the Yokohama international corridor. Our JST-aligned sessions fit the long Japanese school day, with weekend IA workshops timed for after-cram-school slots.",
  },

  osaka: {
    slug: 'osaka',
    city: 'Osaka',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Osaka / Kansai',
    timezoneAbbr: 'JST',
    currency: { code: 'JPY', symbol: '¥' },
    pricing: { perHour: 12500, perHourText: '¥10,000–15,000/hr' },
    ibSchools: [
      'Osaka International School of Kwansei Gakuin (OIS)',
      'Canadian Academy (Kobe)',
      'Senri International School (SIS)',
      'AICJ (Hiroshima — Kansai catchment)',
    ],
    neighbourhoods: ['Minoh', 'Senri', 'Ashiya', 'Kobe Rokko Island', 'Nishinomiya'],
    localHook:
      "The Osaka-Kobe-Kyoto IB corridor spans OIS in Minoh (Kwansei Gakuin affiliated), Canadian Academy on Kobe's Rokko Island, and Senri International near Expo Park. The Kansai pharmaceutical (Takeda, Shionogi, Daiichi Sankyo) and corporate expat community drives steady IB demand. JST evening sessions (6–8 PM) fit the long Japanese school day.",
  },

  seoul: {
    slug: 'seoul',
    city: 'Seoul',
    country: 'South Korea',
    countryCode: 'KR',
    region: 'Seoul / Gyeonggi',
    timezoneAbbr: 'KST',
    currency: { code: 'KRW', symbol: '₩' },
    pricing: { perHour: 90000, perHourText: '₩80,000–120,000/hr' },
    ibSchools: [
      'Dwight School Seoul',
      'Korea International School (KIS)',
      'KIS Pangyo',
      'Seoul Foreign School',
      'Seoul International School',
      'Yongsan International School of Seoul (YISS)',
      'Chadwick International (Songdo)',
      'Branksome Hall Asia (Jeju)',
    ],
    neighbourhoods: ['Gangnam', 'Yongsan', 'Itaewon', 'Pangyo / Bundang', 'Songdo (Incheon)'],
    localHook:
      "Korea's IB community is concentrated around Yongsan (Dwight, YISS, SFS), Pangyo (KIS), and Songdo (Chadwick). Many of our Seoul students target US highly-selective universities — our KST sessions fit after-school hagwon schedules.",
  },

  shanghai: {
    slug: 'shanghai',
    city: 'Shanghai',
    country: 'China',
    countryCode: 'CN',
    region: 'Shanghai',
    timezoneAbbr: 'CST (China)',
    currency: { code: 'CNY', symbol: '¥' },
    pricing: { perHour: 800, perHourText: '¥700–1,000/hr' },
    ibSchools: [
      'Shanghai American School (Pudong & Puxi)',
      'Dulwich College Shanghai (Pudong & Puxi)',
      'Shanghai Community International School (SCIS)',
      'Yew Chung International School Shanghai (YCIS)',
      'Concordia International School Shanghai',
      'Wellington College International Shanghai',
      'Western International School of Shanghai (WISS)',
    ],
    neighbourhoods: ['Pudong', 'Puxi', "Jing'an", 'Xuhui', 'Hongqiao', 'Minhang'],
    localHook:
      "Shanghai is China's largest IB market, with the SAS Pudong/Puxi twin campuses, Dulwich, SCIS, YCIS, and Concordia within the same city. Our China-time-aligned sessions support both expat and Chinese-national IB students preparing for global university applications.",
  },

  beijing: {
    slug: 'beijing',
    city: 'Beijing',
    country: 'China',
    countryCode: 'CN',
    region: 'Beijing',
    timezoneAbbr: 'CST (China)',
    currency: { code: 'CNY', symbol: '¥' },
    pricing: { perHour: 800, perHourText: '¥700–1,000/hr' },
    ibSchools: [
      'International School of Beijing (ISB)',
      'Western Academy of Beijing (WAB)',
      'Dulwich College Beijing',
      'Yew Chung International School Beijing',
      'Keystone Academy',
      'Beijing City International School (BCIS)',
      'Harrow International School Beijing',
    ],
    neighbourhoods: ['Shunyi', 'Chaoyang', 'Haidian', 'Lido', 'CBD'],
    localHook:
      "Beijing's IB cluster is centered in Shunyi (ISB, WAB, Dulwich) and Chaoyang. Our tutors are familiar with the ISB and WAB IA calendars and the cross-cultural admissions priorities that Beijing IB students face.",
  },

  shenzhen: {
    slug: 'shenzhen',
    city: 'Shenzhen',
    country: 'China',
    countryCode: 'CN',
    region: 'Guangdong',
    timezoneAbbr: 'CST (China)',
    currency: { code: 'CNY', symbol: '¥' },
    pricing: { perHour: 800, perHourText: '¥700–1,000/hr' },
    ibSchools: [
      'Shenzhen College of International Education (SCIE)',
      'Shekou International School (SIS)',
      'QSI International School of Shenzhen',
      'Shen Wai International School (SWIS)',
      'Basis International School Shenzhen',
      'Shenzhen American International School',
      'International School of Nansha (Guangzhou-Shenzhen corridor)',
    ],
    neighbourhoods: ['Nanshan', 'Shekou', 'Futian', 'Luohu', 'Longgang', "Bao'an"],
    localHook:
      'Shenzhen is anchored by SCIE (publicly ranked #1 international school in China, 2025 HSBC Hurun ranking) and Shekou International School (SIS). Strong dual A-Level + IB DP curriculum culture, with significant cross-border Hong Kong family demand given the Shenzhen-HK proximity (commuter rail to West Kowloon under 15 minutes). Our China-time-aligned sessions support both expat and Chinese-national IB students preparing for UK Russell Group, US Ivy League, HKU MBBS, and CUHK MBBS applications.',
  },

  houston: {
    slug: 'houston',
    city: 'Houston',
    country: 'United States',
    countryCode: 'US',
    region: 'Texas',
    timezoneAbbr: 'CST/CDT',
    currency: { code: 'USD', symbol: '$' },
    pricing: { perHour: 70, perHourText: '$60–90/hr' },
    ibSchools: [
      'Awty International School',
      'Bellaire High School (HISD IB)',
      'Westchester Academy for International Studies',
      'Carnegie Vanguard High School',
      'Stratford High School (Spring Branch ISD IB)',
      'The Awty International (Lower School IB Continuum)',
    ],
    neighbourhoods: ['River Oaks', 'Memorial', 'Sugar Land', 'The Woodlands', 'Bellaire', 'Katy'],
    localHook:
      "Houston's IB community is anchored by Awty International (the city's flagship IB World School) and HISD's IB programmes at Bellaire and Westchester. Our CST-aligned weekend sessions fit Awty's IA timeline.",
  },

  chicago: {
    slug: 'chicago',
    city: 'Chicago',
    country: 'United States',
    countryCode: 'US',
    region: 'Illinois',
    timezoneAbbr: 'CST/CDT',
    currency: { code: 'USD', symbol: '$' },
    pricing: { perHour: 70, perHourText: '$60–90/hr' },
    ibSchools: [
      'Lincoln Park High School (CPS IB)',
      'Senn High School (CPS IB)',
      'Curie Metropolitan High School',
      'Hubbard High School (CPS IB)',
      'Hinsdale Central High School',
      'Stevenson High School (Lincolnshire)',
      'Glenbrook North High School',
      'Schaumburg High School',
    ],
    neighbourhoods: [
      'Lincoln Park',
      'North Shore',
      'Hinsdale',
      'Naperville',
      'Schaumburg',
      'Wilmette',
    ],
    localHook:
      'Chicago has one of the largest US public-school IB populations through CPS plus suburban district IB programmes (Hinsdale Central, Stevenson, Glenbrook). Our CST sessions fit US after-school slots and weekend IA blocks.',
  },

  'san-francisco': {
    slug: 'san-francisco',
    city: 'San Francisco / Bay Area',
    country: 'United States',
    countryCode: 'US',
    region: 'California',
    timezoneAbbr: 'PST/PDT',
    currency: { code: 'USD', symbol: '$' },
    pricing: { perHour: 105, perHourText: '$85–125/hr' },
    ibSchools: [
      'French American International School (San Francisco)',
      'San Francisco International High School',
      'German International School of Silicon Valley (Mountain View)',
      'Stratford School (IB Continuum)',
      'Independence High School (San Jose, IB)',
      'Hillsdale High School (San Mateo, IB)',
    ],
    neighbourhoods: [
      'Pacific Heights',
      'Palo Alto',
      'Cupertino',
      'San Mateo',
      'Mountain View',
      'Berkeley',
      'Marin',
    ],
    localHook:
      'Bay Area IB enrollment is smaller than the AP/UC system, but the IB students at French American International, SFIHS, and German International School of Silicon Valley target highly-competitive global universities. Our PST sessions fit US school days; weekend IA support runs Sat morning.',
  },

  paris: {
    slug: 'paris',
    city: 'Paris',
    country: 'France',
    countryCode: 'FR',
    region: 'Île-de-France',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€55–85/hr' },
    ibSchools: [
      'International School of Paris (ISP)',
      'École Jeannine Manuel',
      'American School of Paris (Saint-Cloud)',
      'British School of Paris',
      'Lycée International (Saint-Germain-en-Laye)',
      'EIB Victor Hugo',
    ],
    neighbourhoods: [
      '16e arrondissement',
      'Saint-Cloud',
      'Neuilly-sur-Seine',
      'Saint-Germain-en-Laye',
      'Versailles',
    ],
    localHook:
      "Paris's IB hubs are in the 16e (ISP, Jeannine Manuel) and Hauts-de-Seine (American School Paris, British School). Our CET-aligned sessions fit the French school calendar including the Wednesday-afternoon school break, when many IB students take dedicated tutoring.",
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
      'GD Goenka World School (Sohna)',
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

  'south-delhi': {
    slug: 'south-delhi',
    city: 'South Delhi',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi NCR',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Vasant Valley School',
      'The Shri Ram School, Aravali',
      'Sardar Patel Vidyalaya',
      "Mother's International School",
      'Step by Step School Jasola',
      'Pathways School Noida (South Delhi feeder)',
    ],
    neighbourhoods: [
      'Greater Kailash',
      'Defence Colony',
      'South Extension',
      'Vasant Kunj',
      'Hauz Khas',
      'Panchsheel Park',
      'Chanakyapuri',
      'Lajpat Nagar',
    ],
    localHook:
      'South Delhi has the highest density of IB/IGCSE schools in India after Gurugram. Our flagship South Extension centre sits at the heart of this cluster — GK, Defence Colony, Saket, and Vasant Kunj students reach in 15-25 minutes. We blend offline intensive weekends with IST online classes.',
    inPersonCentre: {
      name: 'Cerebrum Biology Academy — South Extension (Flagship)',
      address: 'D 35, South Extension Part 2, New Delhi 110049',
    },
  },

  faridabad: {
    slug: 'faridabad',
    city: 'Faridabad',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi NCR',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Manav Rachna International School',
      'Delhi Public School Faridabad',
      'The Shri Ram School Faridabad',
      'Apeejay School Faridabad',
      'Modern Delhi Public School',
      'Ryan International',
    ],
    neighbourhoods: [
      'Sector 14',
      'Sector 15',
      'Sector 17',
      'Sector 19',
      'NIT Faridabad',
      'Sector 80',
      'Old Faridabad',
      'Surajkund',
    ],
    localHook:
      'Faridabad IB/IGCSE students access our Sector 17 offline centre alongside the IST online cohort. NIT Faridabad, Old Faridabad, and Sectors 14-19 reach the centre in 10-15 minutes. Greater Faridabad students typically join online with optional intensive weekends at the centre.',
    inPersonCentre: {
      name: 'Cerebrum Biology Academy — Faridabad',
      address: 'Sector 17, Faridabad, Haryana',
    },
  },

  rohini: {
    slug: 'rohini',
    city: 'Rohini',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi NCR',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Maharaja Agrasen Model School',
      'Rukmini Devi Public School',
      'Delhi Public School Rohini',
      'MM Public School',
      'Apeejay School Pitampura',
    ],
    neighbourhoods: [
      'Rohini Sector 3',
      'Rohini Sector 7',
      'Rohini Sector 11',
      'Pitampura',
      'Model Town',
      'Ashok Vihar',
      'Shalimar Bagh',
      'Punjabi Bagh',
    ],
    localHook:
      'Rohini and North Delhi IB students (Pitampura, Model Town, Shalimar Bagh) access our programme online with IST live classes plus an offline option at our Rohini centre. Commute to South Extension is 25-35 minutes by Red Line → Yellow Line → Pink Line.',
    inPersonCentre: {
      name: 'Cerebrum Biology Academy — Rohini',
      address: 'Rohini, North West Delhi',
    },
  },

  kolkata: {
    slug: 'kolkata',
    city: 'Kolkata',
    country: 'India',
    countryCode: 'IN',
    region: 'West Bengal',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Calcutta International School',
      'La Martiniere for Boys',
      'La Martiniere for Girls',
      "St Xavier's Collegiate School",
      'Modern High School for Girls',
      'Heritage School',
      'South Point School',
    ],
    neighbourhoods: [
      'Salt Lake',
      'New Town',
      'Ballygunge',
      'Alipore',
      'Park Street',
      'Rajarhat',
      'Hindustan Park',
    ],
    localHook:
      'Kolkata IB students at Calcutta International, La Martiniere, and Modern High School pair IB with strong West Bengal board foundations. Our IST online programme serves all Kolkata neighbourhoods with live classes scheduled around South Point, Ballygunge, and Salt Lake school timings.',
  },

  ghaziabad: {
    slug: 'ghaziabad',
    city: 'Ghaziabad',
    country: 'India',
    countryCode: 'IN',
    region: 'Delhi NCR',
    timezoneAbbr: 'IST',
    currency: { code: 'INR', symbol: '₹' },
    pricing: { perHour: 2500, perHourText: '₹2,000–3,500/hr' },
    annualPackage: 'Complete IB Biology programme: ₹60,000–₹98,000 per year',
    ibSchools: [
      'Seth Anandram Jaipuria School (Vasundhara)',
      'Cambridge School Indirapuram',
      'Delhi Public School Indirapuram',
      'KR Mangalam World School Vaishali',
      'Amity International School Vasundhara',
      'GD Goenka Public School Vasundhara',
    ],
    neighbourhoods: [
      'Indirapuram',
      'Vaishali',
      'Vasundhara',
      'Kaushambi',
      'Crossings Republik',
      'Raj Nagar',
      'Raj Nagar Extension',
      'Govindpuram',
    ],
    localHook:
      "Ghaziabad's IB and international-curriculum demand clusters around the Indirapuram-Vaishali-Vasundhara residential belt — closer to East Delhi via the Anand Vihar / Kaushambi axis than to central Delhi. Our IST online sessions sit at 7-9 PM to fit cleanly after the school day, and the Faridabad-Noida-Ghaziabad Expressway makes the South Extension hub accessible for optional in-person consultations.",
  },

  // ============================================================================
  // RICH-COUNTRY EU + CH CLUSTER (2026 expansion)
  // ============================================================================

  // ─── SWITZERLAND (non-EU; no VAT complexity) — geneva + zurich exist above ──
  basel: {
    slug: 'basel',
    city: 'Basel',
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'Basel-Stadt',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'CHF', symbol: 'CHF' },
    pricing: { perHour: 85, perHourText: 'CHF 75–110/hr' },
    ibSchools: [
      'International School Basel (ISB)',
      'SIS Swiss International School Basel',
      'Academia International School Basel',
    ],
    neighbourhoods: ['Bruderholz', 'Riehen', 'Bottmingen', 'Allschwil', 'Reinach'],
    localHook:
      "Basel's IB cohort is anchored by International School Basel (ISB) in Reinach and SIS Basel — both serving the pharma-corporate expat community around Novartis, Roche, and Lonza. Our CET evening sessions (5–8 PM Basel) fit the after-school window. We coach for Swiss medicine eligibility (largely closed to non-EU) plus the more realistic UK Russell Group / US / Asia medical pathways that Basel IB graduates actually pursue.",
  },

  zug: {
    slug: 'zug',
    city: 'Zug',
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'Zug',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'CHF', symbol: 'CHF' },
    pricing: { perHour: 85, perHourText: 'CHF 75–110/hr' },
    ibSchools: [
      'International School of Zug and Luzern (ISZL)',
      'SIS Swiss International School Zug',
      'Montessori School Zug',
    ],
    neighbourhoods: ['Baar', 'Cham', 'Steinhausen', 'Hünenberg', 'Walchwil'],
    localHook:
      "Zug's tax-favoured corporate expat density (commodity-trading, crypto, biotech) drives consistent IB demand. International School of Zug and Luzern (ISZL) anchors the local IB cohort. Our CET evening sessions accommodate the financial-sector working-parent schedule with weekday flexibility.",
  },

  lausanne: {
    slug: 'lausanne',
    city: 'Lausanne',
    country: 'Switzerland',
    countryCode: 'CH',
    region: 'Vaud',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'CHF', symbol: 'CHF' },
    pricing: { perHour: 85, perHourText: 'CHF 75–110/hr' },
    ibSchools: [
      'International School of Lausanne (ISL)',
      'Champittet Collège',
      'SIS Swiss International School Lausanne',
    ],
    neighbourhoods: ['Pully', 'Lutry', 'Belmont-sur-Lausanne', 'Morges', 'Nyon'],
    localHook:
      "Lausanne's IB community is centred on International School of Lausanne (ISL) in Pully, with feeder demand from the Vaud expat corridor stretching to Morges and Nyon. Our CET evening sessions (5–8 PM Lausanne) fit cleanly after ISL's typical 3:30 PM dismissal. EPFL and CHUV proximity drives consistent biology/medicine application interest.",
  },

  // ─── GERMANY (EU — WhatsApp-only CTA until VAT setup complete) ──────────────
  frankfurt: {
    slug: 'frankfurt',
    city: 'Frankfurt',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Hesse',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'Frankfurt International School (FIS)',
      'International School of Frankfurt-Rhein-Main (ISF)',
      'Strothoff International School',
      'Metropolitan School Frankfurt',
    ],
    neighbourhoods: ['Oberursel', 'Bad Homburg', 'Sachsenhausen', 'Westend', 'Niederrad'],
    localHook:
      "Frankfurt is Germany's deepest IB market — anchored by FIS in Oberursel and ISF Rhein-Main. The financial-sector expat density drives consistent year-on-year IB demand. Following the IB recognition uplift of May 2025, IB Diploma graduates now qualify for German universities when HL includes a language, math, or natural science — meaningful tailwind for IB Biology HL enrolment.",
  },

  berlin: {
    slug: 'berlin',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Berlin',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'Berlin Brandenburg International School (BBIS)',
      'Berlin Cosmopolitan School',
      'Berlin Metropolitan School',
      'Nelson Mandela State International School',
    ],
    neighbourhoods: ['Kladow', 'Charlottenburg', 'Wilmersdorf', 'Zehlendorf', 'Mitte'],
    localHook:
      "Berlin's IB cohort is centred on BBIS in Kladow plus an active inner-city cluster (Cosmopolitan, Metropolitan). The growing Indian tech-sector diaspora in Mitte and Friedrichshain adds steady IB Biology HL demand. The May 2025 German IB recognition upgrade makes IB a viable pathway to Charité Medical School Berlin and Humboldt / TU Berlin life sciences for students who choose Biology HL.",
  },

  munich: {
    slug: 'munich',
    city: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Bavaria',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'Munich International School (MIS)',
      'Bavarian International School (BIS)',
      'European School Munich',
      'Lycée Jean Renoir (IB option)',
    ],
    neighbourhoods: ['Starnberg', 'Haimhausen', 'Bogenhausen', 'Grünwald', 'Pullach'],
    localHook:
      "Munich's IB demand is anchored by MIS in Starnberg and BIS in Haimhausen — both serving the BMW / Siemens / Allianz expat corporate community. Bavaria's traditional Gymnasium-only conservatism has softened post-2025 IB recognition, opening LMU Munich Medical School to IB Diploma applicants with strong Biology HL grades.",
  },

  duesseldorf: {
    slug: 'duesseldorf',
    city: 'Düsseldorf',
    country: 'Germany',
    countryCode: 'DE',
    region: 'North Rhine-Westphalia',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'International School of Düsseldorf (ISD)',
      'Düsseldorf International School',
      'St. George\'s School Düsseldorf-Köln',
    ],
    neighbourhoods: ['Kaiserswerth', 'Niederkassel', 'Oberkassel', 'Meerbusch', 'Krefeld'],
    localHook:
      "Düsseldorf's IB cluster is anchored by ISD in Kaiserswerth — historically one of Germany's longest-established international schools. The Japanese, Korean, and South Asian expat communities along the Rhine drive consistent IB demand. Cross-cluster pickup from Köln (Cologne) families is significant.",
  },

  hamburg: {
    slug: 'hamburg',
    city: 'Hamburg',
    country: 'Germany',
    countryCode: 'DE',
    region: 'Hamburg',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'International School of Hamburg (ISH)',
      'Hamburg International School',
      'Phorms Hamburg',
    ],
    neighbourhoods: ['Othmarschen', 'Blankenese', 'HafenCity', 'Eppendorf', 'Winterhude'],
    localHook:
      "Hamburg's IB cohort is anchored by ISH in Othmarschen — one of Germany's longest-running IB schools. The shipping, finance, and media corporate expat community along the Elbe drives steady IB demand. Universitätsklinikum Hamburg-Eppendorf medical pathways now accept IB Diploma post-2025 recognition uplift.",
  },

  // ─── NETHERLANDS (EU — WhatsApp-only CTA until VAT setup) ────────────────────
  'the-hague': {
    slug: 'the-hague',
    city: 'The Hague',
    country: 'Netherlands',
    countryCode: 'NL',
    region: 'South Holland',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'British School in the Netherlands (BSN)',
      'International School of The Hague (ISH)',
      'American School of The Hague (ASH)',
      'Lycée français Vincent van Gogh',
    ],
    neighbourhoods: ['Wassenaar', 'Voorschoten', 'Scheveningen', 'Benoordenhout', 'Statenkwartier'],
    localHook:
      "The Hague hosts the densest international-organisation expat community in continental Europe — ICC, ICJ, OPCW, Europol — driving consistent IB DP enrolment at BSN, ISH, and ASH. Our CET evening sessions (5–8 PM Hague time) fit the typical international-school after-school window. Strong cross-demand from biology/medicine applicants targeting UK Russell Group and US Ivy League.",
  },

  rotterdam: {
    slug: 'rotterdam',
    city: 'Rotterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    region: 'South Holland',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'Rotterdam International Secondary School (RISS)',
      'American International School of Rotterdam',
      'De Blijberg International',
    ],
    neighbourhoods: ['Kralingen', 'Hillegersberg', 'Nesselande', 'Capelle aan den IJssel'],
    localHook:
      "Rotterdam's IB community is anchored by RISS — South Holland's longest-established IB school. The port-and-shipping plus tech-startup expat density drives steady IB Diploma demand. Erasmus University Medical Center (EMC) recognition of IB Biology HL is well-established for Erasmus MC Medicine applications.",
  },

  eindhoven: {
    slug: 'eindhoven',
    city: 'Eindhoven',
    country: 'Netherlands',
    countryCode: 'NL',
    region: 'North Brabant',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'International School Eindhoven (ISE)',
      'St. Joriscollege International Stream',
    ],
    neighbourhoods: ['Veldhoven', 'Geldrop', 'Waalre', 'Best', 'Nuenen'],
    localHook:
      "Eindhoven's IB cohort is anchored by ISE — serving the ASML / Philips / NXP semiconductor expat community in the Brainport region. The Indian tech-sector diaspora at ASML and the broader semiconductor cluster drives consistent IB Biology HL demand. CET evening sessions fit the post-school window cleanly.",
  },

  // ─── SWEDEN (EU — WhatsApp-only CTA until VAT setup) ────────────────────────
  stockholm: {
    slug: 'stockholm',
    city: 'Stockholm',
    country: 'Sweden',
    countryCode: 'SE',
    region: 'Stockholm',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'SEK', symbol: 'kr' },
    pricing: { perHour: 750, perHourText: 'SEK 600–950/hr' },
    ibSchools: [
      'Stockholm International School (SIS)',
      'Internationella Engelska Skolan (IES Södermalm)',
      'International School of the Stockholm Region (ISSR)',
      'SSHL Sigtuna (Sigtunaskolan Humanistiska Läroverket)',
    ],
    neighbourhoods: ['Östermalm', 'Djurgården', 'Lidingö', 'Bromma', 'Saltsjöbaden'],
    localHook:
      "Stockholm's IB cohort is anchored by Stockholm International School (SIS) on Djurgården and SSHL Sigtuna boarding north of the city. The Karolinska Institutet medical pathway is the dominant local biology-related university target — Karolinska accepts IB Biology HL as the 'Biology 2 or equivalent' entry requirement. Stockholm's 91%+ adult English fluency (EF EPI 617) means online English-medium tutoring is culturally seamless.",
  },

  malmo: {
    slug: 'malmo',
    city: 'Malmö',
    country: 'Sweden',
    countryCode: 'SE',
    region: 'Skåne',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'SEK', symbol: 'kr' },
    pricing: { perHour: 750, perHourText: 'SEK 600–950/hr' },
    ibSchools: [
      'Katedralskolan Lund (IB)',
      'Malmö Borgarskola (IB Diploma stream)',
      'Internationella Engelska Gymnasiet Södermalm satellite',
    ],
    neighbourhoods: ['Limhamn', 'Västra Hamnen', 'Bunkeflostrand', 'Lund (commuter)'],
    localHook:
      "The Malmö-Lund corridor's IB cohort is anchored by Katedralskolan Lund (one of Sweden's oldest IB schools, founded 14th-century gymnasium) and Malmö Borgarskola IB Diploma stream. Cross-strait proximity to Copenhagen (Øresund Bridge, 30 minutes) adds Danish expat-family demand. Lund University Medical School is a meaningful local target; we coach IB Biology HL for both Karolinska and Lund medical pathways.",
  },

  gothenburg: {
    slug: 'gothenburg',
    city: 'Gothenburg',
    country: 'Sweden',
    countryCode: 'SE',
    region: 'Västra Götaland',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'SEK', symbol: 'kr' },
    pricing: { perHour: 750, perHourText: 'SEK 600–950/hr' },
    ibSchools: [
      'International School of the Gothenburg Region (ISGR)',
      'Donnergymnasiet Göteborg (IB)',
      'Hvitfeldtska Gymnasiet IB',
    ],
    neighbourhoods: ['Långedrag', 'Örgryte', 'Hovås', 'Mölndal', 'Kungsbacka (commuter)'],
    localHook:
      "Gothenburg's IB cohort is anchored by ISGR plus Hvitfeldtska's IB Diploma stream. The Volvo / AstraZeneca corporate expat community drives consistent IB demand, and AstraZeneca's biotech R&D presence in Mölndal adds biology-major university interest. Sahlgrenska University Hospital (Göteborg University Medical School) accepts IB Biology HL as the 'Biology 2 equivalent' entry requirement.",
  },

  // ─── IRELAND (EU — WhatsApp-only CTA until VAT setup) ───────────────────────
  dublin: {
    slug: 'dublin',
    city: 'Dublin',
    country: 'Ireland',
    countryCode: 'IE',
    region: 'Leinster',
    timezoneAbbr: 'GMT/IST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€55–80/hr' },
    ibSchools: [
      'Nord Anglia International School Dublin',
      'SEK International School Dublin',
      "St Andrew's College Dublin",
      'International School of Dublin',
    ],
    neighbourhoods: ['Dún Laoghaire', 'Booterstown', 'Dundrum', 'Sandyford', 'Ranelagh'],
    localHook:
      "Dublin's IB community is small but English-native — only 4 IB DP schools nationally, but the rapidly-growing Indian tech-sector diaspora and the Irish medical-school pipeline (RCSI, Trinity College Dublin, UCD) targeting NEET-track Indian families create distinctive demand. RCSI's strong Indian-student admission preference makes IB Biology HL a recognised path. Our GMT evening sessions (5–8 PM Dublin) fit cleanly after the international-school day.",
  },

  // ─── PHASE 6 — GLOBAL GAP-FILL ─────────────────────────────────────────────
  brussels: {
    slug: 'brussels',
    city: 'Brussels',
    country: 'Belgium',
    countryCode: 'BE',
    region: 'Brussels-Capital',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€60–85/hr' },
    ibSchools: [
      'International School of Brussels (ISB)',
      'British School of Brussels',
      "St John's International School",
      'European School Brussels I–IV',
      'Bogaerts International School',
    ],
    neighbourhoods: ['Tervuren', 'Waterloo', 'Woluwe-Saint-Pierre', 'Uccle', 'Overijse'],
    localHook:
      "Brussels hosts the densest cluster of international schools in continental Europe — driven by the EU institutions, NATO, and 200+ multinational HQs. ISB (Tervuren), BSB (Tervuren), St John's (Waterloo), and four European Schools create a massive IB/European Bac cohort. Our CET evening sessions (5–8 PM Brussels) fit the standard international-school day. Many Brussels IB families target UK Russell Group medical schools or Belgian universities (KU Leuven, ULB).",
  },

  copenhagen: {
    slug: 'copenhagen',
    city: 'Copenhagen',
    country: 'Denmark',
    countryCode: 'DK',
    region: 'Capital Region',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'DKK', symbol: 'kr' },
    pricing: { perHour: 600, perHourText: 'DKK 500–750/hr' },
    ibSchools: [
      'Copenhagen International School (CIS)',
      'Rygaards International School',
      'Birkerød Gymnasium IB',
      'Nørre Gymnasium IB',
    ],
    neighbourhoods: ['Hellerup', 'Gentofte', 'Nordhavn', 'Frederiksberg', 'Klampenborg'],
    localHook:
      "Copenhagen's IB community is anchored by Copenhagen International School (CIS) in Nordhavn — one of Scandinavia's most modern school campuses. The pharma/biotech corridor (Novo Nordisk, Lundbeck, LEO Pharma in Greater Copenhagen) drives consistent IB demand. Danish medical school admission (University of Copenhagen, Aarhus) accepts IB Biology HL. Our CET evening sessions fit the Danish school schedule.",
  },

  vienna: {
    slug: 'vienna',
    city: 'Vienna',
    country: 'Austria',
    countryCode: 'AT',
    region: 'Vienna',
    timezoneAbbr: 'CET/CEST',
    currency: { code: 'EUR', symbol: '€' },
    pricing: { perHour: 65, perHourText: '€55–80/hr' },
    ibSchools: [
      'Vienna International School (VIS)',
      'American International School Vienna (AIS)',
      'Danube International School',
      'Lycée Français de Vienne (IB option)',
    ],
    neighbourhoods: ['Döbling', 'Hietzing', 'Währing', 'Josefstadt', 'Innere Stadt'],
    localHook:
      "Vienna's IB community is anchored by Vienna International School (VIS) and the American International School (AIS) — both serving the UN, IAEA, OPEC, and OSCE diplomatic/international-organisation expat community. Vienna is the fourth UN headquarters city (with NYC, Geneva, Nairobi), creating steady IB demand. Medical University of Vienna is the primary local medical-school target; IB Biology HL is accepted for admission. CET evening sessions fit the Austrian school schedule.",
  },

  taipei: {
    slug: 'taipei',
    city: 'Taipei',
    country: 'Taiwan',
    countryCode: 'TW',
    region: 'Taipei',
    timezoneAbbr: 'CST (UTC+8)',
    currency: { code: 'TWD', symbol: 'NT$' },
    pricing: { perHour: 2500, perHourText: 'NT$2,000–3,000/hr' },
    ibSchools: [
      'Taipei American School (TAS)',
      'Taipei European School (TES)',
      'International Bilingual School at Hsinchu Science Park (IBSH)',
      'Morrison Academy Taipei',
    ],
    neighbourhoods: ['Tianmu', 'Da-an', 'Xinyi', 'Neihu', 'Hsinchu (commuter)'],
    localHook:
      "Taipei's IB community is anchored by Taipei American School (TAS) in Tianmu — one of East Asia's top international schools — and Taipei European School (TES). The semiconductor-industry expat community (TSMC, MediaTek, ASUS) in Hsinchu Science Park drives additional IB demand via IBSH. Our CST evening sessions (6–9 PM Taipei time) fit after school. Many Taipei IB students target US Ivy League, UK Russell Group, or National Taiwan University medical programmes.",
  },

  manila: {
    slug: 'manila',
    city: 'Manila',
    country: 'Philippines',
    countryCode: 'PH',
    region: 'Metro Manila',
    timezoneAbbr: 'PHT (UTC+8)',
    currency: { code: 'PHP', symbol: '₱' },
    pricing: { perHour: 3500, perHourText: '₱3,000–4,500/hr' },
    ibSchools: [
      'International School Manila (ISM)',
      'British School Manila',
      'European International School Manila',
      'Brent International School Manila',
    ],
    neighbourhoods: ['Makati', 'Bonifacio Global City (BGC)', 'Alabang', 'Rockwell', 'Eastwood'],
    localHook:
      "Manila's IB community is anchored by International School Manila (ISM) in Bonifacio Global City — the Philippines' premier international school — plus British School Manila, European International School, and Brent International. The BPO/tech expat community and wealthy Filipino families in Makati and BGC drive IB demand. Our PHT evening sessions (6–9 PM Manila) fit the international-school schedule. Many Manila IB students target UK, US, Australian, or Ateneo/UP medical pathways.",
  },

  jakarta: {
    slug: 'jakarta',
    city: 'Jakarta',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'DKI Jakarta',
    timezoneAbbr: 'WIB (UTC+7)',
    currency: { code: 'IDR', symbol: 'Rp' },
    pricing: { perHour: 900000, perHourText: 'Rp 750,000–1,100,000/hr' },
    ibSchools: [
      'Jakarta Intercultural School (JIS)',
      'British School Jakarta (BSJ)',
      'ACG School Jakarta',
      'Binus School Simprug (IB)',
      'Global Jaya School',
    ],
    neighbourhoods: ['Pondok Indah', 'Kemang', 'Cilandak', 'Menteng', 'BSD City (Tangerang)'],
    localHook:
      "Jakarta's IB community is anchored by Jakarta Intercultural School (JIS) in Cilandak — Southeast Asia's largest international school — and British School Jakarta (BSJ) in Pondok Indah. The corporate expat community (mining, energy, tech) plus wealthy Indonesian families in South Jakarta drive strong IB demand. Our WIB evening sessions (6–9 PM Jakarta) fit the international-school schedule. Many Jakarta IB students target UK Russell Group, Australian Group of Eight, or Universitas Indonesia medical pathways.",
  },
}

export function citySlugs(): CitySlug[] {
  return Object.keys(cities) as CitySlug[]
}

export function getCity(slug: string): CityConfig | null {
  if (!Object.prototype.hasOwnProperty.call(cities, slug)) return null
  return cities[slug as CitySlug]
}
