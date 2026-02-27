import { Metadata } from 'next'
import { Locality } from '@/data/localities'

export function generateLocalityMetadata(
  locality: Locality,
  baseUrl: string = 'https://cerebrumbiologyacademy.com'
): Metadata {
  const pageUrl = `${baseUrl}/locations/${locality.citySlug}/${locality.slug}`
  const ogTitle = `NEET Biology Coaching in ${locality.displayName}`
  const imageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent('Expert Faculty • Small Batches • Proven Results')}&locality=${encodeURIComponent(locality.displayName)}`

  return {
    title: locality.seo.title,
    description: locality.seo.description,
    keywords: [...locality.seo.keywords, ...locality.seo.localKeywords],
    authors: [{ name: 'Cerebrum Biology Academy' }],
    creator: 'Cerebrum Biology Academy',
    publisher: 'Cerebrum Biology Academy',
    robots: {
      index: locality.seo.metaRobots.includes('index'),
      follow: locality.seo.metaRobots.includes('follow'),
      googleBot: {
        index: locality.seo.metaRobots.includes('index'),
        follow: locality.seo.metaRobots.includes('follow'),
        'max-snippet': -1,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: locality.seo.title,
      description: locality.seo.description,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locality.seo.title,
      description: locality.seo.description,
      images: [imageUrl],
      creator: '@cerebrumbiology',
    },
    other: {
      'geo.region': `IN-${locality.state === 'Delhi' ? 'DL' : locality.state === 'Haryana' ? 'HR' : 'UP'}`,
      'geo.placename': locality.displayName,
      'geo.position': `${locality.coordinates.lat};${locality.coordinates.lng}`,
      ICBM: `${locality.coordinates.lat}, ${locality.coordinates.lng}`,
      'DC.title': locality.seo.title,
      'DC.description': locality.seo.description,
      'DC.subject': 'NEET Biology Coaching',
      'DC.language': 'en',
      'DC.coverage': locality.displayName,
    },
  }
}

export function generateCityMetadata(
  city: string,
  citySlug: string,
  localities: Locality[],
  baseUrl: string = 'https://cerebrumbiologyacademy.com'
): Metadata {
  const pageUrl = `${baseUrl}/locations/${citySlug}`
  const localityCount = localities.length
  const ogTitle = `NEET Biology Coaching in ${city}`
  const imageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(`${localityCount} Locations • Expert Faculty • Proven Results`)}&locality=${encodeURIComponent(city)}`

  return {
    title: `NEET Biology Coaching in ${city} | ${localityCount} Locations | Cerebrum Academy`,
    description: `Find the best NEET Biology coaching in ${city}. We serve ${localityCount} locations across ${city} with expert faculty, small batches, and proven results. Join top NEET Biology coaching near you.`,
    keywords: [
      `neet coaching ${city.toLowerCase()}`,
      `biology coaching ${city.toLowerCase()}`,
      `neet ${city.toLowerCase()}`,
      `best coaching ${city.toLowerCase()}`,
    ],
    authors: [{ name: 'Cerebrum Biology Academy' }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: `NEET Biology Coaching in ${city} - ${localityCount} Locations`,
      description: `Find the best NEET Biology coaching in ${city}. ${localityCount} locations across ${city}.`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `NEET Biology Coaching in ${city} - ${localityCount} Locations`,
      description: `Find the best NEET Biology coaching in ${city}. ${localityCount} locations across ${city}.`,
      images: [imageUrl],
    },
  }
}

export function generateLocationsIndexMetadata(
  baseUrl: string = 'https://cerebrumbiologyacademy.com'
): Metadata {
  const pageUrl = `${baseUrl}/locations`
  const ogTitle = 'NEET Biology Coaching Locations - Delhi NCR'
  const imageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent('51 Locations • Delhi • Noida • Gurugram • Faridabad')}`

  return {
    title: 'NEET Biology Coaching Locations | Delhi NCR | Cerebrum Academy',
    description:
      'Find Cerebrum Biology Academy coaching centers across Delhi NCR. We serve 51 locations in Delhi, Noida, Gurugram, Faridabad, Ghaziabad, and Bahadurgarh. Expert NEET Biology coaching near you.',
    keywords: [
      'neet coaching delhi ncr',
      'biology coaching locations',
      'neet coaching near me',
      'biology coaching delhi noida gurugram',
    ],
    authors: [{ name: 'Cerebrum Biology Academy' }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: ogTitle,
      description: '51 locations across Delhi NCR. Find the best NEET Biology coaching near you.',
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: '51 locations across Delhi NCR. Find the best NEET Biology coaching near you.',
      images: [imageUrl],
    },
  }
}
