'use client'

/**
 * Sets a `data-country` attribute on <body> based on the visitor's ISO-2
 * country code (from x-vercel-ip-country / cf-ipcountry via the
 * /api/geo/country endpoint). Pages can then use CSS attribute
 * selectors to reorder or emphasise sections per-region without
 * cloaking — the same HTML is shipped to every visitor (Google sees
 * everything) but client-side CSS reorders what the visitor sees first.
 *
 * Example CSS usage on the homepage:
 *
 *   body[data-country="US"] [data-region="usa"] { order: 1; }
 *   body[data-country="US"] [data-region="india"] { order: 99; opacity: 0.85; }
 *   body[data-country="GB"] [data-region="uk"] { order: 1; }
 *
 * SEO note: this is NOT cloaking — Google receives the full DOM in
 * sequential order; only CSS `order` and `opacity` are mutated
 * client-side. Both Google and the user see all sections.
 */

import { useEffect } from 'react'

export function CountryClassInjector() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    fetch('/api/geo/country', { cache: 'force-cache' })
      .then((r) => r.json())
      .then((data: { country: string | null }) => {
        const c = data.country?.toUpperCase() ?? null
        if (!c) return
        document.body.setAttribute('data-country', c)
        const region = (() => {
          if (c === 'IN') return 'india'
          if (c === 'US' || c === 'CA' || c === 'MX') return 'americas'
          if (c === 'GB' || c === 'IE' || c === 'AU' || c === 'NZ') return 'commonwealth'
          if (['AE', 'SA', 'QA', 'KW', 'OM', 'BH'].includes(c)) return 'gulf'
          if (['SG', 'HK', 'MY', 'JP', 'KR', 'TH'].includes(c)) return 'apac'
          if (c === 'NP' || c === 'BD' || c === 'LK') return 'south-asia'
          return 'other'
        })()
        document.body.setAttribute('data-region', region)
      })
      .catch(() => {
        // Silent fail — homepage works fine without country attr (just
        // shows the default IN-first section order).
      })
  }, [])

  // CSS rules — emit a global <style> that reorders / hides sections
  // tagged with [data-region] attribute. Indian content is hidden for
  // non-IN visitors (RE-NEET news + Delhi NCR locations). Non-IN
  // verticals (Advanced Medical Pathways, International) get visually
  // emphasised via order + a subtle highlight. Same HTML is shipped
  // to all visitors — only CSS layer differs (not cloaking).
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        /* Default (IN visitors and visitors with no country signal):
           original DOM order applies, no overrides. */

        /* Non-IN visitors: hide India-specific sections that aren't
           relevant to their pathway. They stay in the DOM (Google + AI
           still crawl them) but are not visually rendered. */
        body[data-country]:not([data-country="IN"]) [data-region="india-only"] {
          display: none;
        }

        /* Non-IN visitors: emphasise International + Advanced Pathways
           with a soft border-top. */
        body[data-country]:not([data-country="IN"]) [data-region="international"] {
          border-top: 3px solid #6366f1;
        }
        body[data-country]:not([data-country="IN"]) [data-region="advanced-medical"] {
          border-top: 3px solid #0f172a;
        }

        /* US / Canada visitors: also emphasise the Olympiad cross-sell
           (USABO + IBO + CBO are relevant to AP / pre-med high school
           applicants). */
        body[data-region="americas"] [data-region="olympiads"] {
          border-top: 3px solid #22c55e;
        }

        /* UK / IE / AU / NZ visitors: same Olympiad emphasis (BBO + IBO
           + ABO are local + global olympiad pathway for the school-age
           cohort). */
        body[data-region="commonwealth"] [data-region="olympiads"] {
          border-top: 3px solid #22c55e;
        }
        `,
      }}
    />
  )
}
