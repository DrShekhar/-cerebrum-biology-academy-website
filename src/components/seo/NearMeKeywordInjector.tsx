/**
 * NearMeKeywordInjector — Server Component
 *
 * WHAT IT DOES:
 * Injects "near me" keyword-rich content blocks into location pages.
 * Google treats "NEET coaching near me" as DIFFERENT intent than "NEET coaching Delhi".
 * Without "near me" keywords, you miss 10x more search volume.
 *
 * This component adds:
 * 1. A hidden (but indexable) semantic section with "near me" keyword variations
 * 2. FAQ schema with "near me" questions Google loves
 * 3. Breadcrumb-style location hierarchy for crawl context
 *
 * WHY:
 * "NEET coaching near me Delhi" gets 10x the volume of "NEET coaching Delhi NCR"
 * You rank #1 for the latter but NOT in top 10 for the former.
 */

interface NearMeKeywordInjectorProps {
  location: string // e.g. "South Delhi"
  parentLocation?: string // e.g. "Delhi NCR"
  centerAddress?: string
  centerPhone?: string
  nearbyAreas?: string[] // e.g. ["Greater Kailash", "Defence Colony", "Lajpat Nagar"]
}

export function NearMeKeywordInjector({
  location,
  parentLocation = 'Delhi NCR',
  centerAddress = 'Block D, South Extension Part 2, New Delhi - 110049',
  centerPhone = '+91-8826-444-334',
  nearbyAreas = [],
}: NearMeKeywordInjectorProps) {
  const locationLower = location.toLowerCase()

  // FAQ Schema with "near me" questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Where is the best NEET coaching near me in ${location}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cerebrum Biology Academy is the top-rated NEET biology coaching institute near ${location}. Located at ${centerAddress}, we offer small batch sizes of 15-20 students with AIIMS-trained faculty. Call ${centerPhone} for a free demo class.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the fee for NEET coaching near ${location}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `NEET biology coaching fees near ${location} at Cerebrum Academy start from ₹60,000/year for Class 11 and ₹75,000/year for Class 12. We offer EMI options and merit-based scholarships. Contact ${centerPhone} for current batch pricing.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is there any NEET biology coaching center near me in ${location} with AIIMS faculty?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! Cerebrum Biology Academy near ${location} has faculty with 15+ years of experience from AIIMS. With 98% success rate and 67+ AIIMS selections, we are the highest-rated NEET biology coaching near ${location}, ${parentLocation}. Visit us or call ${centerPhone}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which is the best NEET coaching institute near me for biology in ${parentLocation}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cerebrum Biology Academy is rated #1 for NEET biology coaching in ${parentLocation} with 5.0/5 Google rating. We have centers near ${location}${nearbyAreas.length > 0 ? `, ${nearbyAreas.slice(0, 3).join(', ')}` : ''} and other areas in ${parentLocation}. Call ${centerPhone} to book a free demo.`,
        },
      },
    ],
  }

  // Breadcrumb schema for location hierarchy
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${parentLocation}`,
        item: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching-delhi-ncr',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `NEET Coaching Near Me in ${location}`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-${locationLower.replace(/\s+/g, '-')}`,
      },
    ],
  }

  return (
    <>
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visible "near me" content section — helps Google understand location intent */}
      <section className="bg-gray-50 py-8 px-4 md:px-6 mt-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Best NEET Biology Coaching Near Me in {location}
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Looking for the <strong>best NEET coaching near me in {location}</strong>? Cerebrum Biology
            Academy is the top-rated NEET biology coaching institute near {location}, {parentLocation}.
            Our center is conveniently located at {centerAddress}, easily accessible from{' '}
            {nearbyAreas.length > 0
              ? nearbyAreas.join(', ')
              : `nearby areas in ${location}`}
            .
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            With <strong>AIIMS-trained faculty</strong>, <strong>98% success rate</strong>, and{' '}
            <strong>small batches of 15-20 students</strong>, we provide the best NEET biology
            preparation near {location}. Whether you are searching for{' '}
            <em>NEET coaching near me</em>, <em>biology classes near {location}</em>, or{' '}
            <em>best NEET institute in {parentLocation}</em> — Cerebrum Academy is your answer.
          </p>

          {/* Nearby areas for internal linking */}
          {nearbyAreas.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Also Serving Students Near
              </h3>
              <div className="flex flex-wrap gap-2">
                {nearbyAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Call to action */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${centerPhone.replace(/[^+\d]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              Call Now: {centerPhone}
            </a>
            <a
              href={`https://wa.me/918826444334?text=${encodeURIComponent(`Hi! I'm looking for NEET coaching near ${location}. Please share details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20BD5A] transition-colors text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
