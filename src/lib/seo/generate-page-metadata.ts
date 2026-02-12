import { Metadata } from 'next'

export type PageType = 'neet-coaching' | 'biology-tuition' | 'neet-preparation' | 'online-coaching'

export interface LocalityMetadataParams {
  locality: string
  area?: string
  type: PageType
  customTitle?: string
  customDescription?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'

const TYPE_TEMPLATES: Record<PageType, { titleTemplate: string; descriptionTemplate: string }> = {
  'neet-coaching': {
    titleTemplate: 'Best NEET Biology Coaching in {locality} | 98% Success Rate | Cerebrum',
    descriptionTemplate:
      'Join the #1 NEET Biology coaching in {locality}. Expert faculty, proven 98% success rate, 695/720 top score. Personalized batches, doubt clearing, and test series. Book free demo!',
  },
  'biology-tuition': {
    titleTemplate: 'Biology Tuition in {locality} | Class 11-12 & NEET | Cerebrum Academy',
    descriptionTemplate:
      'Premium biology tuition in {locality} for Class 11, 12 & NEET. Experienced teachers, small batches, interactive learning. 2500+ successful students. Enroll now!',
  },
  'neet-preparation': {
    titleTemplate: 'NEET 2026 Preparation in {locality} | Expert Coaching | Cerebrum Academy',
    descriptionTemplate:
      'Comprehensive NEET 2026 preparation in {locality}. Complete biology syllabus, mock tests, doubt sessions. Join 1,50,000+ students who achieved their medical dreams!',
  },
  'online-coaching': {
    titleTemplate: 'Online NEET Biology Coaching from {locality} | Live Classes | Cerebrum',
    descriptionTemplate:
      'Join premium online NEET biology coaching from {locality}. Live interactive classes, recorded sessions, AI-powered learning. Study from home with top results!',
  },
}

export function generateLocalityMetadata({
  locality,
  area,
  type,
  customTitle,
  customDescription,
}: LocalityMetadataParams): Metadata {
  const template = TYPE_TEMPLATES[type]
  const displayLocality = area ? `${area}, ${locality}` : locality

  const title = customTitle || template.titleTemplate.replace(/{locality}/g, displayLocality)

  const description =
    customDescription || template.descriptionTemplate.replace(/{locality}/g, displayLocality)

  const ogImageParams = new URLSearchParams({
    title: type === 'neet-coaching' ? `NEET Biology Coaching` : `Biology Tuition`,
    subtitle: `Expert coaching in ${displayLocality}`,
    locality: displayLocality,
  })

  const ogImageUrl = `${BASE_URL}/api/og?${ogImageParams.toString()}`

  return {
    title,
    description,
    keywords: generateKeywords(locality, area, type),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}`,
      siteName: 'Cerebrum Biology Academy',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Cerebrum Biology Academy`,
        },
      ],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${BASE_URL}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

function generateKeywords(locality: string, area: string | undefined, type: PageType): string[] {
  const baseKeywords = [
    'NEET biology',
    'NEET coaching',
    'biology tuition',
    'NEET preparation',
    'medical entrance',
    'Cerebrum Biology Academy',
  ]

  const localityKeywords = [
    `NEET coaching ${locality}`,
    `biology tuition ${locality}`,
    `NEET classes ${locality}`,
    `biology coaching ${locality}`,
  ]

  if (area) {
    localityKeywords.push(
      `NEET coaching ${area}`,
      `biology tuition ${area}`,
      `biology classes ${area}`
    )
  }

  const typeKeywords: Record<PageType, string[]> = {
    'neet-coaching': ['best NEET coaching', 'NEET biology expert', 'NEET 2026'],
    'biology-tuition': ['class 11 biology', 'class 12 biology', 'CBSE biology'],
    'neet-preparation': ['NEET 2026 preparation', 'NEET study material', 'NEET test series'],
    'online-coaching': ['online NEET classes', 'live biology classes', 'online tutoring'],
  }

  return [...baseKeywords, ...localityKeywords, ...typeKeywords[type]]
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateLocalBusinessSchema(params: {
  locality: string
  address?: string
  coordinates?: { lat: number; lng: number }
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy - ${params.locality}`,
    description: `Premier NEET Biology coaching and biology tuition in ${params.locality}. 98% success rate with expert faculty.`,
    url: BASE_URL,
    telephone: '+91-8826444334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: params.address || 'South Delhi',
      addressLocality: params.locality,
      addressRegion: 'Delhi',
      addressCountry: 'IN',
    },
    ...(params.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: params.coordinates.lat,
        longitude: params.coordinates.lng,
      },
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '32',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [params.locality, 'South Delhi', 'Delhi NCR'],
    priceRange: '₹₹',
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
    ],
  }
}
