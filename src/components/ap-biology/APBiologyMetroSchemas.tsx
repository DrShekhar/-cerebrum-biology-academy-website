/**
 * APBiologyMetroSchemas
 *
 * Server component (no 'use client') that emits the four schema.org
 * JSON-LD blocks for an AP Biology metro page:
 *  - Course (with EducationalOrganization provider, areaServed,
 *    CourseInstance, and 4 USD Offer price points)
 *  - FAQPage
 *  - BreadcrumbList
 *  - Speakable (WebPage with cssSelector)
 *
 * Use this in each metro page.tsx so the schemas don't need to be
 * inlined per-page. The page itself only needs to declare metadata
 * (en_US locale via buildAPBiologyMetroMetadata) and render
 * <APBiologyMetroSchemas metro={metro} /> + the city template.
 */

import type { APBiologyMetro } from '@/data/ap-biology/metros'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

// Canonical USD pricing tiers — must match
// src/components/ap-biology/APBiologyCityTemplate.tsx and
// /ap-biology-online-tutor (the price source of truth).
const PRICE_OFFERS = [
  {
    name: 'Senior Faculty 1:1 — 12 hours',
    price: '1800',
  },
  {
    name: 'Senior Faculty 1:1 — 48 hours (Elite)',
    price: '5760',
  },
  {
    name: 'Junior Faculty 1:1 — 12 hours',
    price: '900',
  },
  {
    name: 'Small Batch (4–6 students) — 16 hours',
    price: '640',
  },
]

interface APBiologyMetroSchemasProps {
  metro: APBiologyMetro
}

export function APBiologyMetroSchemas({ metro }: APBiologyMetroSchemasProps) {
  const canonical = `${SITE_URL}/ap-biology-tutor-${metro.slug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `AP Biology Tutoring for ${metro.cityName} Students`,
    description: `AP Biology 1:1 tutoring for ${metro.cityName} students with PhD biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Live in ${metro.timezone}.`,
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
    areaServed: {
      '@type': 'AdministrativeArea',
      name: metro.region,
      address: {
        '@type': 'PostalAddress',
        addressRegion: metro.addressRegion,
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
    mainEntity: metro.faqs.map((faq) => ({
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
        name: 'AP Biology Tutoring',
        item: `${SITE_URL}/ap-biology-tutor`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: metro.cityName,
        item: canonical,
      },
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
