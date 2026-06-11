'use client'

import { useEffect, useState } from 'react'
import { X, Globe2, ArrowRight } from 'lucide-react'

// Bump this version to invalidate the dismissal cookie if banner copy or
// targeting logic changes. Visitors who dismissed earlier versions see the
// new one once.
const STORAGE_KEY = 'cba.geo-banner.dismissed.v4'
// Set when a visitor clicks through to /global — return visits get the
// compact one-line strip instead of the large hero panel.
const PREF_KEY = 'cba.geo-pref'

interface CountryDestination {
  /** Country-specific href — secondary link under the /global primary CTA */
  href: string
  /** CTA label (terse — banner is space-constrained) */
  cta: string
  /** Verticals to mention as the "what we cover" tail */
  verticals: string
}

// Per-country messaging. Indian visitors are already on the India-default
// page, so they get no banner. Null country (no signal) also skipped —
// we don't guess. Anything else maps to its closest cluster.
const COUNTRY_DESTINATIONS: Record<string, CountryDestination> = {
  US: {
    href: '/best-mcat-biology-tutor',
    cta: 'US biology programmes',
    verticals: 'MCAT · DAT · USMLE · AP Biology · USABO · IBO',
  },
  CA: {
    href: '/best-mcat-biology-tutor',
    cta: 'Canada biology programmes',
    verticals: 'MCAT · DAT · CBO · AP Biology · IBO',
  },
  GB: {
    href: '/best-gamsat-biology-tutor',
    cta: 'UK biology programmes',
    verticals: 'GAMSAT · BBO · A-Level · IB Biology · IBO',
  },
  IE: {
    href: '/best-gamsat-biology-tutor',
    cta: 'Ireland biology programmes',
    verticals: 'GAMSAT · A-Level · IB Biology · IBO',
  },
  AU: {
    href: '/best-gamsat-biology-tutor',
    cta: 'Australia biology programmes',
    verticals: 'GAMSAT · ABO · A-Level · IB Biology · IBO',
  },
  NZ: {
    href: '/best-gamsat-biology-tutor',
    cta: 'NZ/Australia biology programmes',
    verticals: 'GAMSAT · A-Level · IB Biology · IBO',
  },
  AE: {
    href: '/neet-coaching-nri-uae',
    cta: 'UAE programmes (incl. NEET)',
    verticals: 'NEET NRI · IB · A-Level · IGCSE · AP Biology',
  },
  SA: {
    href: '/neet-coaching-nri-saudi-arabia',
    cta: 'Saudi Arabia programmes (incl. NEET)',
    verticals: 'NEET NRI · IB · IGCSE · A-Level',
  },
  QA: {
    href: '/neet-coaching-nri-qatar',
    cta: 'Qatar programmes (incl. NEET)',
    verticals: 'NEET NRI · IB · IGCSE · A-Level',
  },
  KW: {
    href: '/neet-coaching-nri-kuwait',
    cta: 'Kuwait programmes (incl. NEET)',
    verticals: 'NEET NRI · IB · IGCSE',
  },
  OM: {
    href: '/neet-coaching-nri-oman',
    cta: 'Oman programmes (incl. NEET)',
    verticals: 'NEET NRI · IB · IGCSE',
  },
  BH: {
    href: '/neet-coaching-nri-bahrain',
    cta: 'Bahrain programmes (incl. NEET)',
    verticals: 'NEET NRI · IB · IGCSE',
  },
  SG: {
    href: '/neet-coaching-nri-singapore',
    cta: 'Singapore programmes',
    verticals: 'IB · A-Level · SBO · IGCSE · NEET NRI',
  },
  HK: {
    href: '/online-biology-classes-international',
    cta: 'Hong Kong programmes',
    verticals: 'IB · A-Level · BMAT · IBO',
  },
  MY: {
    href: '/neet-coaching-nri-malaysia',
    cta: 'Malaysia programmes (incl. NEET)',
    verticals: 'NEET NRI · IB · A-Level',
  },
  NP: {
    href: '/neet-coaching-nri-nepal',
    cta: 'Nepal programmes (incl. NEET)',
    verticals: 'NEET · IB · A-Level',
  },
}

// Generic fallback for any country not in the map above.
const FALLBACK: CountryDestination = {
  href: '/global',
  cta: 'International programmes',
  verticals: 'NEET abroad · A-Level · IB · AP · MCAT · IBO',
}

export function GeoSuggestionBanner() {
  const [country, setCountry] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let dismissed = false
    let prefersGlobal = false
    try {
      dismissed = Boolean(localStorage.getItem(STORAGE_KEY))
      prefersGlobal = localStorage.getItem(PREF_KEY) === 'global'
    } catch {
      // localStorage may throw in private browsing — proceed without
      // dismissal memory rather than crash.
    }
    if (dismissed) return

    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((r) => r.json())
      .then((data: { country: string | null }) => {
        const c = data.country?.toUpperCase() ?? null
        // Indian visitors already see the India-default page, so no
        // need to suggest anything to them.
        if (!c || c === 'IN') return
        setCountry(c)
        setCompact(prefersGlobal)
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

  const rememberGlobalPref = () => {
    try {
      localStorage.setItem(PREF_KEY, 'global')
    } catch {
      // Best effort.
    }
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

  // Compact strip — returning visitors who already chose the global home.
  if (compact) {
    return (
      <div className="bg-[#3d4d3d] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <p className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <Globe2 className="h-4 w-4 flex-shrink-0 text-green-300" aria-hidden="true" />
            <span>
              Visiting from <strong className="font-semibold">{countryName}</strong>?{' '}
              <a
                href="/global"
                onClick={rememberGlobalPref}
                className="underline decoration-green-300 underline-offset-2 hover:decoration-2"
              >
                Go to our Global home
              </a>
              {destination.href !== '/global' && (
                <>
                  {' '}
                  <span className="text-white/60">·</span>{' '}
                  <a href={destination.href} className="underline underline-offset-2">
                    {destination.cta}
                  </a>
                </>
              )}
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

  // Hero-level panel — first visit from outside India.
  return (
    <div className="bg-[#3d4d3d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Globe2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold sm:text-base">
                Visiting from {countryName}? This page is our India NEET home — we also teach
                worldwide.
              </p>
              <p className="mt-0.5 text-xs text-white/75 sm:text-sm">
                NEET from abroad · IB · AP · A-Level · GCSE · MCAT · GAMSAT · USMLE · DAT · Biology
                Olympiads — live online in your time zone.
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href="/global"
                  onClick={rememberGlobalPref}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-sm font-bold text-[#3d4d3d] transition hover:bg-green-50"
                >
                  See our Global Programs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                {destination.href !== '/global' && (
                  <a
                    href={destination.href}
                    className="text-xs font-medium underline decoration-green-300 underline-offset-2 hover:decoration-2 sm:text-sm"
                  >
                    or jump straight to {destination.cta}
                  </a>
                )}
              </div>
            </div>
          </div>
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
    </div>
  )
}
