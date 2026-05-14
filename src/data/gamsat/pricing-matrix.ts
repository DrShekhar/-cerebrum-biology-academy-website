/**
 * GAMSAT (Graduate Medical School Admissions Test) Biology pricing —
 * source of truth for /best-gamsat-biology-tutor and related pages.
 *
 * GAMSAT is used by UK / Ireland / Australian graduate-entry medical
 * schools. Section III (Reasoning in Biological and Physical Sciences)
 * is 75 questions in 150 minutes; biology is ~40% of Section III
 * content (chemistry ~40%, physics ~20%). Cerebrum specialises in the
 * biology component plus the biochemistry crossover with general
 * chemistry.
 *
 * Currency: GBP base (UK is the largest GAMSAT market), with AUD
 * equivalents displayed for Australia and EUR for Ireland on the
 * geo-aware pricing component.
 */

export type GAMSATProductId = 'self-paced-bio' | 'small-batch-bio' | 'one-on-one-senior'

export interface GAMSATPricingProduct {
  id: GAMSATProductId
  name: string
  subtitle: string
  priceGBP: number
  priceAUD: number
  priceEUR: number
  unit: 'package' | 'hr'
  unitLabel: string
  duration: string
  description: string
  features: string[]
  highlight?: boolean
  schemaUnitText: 'ANN' | 'HOUR'
}

export const gamsatPricingProducts: GAMSATPricingProduct[] = [
  {
    id: 'self-paced-bio',
    name: 'GAMSAT Section III Biology Self-Paced',
    subtitle: 'Async track · 4-6 month curriculum',
    priceGBP: 399,
    priceAUD: 799,
    priceEUR: 469,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'Async self-paced coverage of the GAMSAT Section III biology component — Campbell + Pre-U biology, with biochemistry-bridge content for the chemistry crossover questions. ACER official practice papers walked through, recorded video library, WhatsApp doubt access.',
    features: [
      'Campbell Biology + Pre-U Biology coverage',
      'Biochemistry-bridge for Section III chemistry crossover',
      'ACER official paper walkthroughs (Papers 1, 2)',
      '150+ practice stems with explanations',
      'Recorded session library',
      'WhatsApp doubt support',
    ],
    schemaUnitText: 'ANN',
  },
  {
    id: 'small-batch-bio',
    name: 'GAMSAT Section III Biology Small-Batch',
    subtitle: '4-6 students · Weekly live sessions',
    priceGBP: 799,
    priceAUD: 1599,
    priceEUR: 939,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'Live small-batch programme (4-6 students max) with weekly biology-specialist faculty sessions, monthly full-length Section III mocks, peer learning structure, and senior-faculty office hours. The most popular tier for students starting from a 60–64 baseline.',
    features: [
      'Everything in Self-Paced',
      'Weekly live sessions (2 hours)',
      'Monthly full-length Section III mocks',
      'Peer study group + Slack channel',
      'Senior faculty office hours',
      'ACER stem analysis live',
    ],
    highlight: true,
    schemaUnitText: 'ANN',
  },
  {
    id: 'one-on-one-senior',
    name: 'GAMSAT Section III Biology 1:1 with Senior Faculty',
    subtitle: 'AIIMS-trained · personalised study plan',
    priceGBP: 1249,
    priceAUD: 2399,
    priceEUR: 1449,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'One-on-one with Cerebrum senior faculty (AIIMS-trained biology specialists). Personalised study plan, weekly 1:1 video sessions, custom stem drilling, gap-fill coaching, and unlimited WhatsApp access. For students targeting 70+ or coming from non-biology undergraduate backgrounds.',
    features: [
      'Everything in Small-Batch',
      'Weekly 1:1 video session (90 min)',
      'Personalised study plan + diagnostic',
      'Custom Section III stem drilling',
      'Mock exam analysis 1:1',
      'Unlimited WhatsApp faculty access',
    ],
    schemaUnitText: 'ANN',
  },
]

export const GAMSAT_ADHOC_TUTORING_GBP_PER_HOUR = 110
export const GAMSAT_ADHOC_TUTORING_AUD_PER_HOUR = 215
export const GAMSAT_ADHOC_TUTORING_EUR_PER_HOUR = 130

export function gamsatPricingAsCourseOffers(
  pageUrl: string,
  currency: 'GBP' | 'AUD' | 'EUR' = 'GBP'
) {
  const priceKey = currency === 'GBP' ? 'priceGBP' : currency === 'AUD' ? 'priceAUD' : 'priceEUR'
  const adhocRate =
    currency === 'GBP'
      ? GAMSAT_ADHOC_TUTORING_GBP_PER_HOUR
      : currency === 'AUD'
        ? GAMSAT_ADHOC_TUTORING_AUD_PER_HOUR
        : GAMSAT_ADHOC_TUTORING_EUR_PER_HOUR

  const programmes = gamsatPricingProducts.map((p) => ({
    '@type': 'Offer' as const,
    name: p.name,
    price: p[priceKey],
    priceCurrency: currency,
    url: pageUrl,
    priceSpecification: {
      '@type': 'UnitPriceSpecification' as const,
      price: p[priceKey],
      priceCurrency: currency,
      unitText: p.schemaUnitText,
    },
    availability: 'https://schema.org/InStock' as const,
  }))
  programmes.push({
    '@type': 'Offer',
    name: 'GAMSAT Section III Biology 1:1 Tutoring (per hour, ad-hoc)',
    price: adhocRate,
    priceCurrency: currency,
    url: pageUrl,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: adhocRate,
      priceCurrency: currency,
      unitText: 'HOUR',
    },
    availability: 'https://schema.org/InStock',
  })
  return programmes
}
