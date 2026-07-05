'use client'

import { useEffect, useState } from 'react'

/**
 * Visitor country from edge geo headers (via /api/geo/country).
 *
 * `country` is undefined while resolving, then an ISO-2 code or null when
 * detection fails (crawlers, localhost, stripped headers). Unknown visitors
 * are treated as NOT-India so international content stays visible to them.
 */
export function useVisitorCountry() {
  const [country, setCountry] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((res) => res.json())
      .then((data) => setCountry(data.country ?? null))
      .catch(() => setCountry(null))
  }, [])

  return {
    country,
    resolved: country !== undefined,
    isIndia: country === 'IN',
  }
}
