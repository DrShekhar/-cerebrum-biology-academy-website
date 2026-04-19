/**
 * Canonical IB Biology pricing — single source of truth for every
 * IB Biology page that shows pricing.
 *
 * Three clearly-differentiated products. USD is the baseline; all other
 * currencies derive from the reference rates below so numbers stay
 * consistent across pages.
 *
 * City-level pages (/ib-biology/[city]) still publish their own
 * hourly ranges because those reflect local market reality (e.g.,
 * Dubai in-person rates differ from London online rates). This matrix
 * is the *canonical* starting point — city pages are the local fit.
 */

export type PricingProductId = 'complete-annual' | 'elite-1on1' | 'group-batch'

export interface PricingProduct {
  id: PricingProductId
  name: string
  subtitle: string
  priceUSD: number
  unit: 'hr' | 'year'
  unitLabel: string
  description: string
  features: string[]
  highlight?: boolean
  schemaUnitText: 'HOUR' | 'ANN'
}

export const ibPricingProducts: PricingProduct[] = [
  {
    id: 'complete-annual',
    name: 'Complete IB Biology Programme',
    subtitle: 'Recommended · 2-year track',
    priceUSD: 6000,
    unit: 'year',
    unitLabel: '/ year',
    description:
      '150+ hours of live instruction across DP1 and DP2, complete HL + SL coverage, IA guidance from topic to submission, past-paper bank, and 24/7 WhatsApp support.',
    features: [
      'HL & SL complete coverage',
      '150+ hours of live classes',
      'Small batch (4–8 students)',
      'IA guidance included',
      'Past paper bank access',
      'University guidance bonus',
    ],
    highlight: true,
    schemaUnitText: 'ANN',
  },
  {
    id: 'elite-1on1',
    name: '1:1 Elite Tutoring',
    subtitle: 'Examiner-led, fully customised',
    priceUSD: 75,
    unit: 'hr',
    unitLabel: '/ hour',
    description:
      'One-on-one with an IB examiner or qualified teacher. Best for targeted weaknesses, IA moderation-level feedback, or a pre-exam crash course.',
    features: [
      'One-on-one with IB examiner',
      'Fully customised curriculum',
      'Flexible scheduling (all timezones)',
      'IA & EE dedicated support',
      'WhatsApp access to tutor',
      'Session recordings',
    ],
    schemaUnitText: 'HOUR',
  },
  {
    id: 'group-batch',
    name: 'Group Batch',
    subtitle: 'Global online cohort',
    priceUSD: 40,
    unit: 'hr',
    unitLabel: '/ hour',
    description:
      'Small groups of 4–8 students on a fixed weekly schedule. The most affordable route to the same core curriculum, with peer discussion built in.',
    features: [
      '4–8 students per batch',
      'Fixed weekly schedule',
      'Interactive discussions',
      'IA guidance sessions',
      'Study materials included',
      'Recorded sessions',
    ],
    schemaUnitText: 'HOUR',
  },
]

/**
 * Reference rates (USD = 1.0) used for display equivalents. These are
 * not live rates — they are display rounding guides. Updated quarterly.
 */
export interface CurrencyInfo {
  code: string
  symbol: string
  rate: number // Amount of local currency per 1 USD
  region: string
  regionalHref: string
}

export const displayCurrencies: CurrencyInfo[] = [
  { code: 'INR', symbol: '₹', rate: 85, region: 'India', regionalHref: '/ib-biology/delhi' },
  { code: 'GBP', symbol: '£', rate: 0.79, region: 'UK', regionalHref: '/ib-biology/london' },
  { code: 'EUR', symbol: '€', rate: 0.92, region: 'EU', regionalHref: '/ib-biology/amsterdam' },
  { code: 'AED', symbol: 'AED ', rate: 3.67, region: 'UAE', regionalHref: '/ib-biology/dubai' },
  {
    code: 'SGD',
    symbol: 'S$',
    rate: 1.34,
    region: 'Singapore',
    regionalHref: '/ib-biology/singapore',
  },
  {
    code: 'HKD',
    symbol: 'HK$',
    rate: 7.79,
    region: 'Hong Kong',
    regionalHref: '/ib-biology/hong-kong',
  },
  {
    code: 'CAD',
    symbol: 'CA$',
    rate: 1.36,
    region: 'Canada',
    regionalHref: '/ib-biology/toronto',
  },
  {
    code: 'AUD',
    symbol: 'A$',
    rate: 1.54,
    region: 'Australia',
    regionalHref: '/ib-biology/sydney',
  },
  {
    code: 'CHF',
    symbol: 'CHF ',
    rate: 0.86,
    region: 'Switzerland',
    regionalHref: '/ib-biology/zurich',
  },
]

