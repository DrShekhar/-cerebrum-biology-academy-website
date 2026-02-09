import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllLocationSlugs,
  getLocationBySlug,
  getRelatedLocations,
  NEETCoachingLocation,
} from '@/lib/data/neet-coaching-locations'
import { NEETCoachingPageContent } from './NEETCoachingPageContent'

// Generate static params for all locations
export async function generateStaticParams() {
  const slugs = getAllLocationSlugs()
  return slugs.map((slug) => ({ location: slug }))
}

// Generate metadata for each location
export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>
}): Promise<Metadata> {
  const { location: slug } = await params
  const locationData = getLocationBySlug(slug)

  if (!locationData) {
    return {
      title: 'NEET Coaching - Cerebrum Biology Academy',
      description: 'Best NEET biology coaching with AIIMS trained faculty.',
    }
  }

  return {
    title: locationData.title,
    description: locationData.description,
    keywords: [
      `NEET coaching ${locationData.cityName}`,
      `NEET biology ${locationData.cityName}`,
      `best NEET coaching ${locationData.cityName}`,
      `NEET classes ${locationData.cityName}`,
      `NEET preparation ${locationData.cityName}`,
      `NEET tuition ${locationData.cityName}`,
      locationData.state,
    ],
    openGraph: {
      title: locationData.title,
      description: locationData.description,
      type: 'website',
      url: `https://cerebrumbiologyacademy.com/neet-coaching/${slug}`,
      siteName: 'Cerebrum Biology Academy',
      images: [
        {
          url: '/og-neet-coaching.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Coaching in ${locationData.cityName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locationData.title,
      description: locationData.description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching/${slug}`,
    },
  }
}

// Generate structured data for SEO
function generateStructuredData(location: NEETCoachingLocation) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy - NEET Coaching ${location.cityName}`,
    description: location.description,
    url: `https://cerebrumbiologyacademy.com/neet-coaching/${location.slug}`,
    telephone: '+91-8826444334',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.cityName,
      addressRegion: location.state,
      addressCountry: 'IN',
    },
    areaServed: location.localities?.map((l) => l.name) || [location.cityName],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const localBusinessSchema = location.coordinates
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `NEET Coaching ${location.cityName} - Cerebrum Biology Academy`,
        description: location.description,
        url: `https://cerebrumbiologyacademy.com/neet-coaching/${location.slug}`,
        telephone: '+91-8826444334',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.cityName,
          addressRegion: location.state,
          addressCountry: 'IN',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '847',
        },
      }
    : null

  return { organizationSchema, faqSchema, localBusinessSchema }
}

export default async function NEETCoachingLocationPage({
  params,
}: {
  params: Promise<{ location: string }>
}) {
  const { location: slug } = await params
  const locationData = getLocationBySlug(slug)

  if (!locationData) {
    notFound()
  }

  const relatedLocations = getRelatedLocations(slug)
  const { organizationSchema, faqSchema, localBusinessSchema } =
    generateStructuredData(locationData)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <NEETCoachingPageContent
        location={locationData}
        relatedLocations={relatedLocations}
      />
    </>
  )
}
