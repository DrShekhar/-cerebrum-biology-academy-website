import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

/**
 * Returns the visitor's ISO-3166 alpha-2 country code as exposed by Vercel's
 * edge runtime via the `x-vercel-ip-country` header. Returns null when running
 * outside Vercel (e.g. local dev, custom infra) or when the header is missing.
 */
export async function getVisitorCountry(): Promise<string | null> {
  const h = await headers()
  const fromVercel = h.get('x-vercel-ip-country')
  if (fromVercel) return fromVercel.toUpperCase()
  // Optional override for local testing — set ?country=IN via a proxy header.
  const fromOverride = h.get('x-debug-country')
  if (fromOverride) return fromOverride.toUpperCase()
  return null
}

/**
 * Server-side geo-gate: throws notFound() if the visitor is in one of the
 * blocked countries. Use at the top of any page that should be hidden from
 * specific markets.
 *
 * Behaviour:
 *  - On Vercel: reads x-vercel-ip-country and gates accordingly.
 *  - Off Vercel (local dev, missing header): returns silently so pages remain
 *    visible for development. Set process.env.GEO_HIDE_FALLBACK_VISIBLE=false
 *    to flip this and hide pages whenever the country header is absent.
 *  - Crawler note: Googlebot crawls from the US (country = US), so this gate
 *    will NOT prevent Indian SERP appearances. Pair with hreflang exclusion
 *    and explicit "intended audience" framing in metadata description.
 *
 * @example
 *   import { hideFromCountries } from '@/lib/geo/hideFromCountries'
 *   export default async function Page() {
 *     await hideFromCountries(['IN'])
 *     return <SomePage />
 *   }
 */
export async function hideFromCountries(blocked: readonly string[]): Promise<void> {
  const country = await getVisitorCountry()
  if (!country) {
    if (process.env.GEO_HIDE_FALLBACK_VISIBLE === 'false') {
      notFound()
    }
    return
  }
  const blockedSet = new Set(blocked.map((c) => c.toUpperCase()))
  if (blockedSet.has(country)) {
    notFound()
  }
}

/**
 * Inverse helper: only show the page to the listed countries. Useful when the
 * audience is narrowly geo-scoped (e.g. China cluster restricted to HK/CN/SG/
 * MY/TH/JP/KR + a few NRI-source-countries).
 *
 * Falls through silently on missing header (local dev) unless
 * GEO_HIDE_FALLBACK_VISIBLE=false.
 */
export async function onlyShowToCountries(allowed: readonly string[]): Promise<void> {
  const country = await getVisitorCountry()
  if (!country) {
    if (process.env.GEO_HIDE_FALLBACK_VISIBLE === 'false') {
      notFound()
    }
    return
  }
  const allowedSet = new Set(allowed.map((c) => c.toUpperCase()))
  if (!allowedSet.has(country)) {
    notFound()
  }
}
