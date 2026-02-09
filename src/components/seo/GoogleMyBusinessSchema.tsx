'use client'

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

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
  googleBusinessUrl: string
}

export const CEREBRUM_LOCATIONS: LocationData[] = [
  {
    name: 'Cerebrum Biology Academy - South Extension (Flagship)',
    slug: 'south-extension',
    address: {
      streetAddress: 'Block D, South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.5678,
      longitude: 77.2234,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '₹₹',
    images: ['https://cerebrumbiologyacademy.com/images/center-south-extension.jpg'],
    description:
      'Flagship NEET Biology coaching in South Delhi. Small batch sizes with personalized attention and expert AIIMS faculty.',
    areaServed: [
      'South Extension',
      'South Delhi',
      'Greater Kailash',
      'Defence Colony',
      'Lajpat Nagar',
      'Saket',
      'Malviya Nagar',
      'Hauz Khas',
      'New Friends Colony',
      'Green Park',
      'Safdarjung',
      'Gulmohar Park',
    ],
    googleBusinessUrl: CONTACT_INFO.centers.southExtension.googleBusinessUrl,
  },
  {
    name: 'Cerebrum Biology Academy - Rohini, Delhi',
    slug: 'rohini',
    address: {
      streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
      addressLocality: 'Rohini, Delhi',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.7041,
      longitude: 77.1025,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '₹₹',
    images: ['https://cerebrumbiologyacademy.com/images/center-rohini.jpg'],
    description:
      'NEET Biology coaching in North-West Delhi. Convenient location for Rohini, Pitampura, and Shalimar Bagh students.',
    areaServed: [
      'Rohini',
      'Pitampura',
      'Shalimar Bagh',
      'Netaji Subhash Place',
      'North Delhi',
      'Ashok Vihar',
      'Prashant Vihar',
      'Paschim Vihar',
      'Rajouri Garden',
      'Punjabi Bagh',
    ],
    googleBusinessUrl: CONTACT_INFO.centers.rohini.googleBusinessUrl,
  },
  {
    name: 'Cerebrum Biology Academy - Green Park, Delhi',
    slug: 'green-park',
    address: {
      streetAddress: 'B 113 FF Gulmohar Park',
      addressLocality: 'Green Park, New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.5597,
      longitude: 77.2089,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '₹₹',
    images: ['https://cerebrumbiologyacademy.com/images/center-green-park.jpg'],
    description:
      'NEET Biology coaching near Green Park Metro. Expert faculty for students from South Delhi, Noida, and Ghaziabad.',
    areaServed: [
      'Green Park',
      'Hauz Khas',
      'South Delhi',
      'Greater Kailash',
      'Defence Colony',
      'Lajpat Nagar',
      'Noida',
      'Greater Noida',
      'Ghaziabad',
      'Gulmohar Park',
      'Panchsheel Park',
      'Jor Bagh',
      'Kalu Sarai',
      'New Moti Bagh',
    ],
    googleBusinessUrl: CONTACT_INFO.centers.greenPark.googleBusinessUrl,
  },
  {
    name: 'Cerebrum Biology Academy - Gurugram',
    slug: 'gurugram',
    address: {
      streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122018',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.4295,
      longitude: 77.0426,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '₹₹',
    images: [
      'https://cerebrumbiologyacademy.com/images/center-gurugram.jpg',
      'https://cerebrumbiologyacademy.com/images/classroom-gurugram.jpg',
    ],
    description:
      'NEET Biology coaching center in Gurugram with AIIMS faculty. State-of-the-art digital classrooms and personalized attention.',
    areaServed: [
      'Gurugram',
      'DLF Phase 1',
      'DLF Phase 4',
      'Golf Course Road',
      'Sushant Lok',
      'Sector 14',
      'Sector 43',
      'Sector 51',
      'Sector 56',
      'Sector 57',
      'South City',
      'New Gurugram',
      'Sohna Road',
      'Manesar',
    ],
    googleBusinessUrl: CONTACT_INFO.centers.gurugram.googleBusinessUrl,
  },
  {
    name: 'Cerebrum Biology Academy - Faridabad',
    slug: 'faridabad',
    address: {
      streetAddress: 'Sector 17',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121002',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.4089,
      longitude: 77.3178,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '₹₹',
    images: ['https://cerebrumbiologyacademy.com/images/center-faridabad.jpg'],
    description:
      'Quality NEET Biology coaching in Faridabad. No need to travel to Delhi - expert faculty right in your city.',
    areaServed: [
      'Faridabad',
      'Palwal',
      'Ballabgarh',
      'NIT Faridabad',
      'Old Faridabad',
      'Greater Faridabad',
      'Sector 15-21',
      'BPTP Parklands',
    ],
    googleBusinessUrl: CONTACT_INFO.centers.faridabad.googleBusinessUrl,
  },
  {
    name: 'Cerebrum Biology Academy - Noida',
    slug: 'noida',
    address: {
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      latitude: 28.628,
      longitude: 77.3649,
    },
    phone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '₹₹',
    images: ['https://cerebrumbiologyacademy.com/images/center-noida.jpg'],
    description:
      'NEET Biology coaching in Noida. Expert AIIMS faculty for students from Noida, Greater Noida, and Ghaziabad.',
    areaServed: [
      'Noida',
      'Greater Noida',
      'Ghaziabad',
      'Sector 62',
      'Sector 18',
      'Sector 44',
      'Indirapuram',
      'Vaishali',
      'Crossing Republik',
    ],
    googleBusinessUrl: CONTACT_INFO.centers.noida.googleBusinessUrl,
  },
]

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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: location.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
      location.googleBusinessUrl,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: location.slug === 'south-extension' ? '4.9' : location.slug === 'rohini' ? '4.8' : location.slug === 'green-park' ? '4.9' : location.slug === 'gurugram' ? '4.7' : location.slug === 'noida' ? '4.8' : '4.8',
      reviewCount: location.slug === 'south-extension' ? '127' : location.slug === 'rohini' ? '89' : location.slug === 'green-park' ? '64' : location.slug === 'gurugram' ? '43' : location.slug === 'noida' ? '28' : '31',
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

export function LocationCardsSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Our Centers</h2>
        <p className="text-gray-600 mb-8 text-center">
          Visit us at any of our 6 convenient locations across Delhi NCR
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {CEREBRUM_LOCATIONS.map((location) => (
            <div
              key={location.slug}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-gray-900 mb-2">{location.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{location.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0">📍</span>
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
                  <span className="text-gray-600">Open 24/7</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Areas Served:</p>
                <div className="flex flex-wrap gap-1">
                  {location.areaServed.slice(0, 4).map((area) => (
                    <span key={area} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      {area}
                    </span>
                  ))}
                  {location.areaServed.length > 4 && (
                    <span className="text-xs text-gray-400">
                      +{location.areaServed.length - 4} more
                    </span>
                  )}
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
