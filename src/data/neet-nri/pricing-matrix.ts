/**
 * NEET NRI pricing — single source of truth for every page that
 * targets non-Indian NEET-aspirant audiences (USA, UAE, UK, Canada,
 * Singapore, Saudi/Qatar/Kuwait/Bahrain/Oman, Malaysia, Nepal,
 * Australia).
 *
 * Three tier products reflect how NRI families actually enrol:
 * a year-long Class 11 foundation, a Class 12 comprehensive, and
 * a dropper / repeater programme.
 *
 * Per-zone USD pricing
 * --------------------
 * Prices are zone-aware. Floor is ~$300/month (~$3,600/year) and
 * scales upward in higher-purchasing-power markets so we match the
 * region's average AP/IB tutoring price level instead of underselling.
 *
 *   USA       — premium zone, Pursuit $2,500 / Ascent $4,500 / Pinnacle $7,000
 *   UK / EU / UAE / CA / SG / HK / AU
 *             — high zone,    Pursuit $2,500 / Ascent $4,000 / Pinnacle $6,000
 *   Other (Saudi, Qatar, Kuwait, Bahrain, Oman, Malaysia, Nepal)
 *             — floor,        Pursuit $2,000 / Ascent $3,500 / Pinnacle $5,000
 *
 * Per-country display currency conversion uses `convertForDisplay()`
 * in src/data/shared/currencies.ts.
 */

export type NEETNRIProductId = 'foundation-class-11' | 'comprehensive-class-12' | 'dropper-repeater'

export type PricingZone = 'us' | 'high' | 'floor'

/** ISO-2 country → pricing zone. Unmapped countries fall back to 'floor'. */
export const COUNTRY_TO_NRI_ZONE: Record<string, PricingZone> = {
  US: 'us',
  GB: 'high',
  UK: 'high',
  IE: 'high',
  DE: 'high',
  FR: 'high',
  IT: 'high',
  ES: 'high',
  NL: 'high',
  BE: 'high',
  AT: 'high',
  PT: 'high',
  FI: 'high',
  GR: 'high',
  CH: 'high',
  AE: 'high',
  CA: 'high',
  SG: 'high',
  HK: 'high',
  AU: 'high',
  NZ: 'high',
  // Floor (default): Saudi (SA), Qatar (QA), Kuwait (KW), Bahrain (BH),
  // Oman (OM), Malaysia (MY), Nepal (NP), Bangladesh (BD), Sri Lanka (LK),
  // South Africa (ZA), and anything not listed.
}

export interface NEETNRIPricingProduct {
  id: NEETNRIProductId
  name: string
  subtitle: string
  /** Per-zone USD price for the full year. Floor is the default for any
   *  unmapped country. */
  priceUSDByZone: Record<PricingZone, number>
  unit: 'year'
  unitLabel: string
  description: string
  features: string[]
  highlight?: boolean
  schemaUnitText: 'ANN'
}

export const neetNRIPricingProducts: NEETNRIPricingProduct[] = [
  {
    id: 'foundation-class-11',
    name: 'NEET NRI — Pursuit',
    subtitle: 'Group-first · Monthly 1:1 · Class 11 Biology track',
    priceUSDByZone: {
      us: 2500,
      high: 2500,
      floor: 2000,
    },
    unit: 'year',
    unitLabel: '/ year',
    description:
      'Full Class 11 NEET Biology programme aligned to the NTA NEET pattern. Live online classes in NRI-friendly time slots, weekly assessments, AIIMS-trained faculty, and NRI-quota guidance from day one.',
    features: [
      'Complete Class 11 Biology coverage (Botany + Zoology)',
      'Live online classes — EST / GST / SGT timing options',
      'Weekly NCERT-aligned tests + analytics',
      'NRI-quota counselling sessions',
      'WhatsApp doubt support, all timezones',
      'Free recorded sessions for revision',
    ],
    schemaUnitText: 'ANN',
  },
  {
    id: 'comprehensive-class-12',
    name: 'NEET NRI — Ascent',
    subtitle: 'Balanced · Bi-weekly 1:1 · Class 12 + final NEET prep',
    priceUSDByZone: {
      us: 4500,
      high: 4000,
      floor: 3500,
    },
    unit: 'year',
    unitLabel: '/ year',
    description:
      'Class 12 Biology with intensive NEET-pattern drills, full-length mock tests, error analysis, and final-phase pre-exam acceleration. Built for students sitting NEET in May.',
    features: [
      'Complete Class 12 Biology + Class 11 revision',
      'NEET-pattern full mocks (15+ across the year)',
      'Topic-wise rank predictors + error analysis',
      'NRI-quota application guidance',
      'WhatsApp doubt support, all timezones',
      'Pre-exam intensive (final 60 days)',
    ],
    highlight: true,
    schemaUnitText: 'ANN',
  },
  {
    id: 'dropper-repeater',
    name: 'NEET NRI — Pinnacle',
    subtitle: 'Premium · Weekly 1:1 · Dropper/Repeater intensive',
    priceUSDByZone: {
      us: 7000,
      high: 6000,
      floor: 5000,
    },
    unit: 'year',
    unitLabel: '/ year',
    description:
      'Full repeater programme for students who took NEET once and want to lift their score. Re-foundation of Class 11 + Class 12, double-density drilling, weekly mock interviews, and personalised target-college mapping.',
    features: [
      'Re-foundation: Class 11 + 12 Biology',
      'Double-density mock test schedule',
      'Personalised target-college mapping',
      '1:1 mentor sessions twice per month',
      'NRI-quota strategy across deemed + private',
      'Year-end MBBS counselling support',
    ],
    schemaUnitText: 'ANN',
  },
]

/** Return the right USD price for a product given a visitor's country. */
export function priceUSDForCountry(
  product: NEETNRIPricingProduct,
  country: string | null | undefined
): number {
  const zone: PricingZone = (country && COUNTRY_TO_NRI_ZONE[country.toUpperCase()]) || 'floor'
  return product.priceUSDByZone[zone]
}

/** Approximate monthly equivalent for display. */
export function monthlyUSDFromAnnual(annualUSD: number): number {
  return Math.round(annualUSD / 12 / 25) * 25 // round to nearest $25 for clean display
}

/** Course-schema offers[] for NEET NRI pages. Currency derives from
 *  the visitor's country at render time — the component passes the
 *  detected country here so the rich result matches the page audience. */
export function neetNRIPricingAsCourseOffers(pageUrl: string, country: string | null | undefined) {
  return neetNRIPricingProducts.map((p) => {
    const priceUSD = priceUSDForCountry(p, country)
    return {
      '@type': 'Offer' as const,
      name: p.name,
      price: priceUSD,
      priceCurrency: 'USD' as const,
      url: pageUrl,
      priceSpecification: {
        '@type': 'UnitPriceSpecification' as const,
        price: priceUSD,
        priceCurrency: 'USD' as const,
        unitText: p.schemaUnitText,
      },
      availability: 'https://schema.org/InStock' as const,
    }
  })
}
