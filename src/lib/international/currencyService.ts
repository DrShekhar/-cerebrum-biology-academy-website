'use client'

export type SupportedCurrency = 'INR' | 'USD' | 'GBP' | 'AUD' | 'CAD' | 'EUR' | 'SGD' | 'AED'

export interface CurrencyInfo {
  code: SupportedCurrency
  symbol: string
  name: string
  locale: string
  exchangeRate?: number
  lastUpdated?: string
}

export interface PriceData {
  basePrice: number
  currency: SupportedCurrency
  localizedPrice: number
  formattedPrice: string
  savings?: {
    amount: number
    percentage: number
    formatted: string
  }
}

export interface CountryToCurrencyMap {
  [countryCode: string]: SupportedCurrency
}

class CurrencyService {
  private static EXCHANGE_RATES_CACHE_KEY = 'cerebrum_exchange_rates'
  private static RATES_CACHE_DURATION = 4 * 60 * 60 * 1000 // 4 hours
  private static EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/INR'

  static readonly CURRENCIES: Record<SupportedCurrency, CurrencyInfo> = {
    INR: {
      code: 'INR',
      symbol: '₹',
      name: 'Indian Rupee',
      locale: 'en-IN',
      exchangeRate: 1,
    },
    USD: {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
      locale: 'en-US',
    },
    GBP: {
      code: 'GBP',
      symbol: '£',
      name: 'British Pound',
      locale: 'en-GB',
    },
    AUD: {
      code: 'AUD',
      symbol: 'A$',
      name: 'Australian Dollar',
      locale: 'en-AU',
    },
    CAD: {
      code: 'CAD',
      symbol: 'C$',
      name: 'Canadian Dollar',
      locale: 'en-CA',
    },
    EUR: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro',
      locale: 'en-DE',
    },
    SGD: {
      code: 'SGD',
      symbol: 'S$',
      name: 'Singapore Dollar',
      locale: 'en-SG',
    },
    AED: {
      code: 'AED',
      symbol: 'د.إ',
      name: 'UAE Dirham',
      locale: 'ar-AE',
    },
  }

  static readonly COUNTRY_TO_CURRENCY: CountryToCurrencyMap = {
    // Asia
    IN: 'INR',
    SG: 'SGD',
    AE: 'AED',

    // North America
    US: 'USD',
    CA: 'CAD',

    // Europe
    GB: 'GBP',
    UK: 'GBP',
    DE: 'EUR',
    FR: 'EUR',
    IT: 'EUR',
    ES: 'EUR',
    NL: 'EUR',

    // Oceania
    AU: 'AUD',
    NZ: 'AUD', // Use AUD for New Zealand

    // Middle East
    QA: 'AED', // Use AED for Qatar
    KW: 'AED', // Use AED for Kuwait
    SA: 'AED', // Use AED for Saudi Arabia

    // Default fallback
    DEFAULT: 'USD',
  }

  // Base prices in INR for different course types
  static readonly BASE_PRICES = {
    foundation: 35000, // Foundation course
    class11: 45000, // Class 11 course
    class12: 50000, // Class 12 course
    dropper: 60000, // Dropper program
    premium: 85000, // Premium 1-on-1
    crash: 25000, // Crash course
    test_series: 15000, // Test series only
  }

  static async getExchangeRates(): Promise<Record<string, number>> {
    try {
      // Check cache first
      const cached = this.getCachedRates()
      if (cached && this.isCacheValid(cached)) {
        return cached.rates
      }

      // Fetch fresh rates
      const response = await fetch(this.EXCHANGE_API_URL)
      const data = await response.json()

      if (data.rates) {
        this.cacheRates(data.rates)
        return data.rates
      }

      throw new Error('Invalid response from exchange API')
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error)

      // Return fallback rates if API fails
      return this.getFallbackRates()
    }
  }

  private static getCachedRates(): { rates: Record<string, number>; timestamp: number } | null {
    try {
      if (typeof window === 'undefined') return null

      const cached = localStorage.getItem(this.EXCHANGE_RATES_CACHE_KEY)
      return cached ? JSON.parse(cached) : null
    } catch {
      return null
    }
  }

  private static cacheRates(rates: Record<string, number>): void {
    try {
      if (typeof window === 'undefined') return

      const cacheData = {
        rates,
        timestamp: Date.now(),
      }
      localStorage.setItem(this.EXCHANGE_RATES_CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.error('Failed to cache exchange rates:', error)
    }
  }

  private static isCacheValid(cached: { timestamp: number }): boolean {
    return Date.now() - cached.timestamp < this.RATES_CACHE_DURATION
  }

  private static getFallbackRates(): Record<string, number> {
    // Fallback rates updated as of Dec 2024
    return {
      USD: 0.012,
      GBP: 0.0095,
      AUD: 0.018,
      CAD: 0.016,
      EUR: 0.011,
      SGD: 0.016,
      AED: 0.044,
    }
  }

  static getCurrencyByCountry(countryCode: string): SupportedCurrency {
    return this.COUNTRY_TO_CURRENCY[countryCode?.toUpperCase()] || this.COUNTRY_TO_CURRENCY.DEFAULT
  }

  static async convertPrice(
    basePrice: number,
    fromCurrency: SupportedCurrency = 'INR',
    toCurrency: SupportedCurrency
  ): Promise<number> {
    if (fromCurrency === toCurrency) return basePrice

    const rates = await this.getExchangeRates()

    // Convert to INR first if not already
    let inrPrice = basePrice
    if (fromCurrency !== 'INR') {
      const fromRate = rates[fromCurrency]
      if (!fromRate) throw new Error(`Exchange rate not found for ${fromCurrency}`)
      inrPrice = basePrice / fromRate
    }

    // Convert from INR to target currency
    if (toCurrency === 'INR') return inrPrice

    const toRate = rates[toCurrency]
    if (!toRate) throw new Error(`Exchange rate not found for ${toCurrency}`)

    return inrPrice * toRate
  }

  static formatPrice(amount: number, currency: SupportedCurrency): string {
    const currencyInfo = this.CURRENCIES[currency]

    try {
      return new Intl.NumberFormat(currencyInfo.locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: currency === 'INR' ? 0 : 2,
        maximumFractionDigits: currency === 'INR' ? 0 : 2,
      }).format(amount)
    } catch (error) {
      // Fallback formatting
      return `${currencyInfo.symbol}${amount.toFixed(currency === 'INR' ? 0 : 2)}`
    }
  }

  static async getPriceData(
    courseType: keyof typeof CurrencyService.BASE_PRICES,
    targetCurrency: SupportedCurrency,
    applyDiscount: boolean = false
  ): Promise<PriceData> {
    const basePrice = this.BASE_PRICES[courseType]
    const localizedPrice = await this.convertPrice(basePrice, 'INR', targetCurrency)

    let finalPrice = localizedPrice
    let savings = undefined

    if (applyDiscount) {
      const discountPercentage = this.getRegionalDiscount(targetCurrency)
      const discountAmount = localizedPrice * (discountPercentage / 100)
      finalPrice = localizedPrice - discountAmount

      savings = {
        amount: discountAmount,
        percentage: discountPercentage,
        formatted: this.formatPrice(discountAmount, targetCurrency),
      }
    }

    return {
      basePrice,
      currency: targetCurrency,
      localizedPrice: finalPrice,
      formattedPrice: this.formatPrice(finalPrice, targetCurrency),
      savings,
    }
  }

  private static getRegionalDiscount(currency: SupportedCurrency): number {
    // Regional discount percentages
    const discounts: Record<SupportedCurrency, number> = {
      INR: 15, // Indian students
      USD: 10, // US students
      GBP: 12, // UK students
      AUD: 10, // Australian students
      CAD: 10, // Canadian students
      EUR: 12, // European students
      SGD: 8, // Singapore students
      AED: 15, // UAE students (large Indian population)
    }

    return discounts[currency] || 10
  }

  static getRegionalPricingMessage(currency: SupportedCurrency): string {
    const messages: Record<SupportedCurrency, string> = {
      INR: 'Special pricing for Indian students with EMI options starting ₹2,500/month',
      USD: 'International student pricing with flexible payment plans',
      GBP: 'UK pricing includes 24/7 timezone support and local payment methods',
      AUD: 'Australian student discount with AEDT timezone classes available',
      CAD: 'Canadian pricing with CAD payment options and EST/PST friendly timings',
      EUR: 'European pricing with SEPA payments and CET timezone support',
      SGD: 'Singapore pricing for NEET aspirants with SGT timezone classes',
      AED: 'Gulf region pricing with weekend offline options in Dubai/Abu Dhabi',
    }

    return messages[currency] || 'International pricing with global support'
  }

  static getCurrencySelector(): { code: SupportedCurrency; name: string; symbol: string }[] {
    return Object.values(this.CURRENCIES).map((currency) => ({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
    }))
  }

  static isRTLCurrency(currency: SupportedCurrency): boolean {
    return currency === 'AED'
  }

  static getPaymentMethods(currency: SupportedCurrency): string[] {
    const methods: Record<SupportedCurrency, string[]> = {
      INR: ['Razorpay', 'UPI', 'Net Banking', 'Credit/Debit Card', 'EMI'],
      USD: ['Stripe', 'PayPal', 'Credit/Debit Card', 'Bank Transfer'],
      GBP: ['Stripe', 'PayPal', 'Credit/Debit Card', 'SEPA', 'Bank Transfer'],
      AUD: ['Stripe', 'PayPal', 'Credit/Debit Card', 'Bank Transfer'],
      CAD: ['Stripe', 'PayPal', 'Credit/Debit Card', 'Interac'],
      EUR: ['Stripe', 'PayPal', 'SEPA', 'Credit/Debit Card', 'Bank Transfer'],
      SGD: ['Stripe', 'PayPal', 'Credit/Debit Card', 'Bank Transfer'],
      AED: ['Stripe', 'PayPal', 'Credit/Debit Card', 'Bank Transfer'],
    }

    return methods[currency] || ['Stripe', 'PayPal', 'Credit/Debit Card']
  }
}

export { CurrencyService }
