/**
 * MCAT Biology pricing — source of truth for /mcat-biology-preparation,
 * section-specific pages (/mcat-biology-bb-section-prep,
 * /mcat-biochemistry-prep, /mcat-biology-passage-strategy), and city
 * pages (/mcat-biology-tutor-{new-jersey, bay-area, houston, atlanta,
 * boston}).
 *
 * Positioning: Cerebrum is a biology-section specialist — not a full
 * MCAT generalist. Pricing reflects per-section coaching, which is
 * structurally cheaper than full-course other generalist test-prep brands ($2,700) / Princeton
 * Review ($2,900) and lets us compete on per-hour rate against
 * other generalist MCAT brands ($175/hr) and Princeton tutoring ($183/hr).
 *
 * Three product tiers — same model as the olympiad + IB Biology
 * matrices for consistency. USD-only because the audience is
 * Indian-American + NRI families paying in USD.
 */

export type MCATProductId = 'self-paced-bb' | 'small-batch-bb' | 'one-on-one-senior'

export interface MCATPricingProduct {
  id: MCATProductId
  name: string
  subtitle: string
  priceUSD: number
  /** 'package' = full programme one-time. 'hr' = per-hour ad-hoc. */
  unit: 'package' | 'hr'
  unitLabel: string
  duration: string
  description: string
  features: string[]
  highlight?: boolean
  schemaUnitText: 'ANN' | 'HOUR'
}

export const mcatPricingProducts: MCATPricingProduct[] = [
  {
    id: 'self-paced-bb',
    name: 'MCAT Bio/Biochem — Pursuit',
    subtitle: 'Accessible · Async track · Monthly check-in',
    priceUSD: 449,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'Async self-paced coverage of the full Bio/Biochem section — Campbell Biology end-to-end plus first-semester biochemistry via Lehninger. AAMC content-outline mapping, passage practice bank, recorded video library, and WhatsApp doubt access.',
    features: [
      'Campbell Biology full coverage',
      'Lehninger first-semester biochemistry',
      'AAMC content outline mapping',
      '300+ practice passages with explanations',
      'Recorded session library',
      'WhatsApp doubt support',
    ],
    schemaUnitText: 'ANN',
  },
  {
    id: 'small-batch-bb',
    name: 'MCAT Bio/Biochem — Ascent',
    subtitle: '4-6 students · Bi-weekly office hours · Live sessions',
    priceUSD: 899,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'Live small-batch programme (4-6 students max) with weekly biology-specialist faculty sessions, monthly full-length section mocks, peer learning structure, and senior-faculty office hours. The most popular tier for students starting from a 505-510 baseline.',
    features: [
      'Everything in Self-Paced',
      'Weekly live sessions (2 hours)',
      'Monthly full-length B/B section mocks',
      'Peer study group + Slack channel',
      'Senior faculty office hours',
      'AAMC passage walkthroughs',
    ],
    highlight: true,
    schemaUnitText: 'ANN',
  },
  {
    id: 'one-on-one-senior',
    name: 'MCAT Bio/Biochem — Pinnacle',
    subtitle: 'AIIMS-trained · Weekly 1:1 · Personalised plan',
    priceUSD: 1349,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'One-on-one with Cerebrum senior faculty (AIIMS-trained biology specialists). Personalised study plan, weekly 1:1 video sessions, custom passage drill, gap-fill coaching, and unlimited WhatsApp access. For students targeting 515+ or starting from below 500.',
    features: [
      'Everything in Small-Batch',
      'Weekly 1:1 video session (90 min)',
      'Personalised study plan + diagnostic',
      'Custom passage drilling on weak topics',
      'Mock exam analysis 1:1',
      'Unlimited WhatsApp faculty access',
    ],
    schemaUnitText: 'ANN',
  },
]

/** Hourly tutoring rate for ad-hoc / gap-fill sessions outside the
 *  packaged programmes. Compared to other generalist MCAT brands $175/hr and Princeton
 *  Review $183/hr, this is Cerebrum's per-hour wedge. */
export const MCAT_ADHOC_TUTORING_USD_PER_HOUR = 135

/** Course-schema offers[] for MCAT pages. All USD base. */
export function mcatPricingAsCourseOffers(pageUrl: string) {
  const programmes = mcatPricingProducts.map((p) => ({
    '@type': 'Offer' as const,
    name: p.name,
    price: p.priceUSD,
    priceCurrency: 'USD' as const,
    url: pageUrl,
    priceSpecification: {
      '@type': 'UnitPriceSpecification' as const,
      price: p.priceUSD,
      priceCurrency: 'USD' as const,
      unitText: p.schemaUnitText,
    },
    availability: 'https://schema.org/InStock' as const,
  }))
  // Add an ad-hoc hourly offer alongside the three packages.
  programmes.push({
    '@type': 'Offer',
    name: 'MCAT Biology 1:1 Tutoring (per hour, ad-hoc)',
    price: MCAT_ADHOC_TUTORING_USD_PER_HOUR,
    priceCurrency: 'USD',
    url: pageUrl,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: MCAT_ADHOC_TUTORING_USD_PER_HOUR,
      priceCurrency: 'USD',
      unitText: 'HOUR',
    },
    availability: 'https://schema.org/InStock',
  })
  return programmes
}
