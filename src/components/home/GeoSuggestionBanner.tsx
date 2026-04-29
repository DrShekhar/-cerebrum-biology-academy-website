'use client'

import { useEffect, useState } from 'react'
import { X, Globe2 } from 'lucide-react'

// Bump this version to invalidate the dismissal cookie if banner copy or
// targeting logic changes (e.g., we add a new destination, refresh the
// segments). Visitors who dismissed v1 will see v2 once on next visit.
const STORAGE_KEY = 'cba.geo-banner.dismissed.v1'

// All non-IN visitors land on the international hub — curated copy +
// links to A-Level / IB / AP / USABO / IBO from there. We intentionally
// don't deep-link to country-specific olympiad pages from this banner
// (e.g., US → /usabo-coaching) because most international visitors are
// curriculum-shopping, not olympiad-specific.
const DESTINATION = '/online-biology-classes-international'

export function GeoSuggestionBanner() {
  const [country, setCountry] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Respect prior dismissal — once a visitor X's the banner, don't
    // pester them on subsequent visits in the same browser.
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch {
      // localStorage may throw in private browsing or quota-full —
      // proceed without dismissal memory rather than crash.
    }

    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((r) => r.json())
      .then((data: { country: string | null }) => {
        const c = data.country?.toUpperCase() ?? null
        // Indian visitors are already on the right (India-default) page.
        // Null country (no signal) — also leave alone, don't guess.
        if (!c || c === 'IN') return
        setCountry(c)
        setShow(true)
      })
      .catch(() => {
        // Silent — no banner is better than a broken banner.
      })
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Persistence failed but we still hide the banner for this session.
    }
    setShow(false)
  }

  if (!show || !country) return null

  // Pretty country name from ISO-2; falls back to the code itself if the
  // browser doesn't support `Intl.DisplayNames` (older Safari etc.)
  let countryName = country
  try {
    const names = new Intl.DisplayNames(['en'], { type: 'region' })
    countryName = names.of(country) || country
  } catch {
    // Keep ISO-2 fallback.
  }

  return (
    <div className="bg-[#3d4d3d] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <p className="flex items-center gap-2 text-xs font-medium sm:text-sm">
          <Globe2 className="h-4 w-4 flex-shrink-0 text-green-300" aria-hidden="true" />
          <span>
            Visiting from <strong className="font-semibold">{countryName}</strong>?{' '}
            <a
              href={DESTINATION}
              className="underline decoration-green-300 underline-offset-2 hover:decoration-2"
            >
              See our International programs
            </a>
            <span className="hidden text-white/70 sm:inline">
              {' '}
              — A-Level · IB · AP · USABO / IBO
            </span>
            <span className="ml-1" aria-hidden="true">
              →
            </span>
          </span>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss country suggestion banner"
          className="flex-shrink-0 rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
