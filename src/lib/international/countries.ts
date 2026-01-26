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

// All 10 supported countries
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
    'North America': [COUNTRIES.us, COUNTRIES.ca],
    Europe: [COUNTRIES.uk, COUNTRIES.ie],
    'Asia Pacific': [COUNTRIES.au, COUNTRIES.sg, COUNTRIES.hk, COUNTRIES.nz],
    'Middle East & Africa': [COUNTRIES.ae, COUNTRIES.za],
  }
}
