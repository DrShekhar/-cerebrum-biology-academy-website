/**
 * USMLE Step 1 Biology / Foundational Sciences pricing — source of
 * truth for /best-usmle-step-1-biology-tutor, programme hub, section
 * pages (biochem, microbiology-immunology, physiology), and the First
 * Aid supplement page.
 *
 * Step 1 went Pass/Fail in January 2022 — the test is binary, but the
 * prep market remains enormous because (a) ~7% fail rate is binary
 * catastrophe (delays residency by 1+ year), and (b) ~25% of US
 * residency programmes still use Step 1 transcript signals for IMG
 * filtering. The IMG (International Medical Graduate) audience is the
 * dominant Cerebrum target — Indian/Pakistani/Caribbean medical school
 * graduates preparing for ECFMG certification.
 *
 * Pricing wedge: UWorld Step 1 QBank ($499–$799), AMBOSS ($479–$799),
 * Sketchy ($299–$499), other USMLE generalist brands ($3,499+), other USMLE generalist brands
 * ($3,200), USMLE-Rx ($339+). Cerebrum competes on biology-foundation
 * pedagogy — specifically biochemistry, molecular biology, microbiology,
 * immunology, and pathophysiology — at biology-specialist price points
 * 30–40% below other USMLE generalist brands.
 *
 * USD-only — Step 1 audience pays in USD regardless of home country.
 */

export type USMLEStep1ProductId =
  | 'self-paced-foundations'
  | 'small-batch-foundations'
  | 'one-on-one-senior'

export interface USMLEStep1PricingProduct {
  id: USMLEStep1ProductId
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

export const usmleStep1PricingProducts: USMLEStep1PricingProduct[] = [
  {
    id: 'self-paced-foundations',
    name: 'Pursuit — USMLE Step 1 Biology',
    subtitle: 'Accessible · Async track · 4-6 month curriculum',
    priceUSD: 799,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'Async self-paced coverage of Step 1 foundational sciences with a biology emphasis — biochemistry & molecular biology, microbiology & immunology, physiology, and the biology-driven pathophysiology that underpins pathology. First Aid mapped chapter-by-chapter; UWorld QBank integration walkthroughs; recorded video library; WhatsApp doubt access.',
    features: [
      'First Aid Step 1 mapped end-to-end',
      'Biochemistry & molecular biology deep dive',
      'Microbiology & immunology drill structure',
      'Physiology + pathophysiology bridging',
      'UWorld QBank walkthrough library',
      'WhatsApp doubt support',
    ],
    schemaUnitText: 'ANN',
  },
  {
    id: 'small-batch-foundations',
    name: 'Ascent — USMLE Step 1 Biology',
    subtitle: '4-6 IMG / M1-M2 students · Weekly live sessions',
    priceUSD: 1599,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'Live small-batch programme (4-6 students max) with weekly biology-specialist faculty sessions, monthly NBME-pattern foundational sciences mocks, peer learning structure, and senior-faculty office hours. The most popular tier for IMG students starting their dedicated study period.',
    features: [
      'Everything in Self-Paced',
      'Weekly live sessions (2 hours)',
      'Monthly NBME-pattern foundational mocks',
      'Peer study group + Slack channel',
      'Senior faculty office hours',
      'UWorld block analysis live',
    ],
    highlight: true,
    schemaUnitText: 'ANN',
  },
  {
    id: 'one-on-one-senior',
    name: 'Pinnacle — USMLE Step 1 Biology',
    subtitle: 'AIIMS-trained · Weekly 1:1 · Personalised dedicated period plan',
    priceUSD: 2499,
    unit: 'package',
    unitLabel: '/ full programme',
    duration: '4-6 months',
    description:
      'One-on-one with Cerebrum senior faculty (AIIMS-trained biology specialists). Personalised dedicated-period study plan, weekly 1:1 video sessions, custom drill on weak biological-sciences blocks (commonly biochemistry pathways or immunology), and unlimited WhatsApp access. For IMGs who failed an NBME diagnostic or M1/M2 students targeting a top-tier residency match signal.',
    features: [
      'Everything in Small-Batch',
      'Weekly 1:1 video session (90 min)',
      'Personalised dedicated-period plan',
      'Custom UWorld/NBME error log analysis',
      'CCS / clinical correlate prep included',
      'Unlimited WhatsApp faculty access',
    ],
    schemaUnitText: 'ANN',
  },
]

/** Hourly tutoring rate for ad-hoc / gap-fill sessions outside the
 *  packaged programmes. Compared to other USMLE generalist brands 1:1 ($230/hr) and
 *  other USMLE generalist brands ($200/hr), this is Cerebrum's per-hour wedge. */
export const USMLE_STEP1_ADHOC_TUTORING_USD_PER_HOUR = 175

/** Course-schema offers[] for USMLE Step 1 pages. All USD base. */
export function usmleStep1PricingAsCourseOffers(pageUrl: string) {
  const programmes = usmleStep1PricingProducts.map((p) => ({
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
    name: 'USMLE Step 1 Biology 1:1 Tutoring (per hour, ad-hoc)',
    price: USMLE_STEP1_ADHOC_TUTORING_USD_PER_HOUR,
    priceCurrency: 'USD',
    url: pageUrl,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: USMLE_STEP1_ADHOC_TUTORING_USD_PER_HOUR,
      priceCurrency: 'USD',
      unitText: 'HOUR',
    },
    availability: 'https://schema.org/InStock',
  })
  return programmes
}
