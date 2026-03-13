import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllAreaSlugs, getAreaBySlug } from '@/data/east-delhi-areas'
import { CEREBRUM_METRICS, AREA_COORDINATES } from '@/lib/constants/metrics'
import AreaPageContent from './AreaPageContent'

interface PageProps {
  params: Promise<{ area: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllAreaSlugs().map((area) => ({
    area,
  }))
}

function getMetaDescriptionByType(area: ReturnType<typeof getAreaBySlug>): string {
  if (!area) return ''

  const schoolsText = area.schools.slice(0, 2).join(', ')
  const metroText = area.nearbyMetro[0] || ''

  switch (area.type) {
    case 'coaching-hub':
      return `Top NEET Biology coaching in ${area.name}, East Delhi - coaching hub. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Near ${metroText}. Small batches, expert guidance. Book free demo!`

    case 'posh':
      return `Premium NEET coaching in ${area.name}, East Delhi for educated families. ${CEREBRUM_METRICS.successRateText} success rate. Serving ${schoolsText} students. Near ${metroText}. Personalized attention, flexible timings. Join now!`

    case 'commercial':
      return `Best NEET Biology coaching near ${area.name}, East Delhi. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Near ${metroText}. Small batches, proven results. Book free demo!`

    case 'residential':
    default:
      return `Best NEET Biology coaching near ${area.name}, East Delhi. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Near ${metroText}. Small batches, personal mentorship. Book free demo!`
  }
}

function getTitleByType(area: ReturnType<typeof getAreaBySlug>): string {
  if (!area) return 'NEET Coaching | Cerebrum Biology Academy'

  const typePrefix: Record<string, string> = {
    'coaching-hub': 'Top',
    posh: 'Premium',
    commercial: 'Best',
    residential: 'Best',
  }

  const prefix = typePrefix[area.type] || 'Best'
  return `${prefix} NEET Coaching in ${area.name}, East Delhi | ${CEREBRUM_METRICS.successRateText} Success | Cerebrum Academy`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug } = await params
  const area = getAreaBySlug(areaSlug)

  if (!area) {
    return {
      title: 'Area Not Found',
    }
  }

  const title = getTitleByType(area)
  const description = getMetaDescriptionByType(area)

