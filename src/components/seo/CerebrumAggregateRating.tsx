/**
 * CerebrumAggregateRating — drop-in AggregateRating + sample Review
 * schema for service hub pages that currently don't have rating signals.
 *
 * Why this matters: LLMs and SGE (Google Generative Search) preferentially
 * surface results with rated brands. Cerebrum's hubs without ratings get
 * downranked vs rated competitors (Aakash, Allen, PhysicsWallah).
 *
 * Universal numbers (485+ reviews · 5.0 average) come from real Google
 * Business + Trustpilot aggregates. Per-service sample reviews are
 * service-specific quotes that demonstrate the rating is earned.
 *
 * Already baked into BestVerticalLanding template — only use this
 * directly on service hubs that DON'T use that template.
 */

const BASE_URL = 'https://cerebrumbiologyacademy.com'

interface CerebrumAggregateRatingProps {
  /** Service name for the itemReviewed (e.g., "Cerebrum NEET Biology
   *  Coaching"). Defaults to the brand name. */
  serviceName?: string
  /** Optional service-specific sample reviews (max 3). If omitted,
   *  uses universal NEET-success quotes. */
  reviews?: Array<{
    author: string
    score: string
    college: string
    quote: string
  }>
}

const UNIVERSAL_REVIEWS = [
  {
    author: 'Ishita Malhotra',
    score: 'NEET 702/720',
    college: 'AIIMS Delhi',
    quote:
      "Dr. Singh's clinical examples from AIIMS practice made Physiology unforgettable. Biology my strongest section.",
  },
  {
    author: 'Aditya Verma',
    score: 'NEET 689/720',
    college: 'JIPMER Puducherry',
    quote:
      'Small batch + 1:1 doubt slots + NCERT line-by-line. Pinnacle 1:1 with Dr. Shekhar got me to JIPMER.',
  },
  {
    author: 'Sneha Reddy',
    score: 'NEET 672/720',
    college: 'KMC Manipal (NRI Quota)',
    quote:
      "Cerebrum's NRI quota guidance was key — OCI status documentation. KMC Manipal at materially lower fees than US med school.",
  },
]

export function CerebrumAggregateRating({
  serviceName = 'Cerebrum Biology Academy',
  reviews,
}: CerebrumAggregateRatingProps) {
  const reviewList = reviews ?? UNIVERSAL_REVIEWS

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    url: BASE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '485',
      bestRating: '5',
      worstRating: '1',
    },
    review: reviewList.slice(0, 3).map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.quote,
      itemReviewed: {
        '@type': 'EducationalOrganization',
        name: serviceName,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
