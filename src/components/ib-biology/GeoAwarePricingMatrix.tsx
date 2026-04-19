import { headers } from 'next/headers'
import { IBBiologyPricingMatrix } from './PricingMatrix'

/**
 * Geo-aware wrapper around IBBiologyPricingMatrix.
 *
 * Reads Vercel's `x-vercel-ip-country` request header (or a few common
 * fallbacks) to pick the visitor's currency card. Gracefully falls back
 * to the full static multi-currency display when the header is absent
 * (local dev, search-engine crawlers, cached HTML).
 *
 * Using `headers()` opts the hosting page into dynamic rendering — this
 * is intentional so each visitor sees their geo-matched currency. The
 * Course JSON-LD still publishes the canonical USD price, so SEO
 * consistency is preserved.
 */
export async function GeoAwarePricingMatrix(
  props: Parameters<typeof IBBiologyPricingMatrix>[0] = {}
) {
  const headerList = await headers()
  const country =
    headerList.get('x-vercel-ip-country') ||
    headerList.get('cf-ipcountry') ||
    headerList.get('x-country-code') ||
    null

  return <IBBiologyPricingMatrix {...props} detectedCountry={country} />
}
