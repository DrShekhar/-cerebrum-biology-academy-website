'use client'

import { useEffect, useState } from 'react'

// Minimum monthly price in each major market — sourced from
// `/programs/biology-olympiad/[country]` and IB pricing matrices.
// Falls back to USD for unknown / no-signal cases so we never
// surface INR pricing to overseas visitors when geo detection
// fails (slow network, blocked /api/geo/country, search crawlers).
const PRICE_BY_COUNTRY: Record<string, string> = {
  US: 'From $99/month',
  CA: 'From C$129/month',
  GB: 'From £75/month',
  UK: 'From £75/month',
  IE: 'From €89/month',
  AU: 'From A$149/month',
  NZ: 'From A$149/month',
  AE: 'From AED 360/month',
  SA: 'From AED 360/month',
  SG: 'From S$130/month',
  MY: 'From S$130/month',
  DE: 'From €89/month',
  FR: 'From €89/month',
  IT: 'From €89/month',
  ES: 'From €89/month',
  NL: 'From €89/month',
  BE: 'From €89/month',
  AT: 'From €89/month',
  PT: 'From €89/month',
  FI: 'From €89/month',
  GR: 'From €89/month',
  IN: 'From ₹6,500/month',
}

const DEFAULT_PRICE = 'From $99/month'

export function GeoAwarePriceChip() {
  const [price, setPrice] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((res) => res.json())
      .then((data: { country: string | null }) => {
        if (cancelled) return
        const country = data.country?.toUpperCase() ?? null
        setPrice((country && PRICE_BY_COUNTRY[country]) || DEFAULT_PRICE)
      })
      .catch(() => {
        if (!cancelled) setPrice(DEFAULT_PRICE)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Reserve the same vertical space during loading to avoid layout shift.
  if (!price) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-200">
        <span className="h-2 w-16 animate-pulse rounded-full bg-indigo-200" />
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-200 shadow-sm">
      <span aria-hidden="true">💳</span>
      <span>{price}</span>
      <span className="text-xs font-normal text-indigo-500">· geo-priced</span>
    </span>
  )
}
