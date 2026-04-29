/**
 * /ap-biology-tutor-new-york
 *
 * AP Biology US metro page targeting NYC + Long Island + Westchester.
 *
 * Page architecture (per the AP Biology US domination plan):
 *  - en_US locale + hreflang alternates (we are explicitly US-targeted)
 *  - EducationalOrganization + Course + FAQPage + BreadcrumbList schemas
 *  - Speakable schema for voice-search / AEO
 *  - Cross-link to /usabo-coaching-new-york (sister cluster)
 *  - Cross-link to /ap-biology-tutor (parent canonical)
 *  - Built from APBiologyCityTemplate + apBiologyMetros[new-york] data
 */

import type { Metadata } from 'next'
import { buildAPBiologyMetroMetadata } from '@/lib/seo/metadata'
import APBiologyCityTemplate from '@/components/ap-biology/APBiologyCityTemplate'
import { getMetroBySlug } from '@/data/ap-biology/metros'
import { notFound } from 'next/navigation'

const SLUG = 'new-york'
const metro = getMetroBySlug(SLUG)
const CANONICAL = `/ap-biology-tutor-${SLUG}`
const SITE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = buildAPBiologyMetroMetadata({
  title: 'AP Biology Tutor New York | NYC + Long Island + Westchester | Cerebrum Academy',
  description:
    'AP Biology tutoring for New York students — Stuyvesant, Bronx Science, Hunter, Trinity, Horace Mann, Dalton, Spence and more. PhD biology faculty, FRQ rubric mastery, Eastern Time live classes. From $1,800.',
  keywords: [
    'AP Biology tutor New York',
    'AP Biology tutor NYC',
    'AP Biology tutor Manhattan',
    'AP Biology tutor Long Island',
    'AP Biology tutor Westchester',
    'AP Bio tutor Stuyvesant',
    'AP Bio tutor Bronx Science',
    'AP Bio tutor Hunter College High School',
    'AP Biology tutoring Trinity School',
    'AP Biology tutor Horace Mann',
    'AP Biology score 5 NYC',
    'AP Biology FRQ tutor New York',
    'USABO tutor New York',
    'BS/MD prep New York',
    'private AP Biology tutor New York',
    'online AP Biology tutor NYC',
  ],
  canonical: CANONICAL,
})

export default function APBiologyTutorNewYorkPage() {
  if (!metro) notFound()

  // Schema.org Course + EducationalOrganization + FAQPage +
  // BreadcrumbList. All four must validate green in Google Rich
  // Results Test before shipping more metro pages.
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AP Biology Tutoring for New York Students',
    description:
      'AP Biology 1:1 tutoring for New York students with PhD biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Live in Eastern Time.',
    url: `${SITE_URL}${CANONICAL}`,
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
        url: `${SITE_URL}${CANONICAL}`,
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Senior Faculty 1:1 — 12 hours',
          price: '1800',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Senior Faculty 1:1 — 48 hours (Elite)',
          price: '5760',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Junior Faculty 1:1 — 12 hours',
          price: '900',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'Small Batch (4–6 students) — 16 hours',
          price: '640',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      ],
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
        name: 'New York',
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${CANONICAL}#webpage`,
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
      <APBiologyCityTemplate metro={metro} />
    </>
  )
}
