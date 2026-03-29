import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { allClassPricing } from '@/data/pricing'

export const metadata: Metadata = generatePageMetadata('pricing')

function generateOfferSchema() {
  const tierNames: Record<string, string> = {
    pinnacle: 'Pinnacle (Premium)',
    ascent: 'Ascent (Most Popular)',
    pursuit: 'Pursuit (Budget-Friendly)',
    elixir: 'Elixir (Affordable NCERT-Based)',
  }

  const courseTypeNames: Record<string, string> = {
    academic: 'Academic Biology',
    neet: 'NEET Biology',
    'board-neet': 'Board + NEET Biology',
    'elixir-neet': 'Elixir NEET',
    'elixir-board': 'Elixir Board',
  }

  const offers = allClassPricing.flatMap((classPricing) =>
    Object.entries(classPricing.tiers).flatMap(([courseType, tiers]) =>
      (tiers || []).map((tier) => ({
        '@type': 'Offer',
        name: `${classPricing.displayName} ${courseTypeNames[courseType] || courseType} - ${tierNames[tier.tier] || tier.tier}`,
        description: `${classPricing.description}. ${classPricing.duration} program. Batch size: ${tier.batchSize} students. ${tier.hours}.`,
        price: tier.prices.lumpSum.toString(),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: 'https://cerebrumbiologyacademy.com/pricing',
        validFrom: '2026-01-01',
        priceValidUntil: '2026-12-31',
        itemOffered: {
          '@type': 'Course',
          name: `${classPricing.displayName} ${courseTypeNames[courseType] || courseType}`,
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Cerebrum Biology Academy',
          },
        },
      }))
    )
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Cerebrum Biology Academy - Course Pricing',
    description:
      'Complete fee structure for NEET Biology, Board Biology, and Foundation courses. Classes 9-12, Droppers, 2-Year integrated programs.',
    numberOfItems: offers.length,
    itemListElement: offers,
  }
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const offerSchema = generateOfferSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      {children}
    </>
  )
}
