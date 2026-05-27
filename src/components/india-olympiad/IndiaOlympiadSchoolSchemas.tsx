/**
 * IndiaOlympiadSchoolSchemas
 *
 * Server component that emits schema.org JSON-LD for an India Biology
 * Olympiad per-school feeder page (/biology-olympiad-tutor-{slug}):
 *  - Course (with EducationalOrganization provider, areaServed at the
 *    school's city, USD Offer price points for the three canonical
 *    Olympiad products)
 *  - FAQPage (from school.faqs)
 *  - BreadcrumbList (Home → Biology Olympiads → {School})
 *  - Speakable (WebPage with cssSelector pattern)
 *
 * Trademark caution: we do NOT emit a Place schema referencing the
 * school's official address. The Course's areaServed uses a generic
 * Place node with the school's city only — descriptive, not
 * affiliational.
 */

import type { IndiaOlympiadSchool } from '@/data/india-olympiad/schools'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

/**
 * Canonical India Biology Olympiad offers — USD-base from
 * /src/data/olympiads/pricing-matrix.ts. These are the same three
 * products surfaced on every olympiad page so the Offer schema stays
 * consistent across the site.
 */
const PRICE_OFFERS = [
  {
    name: 'Complete Olympiad Year — 9-12 month NSEB + INBO programme',
    price: '4500',
    unitText: 'ANN',
  },
  {
    name: '1:1 Elite Mentoring — Senior olympiad tutor, per hour',
    price: '90',
    unitText: 'HOUR',
  },
  {
    name: 'Small-Batch Weekend — 4-6 students, per hour',
    price: '50',
    unitText: 'HOUR',
  },
]

interface IndiaOlympiadSchoolSchemasProps {
  school: IndiaOlympiadSchool
  /** Override the default 'en-IN' inLanguage */
  inLanguage?: string
  /** Override the default availableLanguage (['English', 'Hindi']) */
  availableLanguage?: string[]
}

export function IndiaOlympiadSchoolSchemas({
  school,
  inLanguage,
  availableLanguage,
}: IndiaOlympiadSchoolSchemasProps) {
  const canonical = `${SITE_URL}/biology-olympiad-tutor-${school.slug}`
  const lang = inLanguage ?? 'en-IN'
  const langs = availableLanguage ?? ['English', 'Hindi']

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `NSEB & INBO Coaching for ${school.schoolName} Students`,
    description: `NSEB Stage 1 and INBO Stage 2 biology olympiad coaching tailored to ${school.shortName} students in ${school.cityCountry}. Campbell Biology depth, structured past-paper drilling, INBO long-form theory and OCSC practical-skills preparation. AIIMS-trained faculty, live online classes in IST.`,
    url: canonical,
    inLanguage: lang,
    availableLanguage: langs,
    educationalLevel: 'High School',
    educationalCredentialAwarded: 'NSEB → INBO → OCSC → IBO pathway',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
    },
    audience: {
      '@type': 'EducationalAudience',
      audienceType: `Students at ${school.schoolName}`,
    },
    areaServed: {
      '@type': 'Place',
      name: school.cityCountry,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT150H',
      inLanguage: lang,
      location: {
        '@type': 'VirtualLocation',
        url: canonical,
      },
      offers: PRICE_OFFERS.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        price: offer.price,
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: offer.price,
          priceCurrency: 'USD',
          unitText: offer.unitText,
        },
        availability: 'https://schema.org/InStock',
        url: `${canonical}#pricing`,
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: school.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
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
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Biology Olympiads',
        item: `${SITE_URL}/biology-olympiads`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: school.shortName,
        item: canonical,
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    inLanguage: lang,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="title"]', '[data-speakable="summary"]', '.faq-answer'],
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/dr-shekhar-singh-neet-biology-faculty#person`,
    name: 'Dr. Shekhar C Singh',
    alternateName: ['Dr. Shekhar Singh', 'Dr. SC Singh'],
    jobTitle: 'Founder & Lead Biology Faculty',
    description: `AIIMS-trained biology olympiad coach. NSEB, INBO, OCSC, IBO preparation for students at ${school.shortName}.`,
    url: `${SITE_URL}/dr-shekhar-singh-neet-biology-faculty`,
    image: `${SITE_URL}/images/dr-shekhar-singh.webp`,
    affiliation: { '@type': 'EducationalOrganization', '@id': `${SITE_URL}/#organization`, name: 'Cerebrum Biology Academy' },
    knowsAbout: ['NSEB', 'INBO', 'OCSC', 'IBO', 'Biology Olympiad', 'Campbell Biology', 'HBCSE', 'IAPT'],
    sameAs: [`${SITE_URL}/dr-shekhar-singh-neet-biology-faculty`],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}
