'use client'

import { useState, useEffect, useCallback } from 'react'

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'AED' | 'SGD'

export interface CurrencyInfo {
  code: SupportedCurrency
  symbol: string
  name: string
  locale: string
}

const CURRENCY_CONFIG: Record<SupportedCurrency, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', locale: 'ar-AE' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
}

const STORAGE_KEY = 'preferred_currency'

interface UseCurrencyReturn {
  currency: SupportedCurrency
  currencyInfo: CurrencyInfo
  setCurrency: (currency: SupportedCurrency) => void
  formatPrice: (amount: number) => string
  formatPriceWithSymbol: (amount: number) => string
  isLoading: boolean
  currencies: CurrencyInfo[]
}

export function useCurrency(): UseCurrencyReturn {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('INR')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedCurrency | null
    if (stored && CURRENCY_CONFIG[stored]) {
      setCurrencyState(stored)
      setIsLoading(false)
      return
    }

    fetch('/api/payments/currency')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.detected?.currency) {
          setCurrencyState(data.detected.currency)
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  const setCurrency = useCallback((newCurrency: SupportedCurrency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem(STORAGE_KEY, newCurrency)
  }, [])

  const formatPrice = useCallback(
    (amount: number) => {
      const config = CURRENCY_CONFIG[currency]
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    },
    [currency]
  )

  const formatPriceWithSymbol = useCallback(
    (amount: number) => {
      const config = CURRENCY_CONFIG[currency]
      const formatted = new Intl.NumberFormat(config.locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
      return `${config.symbol}${formatted}`
    },
    [currency]
  )

  return {
    currency,
    currencyInfo: CURRENCY_CONFIG[currency],
    setCurrency,
    formatPrice,
    formatPriceWithSymbol,
    isLoading,
    currencies: Object.values(CURRENCY_CONFIG),
  }
}
