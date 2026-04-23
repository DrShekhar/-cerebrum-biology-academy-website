/**
 * Shared currency reference data for geo-aware pricing across
 * IB Biology, Olympiads, NEET landing pages, and future verticals.
 *
 * Rates are rounded display rates, not live FX. Updated quarterly.
 * Match production pricing carefully — incorrect conversions create
 * customer confusion + chargeback risk.
 */

export interface CurrencyInfo {
  code: string
  symbol: string
  /** Local currency units per 1 USD. */
  rate: number
  region: string
  /** Destination page for the region's exact pricing. */
  regionalHref?: string
}

export const sharedCurrencies: CurrencyInfo[] = [
  { code: 'INR', symbol: '₹', rate: 85, region: 'India', regionalHref: '/biology-classes' },
  { code: 'USD', symbol: '$', rate: 1.0, region: 'USA' },
  { code: 'GBP', symbol: '£', rate: 0.79, region: 'UK' },
  { code: 'EUR', symbol: '€', rate: 0.92, region: 'Eurozone' },
  { code: 'AED', symbol: 'AED ', rate: 3.67, region: 'UAE' },
  { code: 'SGD', symbol: 'S$', rate: 1.34, region: 'Singapore' },
  { code: 'HKD', symbol: 'HK$', rate: 7.79, region: 'Hong Kong' },
  { code: 'CAD', symbol: 'CA$', rate: 1.36, region: 'Canada' },
  { code: 'AUD', symbol: 'A$', rate: 1.54, region: 'Australia' },
  { code: 'NZD', symbol: 'NZ$', rate: 1.68, region: 'New Zealand' },
  { code: 'CHF', symbol: 'CHF ', rate: 0.86, region: 'Switzerland' },
  { code: 'CNY', symbol: '¥', rate: 7.2, region: 'China' },
  { code: 'KRW', symbol: '₩', rate: 1380, region: 'South Korea' },
  { code: 'JPY', symbol: '¥', rate: 150, region: 'Japan' },
  { code: 'THB', symbol: '฿', rate: 34.5, region: 'Thailand' },
  { code: 'MYR', symbol: 'RM ', rate: 4.5, region: 'Malaysia' },
  { code: 'ZAR', symbol: 'R', rate: 18.2, region: 'South Africa' },
]

/**
 * Round an amount for comfortable display in the given currency.
 * INR rounds to nearest 100, JPY/KRW/THB to nearest 10, others to
 * nearest whole unit.
 */
export function convertForDisplay(amountUSD: number, currency: CurrencyInfo): string {
  const raw = amountUSD * currency.rate
  let rounded: number
  if (currency.code === 'INR') {
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

/**
 * ISO-2 country code → preferred display currency. Eurozone countries
 * collapse to EUR; fallback is USD.
 */
const countryToCurrencyCode: Record<string, string> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  UK: 'GBP',
  DE: 'EUR',
  NL: 'EUR',
  ES: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  IE: 'EUR',
  PT: 'EUR',
  AE: 'AED',
  SG: 'SGD',
  HK: 'HKD',
  CA: 'CAD',
  AU: 'AUD',
  NZ: 'NZD',
  CH: 'CHF',
  CN: 'CNY',
  KR: 'KRW',
  JP: 'JPY',
  TH: 'THB',
  MY: 'MYR',
  ZA: 'ZAR',
}

export function currencyForCountry(countryCode: string | null | undefined): CurrencyInfo | null {
  if (!countryCode) return null
  const code = countryToCurrencyCode[countryCode.toUpperCase()]
  if (!code) return null
  return sharedCurrencies.find((c) => c.code === code) ?? null
}

const countryNames: Record<string, string> = {
  IN: 'India',
  US: 'United States',
  GB: 'United Kingdom',
  UK: 'United Kingdom',
  DE: 'Germany',
  NL: 'Netherlands',
  ES: 'Spain',
  FR: 'France',
  IT: 'Italy',
  IE: 'Ireland',
  AE: 'United Arab Emirates',
  SG: 'Singapore',
  HK: 'Hong Kong',
  CA: 'Canada',
  AU: 'Australia',
  NZ: 'New Zealand',
  CH: 'Switzerland',
  CN: 'China',
  KR: 'South Korea',
  JP: 'Japan',
  TH: 'Thailand',
  MY: 'Malaysia',
  ZA: 'South Africa',
  NG: 'Nigeria',
  KE: 'Kenya',
  PH: 'Philippines',
}

export function countryName(countryCode: string | null | undefined): string | null {
  if (!countryCode) return null
  const upper = countryCode.toUpperCase()
  return countryNames[upper] ?? upper
}
