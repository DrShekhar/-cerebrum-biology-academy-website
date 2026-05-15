'use client'

import { useEffect, useState } from 'react'
import { X, Globe2 } from 'lucide-react'

// Bump this version to invalidate the dismissal cookie if banner copy or
// targeting logic changes. Visitors who dismissed v1/v2 will see v3 once.
const STORAGE_KEY = 'cba.geo-banner.dismissed.v3'

interface CountryDestination {
  /** Primary CTA href — where to send the visitor */
  href: string
  /** CTA label (terse — banner is space-constrained) */
  cta: string
  /** Verticals to mention as the "what we cover" tail (sm: hidden) */
  verticals: string
}

// Per-country messaging. Indian visitors are already on the India-default
// page, so they get no banner. Null country (no signal) also skipped —
// we don't guess. Anything else maps to its closest cluster.
const COUNTRY_DESTINATIONS: Record<string, CountryDestination> = {
  US: {
    href: '/best-mcat-biology-tutor',
    cta: 'See US biology programmes',
    verticals: 'MCAT · DAT · USMLE · AP Biology · USABO · IBO',
  },
  CA: {
    href: '/best-mcat-biology-tutor',
    cta: 'See Canada biology programmes',
    verticals: 'MCAT · DAT · CBO · AP Biology · IBO',
  },
  GB: {
    href: '/best-gamsat-biology-tutor',
    cta: 'See UK biology programmes',
    verticals: 'GAMSAT · BBO · A-Level · IB Biology · IBO',
  },
  IE: {
    href: '/best-gamsat-biology-tutor',
    cta: 'See Ireland biology programmes',
    verticals: 'GAMSAT · A-Level · IB Biology · IBO',
  },
  AU: {
    href: '/best-gamsat-biology-tutor',
    cta: 'See Australia biology programmes',
    verticals: 'GAMSAT · ABO · A-Level · IB Biology · IBO',
  },
  NZ: {
    href: '/best-gamsat-biology-tutor',
    cta: 'See NZ/Australia biology programmes',
    verticals: 'GAMSAT · A-Level · IB Biology · IBO',
  },
  AE: {
    href: '/neet-coaching-nri-uae',
    cta: 'See UAE biology programmes',
    verticals: 'NEET NRI · IB · A-Level · IGCSE · AP Biology',
  },
  SA: {
    href: '/neet-coaching-nri-saudi-arabia',
    cta: 'See Saudi Arabia programmes',
    verticals: 'NEET NRI · IB · IGCSE · A-Level',
  },
  QA: {
    href: '/neet-coaching-nri-qatar',
    cta: 'See Qatar programmes',
    verticals: 'NEET NRI · IB · IGCSE · A-Level',
  },
  KW: {
    href: '/neet-coaching-nri-kuwait',
    cta: 'See Kuwait programmes',
    verticals: 'NEET NRI · IB · IGCSE',
  },
  OM: {
    href: '/neet-coaching-nri-oman',
    cta: 'See Oman programmes',
    verticals: 'NEET NRI · IB · IGCSE',
  },
  BH: {
    href: '/neet-coaching-nri-bahrain',
    cta: 'See Bahrain programmes',
    verticals: 'NEET NRI · IB · IGCSE',
  },
  SG: {
    href: '/neet-coaching-nri-singapore',
    cta: 'See Singapore programmes',
    verticals: 'IB · A-Level · SBO · IGCSE',
  },
  HK: {
    href: '/online-biology-classes-international',
    cta: 'See Hong Kong programmes',
    verticals: 'IB · A-Level · BMAT · IBO',
  },
  MY: {
    href: '/neet-coaching-nri-malaysia',
    cta: 'See Malaysia programmes',
    verticals: 'NEET NRI · IB · A-Level',
  },
  NP: {
    href: '/neet-coaching-nri-nepal',
    cta: 'See Nepal programmes',
    verticals: 'NEET · IB · A-Level',
  },
}

// Generic fallback for any country not in the map above.
const FALLBACK: CountryDestination = {
  href: '/online-biology-classes-international',
  cta: 'See International programmes',
  verticals: 'A-Level · IB · AP · USABO · IBO',
}

export function GeoSuggestionBanner() {
  const [country, setCountry] = useState<string | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch {
      // localStorage may throw in private browsing — proceed without
      // dismissal memory rather than crash.
    }

    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((r) => r.json())
      .then((data: { country: string | null }) => {
        const c = data.country?.toUpperCase() ?? null
        // Indian visitors already see the India-default page, so no
        // need to suggest anything to them.
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
      // Persistence failed but we still hide for this session.
    }
    setShow(false)
  }

  if (!show || !country) return null

  let countryName = country
  try {
    const names = new Intl.DisplayNames(['en'], { type: 'region' })
    countryName = names.of(country) || country
  } catch {
    // ISO-2 fallback.
  }

  const destination = COUNTRY_DESTINATIONS[country] ?? FALLBACK

  return (
    <div className="bg-[#3d4d3d] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <p className="flex items-center gap-2 text-xs font-medium sm:text-sm">
          <Globe2 className="h-4 w-4 flex-shrink-0 text-green-300" aria-hidden="true" />
          <span>
            Visiting from <strong className="font-semibold">{countryName}</strong>?{' '}
            <a
              href={destination.href}
              className="underline decoration-green-300 underline-offset-2 hover:decoration-2"
            >
              {destination.cta}
            </a>
            <span className="hidden text-white/70 sm:inline"> — {destination.verticals}</span>
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
