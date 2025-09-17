import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocationBySlug, getAllLocationSlugs } from '@/data/locationData'
import { LocationLandingPage } from '@/components/location/LocationLandingPage'

interface LocationPageProps {
  params: {
    city: string
  }
}

export async function generateStaticParams() {
  const locationSlugs = getAllLocationSlugs()
  return locationSlugs.map((city) => ({
    city,
  }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const locationData = getLocationBySlug(params.city)

  if (!locationData) {
    return {
      title: 'Location Not Found | Cerebrum Biology Academy',
      description: 'The requested location page was not found.',
    }
  }

  const { seoData } = locationData

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: [...seoData.keywords, ...seoData.localKeywords].join(', '),
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: `https://cerebrumbiologyacademy.com/locations/${params.city}`,
      siteName: 'Cerebrum Biology Academy',
      type: 'website',
      images: [
        {
          url: '/images/og-location-default.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Biology Coaching in ${locationData.city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: ['/images/og-location-default.jpg'],
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/locations/${params.city}`,
    },
    other: {
      'geo.region': `IN-${getStateCode(locationData.state)}`,
      'geo.placename': locationData.city,
      'geo.position': getLocationCoordinates(locationData.city),
      ICBM: getLocationCoordinates(locationData.city),
    },
  }
}

// Helper function to get state codes for SEO
function getStateCode(state: string): string {
  const stateCodes: { [key: string]: string } = {
    Rajasthan: 'RJ',
    Delhi: 'DL',
    Telangana: 'TG',
    Karnataka: 'KA',
    Maharashtra: 'MH',
    'Tamil Nadu': 'TN',
    'Madhya Pradesh': 'MP',
    'Uttar Pradesh': 'UP',
    Bihar: 'BR',
    Odisha: 'OR',
  }
  return stateCodes[state] || 'IN'
}

// Helper function to get approximate coordinates for SEO
function getLocationCoordinates(city: string): string {
  const coordinates: { [key: string]: string } = {
    Kota: '25.2138,75.8648',
    Delhi: '28.6139,77.2090',
    Hyderabad: '17.3850,78.4867',
    Bangalore: '12.9716,77.5946',
    Mumbai: '19.0760,72.8777',
    Pune: '18.5204,73.8567',
    Chennai: '13.0827,80.2707',
    Jaipur: '26.9124,75.7873',
    Indore: '22.7196,75.8577',
    Lucknow: '26.8467,80.9462',
    Patna: '25.5941,85.1376',
    Bhubaneswar: '20.2961,85.8245',
  }
  return coordinates[city] || '20.5937,78.9629' // Default to India center
}

export default function LocationPage({ params }: LocationPageProps) {
  const locationData = getLocationBySlug(params.city)

  if (!locationData) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: `Cerebrum Biology Academy - ${locationData.city}`,
            description: locationData.seoData.description,
            url: `https://cerebrumbiologyacademy.com/locations/${params.city}`,
            areaServed: {
              '@type': 'City',
              name: locationData.city,
              containedInPlace: {
                '@type': 'State',
                name: locationData.state,
                containedInPlace: {
                  '@type': 'Country',
                  name: 'India',
                },
              },
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: locationData.city,
              addressRegion: locationData.state,
              addressCountry: 'IN',
            },
            telephone: '+91-88264-44334',
            email: 'info@cerebrumbiologyacademy.com',
            courseMode: ['Online', 'Blended'],
            educationalLevel: 'Higher Secondary',
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'student',
              audienceType: 'NEET Aspirants',
            },
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              name: 'NEET Biology Preparation Certificate',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '2500',
              bestRating: '5',
            },
            offers: {
              '@type': 'Offer',
              category: 'Education',
              priceCurrency: 'INR',
              price: (locationData.localContext.avgCoachingFee * 0.6).toString(),
              description: `NEET Biology Coaching for ${locationData.city} students`,
            },
          }),
        }}
      />

      <LocationLandingPage locationData={locationData} />
    </div>
  )
}
