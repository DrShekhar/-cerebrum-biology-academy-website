import { headers } from 'next/headers'

/**
 * Server-side country detection using Vercel's x-vercel-ip-country header.
 *
 * Returns the ISO 3166-1 alpha-2 country code (e.g., 'US', 'IN', 'GB')
 * or null if the header is missing (local dev, non-Vercel hosting).
 *
 * Usage in Server Components / Route Handlers:
 *   const country = await getCountryFromHeaders()
 *   if (country === 'IN') { ... }
 *
 * Why server-side: AI crawlers (GPTBot, Claude-Web, PerplexityBot) don't
 * execute client-side JavaScript, so fetch-based geo detection misses them.
 * This utility reads the header that Vercel sets on every request, ensuring
 * crawlers receive geo-appropriate content (currency, pricing, locale cues).
 */
export async function getCountryFromHeaders(): Promise<string | null> {
  const h = await headers()
  return h.get('x-vercel-ip-country') ?? null
}

/**
 * Server-side city detection (Vercel Edge).
 * Returns city name or null.
 */
export async function getCityFromHeaders(): Promise<string | null> {
  const h = await headers()
  return h.get('x-vercel-ip-city') ?? null
}

/**
 * Server-side region/state detection (Vercel Edge).
 * Returns region code (e.g., 'CA' for California) or null.
 */
export async function getRegionFromHeaders(): Promise<string | null> {
  const h = await headers()
  return h.get('x-vercel-ip-country-region') ?? null
}
