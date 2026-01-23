import { headers } from 'next/headers'

export const SUPPORTED_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'AED', 'SGD'] as const
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

export interface CurrencyInfo {
  code: SupportedCurrency
  symbol: string
  name: string
  locale: string
}

export const CURRENCY_CONFIG: Record<SupportedCurrency, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
}

const COUNTRY_CURRENCY_MAP: Record<string, SupportedCurrency> = {
  IN: 'INR',
  US: 'USD',
  GB: 'GBP',
  UK: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  IE: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  AU: 'AUD',
  CA: 'CAD',
  AE: 'AED',
  SG: 'SGD',
}

export async function detectCurrencyFromRequest(): Promise<SupportedCurrency> {
  try {
    const headersList = await headers()
    const country =
      headersList.get('cf-ipcountry') ||
      headersList.get('x-vercel-ip-country') ||
      headersList.get('x-country-code')

    if (country && COUNTRY_CURRENCY_MAP[country.toUpperCase()]) {
      return COUNTRY_CURRENCY_MAP[country.toUpperCase()]
    }

    return 'INR'
  } catch {
    return 'INR'
  }
}

export function detectCurrencyFromCountry(countryCode: string | null): SupportedCurrency {
  if (!countryCode) return 'INR'
  return COUNTRY_CURRENCY_MAP[countryCode.toUpperCase()] || 'USD'
}

export function formatCurrency(amount: number, currency: SupportedCurrency): string {
  const config = CURRENCY_CONFIG[currency]
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyWithSymbol(amount: number, currency: SupportedCurrency): string {
  const config = CURRENCY_CONFIG[currency]
  const formatted = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
  return `${config.symbol}${formatted}`
}

export function getCurrencyInfo(currency: SupportedCurrency): CurrencyInfo {
  return CURRENCY_CONFIG[currency]
}

export function getAllCurrencies(): CurrencyInfo[] {
  return SUPPORTED_CURRENCIES.map((code) => CURRENCY_CONFIG[code])
}

export function isValidCurrency(currency: string): currency is SupportedCurrency {
  return SUPPORTED_CURRENCIES.includes(currency.toUpperCase() as SupportedCurrency)
}
