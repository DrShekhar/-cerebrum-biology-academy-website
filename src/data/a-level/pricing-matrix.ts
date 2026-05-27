/**
 * A-Level Biology pricing — single source of truth for every
 * A-Level Biology page that shows pricing tiers.
 *
 * Three clearly-differentiated tiers targeting different student needs:
 *
 *   Pinnacle  — A* targeting, weekly 1:1, small 4-8 batch
 *   Ascent    — strong B/A targeting, bi-weekly 1:1, 8-12 batch
 *   Pursuit   — solid pass targeting, monthly 1:1, 12-16 batch
 *
 * GBP is the baseline currency; USD equivalents are provided for
 * international pages. City-level pages still show their own local
 * currency hourly rates from the city config.
 */

export type ALevelPricingTierId = 'pinnacle' | 'ascent' | 'pursuit'

export interface ALevelPricingTier {
  id: ALevelPricingTierId
  name: string
  subtitle: string
  priceGBP: number
  priceUSD: number
  unit: 'year'
  unitLabel: string
  batchSize: string
  oneOnOneFrequency: string
  targetGrade: string
  description: string
  features: string[]
  highlight?: boolean
}

export const aLevelPricingTiers: ALevelPricingTier[] = [
  {
    id: 'pinnacle',
    name: 'Pinnacle',
    subtitle: 'A* targeting, weekly 1:1',
    priceGBP: 5000,
    priceUSD: 6500,
    unit: 'year',
    unitLabel: '/ year',
    batchSize: '4–8 students',
    oneOnOneFrequency: 'Weekly 1:1 with examiner',
    targetGrade: 'A*',
    description:
      'Our most intensive programme. Weekly 1:1 sessions with a current or former A-Level Biology examiner, small-batch live classes (4-8 students), full specification coverage, practical endorsement coaching, and university application support.',
    features: [
      'Weekly 1:1 with A-Level examiner',
      'Small batch (4–8 students)',
      'Full AQA / OCR / Edexcel / CAIE coverage',
      'CPAC practical endorsement coaching',
      'Past paper bank + mark scheme analysis',
      'UCAS personal statement Biology support',
      'BMAT / UCAT Biology topic integration',
      '24/7 WhatsApp access to tutor',
    ],
    highlight: true,
  },
  {
    id: 'ascent',
    name: 'Ascent',
    subtitle: 'B/A targeting, bi-weekly 1:1',
    priceGBP: 3500,
    priceUSD: 4500,
    unit: 'year',
    unitLabel: '/ year',
    batchSize: '8–12 students',
    oneOnOneFrequency: 'Bi-weekly 1:1 with examiner',
    targetGrade: 'A/B',
    description:
      'Balanced programme with bi-weekly 1:1 sessions and medium-size batch classes. Covers the full specification with exam technique focus and practical skills coaching.',
    features: [
      'Bi-weekly 1:1 with examiner',
      'Medium batch (8–12 students)',
      'Full specification coverage',
      'CPAC practical guidance',
      'Past paper practice sessions',
      'Study materials included',
      'WhatsApp support',
      'Session recordings',
    ],
  },
  {
    id: 'pursuit',
    name: 'Pursuit',
    subtitle: 'Solid pass, monthly 1:1',
    priceGBP: 2000,
    priceUSD: 2500,
    unit: 'year',
    unitLabel: '/ year',
    batchSize: '12–16 students',
    oneOnOneFrequency: 'Monthly 1:1 check-in',
    targetGrade: 'B/C',
    description:
      'Our most affordable route to A-Level Biology success. Monthly 1:1 check-ins, larger batch classes with interactive discussions, and access to all core study materials.',
    features: [
      'Monthly 1:1 check-in',
      'Group batch (12–16 students)',
      'Core specification coverage',
      'Exam technique workshops',
      'Study materials included',
      'Session recordings',
    ],
  },
]

/**
 * JSON-LD Offer objects for Course schema — use on A-Level pages
 * that need structured pricing data.
 */
export function aLevelPricingAsOffers(pageUrl: string) {
  return aLevelPricingTiers.map((tier) => ({
    '@type': 'Offer',
    name: `A-Level Biology — ${tier.name}`,
    price: tier.priceGBP,
    priceCurrency: 'GBP',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: tier.priceGBP,
      priceCurrency: 'GBP',
      unitText: 'ANN',
    },
    availability: 'https://schema.org/InStock',
    url: `${pageUrl}#pricing`,
  }))
}
