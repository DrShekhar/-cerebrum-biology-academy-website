import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAreaBySlug, getAllAreaSlugs } from '@/data/localAreas'
import { LocalLandingPage } from '@/components/local/LocalLandingPage'

interface Props {
  params: Promise<{ localSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const area = getAreaBySlug(resolvedParams.localSlug)

  if (!area) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: [...area.keywords, ...area.localKeywords].join(', '),
    authors: [{ name: 'Cerebrum Biology Academy' }],
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      images: ['/og-image.jpg'],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: area.metaTitle,
      description: area.metaDescription,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/${area.slug}`,
    },
    other: {
      'geo.region': area.state === 'Delhi' ? 'IN-DL' : area.state === 'Haryana' ? 'IN-HR' : 'IN-UP',
      'geo.placename': area.displayName,
      'geo.position': area.coordinates ? `${area.coordinates.lat},${area.coordinates.lng}` : '',
    },
  }
}

export async function generateStaticParams() {
  const slugs = getAllAreaSlugs()
  return slugs.map((slug) => ({
    localSlug: slug,
  }))
}

// Return 404 for any slug not in generateStaticParams
export const dynamicParams = false

export default async function LocalAreaPage({ params }: Props) {
  const resolvedParams = await params
  const area = getAreaBySlug(resolvedParams.localSlug)

  if (!area) {
    notFound()
  }

  const schoolsList = area.demographics.schools.slice(0, 3).join(', ')
  const transportList = area.transportLinks.slice(0, 2).join(' and ')

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What makes Cerebrum Biology Academy the best choice for NEET preparation in ${area.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Cerebrum Biology Academy is the top choice for ${area.name} students because of our AIIMS-trained faculty, small batch sizes of 15-30 students, and a proven 98% success rate. We serve students from schools like ${schoolsList}, and our center is conveniently accessible via ${transportList}.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do ${area.name} students reach the Cerebrum Biology Academy center?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our ${area.name} center at ${area.centerAddress || 'a convenient location'} is well-connected by ${area.transportLinks.slice(0, 3).join(', ')}. Students from nearby areas like ${area.nearbyAreas.slice(0, 4).join(', ')} find it easy to commute.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which schools in ${area.name} do your students come from?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We coach students from leading ${area.name} schools including ${area.demographics.schools.join(', ')}. Our curriculum is designed to complement school syllabi while building strong NEET Biology foundations.`,
        },
      },
    ],
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
        name: 'Locations',
        item: 'https://cerebrumbiologyacademy.com/all-locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Biology Coaching ${area.displayName}`,
        item: `https://cerebrumbiologyacademy.com/${area.slug}`,
      },
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: `Cerebrum Biology Academy - ${area.displayName}`,
            description: area.description,
            url: `https://cerebrumbiologyacademy.com/${area.slug}`,
            telephone: '+91-88264-44334',
            email: 'info@cerebrumbiologyacademy.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: area.centerAddress?.split(',')[0] || '',
              addressLocality: area.displayName,
              addressRegion: area.state,
              addressCountry: 'IN',
            },
            geo: area.coordinates
              ? {
                  '@type': 'GeoCoordinates',
                  latitude: area.coordinates.lat,
                  longitude: area.coordinates.lng,
                }
              : undefined,
            areaServed: {
              '@type': 'City',
              name: area.displayName,
            },
            serviceType: [
              'NEET Biology Coaching',
              'Medical Entrance Preparation',
              'Biology Tuition Class 11-12',
              'NEET Dropper Batch',
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              ratingCount: '38',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LocalLandingPage area={area} />
    </>
  )
}
