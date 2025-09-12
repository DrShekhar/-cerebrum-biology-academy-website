import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAreaBySlug, getAllAreaSlugs } from '@/data/localAreas'
import { LocalLandingPage } from '@/components/local/LocalLandingPage'

interface Props {
  params: { localSlug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getAreaBySlug(params.localSlug)

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
      images: [`/local/${area.slug}-og.jpg`],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: area.metaTitle,
      description: area.metaDescription,
      images: [`/local/${area.slug}-og.jpg`],
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

export default function LocalAreaPage({ params }: Props) {
  const area = getAreaBySlug(params.localSlug)

  if (!area) {
    notFound()
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
              ratingValue: '4.9',
              ratingCount: '500',
            },
          }),
        }}
      />
      <LocalLandingPage area={area} />
    </>
  )
}
