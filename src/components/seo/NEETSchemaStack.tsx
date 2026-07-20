/**
 * NEETSchemaStack — bundles Person + Organization + Course + FAQ +
 * Breadcrumb JSON-LD schemas for NEET-related pages (NEET coaching
 * hubs, NEET Biology programmes, city pages, course-format pages).
 *
 * Designed to be a drop-in replacement for the modern AEO pattern on
 * pre-existing pages that have no schema or only partial coverage.
 *
 * Usage:
 *   <NEETSchemaStack
 *     pageUrl="https://cerebrumbiologyacademy.com/neet-coaching-mumbai"
 *     pageName="Best NEET Coaching in Mumbai"
 *     parentHub={{
 *       name: 'NEET Biology Coaching India',
 *       url: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-india',
 *     }}
 *     personKnowsAbout={['NEET Mumbai', 'NEET Biology Mumbai', ...]}
 *     faqs={[ { question: '...', answer: '...' } ]}
 *   />
 *
 * If `faqs` is omitted, FAQPage schema is skipped (the rest still
 * renders). Course schema uses the canonical Cerebrum NEET tier
 * structure unless `coursePricing` override is provided.
 */

interface NEETSchemaStackProps {
  /** Canonical URL of this page */
  pageUrl: string
  /** Page-name fragment used in Breadcrumb position 3 + Person jobTitle */
  pageName: string
  /** Optional parent hub for breadcrumb position 2 */
  parentHub?: { name: string; url: string }
  /** Vertical-specific knowsAbout for Person schema */
  personKnowsAbout?: string[]
  /** FAQs as plain question/answer objects */
  faqs?: { question: string; answer: string }[]
  /** Course override — defaults to canonical NEET tier (Pursuit/Ascent/Pinnacle) */
  coursePricing?: {
    tier: string
    price: number
    description: string
  }[]
  /** Optional dedicated course name (defaults to pageName) */
  courseName?: string
  /** Optional course description (defaults to a NEET-default string) */
  courseDescription?: string
  /** Optional BCP-47 language for the Course (defaults to 'en-IN') */
  inLanguage?: string
  /** Optional educational level (defaults to 'NEET-UG Aspirant') */
  educationalLevel?: string
  /** Optional ISO currency for Course offers (defaults to 'INR') */
  priceCurrency?: string
  /** Optional Person description (defaults to a NEET-centric bio) */
  personDescription?: string
  /** Optional Person awards (defaults to NEET-centric awards) */
  personAward?: string[]
  /** Optional credential awarded (defaults to 'NEET-UG Biology Preparation') */
  educationalCredentialAwarded?: string
}

const DEFAULT_NEET_KNOWS_ABOUT = [
  'NEET-UG Biology',
  'NCERT Class 11 Biology',
  'NCERT Class 12 Biology',
  'NEET Botany',
  'NEET Zoology',
  'NEET Genetics',
  'NEET Human Physiology',
  'NEET Plant Physiology',
  'NEET MCQ Pattern',
  'AIIMS MBBS Preparation',
  'JIPMER Selection',
]

const DEFAULT_NEET_COURSE_TIERS = [
  {
    tier: 'Pursuit (Small-Batch 20-25)',
    price: 40000,
    description:
      'Live small-batch NEET biology classes with senior faculty, weekly chapter tests, doubt sessions. Most affordable structured tier (₹40,000–₹75,000/year).',
  },
  {
    tier: 'Ascent (Pro Batch 12-16)',
    price: 58000,
    description:
      'Tighter batch with weekly 1:1 doubt slots, monthly NEET-pattern mocks, personalised gap analysis. Most popular value tier (₹58,000–₹90,000/year).',
  },
  {
    tier: 'Pinnacle (Direct Dr. Shekhar 6-10)',
    price: 120000,
    description:
      'Micro-batch with direct Dr. Shekhar 1:1 mentoring. Calibrated for AIIMS / top-100 rank aspirants (₹1,20,000–₹1,56,000/year).',
  },
]

export function NEETSchemaStack({
  pageUrl,
  pageName,
  parentHub,
  personKnowsAbout = DEFAULT_NEET_KNOWS_ABOUT,
  faqs,
  coursePricing = DEFAULT_NEET_COURSE_TIERS,
  courseName,
  courseDescription,
  inLanguage = 'en-IN',
  educationalLevel = 'NEET-UG Aspirant',
  priceCurrency = 'INR',
  personDescription = 'AIIMS Delhi alumnus and founder of Cerebrum Biology Academy (2014). 15+ years of biology pedagogy across NEET, IB, AP, MCAT and Biology Olympiad. 680+ medical college selections and a 98% NEET-UG qualification rate.',
  personAward = ['680+ Medical College Selections', '98% NEET-UG Qualification Rate'],
  educationalCredentialAwarded = 'NEET-UG Biology Preparation',
}: NEETSchemaStackProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
    name: 'Dr. Shekhar C Singh',
    alternateName: ['Shekhar Singh', 'Dr Shekhar Singh'],
    honorificPrefix: 'Dr.',
    jobTitle: `Founder & Lead Faculty — ${pageName}`,
    description: personDescription,
    image: 'https://cerebrumbiologyacademy.com/faculty/dr-shekhar-singh.jpg',
    url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
    sameAs: [
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy/',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
      url: 'https://www.aiims.edu/',
    },
    worksFor: {
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
    },
    knowsAbout: personKnowsAbout,
    award: personAward,
  }

  // The canonical EducationalOrganization (#organization) is declared once in the
  // root layout (CerebrumOrgSchema). This stack references it by @id only — it must
  // never re-declare a second Org node (was causing a duplicate "6 centres" entity).

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName ?? pageName,
    description:
      courseDescription ??
      `Comprehensive NEET-UG Biology coaching led by AIIMS-trained faculty. Covers full NCERT Class 11 + Class 12 syllabus with NEET-pattern MCQ drilling, weekly mock tests, and personalised doubt resolution. 680+ medical college selections, 98% NEET-UG qualification rate.`,
    url: pageUrl,
    inLanguage,
    educationalLevel,
    educationalCredentialAwarded,
    provider: {
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
    },
    hasCourseInstance: coursePricing.map((tier) => ({
      '@type': 'CourseInstance' as const,
      name: tier.tier,
      description: tier.description,
      courseMode: 'Online',
      offers: {
        '@type': 'Offer' as const,
        price: tier.price,
        priceCurrency,
        priceSpecification: {
          '@type': 'UnitPriceSpecification' as const,
          price: tier.price,
          priceCurrency,
          unitText: 'ANN',
        },
        url: pageUrl,
        availability: 'https://schema.org/InStock' as const,
      },
    })),
  }

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
      ...(parentHub
        ? [
            {
              '@type': 'ListItem' as const,
              position: 2,
              name: parentHub.name,
              item: parentHub.url,
            },
            {
              '@type': 'ListItem' as const,
              position: 3,
              name: pageName,
              item: pageUrl,
            },
          ]
        : [
            {
              '@type': 'ListItem' as const,
              position: 2,
              name: pageName,
              item: pageUrl,
            },
          ]),
    ],
  }

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