  return {
    title,
    description,
    keywords: [
      `NEET coaching ${area.name}`,
      `NEET coaching near ${area.name}`,
      `Best NEET coaching ${area.fullName}`,
      `Biology coaching ${area.name}`,
      `NEET preparation ${area.name} East Delhi`,
      `Medical coaching ${area.name}`,
      ...area.schools.map((school) => `NEET coaching for ${school} students`),
      ...area.nearbyMetro.map((metro) => `NEET coaching near ${metro}`),
    ],
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${areaSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://cerebrumbiologyacademy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Coaching in ${area.name}, East Delhi`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${areaSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function EastDelhiAreaPage({ params }: PageProps) {
  const { area: areaSlug } = await params
  const area = getAreaBySlug(areaSlug)

  if (!area) {
    notFound()
  }

  const organizationId = 'https://cerebrumbiologyacademy.com/#organization'
  const localBusinessId = `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${areaSlug}#localbusiness`

  const areaCoords = AREA_COORDINATES[areaSlug] || {
    lat: CEREBRUM_METRICS.coordinates.latitude,
    lng: CEREBRUM_METRICS.coordinates.longitude,
  }

  const getAreaReviews = () => {
    const itemReviewed = {
      '@type': 'LocalBusiness',
      '@id': localBusinessId,
      name: `Cerebrum Biology Academy - ${area.name}`,
    }
    return [
      {
        '@type': 'Review',
        itemReviewed,
        author: { '@type': 'Person', name: 'Parent from ' + area.name },
        datePublished: '2025-11-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `Excellent NEET coaching! My child from ${area.schools[0] || area.name} improved from 480 to 650+ marks. The small batch size and personal attention made all the difference.`,
      },
      {
        '@type': 'Review',
        itemReviewed,
        author: { '@type': 'Person', name: 'Student from ' + area.name },
        datePublished: '2025-10-20',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `Best Biology coaching for East Delhi students. Dr. Shekhar Sir's teaching methodology made complex topics easy. The ${area.nearbyMetro[0] || 'metro'} connectivity makes it convenient to reach.`,
      },
      {
        '@type': 'Review',
        itemReviewed,
        author: { '@type': 'Person', name: 'NEET 2025 Qualifier' },
        datePublished: '2025-09-10',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `I'm from ${area.name} and joined Cerebrum for my dropper year. The focused approach and regular tests helped me score ${CEREBRUM_METRICS.topScoreText} in Biology. Highly recommend!`,
      },
    ]
  }

  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': organizationId,
    name: 'Cerebrum Biology Academy',
    alternateName: `Cerebrum Biology Academy - ${area.name}`,
    description: `Best NEET coaching in ${area.name}, East Delhi. ${area.description}`,
    url: 'https://cerebrumbiologyacademy.com',
    telephone: CEREBRUM_METRICS.phone,
    email: CEREBRUM_METRICS.email,
    foundingDate: '2014',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CEREBRUM_METRICS.mainAddress,
      addressLocality: 'South Delhi',
      addressRegion: 'Delhi',
      postalCode: CEREBRUM_METRICS.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CEREBRUM_METRICS.coordinates.latitude,
      longitude: CEREBRUM_METRICS.coordinates.longitude,
    },
    areaServed: [
      { '@type': 'City', name: area.name },
      { '@type': 'City', name: 'East Delhi' },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': localBusinessId,
    name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
    description: area.heroDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${areaSlug}`,
    telephone: CEREBRUM_METRICS.phone,
    email: CEREBRUM_METRICS.email,
    priceRange: '₹45,000 - ₹1,80,000',
    image: 'https://cerebrumbiologyacademy.com/logo.png',
    parentOrganization: { '@id': organizationId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CEREBRUM_METRICS.mainAddress,
      addressLocality: area.name,
      addressRegion: 'Delhi',
      postalCode: area.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: areaCoords.lat.toString(),
      longitude: areaCoords.lng.toString(),
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: areaCoords.lat.toString(),
        longitude: areaCoords.lng.toString(),
      },
      geoRadius: '5000',
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
      'https://www.youtube.com/@drshekharcsingh',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: CEREBRUM_METRICS.rating.toString(),
      reviewCount: CEREBRUM_METRICS.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: getAreaReviews(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeClass11 + CEREBRUM_METRICS.feeClass12,
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Course',
            name: 'Class 11+12 Comprehensive NEET Biology',
            description:
              'Complete 2-year NEET Biology preparation program with NCERT mastery and advanced problem solving',
            provider: { '@id': organizationId },
            educationalLevel: 'Class 11-12',
            timeRequired: 'P2Y',
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeClass12,
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Course',
            name: 'Class 12 Intensive NEET Biology',
            description:
              '1-year intensive NEET Biology course with focus on board + NEET integration',
            provider: { '@id': organizationId },
            educationalLevel: 'Class 12',
            timeRequired: 'P1Y',
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeDropper,
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Course',
            name: 'Dropper Batch NEET Biology',
            description:
              '1-year comprehensive revision course for NEET repeaters with daily tests and personal mentoring',
            provider: { '@id': organizationId },
            educationalLevel: '12th Pass / Dropper',
            timeRequired: 'P1Y',
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
        name: 'NEET Coaching East Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-east-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${area.name}`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-east-delhi/${areaSlug}`,
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the best NEET coaching in ${area.name}, East Delhi?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cerebrum Biology Academy is rated the best NEET coaching for ${area.name} students with ${CEREBRUM_METRICS.successRateText} success rate, AIIMS-qualified faculty, and small batches of ${CEREBRUM_METRICS.batchSizeText}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the fee for NEET coaching for ${area.name} students?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our NEET Biology coaching fee for students from ${area.name} is ₹${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 12 and ₹${CEREBRUM_METRICS.feeClass11.toLocaleString()}/year for Class 11. EMI options and scholarships up to 50% are available.`,
        },
      },
      {
        '@type': 'Question',
        name: `How can students from ${area.name} reach Cerebrum Biology Academy?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Students from ${area.name} can take Blue Line from ${area.nearbyMetro[0]} to AIIMS or Green Park. Our center in Kalu Sarai is just 5 minutes from Green Park Metro.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is online NEET coaching available for ${area.name} students?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! We offer online, offline, and hybrid modes for students from ${area.name}. Live interactive classes, recorded lectures, doubt sessions - all accessible from home.`,
        },
      },
    ],
  }

  return (
    <>
      <AreaPageContent area={area} areaSlug={areaSlug} />

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  )
}
