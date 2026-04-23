import { headers } from 'next/headers'
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
 * Server Component wrapper. Reads Vercel's x-vercel-ip-country header
 * and forwards the detected country to the generic SharedPricingMatrix
 * so the right currency card is highlighted per visitor.
 *
 * Falls back to static multi-currency display when the header is absent
 * (local dev, search crawlers, cached HTML). Pages using this component
 * are opted into dynamic rendering — intentional for personalization.
 */
export async function GeoAwareSharedPricingMatrix(props: Props) {
  const headerList = await headers()
  const country =
    headerList.get('x-vercel-ip-country') ||
    headerList.get('cf-ipcountry') ||
    headerList.get('x-country-code') ||
    null

  return <SharedPricingMatrix {...props} detectedCountry={country} />
}
