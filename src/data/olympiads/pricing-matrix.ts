/**
 * Biology Olympiad pricing — source of truth for /biology-olympiads
 * hub and per-olympiad pages (USABO, IBO, BBO, SBO, INBO, CNBO, KBO,
 * NSEB, ABO, CBO, etc.).
 *
 * Olympiad coaching is an intense, short-duration programme. Three
 * product tiers reflect how most Cerebrum olympiad enrolments run:
 * a full annual programme, 1:1 elite mentoring by IBO alumni, and a
 * small-batch weekend programme.
 *
 * All prices in USD. Country-specific conversions via
 * convertForDisplay() in src/data/shared/currencies.ts.
 */

export type OlympiadProductId = 'full-year' | 'elite-mentor' | 'small-batch'

export interface OlympiadPricingProduct {
  id: OlympiadProductId
  name: string
  subtitle: string
  priceUSD: number
  unit: 'hr' | 'year'
  unitLabel: string
  description: string
  features: string[]
  highlight?: boolean
  schemaUnitText: 'HOUR' | 'ANN'
}

export const olympiadPricingProducts: OlympiadPricingProduct[] = [
  {
    id: 'full-year',
    name: 'Complete Olympiad Year',
    subtitle: 'Recommended · 9-12 month programme',
    priceUSD: 4500,
    unit: 'year',
    unitLabel: '/ year',
    description:
      'Full-year structured coaching from first-principles Campbell Biology to national finals. Weekly live classes, past-paper drills, data-analysis modules, and practical labs.',
    features: [
      'Campbell Biology complete coverage',
      'Weekly past-paper drills',
      'Data analysis + statistics modules',
      'Practical and lab-skills training',
      'Mock exams with examiner feedback',
      'Medallist mentor assigned',
    ],
    highlight: true,
    schemaUnitText: 'ANN',
  },
  {
    id: 'elite-mentor',
    name: '1:1 Elite Mentoring',
    subtitle: 'IBO medallist or team trainer',
    priceUSD: 90,
    unit: 'hr',
    unitLabel: '/ hour',
    description:
      'One-on-one sessions with an IBO medallist or national team trainer. Best for score optimisation, advanced topic weaknesses, or final-phase pre-national prep.',
    features: [
      'IBO medallist mentor',
      'Customised topic sequence',
      'Past-paper walkthroughs',
      'Lab skills coaching',
      'Interview preparation',
      'WhatsApp doubt access',
    ],
    schemaUnitText: 'HOUR',
  },
  {
    id: 'small-batch',
    name: 'Small-Batch Weekend',
    subtitle: '4-6 students, Sat and Sun',
    priceUSD: 50,
    unit: 'hr',
    unitLabel: '/ hour',
    description:
      'Weekend small-group programme for students balancing school with olympiad prep. Peer learning plus structured curriculum.',
    features: [
      'Batches of 4-6 students',
      'Weekend schedule',
      'Same Campbell curriculum',
      'Past-paper practice sessions',
      'Peer study group',
      'Monthly parent review',
    ],
    schemaUnitText: 'HOUR',
  },
]

/** Course-schema offers[] for Olympiad pages. */
export function olympiadPricingAsCourseOffers(pageUrl: string) {
  return olympiadPricingProducts.map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: p.priceUSD,
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: p.priceUSD,
      priceCurrency: 'USD',
      unitText: p.schemaUnitText,
    },
    availability: 'https://schema.org/InStock',
    url: `${pageUrl}#pricing`,
  }))
}
