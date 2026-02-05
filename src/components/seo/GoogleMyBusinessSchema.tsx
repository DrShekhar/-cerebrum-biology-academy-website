'use client'

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/**
 * Google My Business Multi-Location Schema
 * Provides structured data for each physical location to improve local SEO
 * and Google Maps presence.
 */

export interface LocationData {
  name: string
  slug: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  phone: string
  email: string
  openingHours: string[]
  priceRange: string
  images: string[]
  description: string
  areaServed: string[]
}

// Physical location data for each center
export const CEREBRUM_LOCATIONS: LocationData[] = [
  {
    name: 'Cerebrum Biology Academy - Gurugram (Main Center)',
    slug: 'gurugram',
    address: {
      streetAddress: 'Sector 14, Near HUDA City Centre Metro Station',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122001',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.4595,
      longitude: 77.0266,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.primary,
    openingHours: ['Mo-Sa 07:00-21:00', 'Su 09:00-18:00'],
    priceRange: '₹₹',
    images: [
      'https://cerebrumbiologyacademy.com/images/center-gurugram.jpg',
      'https://cerebrumbiologyacademy.com/images/classroom-gurugram.jpg',
    ],
    description:
      'Main NEET Biology coaching center in Gurugram with AIIMS faculty. Specialized Biology coaching with 98% success rate.',
    areaServed: ['Gurugram', 'Faridabad', 'Noida', 'Delhi NCR', 'Haryana'],
  },
  {
    name: 'Cerebrum Biology Academy - South Extension, Delhi',
    slug: 'south-extension',
    address: {
      streetAddress: 'J-Block, South Extension Part II',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.5689,
      longitude: 77.2215,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.primary,
    openingHours: ['Mo-Sa 07:00-21:00', 'Su 09:00-18:00'],
    priceRange: '₹₹',
    images: [
      'https://cerebrumbiologyacademy.com/images/center-south-extension.jpg',
    ],
    description:
      'Premium NEET Biology coaching in South Delhi. Small batch sizes with personalized attention.',
    areaServed: ['South Delhi', 'Greater Kailash', 'Lajpat Nagar', 'Saket', 'Malviya Nagar'],
  },
  {
    name: 'Cerebrum Biology Academy - Rohini, Delhi',
    slug: 'rohini',
    address: {
      streetAddress: 'Sector 7, Near Rohini West Metro Station',
      addressLocality: 'Rohini',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.7041,
      longitude: 77.1025,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.primary,
    openingHours: ['Mo-Sa 07:00-21:00', 'Su 09:00-18:00'],
    priceRange: '₹₹',
    images: [
      'https://cerebrumbiologyacademy.com/images/center-rohini.jpg',
    ],
    description:
      'NEET Biology coaching in North-West Delhi. Convenient location for Rohini, Pitampura, and Shalimar Bagh students.',
    areaServed: ['Rohini', 'Pitampura', 'Shalimar Bagh', 'Netaji Subhash Place', 'North Delhi'],
  },
]

// Generate LocalBusiness schema for a single location
export function generateLocationSchema(location: LocationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `https://cerebrumbiologyacademy.com/locations/${location.slug}`,
    name: location.name,
    description: location.description,
    url: `https://cerebrumbiologyacademy.com/locations/${location.slug}`,
    telephone: location.phone,
    email: location.email,
    priceRange: location.priceRange,
    image: location.images,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.streetAddress,
      addressLocality: location.address.addressLocality,
      addressRegion: location.address.addressRegion,
      postalCode: location.address.postalCode,
      addressCountry: location.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
    openingHoursSpecification: location.openingHours.map((hours) => {
      const [days, time] = hours.split(' ')
      const [open, close] = time.split('-')
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.includes('Mo')
          ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          : ['Sunday'],
        opens: open,
        closes: close,
      }
    }),
    areaServed: location.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
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
            name: 'NEET Foundation (Class 11)',
            description: '2-year comprehensive NEET Biology preparation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Target (Class 12)',
            description: '1-year intensive NEET Biology coaching',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Dropper Batch',
            description: 'Specialized batch for NEET repeaters',
          },
        },
      ],
    },
  }
}

// Component that renders schema for all locations
export function GoogleMyBusinessSchema() {
  const allLocationsSchema = CEREBRUM_LOCATIONS.map(generateLocationSchema)

  return (
    <>
      {allLocationsSchema.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

// Component for a single location page
interface SingleLocationSchemaProps {
  locationSlug: string
}

export function SingleLocationSchema({ locationSlug }: SingleLocationSchemaProps) {
  const location = CEREBRUM_LOCATIONS.find((loc) => loc.slug === locationSlug)

  if (!location) return null

  const schema = generateLocationSchema(location)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Location Cards Display Component
export function LocationCardsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Our Centers
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Visit us at any of our convenient locations across Delhi NCR
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {CEREBRUM_LOCATIONS.map((location) => (
            <div
              key={location.slug}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-gray-900 mb-2">{location.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{location.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">📍</span>
                  <span className="text-gray-600">
                    {location.address.streetAddress}, {location.address.addressLocality},{' '}
                    {location.address.postalCode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">📞</span>
                  <a href={`tel:${location.phone}`} className="text-blue-600 hover:underline">
                    {location.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🕐</span>
                  <span className="text-gray-600">Mon-Sat: 7AM-9PM, Sun: 9AM-6PM</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Areas Served:</p>
                <div className="flex flex-wrap gap-1">
                  {location.areaServed.slice(0, 4).map((area) => (
                    <span
                      key={area}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GoogleMyBusinessSchema
