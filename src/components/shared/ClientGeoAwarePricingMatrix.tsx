'use client'

import { useEffect, useState } from 'react'
import { SharedPricingMatrix, type PricingProductLike } from './PricingMatrix'

interface Props {
  products: PricingProductLike[]
  heading?: string
  subheading?: string
  ctaPrimaryHref?: string
  ctaPrimaryLabel?: string
  equivalents?: string[]
  regionalLinks?: Array<{ region: string; href: string }>
}

/**
 * Client-side wrapper around SharedPricingMatrix that fetches the
 * detected country from /api/geo/country on mount. Use this when a
 * page is already a client component (so it can't use the async
 * server-side GeoAwareSharedPricingMatrix) but still wants
 * geo-aware currency highlighting.
 */
export function ClientGeoAwarePricingMatrix(props: Props) {
  const [country, setCountry] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/geo/country')
      .then((r) => (r.ok ? r.json() : { country: null }))
      .then((data) => {
        if (!cancelled) setCountry(data?.country ?? null)
      })
      .catch(() => {
        if (!cancelled) setCountry(null)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return <SharedPricingMatrix {...props} detectedCountry={country} />
}
