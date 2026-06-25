/**
 * AP Biology pricing — Pinnacle / Ascent / Pursuit annual tiers.
 *
 * Annual commitment (12 months) aligned with the school-year cycle.
 * Geo-tiered 1:1 hourly rates are handled by APBiologyCityTemplate
 * via the metro's `pricingTier` field — this file defines the
 * canonical annual packages.
 */

export interface APBiologyPricingTier {
  id: 'pinnacle' | 'ascent' | 'pursuit'
  name: string
  subtitle: string
  priceUSD: number
  label: string
  batchSize: string
  oneOnOne: string
  duration: string
  features: string[]
  highlight?: boolean
}

export const apBiologyPricingTiers: APBiologyPricingTier[] = [
  {
    id: 'pursuit',
    name: 'AP Biology — Pursuit',
    subtitle: 'Group-first · Monthly 1:1 · 24+ live hours',
    priceUSD: 2500,
    label: '$2,500/yr',
    batchSize: '20–25 students',
    oneOnOne: 'Monthly 1:1 check-in',
    duration: '12 months (school year)',
    features: [
      'All 8 College Board CED units',
      'Group FRQ practice sessions',
      '24+ live hours per year',
      'Recorded session library',
      'WhatsApp doubt support',
      'Monthly 1:1 progress check-in',
    ],
  },
  {
    id: 'ascent',
    name: 'AP Biology — Ascent',
    subtitle: 'Balanced · Bi-weekly 1:1 · 36+ live hours',
    priceUSD: 4500,
    label: '$4,500/yr',
    batchSize: '12–16 students',
    oneOnOne: 'Bi-weekly 1:1',
    duration: '12 months (school year)',
    features: [
      'Everything in Pursuit',
      'FRQ rubric drilling with faculty feedback',
      '36+ live hours per year',
      'Practice exam bank + monthly mocks',
      'Bi-weekly 1:1 with senior faculty',
      'Anki active-recall deck templates',
    ],
    highlight: true,
  },
  {
    id: 'pinnacle',
    name: 'AP Biology — Pinnacle',
    subtitle: 'Premium · Weekly senior 1:1 · USABO bridge',
    priceUSD: 7000,
    label: '$7,000/yr',
    batchSize: '6–10 students',
    oneOnOne: 'Weekly 1:1 with senior faculty',
    duration: '12 months (school year)',
    features: [
      'Everything in Ascent',
      'FRQ rubric mastery (exam-scorer-level)',
      '48+ live hours per year',
      'USABO bridge curriculum (Open + Semifinal)',
      'Weekly 1:1 with senior biology specialist',
      'Personalised study plan + diagnostic',
      'College application biology narrative support',
    ],
  },
]
