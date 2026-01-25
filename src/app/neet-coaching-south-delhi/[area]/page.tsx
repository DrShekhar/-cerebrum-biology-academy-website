import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { areaDetails, getAllAreaSlugs, getAreaBySlug } from '@/data/south-delhi-areas'
import AreaPageContent from './AreaPageContent'

interface PageProps {
  params: Promise<{ area: string }>
}

export async function generateStaticParams() {
  return getAllAreaSlugs().map((area) => ({
    area,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug } = await params
  const area = getAreaBySlug(areaSlug)

  if (!area) {
    return {
      title: 'Area Not Found | Cerebrum Biology Academy',
    }
  }

  const title = `Best NEET Coaching in ${area.name} | Cerebrum Biology Academy`
  const description = `${area.heroDescription} Join Cerebrum Biology Academy for expert NEET Biology coaching near ${area.nearbyMetro[0] || area.name}. Small batches, personal mentorship, flexible timings.`

  return {
    title,
    description,
    keywords: [
      `NEET coaching ${area.name}`,
      `NEET coaching near ${area.name}`,
      `Best NEET coaching ${area.fullName}`,
      `Biology coaching ${area.name}`,
      `NEET preparation ${area.name}`,
      `Medical coaching ${area.name}`,
      ...area.schools.map((school) => `NEET coaching for ${school} students`),
      ...area.nearbyMetro.map((metro) => `NEET coaching near ${metro}`),
    ],
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://cerebrumbiologyacademy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Coaching in ${area.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function SouthDelhiAreaPage({ params }: PageProps) {
  const { area: areaSlug } = await params
  const area = getAreaBySlug(areaSlug)

  if (!area) {
    notFound()
  }

  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `Cerebrum Biology Academy - ${area.name}`,
    description: `Best NEET coaching in ${area.name}, South Delhi. ${area.description}`,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
    telephone: '+91-8826444334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near IIT Delhi',
      addressLocality: area.name,
      addressRegion: 'Delhi',
      postalCode: area.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5459',
      longitude: '77.1926',
    },
    areaServed: {
      '@type': 'City',
      name: area.name,
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}#localbusiness`,
    name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
    description: area.heroDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
    telephone: '+91-8826444334',
    email: 'info@cerebrumbiologyacademy.com',
    priceRange: '₹₹',
    image: 'https://cerebrumbiologyacademy.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kalu Sarai, Near IIT Delhi',
      addressLocality: area.name,
      addressRegion: 'Delhi',
      postalCode: area.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5459',
      longitude: '77.1926',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Class 11+12 Comprehensive NEET Biology',
            description: 'Complete 2-year NEET Biology preparation program',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Class 12 Intensive NEET Biology',
            description: '1-year intensive NEET Biology course for Class 12 students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Dropper Batch NEET Biology',
            description: '1-year comprehensive revision course for NEET repeaters',
          },
        },
      ],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching South Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${area.name}`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
      },
    ],
  }

  return (
    <>
      <AreaPageContent area={area} areaSlug={areaSlug} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalOrgSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
