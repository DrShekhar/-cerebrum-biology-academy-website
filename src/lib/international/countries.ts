/**
 * International Country Configuration
 * Master configuration file for 10 target markets
 *
 * Base pricing (USD): Small Group $40/hr, 1-on-1 $70-120/hr
 * Exchange rates updated: January 2025
 */

export interface CountryCurrency {
  code: string
  symbol: string
  rate: number // Exchange rate from USD
}

export interface CountryPricing {
  smallGroup: number
  oneOnOneMin: number
  oneOnOneMax: number
}

export interface CountryConfig {
  code: string
  name: string
  flag: string
  currency: CountryCurrency
  pricing: CountryPricing
  timezone: string
  timezoneAbbr: string
  examSystems: string[]
  courseCategories: string[]
  hreflang: string
  phoneFormat: string
  trustBadges: string[]
  localTerms: {
    tutor: string // "tutor" vs "teacher" vs "grinds"
    class: string // "class" vs "lesson" vs "session"
  }
}

// All supported countries (core markets + IB-focused 2026 expansion)
export const SUPPORTED_COUNTRIES = [
  'us',
  'uk',
  'ca',
  'au',
  'sg',
  'ae',
  'ie',
  'hk',
  'nz',
  'za',
  'sa',
  'bd',
  'lk',
  'eg',
  'pk',
  // 2026 IB expansion markets
  'es',
  'cn',
  'de',
  'ch',
  'nl',
  'th',
  'my',
  'mx',
  'jp',
  'kr',
] as const

export type CountryCode = (typeof SUPPORTED_COUNTRIES)[number]

