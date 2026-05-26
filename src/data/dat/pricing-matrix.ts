/**
 * DAT (Dental Admission Test) Biology pricing — source of truth for
 * /best-dat-biology-tutor, /dat-biology-preparation, section-specific
 * pages, and US city pages.
 *
 * DAT Biology section: 40 multiple-choice questions, 90 minutes,
 * covers Campbell-aligned content (cell biology, genetics, evolution,
 * anatomy/physiology, ecology). Same Campbell baseline as MCAT B/B,
 * but with anatomy/physiology weighted higher and biochemistry lower.
 *
 * Pricing wedge: other generalist DAT prep platforms ($595–$795), other generalist DAT prep platforms ($595),
 * other generalist DAT brands ($1,599 self-paced / $2,599 live). Cerebrum competes on
 * biology-section depth at biology-only price points.
 */

export type DATProductId = 'self-paced-bio' | 'small-batch-bio' | 'one-on-one-senior'

export interface DATPricingProduct {
  id: DATProductId
  name: string
  subtitle: string
  priceUSD: number
  unit: 'package' | 'hr'
  unitLabel: string
  duration: string
  description: string
  features: string[]
  highlight?: boolean
  schemaUnitText: 'ANN' | 'HOUR'
}

export const datPricingProducts: DATPricingProduct[] = [
  {
    id: 'self-paced-bio',
    name: 'Pursuit — DAT Biology',
    subtitle: 'Accessible · Async track · 3-5 month curriculum',
    priceUSD: 449,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '3-5 months',
    description:
      'Async self-paced coverage of the full DAT Biology section — Campbell Biology end-to-end with anatomy/physiology weighting matched to ADA outline. 40-question section mocks, recorded video library, WhatsApp doubt access.',
    features: [
      'Campbell Biology full coverage',
      'Anatomy/physiology weighted to ADA outline',
      'Genetics, evolution, ecology depth',
      '200+ practice questions with explanations',
      'Recorded session library',
      'WhatsApp doubt support',
    ],
    schemaUnitText: 'ANN',
  },
  {
    id: 'small-batch-bio',
    name: 'Ascent — DAT Biology',
    subtitle: '4-6 students · Bi-weekly office hours · Weekly live sessions',
    priceUSD: 899,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '3-5 months',
    description:
      'Live small-batch programme (4-6 students max) with weekly biology-specialist faculty sessions, monthly 40-question section mocks, peer learning structure, and senior-faculty office hours. The most popular tier for students targeting 22+ Bio score.',
    features: [
      'Everything in Self-Paced',
      'Weekly live sessions (2 hours)',
      'Monthly 40-question section mocks',
      'Peer study group + Slack channel',
      'Senior faculty office hours',
      'ADA outline mapping',
    ],
    highlight: true,
    schemaUnitText: 'ANN',
  },
  {
    id: 'one-on-one-senior',
    name: 'Pinnacle — DAT Biology',
    subtitle: 'AIIMS-trained · Weekly 1:1 · Personalised study plan',
    priceUSD: 1399,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '3-5 months',
    description:
      'One-on-one with Cerebrum senior faculty (AIIMS-trained biology specialists). Personalised study plan, weekly 1:1 video sessions, custom drill on weak areas (typically anatomy/physiology for AP-Bio veterans, or genetics for non-bio majors), and unlimited WhatsApp access. For students targeting 24+ Bio.',
    features: [
      'Everything in Small-Batch',
      'Weekly 1:1 video session (90 min)',
      'Personalised study plan + diagnostic',
      'Custom drilling on weak topics',
      'Mock exam analysis 1:1',
      'Unlimited WhatsApp faculty access',
    ],
    schemaUnitText: 'ANN',
  },
]

export const DAT_ADHOC_TUTORING_USD_PER_HOUR = 135

export function datPricingAsCourseOffers(pageUrl: string) {
  const programmes = datPricingProducts.map((p) => ({
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
  programmes.push({
    '@type': 'Offer',
    name: 'DAT Biology 1:1 Tutoring (per hour, ad-hoc)',
    price: DAT_ADHOC_TUTORING_USD_PER_HOUR,
    priceCurrency: 'USD',
    url: pageUrl,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: DAT_ADHOC_TUTORING_USD_PER_HOUR,
      priceCurrency: 'USD',
      unitText: 'HOUR',
    },
    availability: 'https://schema.org/InStock',
  })
  return programmes
}
