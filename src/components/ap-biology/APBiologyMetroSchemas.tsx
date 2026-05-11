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
import { sharedCurrencies } from '@/data/shared/currencies'

const SITE_URL = 'https://cerebrumbiologyacademy.com'

// Canonical USD pricing tiers — must match
// src/components/ap-biology/APBiologyCityTemplate.tsx and
// /ap-biology-online-tutor (the price source of truth).
const PRICE_OFFERS_USD = [
  {
    name: 'Senior Faculty 1:1 — 12 hours',
    priceUSD: 1800,
  },
  {
    name: 'Senior Faculty 1:1 — 48 hours (Elite)',
    priceUSD: 5760,
  },
  {
    name: 'Junior Faculty 1:1 — 12 hours',
    priceUSD: 900,
  },
  {
    name: 'Small Batch (4–6 students) — 16 hours',
    priceUSD: 640,
  },
]

// Map ISO-2 country code to the currency code we should emit in
// schema.org Offer.priceCurrency. Keeps Google's rich result aligned
// with the audience's local currency — Indian searchers see INR,
// UAE searchers see AED, etc. Anything not listed defaults to USD.
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD',
  IN: 'INR',
  AE: 'AED',
  CA: 'CAD',
  SG: 'SGD',
  HK: 'HKD',
  GB: 'GBP',
  AU: 'AUD',
}

function currencyForCountry(country: string): string {
  return COUNTRY_TO_CURRENCY[country.toUpperCase()] || 'USD'
}

function convertPrice(priceUSD: number, currencyCode: string): string {
  if (currencyCode === 'USD') return String(priceUSD)
  const currency = sharedCurrencies.find((c) => c.code === currencyCode)
  if (!currency) return String(priceUSD)
  const raw = priceUSD * currency.rate
  // INR rounds to nearest 100; everything else to nearest whole unit.
  const rounded = currencyCode === 'INR' ? Math.round(raw / 100) * 100 : Math.round(raw)
  return String(rounded)
}

interface APBiologyMetroSchemasProps {
  metro: APBiologyMetro
  /** BCP-47 language tag for the page. Defaults to 'en-US' (the existing
   *  US metros). Set to 'en-AE', 'en-IN', etc. for international pages. */
  inLanguage?: string
  /** ISO-3166 country code for areaServed.address. Defaults to 'US'. */
  addressCountry?: string
  /** Languages this course is delivered in. Defaults to ['English'].
   *  For India NRI pages pass ['English', 'Hindi']. */
  availableLanguage?: string[]
}

export function APBiologyMetroSchemas({
  metro,
  inLanguage = 'en-US',
  addressCountry = 'US',
  availableLanguage = ['English'],
}: APBiologyMetroSchemasProps) {
  const canonical = `${SITE_URL}/ap-biology-tutor-${metro.slug}`
  const offerCurrency = currencyForCountry(addressCountry)

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `AP Biology Tutoring for ${metro.cityName} Students`,
    description: `AP Biology 1:1 tutoring for ${metro.cityName} students with PhD biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Live in ${metro.timezone}.`,
    url: canonical,
    inLanguage,
    availableLanguage,
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
        addressCountry,
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
      offers: PRICE_OFFERS_USD.map((offer) => ({
        '@type': 'Offer',
        name: offer.name,
        price: convertPrice(offer.priceUSD, offerCurrency),
        priceCurrency: offerCurrency,
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
