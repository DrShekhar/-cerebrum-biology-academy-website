/**
 * IBBiologySchoolSchemas
 *
 * Server component that emits schema.org JSON-LD for an IB Biology
 * per-school feeder page (/ib-biology-tutor-{slug}):
 *  - Course (with EducationalOrganization provider, areaServed at the
 *    school's city/country, USD Offer price points for the three
 *    canonical IB Biology products)
 *  - FAQPage (from school.faqs)
 *  - BreadcrumbList (Home → IB Biology → {School})
 *  - Speakable (WebPage with cssSelector pattern)
 *
 * Trademark caution: we do NOT emit a Place schema referencing the
 * school's official address. The Course's areaServed uses a generic
 * Place node with the school's city + country only — descriptive, not
 * affiliational.
 */

import type { IBBiologySchool } from '@/data/ib-biology/schools'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

/**
 * Canonical IB Biology offers — USD-base from /src/data/ib-biology/pricing-matrix.ts.
 * These are the same three products surfaced on every IB Biology page so the
 * Offer schema stays consistent across the site.
 */
const PRICE_OFFERS = [
  {
    name: 'Complete IB Biology Programme — 2-year (HL + SL, 150+ hours)',
    price: '6000',
    unitText: 'ANN',
  },
  {
    name: '1:1 Elite Tutoring — Examiner-led, per hour',
    price: '75',
    unitText: 'HOUR',
  },
  {
    name: 'Group Batch — 4–8 students, per hour',
    price: '40',
    unitText: 'HOUR',
  },
]

interface IBBiologySchoolSchemasProps {
  school: IBBiologySchool
  /** Override the default school.inLanguage (en-SG / en-AE / en-TH / en-IN) */
  inLanguage?: string
  /** Override the default school.countryCode for PostalAddress.addressCountry */
  addressCountry?: string
  /** Override the default availableLanguage (['English']) */
  availableLanguage?: string[]
}

export function IBBiologySchoolSchemas({
  school,
  inLanguage,
  addressCountry,
  availableLanguage,
}: IBBiologySchoolSchemasProps) {
  const canonical = `${SITE_URL}/ib-biology-tutor-${school.slug}`
  const lang = inLanguage ?? school.inLanguage
  const country = addressCountry ?? school.countryCode
  const langs = availableLanguage ?? ['English']

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `IB Biology Tutoring for ${school.schoolName} Students`,
    description: `IB Biology HL & SL 1:1 tutoring tailored to ${school.shortName}'s pace and IBDP curriculum, with examiner-led faculty, IA mentorship through the DP1–DP2 cycle, Paper 1 and Paper 2 mark-scheme calibration on the 2025 syllabus (first exams May 2025), and live coaching in ${school.timezone}.`,
    url: canonical,
    inLanguage: lang,
    availableLanguage: langs,
    educationalLevel: 'High School',
    educationalCredentialAwarded: 'IB Diploma Programme — Biology HL & SL',
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
        addressCountry: country,
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
        name: 'IB Biology',
        item: `${SITE_URL}/ib-biology`,
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
    </>
  )
}
