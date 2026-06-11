// Server Component - no client-side interactivity needed
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface CitySchemaProps {
  cityName: string
  citySlug?: string
  state?: string
  stateName?: string // Alias for state
  localities?: string[]
  areaServed?: string[] // Alias for localities
  faqs?: Array<{ question: string; answer: string }>
  studentCount?: string
  coordinates?: { lat: string; lng: string }
  description?: string
  url?: string
}

export function CitySchema({
  cityName,
  citySlug,
  state,
  stateName,
  localities = [],
  areaServed,
  faqs = [],
  studentCount = '2000',
  // No default fallback — previously this defaulted to Delhi coords
  // (28.6139, 77.2090) which leaked into every non-Delhi caller (Noida,
  // Gurugram, etc.), torpedoing local-pack ranking for those cities.
  // When coordinates are not provided, we omit the `geo` field entirely
  // rather than emit wrong coords to Google.
  coordinates,
  description,
  url,
}: CitySchemaProps) {
  // Support both 'state' and 'stateName' props
  const stateValue = state || stateName || 'India'
  // Support both 'localities' and 'areaServed' props
  const localitiesValue = areaServed || localities
  // Generate citySlug from cityName if not provided
  const slug = citySlug || cityName.toLowerCase().replace(/\s+/g, '-')
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const pageUrl = url || `${baseUrl}/neet-coaching-${slug}`

  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${pageUrl}#organization`,
    parentOrganization: {
      '@type': 'EducationalOrganization',
      '@id': `${baseUrl}/#organization`,
    },
    name: `Cerebrum Biology Academy - ${cityName}`,
    description:
      description ||
      `Best NEET Biology Coaching in ${cityName}, ${stateValue}. Expert AIIMS faculty, 98% success rate, personalized attention for ${cityName} students.`,
    url: pageUrl,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    foundingDate: '2014',
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: stateValue,
      addressCountry: 'IN',
    },
    // Conditional geo — only emit when caller provides real coordinates.
    // Spreading {} when absent keeps the object clean and skips the field.
    ...(coordinates
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        }
      : {}),
    areaServed:
      localitiesValue.length > 0
        ? localitiesValue.map((locality) => ({ '@type': 'City', name: locality }))
        : [{ '@type': 'City', name: cityName }],
    // review/aggregateRating removed 2026-06: schema-only self-serving reviews
    // violate Google's review snippet policy (the same two fabricated reviews
    // were template-injected into every city).
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Foundation Course (Class 11)',
            description: 'Complete Biology foundation for NEET aspirants starting in Class 11',
            provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              instructor: { '@type': 'Person', name: 'Dr. Shekhar C Singh (AIIMS)' },
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Intensive Course (Class 12)',
            description: 'Comprehensive Biology coaching for Class 12 NEET preparation',
            provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              instructor: { '@type': 'Person', name: 'Dr. Shekhar C Singh (AIIMS)' },
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Dropper Intensive',
            description: 'Intensive 1-year Biology coaching for NEET droppers',
            provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              instructor: { '@type': 'Person', name: 'Dr. Shekhar C Singh (AIIMS)' },
            },
          },
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone.primary,
      contactType: 'Admissions',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${baseUrl}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${cityName}`,
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
