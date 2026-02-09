import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Golf Links | Ultra-Premium Delhi | Cerebrum Academy',
  description:
    'Exclusive NEET Biology coaching for Golf Links families. Elite locality near India Gate. AIIMS faculty, personalized attention, 98% success rate. Discrete, premium learning environment.',
  keywords: [
    'NEET coaching Golf Links',
    'Biology tuition Golf Links Delhi',
    'NEET Biology classes Golf Links',
    'Biology coaching near India Gate',
    'NEET preparation Golf Links',
    'Best Biology teacher Golf Links',
    'Premium NEET coaching Delhi',
    'Biology tutor Golf Links',
    'NEET coaching Lutyens Delhi',
    'Biology classes near Khan Market',
    'Elite NEET coaching Delhi',
    'NEET Biology coaching fees Delhi',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/golf-links',
  },
  openGraph: {
    title: 'NEET Biology Coaching Golf Links | Cerebrum Academy',
    description:
      'Exclusive NEET Biology coaching for Golf Links elite families. AIIMS faculty, premium facilities.',
    type: 'website',
  },
}

export default function GolfLinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Golf Links Students',
            description:
              'Exclusive NEET Biology coaching serving Golf Links and Lutyens Delhi elite families. 98% success rate, AIIMS faculty.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
              founder: {
                '@type': 'Person',
                name: 'Dr. Shekhar C Singh',
                honorificPrefix: 'Dr.',
                jobTitle: 'Founder & Head Faculty',
                alumniOf: 'AIIMS Delhi',
                knowsAbout: [
                  'NEET Biology',
                  'Human Physiology',
                  'Genetics',
                  'Cell Biology',
                  'Ecology',
                ],
              },
            },
            areaServed: [
              'Golf Links',
              'Jor Bagh',
              'Sundar Nagar',
              'Khan Market',
              'India Gate',
              'Lodhi Estate',
              'Prithviraj Road',
              'Amrita Shergill Marg',
            ],
            serviceType: 'NEET Biology Coaching',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '380',
              bestRating: '5',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Cerebrum Biology Academy - Golf Links',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/golf-links',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Golf Links',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5965,
              'longitude': 77.2301,
            },
            'openingHoursSpecification': [
              {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                'opens': '08:00',
                'closes': '20:00',
              },
            ],
            'priceRange': '₹45,000 - ₹1,80,000',
            'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': '4.9',
              'reviewCount': '485',
              'bestRating': '5',
            },
            'sameAs': [
              'https://www.youtube.com/@CerebrumBiologyAcademy',
              'https://www.instagram.com/cerebrumbiologyacademy/',
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
