'use client'

import { useEffect, useState } from 'react'

/**
 * Geo-scoped price display.
 *
 * - Indian visitors (or unknown country): INR only ("₹48,000")
 * - Non-IN visitors: local currency only ("$580")
 *
 * Each audience sees one number in their currency. Showing both was
 * cluttering the non-IN view and US visitors were ignoring the local
 * anchor when INR sat next to it. The INR figure is hidden entirely
 * for foreign visitors so they don't double-take on a rupee number
 * they don't intuit.
 *
 * Geo via the existing /api/geo/country endpoint. Static FX rates are
 * deliberately conservative (we round local-currency UP slightly so we
 * never undersell vs. real bank-transfer rate).
 */

interface CurrencyConfig {
  code: string
  symbol: string
  // INR units per 1 unit of this currency (so rate=83 means 1 USD = ₹83).
  // Keep this slightly conservative — round UP local price for the
  // visitor — so they never see a number lower than what they'll pay.
  rate: number
}

const COUNTRY_TO_CURRENCY: Record<string, CurrencyConfig> = {
  US: { code: 'USD', symbol: '$', rate: 83 },
  CA: { code: 'CAD', symbol: 'C$', rate: 60 },
  GB: { code: 'GBP', symbol: '£', rate: 105 },
  UK: { code: 'GBP', symbol: '£', rate: 105 },
  IE: { code: 'EUR', symbol: '€', rate: 90 },
  AU: { code: 'AUD', symbol: 'A$', rate: 55 },
  NZ: { code: 'NZD', symbol: 'NZ$', rate: 50 },
  AE: { code: 'AED', symbol: 'AED ', rate: 22.5 },
  SA: { code: 'SAR', symbol: 'SAR ', rate: 22 },
  SG: { code: 'SGD', symbol: 'S$', rate: 62 },
  MY: { code: 'MYR', symbol: 'RM ', rate: 17.5 },
  DE: { code: 'EUR', symbol: '€', rate: 90 },
  FR: { code: 'EUR', symbol: '€', rate: 90 },
  IT: { code: 'EUR', symbol: '€', rate: 90 },
  ES: { code: 'EUR', symbol: '€', rate: 90 },
  NL: { code: 'EUR', symbol: '€', rate: 90 },
  BE: { code: 'EUR', symbol: '€', rate: 90 },
  AT: { code: 'EUR', symbol: '€', rate: 90 },
  PT: { code: 'EUR', symbol: '€', rate: 90 },
  FI: { code: 'EUR', symbol: '€', rate: 90 },
  GR: { code: 'EUR', symbol: '€', rate: 90 },
}

interface ForeignAmount {
  amount: number
  symbol: string
  code: string
}

/**
 * Hook returning the visitor's foreign-currency equivalent of an INR
 * amount, or null if the visitor is in IN / has no detectable country.
 * Useful when the surrounding markup is bespoke and you can't drop in
 * the <DualCurrencyPrice> component directly (e.g., hero badges, complex
 * pricing cards).
 */
export function useForeignPrice(inrAmount: number): ForeignAmount | null {
  const [foreign, setForeign] = useState<ForeignAmount | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((r) => r.json())
      .then((data: { country: string | null }) => {
        if (cancelled) return
        const c = data.country?.toUpperCase() ?? null
        if (!c || c === 'IN') return
        const fx = COUNTRY_TO_CURRENCY[c]
        if (!fx) return
        // Round UP to nearest 5 for clean display ($582 → $585).
        // Conservative direction so we don't undersell.
        const local = Math.ceil(inrAmount / fx.rate / 5) * 5
        setForeign({ amount: local, symbol: fx.symbol, code: fx.code })
      })
      .catch(() => {
        // Silent — INR-only is a safe fallback.
      })
    return () => {
      cancelled = true
    }
  }, [inrAmount])

  return foreign
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

interface DualCurrencyPriceProps {
  inr: number
  /** e.g., "/year", "/mo", "" */
  suffix?: string
  className?: string
  /**
   * @deprecated We no longer render a secondary line — kept on the props
   * type so existing call-sites compile. Will be removed in a follow-up.
   */
  secondaryClassName?: string
  /**
   * @deprecated The single-line vs. stacked distinction was only relevant
   * when we showed both currencies. Kept on the props type so existing
   * call-sites compile. No-op now.
   */
  inline?: boolean
}

/**
 * Drop-in price display. INR-only for Indian visitors; local-currency
 * only for everyone else. Use `useForeignPrice()` for bespoke layouts.
 */
export function DualCurrencyPrice({ inr, suffix = '', className = '' }: DualCurrencyPriceProps) {
  const foreign = useForeignPrice(inr)

  if (!foreign) {
    return (
      <span className={className}>
        {formatINR(inr)}
        {suffix}
      </span>
    )
  }

  const localFormatted = `${foreign.symbol}${foreign.amount.toLocaleString('en-US')}`
  return (
    <span className={className}>
      {localFormatted} {foreign.code}
      {suffix}
    </span>
  )
}
