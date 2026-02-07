import { Locality } from '@/data/localities'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface LocalBusinessSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  telephone: string
  email?: string
  address: {
    '@type': string
    addressLocality: string
    addressRegion: string
    addressCountry: string
    postalCode?: string
  }
  geo: {
    '@type': string
    latitude: number
    longitude: number
  }
  areaServed: {
    '@type': string
    name: string
  }
  serviceArea?: Array<{
    '@type': string
    name: string
  }>
  priceRange: string
  aggregateRating?: {
    '@type': string
    ratingValue: string
    bestRating: string
    worstRating: string
    ratingCount: string
  }
  review?: Array<{
    '@type': string
    author: {
      '@type': string
      name: string
    }
    reviewRating: {
      '@type': string
      ratingValue: string
      bestRating: string
    }
    reviewBody: string
  }>
}

interface FAQSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

interface BreadcrumbSchema {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item: string
  }>
}

interface EducationalOrganizationSchema {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  logo: string
  sameAs: string[]
  address: {
    '@type': string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  contactPoint: {
    '@type': string
    telephone: string
    contactType: string
    availableLanguage: string[]
  }
  hasOfferCatalog: {
    '@type': string
    name: string
    itemListElement: Array<{
      '@type': string
      itemOffered: {
        '@type': string
        name: string
        description: string
        provider: {
          '@type': string
          name: string
        }
      }
    }>
  }
}

export function generateLocalBusinessSchema(
  locality: Locality,
  baseUrl: string = 'https://cerebrumbiologyacademy.com'
): LocalBusinessSchema {
  const pageUrl = `${baseUrl}/locations/${locality.citySlug}/${locality.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy - ${locality.displayName}`,
    description: locality.seo.description,
    url: pageUrl,
    telephone: CONTACT_INFO.phone.display.hyphenated.primary,
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality.city,
      addressRegion: locality.state,
      addressCountry: 'IN',
      postalCode: locality.pincode[0],
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locality.coordinates.lat,
      longitude: locality.coordinates.lng,
    },
    areaServed: {
      '@type': 'City',
      name: locality.displayName,
    },
    serviceArea: locality.nearbyLocalities.slice(0, 5).map((nearbySlug) => ({
      '@type': 'Place',
      name: nearbySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    })),
    priceRange: '₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '32',
    },
    review: locality.socialProof.successStories.slice(0, 3).map((story, index) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: story.split(' ')[0], // Extract first name from success story
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      reviewBody: story,
    })),
  }
}

export function generateFAQSchema(locality: Locality): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locality.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(
  locality: Locality,
  baseUrl: string = 'https://cerebrumbiologyacademy.com'
): BreadcrumbSchema {
  return {
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
        name: locality.city,
        item: `${baseUrl}/locations/${locality.citySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: locality.displayName,
        item: `${baseUrl}/locations/${locality.citySlug}/${locality.slug}`,
      },
    ],
  }
}

export function generateCourseSchema(
  locality: Locality,
  baseUrl: string = 'https://cerebrumbiologyacademy.com'
): EducationalOrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy - ${locality.displayName}`,
    description: `Premium NEET Biology Coaching in ${locality.displayName}`,
    url: `${baseUrl}/locations/${locality.citySlug}/${locality.slug}`,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://facebook.com/cerebrumbiologyacademy',
      'https://instagram.com/cerebrumbiologyacademy',
      'https://twitter.com/cerebrumbiology',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality.city,
      addressRegion: locality.state,
      addressCountry: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone.display.hyphenated.primary,
      contactType: 'Admissions',
      availableLanguage: ['English', 'Hindi'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Foundation Course',
            description: 'Complete Biology foundation for NEET aspirants',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Dropper Intensive',
            description: 'Intensive Biology coaching for NEET droppers',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
            },
          },
        },
      ],
    },
  }
}

export function generateAllSchemas(
  locality: Locality,
  baseUrl: string = 'https://cerebrumbiologyacademy.com'
) {
  return {
    localBusiness: generateLocalBusinessSchema(locality, baseUrl),
    faq: generateFAQSchema(locality),
    breadcrumb: generateBreadcrumbSchema(locality, baseUrl),
    course: generateCourseSchema(locality, baseUrl),
  }
}
