/**
 * CBO (Canadian Biology Olympiad) pricing — source of truth for
 * /cbo-coaching, /cbo-coaching-toronto, /cbo-coaching-vancouver, and
 * any other CBO landing pages added later.
 *
 * USD is the canonical price unit; CAD display values are derived
 * from sharedCurrencies in src/data/shared/currencies.ts so they
 * track FX moves consistently. Previously these prices were
 * hardcoded inside /cbo-coaching/page.tsx and would have drifted
 * the moment we tweaked the underlying USD base.
 */

import { sharedCurrencies, convertForDisplay } from '@/data/shared/currencies'

export type CBOProductId = 'foundation' | 'intensive' | 'elite'

export interface CBOPricingProduct {
  id: CBOProductId
  name: string
  priceUSD: number
  duration: string
  features: string[]
  popular?: boolean
}

export const cboPricingProducts: CBOPricingProduct[] = [
  {
    id: 'foundation',
    name: 'CBO Foundation',
    priceUSD: 375,
    duration: '3 months',
    features: [
      'Complete Campbell Biology coverage',
      'Weekly live classes (2 hrs/week)',
      'CBO past papers (10 years)',
      'WhatsApp doubt support',
      'Performance tracking',
    ],
  },
  {
    id: 'intensive',
    name: 'CBO Intensive',
    priceUSD: 675,
    duration: '6 months',
    features: [
      'Everything in Foundation',
      '1-on-1 mentoring sessions',
      'Extended live classes (4 hrs/week)',
      'Mock tests with analysis',
      'IBO-level problem solving',
      'Training camp preparation',
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'CBO Elite',
    priceUSD: 1125,
    duration: '12 months',
    features: [
      'Everything in Intensive',
      'Daily doubt clearing',
      'Practical exam preparation',
      'Priority faculty access',
      'International competition prep',
      'Lifetime recorded access',
    ],
  },
]

/** Returns CBO products with display strings ready for the page UI.
 *  Default audience is Canada (CAD primary). */
export function cboPricingForDisplay() {
  const cad = sharedCurrencies.find((c) => c.code === 'CAD')!
  return cboPricingProducts.map((p) => ({
    ...p,
    price: convertForDisplay(p.priceUSD, cad),
    priceUSD: `$${p.priceUSD.toLocaleString('en-US')} USD`,
  }))
}
