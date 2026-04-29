/**
 * APBiologySchoolSchemas
 *
 * Server component that emits schema.org JSON-LD for an AP Biology
 * per-school feeder page:
 *  - Course (with EducationalOrganization provider, areaServed at the
 *    school's state, and 4 USD Offer price points)
 *  - FAQPage
 *  - BreadcrumbList (Home → AP Tutoring → Metro → School)
 *  - Speakable (WebPage with cssSelector)
 *
 * Trademark caution: we do NOT emit a Place schema referencing the
 * school's official address. Doing so could imply affiliation. The
 * Course's areaServed uses the AdministrativeArea (state) only.
 */

import type { APBiologySchool } from '@/data/ap-biology/schools'
import { getMetroBySlug } from '@/data/ap-biology/metros'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

const PRICE_OFFERS = [
  { name: 'Senior Faculty 1:1 — 12 hours', price: '1800' },
  { name: 'Senior Faculty 1:1 — 48 hours (Elite)', price: '5760' },
  { name: 'Junior Faculty 1:1 — 12 hours', price: '900' },
  { name: 'Small Batch (4–6 students) — 16 hours', price: '640' },
]

interface APBiologySchoolSchemasProps {
  school: APBiologySchool
}

export function APBiologySchoolSchemas({ school }: APBiologySchoolSchemasProps) {
  const canonical = `${SITE_URL}/ap-biology-tutor-${school.slug}`
  const metro = getMetroBySlug(school.metroSlug)

  // Extract state from cityState ("Alexandria, Virginia" → "VA").
  // Fall back to the metro's addressRegion if available.
  const addressRegion = metro?.addressRegion || school.cityState.split(',').pop()?.trim() || 'US'

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `AP Biology Tutoring for ${school.shortName} Students`,
    description: `AP Biology 1:1 tutoring tailored to ${school.shortName}'s pace and curriculum, with PhD biology faculty, College Board–aligned methodology, and FRQ rubric mastery. Live in ${school.timezone}.`,
    url: canonical,
    inLanguage: 'en-US',
    educationalLevel: 'High School',
    educationalCredentialAwarded: 'AP Biology Exam Preparation',
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
      '@type': 'AdministrativeArea',
      name: school.cityState,
      address: {
        '@type': 'PostalAddress',
        addressRegion,
        addressCountry: 'US',
      },
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT3H',
      location: {
        '@type': 'VirtualLocation',
        url: canonical,
      },
      offers: PRICE_OFFERS.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        price: offer.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
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

  // Breadcrumb: Home → AP Biology Tutoring → {Metro} → {School}
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
        name: 'AP Biology Tutoring',
        item: `${SITE_URL}/ap-biology-tutor`,
      },
      ...(metro
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: metro.cityName,
              item: `${SITE_URL}/ap-biology-tutor-${metro.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: school.shortName,
              item: canonical,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 3,
              name: school.shortName,
              item: canonical,
            },
          ]),
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
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
