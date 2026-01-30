// Server Component - no client-side interactivity needed
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface CitySchemaProps {
  cityName: string
  citySlug?: string
  state?: string
  stateName?: string // Alias for state
  localities?: string[]
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
  faqs = [],
  studentCount = '2000',
  coordinates = { lat: '28.6139', lng: '77.2090' },
  description,
  url,
}: CitySchemaProps) {
  // Support both 'state' and 'stateName' props
  const stateValue = state || stateName || 'India'
  // Generate citySlug from cityName if not provided
  const slug = citySlug || cityName.toLowerCase().replace(/\s+/g, '-')
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const pageUrl = url || `${baseUrl}/neet-coaching-${slug}`

  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${pageUrl}#organization`,
    name: `Cerebrum Biology Academy - ${cityName}`,
    description: description || `Best NEET Biology Coaching in ${cityName}, ${stateValue}. Expert AIIMS faculty, 98% success rate, personalized attention for ${cityName} students.`,
    url: pageUrl,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.png`,
    foundingDate: '2014',
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: stateValue,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    areaServed: localities.length > 0
      ? localities.map((locality) => ({ '@type': 'City', name: locality }))
      : [{ '@type': 'City', name: cityName }],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: studentCount,
      reviewCount: Math.floor(parseInt(studentCount.replace(/,/g, '')) * 0.4).toString(),
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Parent of NEET Aspirant' },
        datePublished: '2024-08-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
        reviewBody: `Excellent NEET Biology coaching for ${cityName} students. The faculty is knowledgeable and supportive.`,
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'NEET 2024 Student' },
        datePublished: '2024-06-20',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
        reviewBody: `Best decision was joining Cerebrum. Scored 680+ in NEET with their guidance from ${cityName}.`,
      },
    ],
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