// Master country configuration
export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  us: {
    code: 'us',
    name: 'United States',
    flag: '🇺🇸',
    currency: { code: 'USD', symbol: '$', rate: 1.0 },
    pricing: { smallGroup: 40, oneOnOneMin: 70, oneOnOneMax: 120 },
    timezone: 'America/New_York',
    timezoneAbbr: 'EST/PST',
    examSystems: [
      'AP Biology',
      'SAT Biology',
      'MCAT Biology',
      'ACT Science',
      'IB Biology',
      'Biology Olympiad (USABO)',
    ],
    courseCategories: ['High School', 'Pre-Med', 'Olympiad', 'Test Prep'],
    hreflang: 'en-US',
    phoneFormat: '+1 (XXX) XXX-XXXX',
    trustBadges: ['College Board Aligned', 'AAMC Prep Partner'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  uk: {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: { code: 'GBP', symbol: '£', rate: 0.79 },
    pricing: { smallGroup: 32, oneOnOneMin: 55, oneOnOneMax: 95 },
    timezone: 'Europe/London',
    timezoneAbbr: 'GMT/BST',
    examSystems: [
      'GCSE Biology',
      'A-Level Biology',
      'BMAT',
      'UCAT',
      'IB Biology',
      'Biology Olympiad (BBO)',
    ],
    courseCategories: ['GCSE', 'A-Level', 'Medical Entry', 'Olympiad'],
    hreflang: 'en-GB',
    phoneFormat: '+44 XXXX XXXXXX',
    trustBadges: ['Ofqual Aligned', 'AQA/OCR/Edexcel Prep'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  ca: {
    code: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    currency: { code: 'CAD', symbol: '$', rate: 1.36 },
    pricing: { smallGroup: 55, oneOnOneMin: 95, oneOnOneMax: 165 },
    timezone: 'America/Toronto',
    timezoneAbbr: 'EST/PST',
    examSystems: [
      'Ontario Biology (SBI3U/SBI4U)',
      'BC Biology',
      'Alberta Biology',
      'MCAT Biology',
      'IB Biology',
      'AP Biology',
    ],
    courseCategories: ['High School', 'Pre-Med', 'Provincial Exams', 'IB/AP'],
    hreflang: 'en-CA',
    phoneFormat: '+1 (XXX) XXX-XXXX',
    trustBadges: ['Provincial Curriculum Aligned', 'AAMC MCAT Prep'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  au: {
    code: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    currency: { code: 'AUD', symbol: '$', rate: 1.54 },
    pricing: { smallGroup: 60, oneOnOneMin: 110, oneOnOneMax: 185 },
    timezone: 'Australia/Sydney',
    timezoneAbbr: 'AEST/AEDT',
    examSystems: [
      'HSC Biology (NSW)',
      'VCE Biology (VIC)',
      'QCE Biology (QLD)',
      'WACE Biology (WA)',
      'SACE Biology (SA)',
      'ATAR Preparation',
      'IB Biology',
    ],
    courseCategories: ['Year 11-12', 'ATAR Prep', 'State Exams', 'IB'],
    hreflang: 'en-AU',
    phoneFormat: '+61 X XXXX XXXX',
    trustBadges: ['NESA/VCAA Aligned', 'ATAR Specialists'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  sg: {
    code: 'sg',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: { code: 'SGD', symbol: '$', rate: 1.34 },
    pricing: { smallGroup: 55, oneOnOneMin: 95, oneOnOneMax: 160 },
    timezone: 'Asia/Singapore',
    timezoneAbbr: 'SGT',
    examSystems: [
      'GCE O-Level Biology',
      'GCE A-Level Biology (H1/H2)',
      'IP Biology',
      'IB Biology',
      'Singapore Biology Olympiad (SBO)',
    ],
    courseCategories: ['O-Level', 'A-Level', 'IP Programme', 'Olympiad'],
    hreflang: 'en-SG',
    phoneFormat: '+65 XXXX XXXX',
    trustBadges: ['SEAB Syllabus Aligned', 'MOE-Registered'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  ae: {
    code: 'ae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: { code: 'AED', symbol: 'AED ', rate: 3.67 },
    pricing: { smallGroup: 150, oneOnOneMin: 255, oneOnOneMax: 440 },
    timezone: 'Asia/Dubai',
    timezoneAbbr: 'GST',
    examSystems: [
      'IGCSE Biology',
      'A-Level Biology',
      'IB Biology',
      'American Curriculum Biology',
      'CBSE Biology',
      'MCAT Biology',
    ],
    courseCategories: ['IGCSE/A-Level', 'IB Programme', 'American System', 'Pre-Med'],
    hreflang: 'en-AE',
    phoneFormat: '+971 XX XXX XXXX',
    trustBadges: ['Cambridge/Edexcel Aligned', 'KHDA Approved'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  ie: {
    code: 'ie',
    name: 'Ireland',
    flag: '🇮🇪',
    currency: { code: 'EUR', symbol: '€', rate: 0.92 },
    pricing: { smallGroup: 37, oneOnOneMin: 65, oneOnOneMax: 110 },
    timezone: 'Europe/Dublin',
    timezoneAbbr: 'IST',
    examSystems: [
      'Leaving Certificate Biology',
      'Junior Cycle Science',
      'HPAT Preparation',
      'IB Biology',
    ],
    courseCategories: ['Junior Cycle', 'Leaving Cert', 'Medical Entry (HPAT)', 'IB'],
    hreflang: 'en-IE',
    phoneFormat: '+353 XX XXX XXXX',
    trustBadges: ['SEC Syllabus Aligned', 'CAO Points Prep'],
    localTerms: { tutor: 'grinds teacher', class: 'grinds' },
  },

  hk: {
    code: 'hk',
    name: 'Hong Kong',
    flag: '🇭🇰',
    currency: { code: 'HKD', symbol: '$', rate: 7.79 },
    pricing: { smallGroup: 310, oneOnOneMin: 545, oneOnOneMax: 935 },
    timezone: 'Asia/Hong_Kong',
    timezoneAbbr: 'HKT',
    examSystems: [
      'HKDSE Biology',
      'IGCSE Biology',
      'GCE A-Level Biology',
      'IB Biology',
      'AP Biology',
    ],
    courseCategories: ['HKDSE', 'IGCSE/A-Level', 'IB/AP', 'International'],
    hreflang: 'en-HK',
    phoneFormat: '+852 XXXX XXXX',
    trustBadges: ['HKEAA Aligned', 'Cambridge/Edexcel Prep'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  nz: {
    code: 'nz',
    name: 'New Zealand',
    flag: '🇳🇿',
    currency: { code: 'NZD', symbol: '$', rate: 1.64 },
    pricing: { smallGroup: 65, oneOnOneMin: 115, oneOnOneMax: 195 },
    timezone: 'Pacific/Auckland',
    timezoneAbbr: 'NZST/NZDT',
    examSystems: [
      'NCEA Level 1 Biology',
      'NCEA Level 2 Biology',
      'NCEA Level 3 Biology',
      'IB Biology',
      'Cambridge Biology',
    ],
    courseCategories: ['NCEA L1-3', 'Scholarship', 'IB/Cambridge', 'Uni Prep'],
    hreflang: 'en-NZ',
    phoneFormat: '+64 XX XXX XXXX',
    trustBadges: ['NZQA Aligned', 'UE Standards Prep'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  za: {
    code: 'za',
    name: 'South Africa',
    flag: '🇿🇦',
    currency: { code: 'ZAR', symbol: 'R', rate: 18.2 },
    pricing: { smallGroup: 730, oneOnOneMin: 1270, oneOnOneMax: 2180 },
    timezone: 'Africa/Johannesburg',
    timezoneAbbr: 'SAST',
    examSystems: [
      'NSC/Matric Life Sciences',
      'IEB Life Sciences',
      'Cambridge AS/A-Level Biology',
      'IB Biology',
    ],
    courseCategories: ['Matric/NSC', 'IEB', 'Cambridge', 'IB'],
    hreflang: 'en-ZA',
    phoneFormat: '+27 XX XXX XXXX',
    trustBadges: ['CAPS Aligned', 'IEB Approved'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  sa: {
    code: 'sa',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    currency: { code: 'SAR', symbol: 'SAR ', rate: 3.75 },
    pricing: { smallGroup: 150, oneOnOneMin: 265, oneOnOneMax: 450 },
    timezone: 'Asia/Riyadh',
    timezoneAbbr: 'AST',
    examSystems: [
      'CBSE Biology',
      'IGCSE Biology',
      'A-Level Biology',
      'IB Biology',
      'American Curriculum Biology',
      'NEET Preparation',
    ],
    courseCategories: ['CBSE/ICSE', 'IGCSE/A-Level', 'IB Programme', 'NEET Prep'],
    hreflang: 'en-SA',
    phoneFormat: '+966 XX XXX XXXX',
    trustBadges: ['CBSE Curriculum Expert', 'NEET Specialist'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  bd: {
    code: 'bd',
    name: 'Bangladesh',
    flag: '🇧🇩',
    currency: { code: 'BDT', symbol: '৳', rate: 109.5 },
    pricing: { smallGroup: 4380, oneOnOneMin: 7665, oneOnOneMax: 13140 },
    timezone: 'Asia/Dhaka',
    timezoneAbbr: 'BST',
    examSystems: [
      'HSC Biology',
      'Medical Admission Test',
      'NEET Preparation',
      'Cambridge O-Level Biology',
      'Cambridge A-Level Biology',
      'IB Biology',
    ],
    courseCategories: ['HSC', 'Medical Admission', 'Cambridge', 'NEET Prep'],
    hreflang: 'en-BD',
    phoneFormat: '+880 XXXX XXXXXX',
    trustBadges: ['NCTB Syllabus Aligned', 'Medical Admission Expert'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  lk: {
    code: 'lk',
    name: 'Sri Lanka',
    flag: '🇱🇰',
    currency: { code: 'LKR', symbol: 'Rs ', rate: 323.0 },
    pricing: { smallGroup: 12920, oneOnOneMin: 22610, oneOnOneMax: 38760 },
    timezone: 'Asia/Colombo',
    timezoneAbbr: 'IST',
    examSystems: [
      'GCE A/L Biology',
      'GCE O/L Science',
      'London A-Level Biology',
      'IB Biology',
      'NEET Preparation',
      'Medical Faculty Entrance',
    ],
    courseCategories: ['Local A/L', 'London A-Level', 'IB', 'NEET/Medical'],
    hreflang: 'en-LK',
    phoneFormat: '+94 XX XXX XXXX',
    trustBadges: ['NIE Syllabus Aligned', 'Medical Entrance Expert'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  eg: {
    code: 'eg',
    name: 'Egypt',
    flag: '🇪🇬',
    currency: { code: 'EGP', symbol: 'E£', rate: 30.9 },
    pricing: { smallGroup: 1236, oneOnOneMin: 2163, oneOnOneMax: 3708 },
    timezone: 'Africa/Cairo',
    timezoneAbbr: 'EET',
    examSystems: [
      'Thanaweya Amma Biology',
      'IGCSE Biology',
      'A-Level Biology',
      'IB Biology',
      'American Diploma Biology',
      'NEET Preparation',
    ],
    courseCategories: ['National System', 'IGCSE/A-Level', 'IB/American', 'NEET Prep'],
    hreflang: 'en-EG',
    phoneFormat: '+20 XX XXXX XXXX',
    trustBadges: ['Cambridge Aligned', 'Medical Entry Specialist'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  pk: {
    code: 'pk',
    name: 'Pakistan',
    flag: '🇵🇰',
    currency: { code: 'PKR', symbol: 'Rs ', rate: 278.5 },
    pricing: { smallGroup: 11140, oneOnOneMin: 19495, oneOnOneMax: 33420 },
    timezone: 'Asia/Karachi',
    timezoneAbbr: 'PKT',
    examSystems: [
      'FSc Biology (Pre-Medical)',
      'MDCAT Preparation',
      'Cambridge O-Level Biology',
      'Cambridge A-Level Biology',
      'IB Biology',
      'NEET Preparation',
    ],
    courseCategories: ['FSc Pre-Medical', 'MDCAT', 'Cambridge', 'NEET Prep'],
    hreflang: 'en-PK',
    phoneFormat: '+92 XXX XXXXXXX',
    trustBadges: ['Federal Board Aligned', 'MDCAT Specialist'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  // --- 2026 IB expansion markets ---

  es: {
    code: 'es',
    name: 'Spain',
    flag: '🇪🇸',
    currency: { code: 'EUR', symbol: '€', rate: 0.92 },
    pricing: { smallGroup: 37, oneOnOneMin: 64, oneOnOneMax: 110 },
    timezone: 'Europe/Madrid',
    timezoneAbbr: 'CET/CEST',
    examSystems: [
      'IB Biology (HL & SL)',
      'Bachillerato Biology',
      'EvAU (Selectividad)',
      'IGCSE Biology',
      'A-Level Biology',
    ],
    courseCategories: ['IB Programme', 'Bachillerato', 'EvAU Prep', 'Cambridge'],
    hreflang: 'en-ES',
    phoneFormat: '+34 XXX XXX XXX',
    trustBadges: ['IB World Schools Support', 'Bilingual Programme Aligned'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  cn: {
    code: 'cn',
    name: 'China',
    flag: '🇨🇳',
    currency: { code: 'CNY', symbol: '¥', rate: 7.2 },
    pricing: { smallGroup: 288, oneOnOneMin: 504, oneOnOneMax: 864 },
    timezone: 'Asia/Shanghai',
    timezoneAbbr: 'CST',
    examSystems: [
      'IB Biology (HL & SL)',
      'IGCSE Biology',
      'A-Level Biology',
      'AP Biology',
      'Gaokao Biology (国际班)',
    ],
    courseCategories: ['IB Programme', 'International Division', 'AP', 'IGCSE/A-Level'],
    hreflang: 'en-CN',
    phoneFormat: '+86 XXX XXXX XXXX',
    trustBadges: ['IB World Schools Support', 'International School Specialist'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  de: {
    code: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    currency: { code: 'EUR', symbol: '€', rate: 0.92 },
    pricing: { smallGroup: 37, oneOnOneMin: 64, oneOnOneMax: 110 },
    timezone: 'Europe/Berlin',
    timezoneAbbr: 'CET/CEST',
    examSystems: [
      'IB Biology (HL & SL)',
      'Abitur Biology',
      'German International Abitur (DIAP)',
      'IGCSE Biology',
      'A-Level Biology',
    ],
    courseCategories: ['IB Programme', 'Abitur', 'DIAP', 'Cambridge'],
    hreflang: 'en-DE',
    phoneFormat: '+49 XXX XXXXXXX',
    trustBadges: ['IB World Schools Support', 'International School Specialist'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  ch: {
    code: 'ch',
    name: 'Switzerland',
    flag: '🇨🇭',
    currency: { code: 'CHF', symbol: 'CHF ', rate: 0.86 },
    pricing: { smallGroup: 52, oneOnOneMin: 90, oneOnOneMax: 155 },
    timezone: 'Europe/Zurich',
    timezoneAbbr: 'CET/CEST',
    examSystems: [
      'IB Biology (HL & SL)',
      'Swiss Matura Biology',
      'Bilingual Matura',
      'IGCSE Biology',
      'A-Level Biology',
    ],
    courseCategories: ['IB Programme', 'Swiss Matura', 'Bilingual', 'Cambridge'],
    hreflang: 'en-CH',
    phoneFormat: '+41 XX XXX XX XX',
    trustBadges: ['IB Geneva Roots', 'Ecolint Support'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  nl: {
    code: 'nl',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: { code: 'EUR', symbol: '€', rate: 0.92 },
    pricing: { smallGroup: 37, oneOnOneMin: 64, oneOnOneMax: 110 },
    timezone: 'Europe/Amsterdam',
    timezoneAbbr: 'CET/CEST',
    examSystems: [
      'IB Biology (HL & SL)',
      'VWO Biology',
      'European Baccalaureate',
      'IGCSE Biology',
      'A-Level Biology',
    ],
    courseCategories: ['IB Programme', 'VWO', 'European Baccalaureate', 'Cambridge'],
    hreflang: 'en-NL',
    phoneFormat: '+31 XX XXX XXXX',
    trustBadges: ['IB World Schools Support', 'International School Specialist'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  th: {
    code: 'th',
    name: 'Thailand',
    flag: '🇹🇭',
    currency: { code: 'THB', symbol: '฿', rate: 34.5 },
    pricing: { smallGroup: 1380, oneOnOneMin: 2415, oneOnOneMax: 4140 },
    timezone: 'Asia/Bangkok',
    timezoneAbbr: 'ICT',
    examSystems: [
      'IB Biology (HL & SL)',
      'IGCSE Biology',
      'A-Level Biology',
      'AP Biology',
      'Mattayom Biology (English Programme)',
    ],
    courseCategories: ['IB Programme', 'IGCSE/A-Level', 'AP', 'EP/IP Schools'],
    hreflang: 'en-TH',
    phoneFormat: '+66 XX XXX XXXX',
    trustBadges: ['IB World Schools Support', 'NIST/ISB Alumni Network'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  my: {
    code: 'my',
    name: 'Malaysia',
    flag: '🇲🇾',
    currency: { code: 'MYR', symbol: 'RM ', rate: 4.5 },
    pricing: { smallGroup: 180, oneOnOneMin: 315, oneOnOneMax: 540 },
    timezone: 'Asia/Kuala_Lumpur',
    timezoneAbbr: 'MYT',
    examSystems: [
      'IB Biology (HL & SL)',
      'IGCSE Biology',
      'A-Level Biology',
      'SPM Biology',
      'AUSMAT / CIMP / Ontario',
    ],
    courseCategories: ['IB Programme', 'IGCSE/A-Level', 'SPM', 'Pre-University'],
    hreflang: 'en-MY',
    phoneFormat: '+60 XX XXX XXXX',
    trustBadges: ['IB World Schools Support', 'KL International School Network'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },

  mx: {
    code: 'mx',
    name: 'Mexico',
    flag: '🇲🇽',
    currency: { code: 'MXN', symbol: 'MX$', rate: 17.5 },
    pricing: { smallGroup: 700, oneOnOneMin: 1225, oneOnOneMax: 2100 },
    timezone: 'America/Mexico_City',
    timezoneAbbr: 'CST/CDT',
    examSystems: [
      'IB Biology (HL & SL)',
      'Bachillerato Biology (CCH/ENP)',
      'IGCSE Biology',
      'AP Biology',
      'SAT Biology',
    ],
    courseCategories: ['IB Programme', 'Bachillerato', 'AP', 'Pre-Med'],
    hreflang: 'en-MX',
    phoneFormat: '+52 XX XXXX XXXX',
    trustBadges: ['IB World Schools Support', 'International School Specialist'],
    localTerms: { tutor: 'tutor', class: 'clase' },
  },

  jp: {
    code: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    currency: { code: 'JPY', symbol: '¥', rate: 150 },
    pricing: { smallGroup: 6000, oneOnOneMin: 10500, oneOnOneMax: 18000 },
    timezone: 'Asia/Tokyo',
    timezoneAbbr: 'JST',
    examSystems: [
      'IB Biology (HL & SL)',
      'IGCSE Biology',
      'A-Level Biology',
      'AP Biology',
      'Japanese National Curriculum Biology',
    ],
    courseCategories: ['IB Programme', 'IGCSE/A-Level', 'AP', 'International Schools'],
    hreflang: 'en-JP',
    phoneFormat: '+81 XX XXXX XXXX',
    trustBadges: ['IB World Schools Support', 'Yokohama/Tokyo International Schools'],
    localTerms: { tutor: 'tutor', class: 'lesson' },
  },

  kr: {
    code: 'kr',
    name: 'South Korea',
    flag: '🇰🇷',
    currency: { code: 'KRW', symbol: '₩', rate: 1380 },
    pricing: { smallGroup: 55200, oneOnOneMin: 96600, oneOnOneMax: 165600 },
    timezone: 'Asia/Seoul',
    timezoneAbbr: 'KST',
    examSystems: [
      'IB Biology (HL & SL)',
      'IGCSE Biology',
      'A-Level Biology',
      'AP Biology',
      'SAT Biology',
    ],
    courseCategories: ['IB Programme', 'IGCSE/A-Level', 'AP', 'International Schools'],
    hreflang: 'en-KR',
    phoneFormat: '+82 XX XXXX XXXX',
    trustBadges: ['IB World Schools Support', 'Seoul International Schools Network'],
    localTerms: { tutor: 'tutor', class: 'class' },
  },
}

/**
 * Get country configuration by code
 */
export function getCountryConfig(code: string): CountryConfig | null {
  const normalizedCode = code.toLowerCase() as CountryCode
  return COUNTRIES[normalizedCode] || null
}

/**
 * Check if a country code is supported
 */
export function isValidCountryCode(code: string): code is CountryCode {
  return SUPPORTED_COUNTRIES.includes(code.toLowerCase() as CountryCode)
}

/**
 * Get all country configs as an array
 */
export function getAllCountries(): CountryConfig[] {
  return Object.values(COUNTRIES)
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currency: CountryCurrency): string {
  // Handle currencies where symbol comes after (none currently, but future-proof)
  return `${currency.symbol}${amount}`
}

/**
 * Format price range (for 1-on-1 pricing)
 */
export function formatPriceRange(min: number, max: number, currency: CountryCurrency): string {
  return `${currency.symbol}${min} - ${currency.symbol}${max}`
}

/**
 * Get countries grouped by region for display
 */
export function getCountriesByRegion(): Record<string, CountryConfig[]> {
  return {
    'North America': [COUNTRIES.us, COUNTRIES.ca, COUNTRIES.mx],
    Europe: [COUNTRIES.uk, COUNTRIES.ie, COUNTRIES.es, COUNTRIES.de, COUNTRIES.ch, COUNTRIES.nl],
    'Asia Pacific': [
      COUNTRIES.au,
      COUNTRIES.sg,
      COUNTRIES.hk,
      COUNTRIES.nz,
      COUNTRIES.cn,
      COUNTRIES.th,
      COUNTRIES.my,
      COUNTRIES.jp,
      COUNTRIES.kr,
    ],
    'South Asia': [COUNTRIES.bd, COUNTRIES.lk, COUNTRIES.pk],
    'Middle East & Africa': [COUNTRIES.ae, COUNTRIES.sa, COUNTRIES.eg, COUNTRIES.za],
  }
}