/**
 * Convert a USD amount into a display string for the given currency,
 * rounded to sensible local units (nearest ₹100 for INR, nearest £1
 * otherwise).
 */
export function convertForDisplay(amountUSD: number, currency: CurrencyInfo): string {
  const raw = amountUSD * currency.rate
  let rounded: number
  if (currency.code === 'INR') {
    // Round to nearest 100 for readability (and match actual INR pricing).
    rounded = Math.round(raw / 100) * 100
    return `${currency.symbol}${rounded.toLocaleString('en-IN')}`
  }
  if (currency.code === 'JPY' || currency.code === 'KRW' || currency.code === 'THB') {
    rounded = Math.round(raw / 10) * 10
  } else {
    rounded = Math.round(raw)
  }
  return `${currency.symbol}${rounded.toLocaleString()}`
}

/** JSON-LD offers[] array for Course schema — use on the 3 main IB pages. */
export function pricingAsCourseOffers(pageUrl: string) {
  return ibPricingProducts.map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: p.priceUSD,
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: p.priceUSD,
      priceCurrency: 'USD',
      unitText: p.schemaUnitText,
    },
    availability: 'https://schema.org/InStock',
    url: `${pageUrl}#pricing`,
  }))
}

/**
 * Map a 2-letter country code (from `x-vercel-ip-country`) to the
 * currency we should promote in the pricing matrix. Countries not
 * explicitly listed fall through to USD (no geo emphasis).
 *
 * Eurozone members resolve to EUR so a single shared card lights up
 * across DE / NL / ES / FR / IT / BE / AT / IE / PT / FI / GR / LU.
 */
const countryToCurrency: Record<string, string> = {
  // South Asia
  IN: 'INR',
  // UK
  GB: 'GBP',
  UK: 'GBP',
  // Eurozone
  DE: 'EUR',
  NL: 'EUR',
  ES: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  IE: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  LU: 'EUR',
  // Middle East
  AE: 'AED',
  // Asia-Pacific
  SG: 'SGD',
  HK: 'HKD',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'AUD',
  // Alpine
  CH: 'CHF',
  LI: 'CHF',
}

export function currencyForCountry(countryCode: string | null | undefined): CurrencyInfo | null {
  if (!countryCode) return null
  const code = countryToCurrency[countryCode.toUpperCase()]
  if (!code) return null
  return displayCurrencies.find((c) => c.code === code) ?? null
}

/**
 * Friendly region label for a given 2-letter country code. Returns the
 * detected country's common English name if we know it, else the raw
 * country code uppercased.
 */
const countryNames: Record<string, string> = {
  IN: 'India',
  GB: 'United Kingdom',
  UK: 'United Kingdom',
  US: 'United States',
  DE: 'Germany',
  NL: 'Netherlands',
  ES: 'Spain',
  FR: 'France',
  IT: 'Italy',
  BE: 'Belgium',
  AT: 'Austria',
  IE: 'Ireland',
  PT: 'Portugal',
  AE: 'United Arab Emirates',
  SG: 'Singapore',
  HK: 'Hong Kong',
  CA: 'Canada',
  AU: 'Australia',
  NZ: 'New Zealand',
  CH: 'Switzerland',
  LI: 'Liechtenstein',
  TH: 'Thailand',
  MY: 'Malaysia',
  JP: 'Japan',
  KR: 'South Korea',
  CN: 'China',
  MX: 'Mexico',
  ZA: 'South Africa',
  SA: 'Saudi Arabia',
  BD: 'Bangladesh',
  LK: 'Sri Lanka',
  EG: 'Egypt',
  PK: 'Pakistan',
}

export function countryName(countryCode: string | null | undefined): string | null {
  if (!countryCode) return null
  const upper = countryCode.toUpperCase()
  return countryNames[upper] ?? upper
}
