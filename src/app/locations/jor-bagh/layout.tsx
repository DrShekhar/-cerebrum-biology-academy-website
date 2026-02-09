import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Jor Bagh | Near Safdarjung | Cerebrum Academy',
  description:
    'Premium NEET Biology coaching for Jor Bagh students. Ultra-elite locality near Safdarjung Tomb, Lodhi Gardens. Expert AIIMS faculty, personalized attention.',
  keywords: [
    'NEET coaching Jor Bagh',
    'Biology tuition Jor Bagh',
    'NEET Biology classes Jor Bagh',
    'Biology coaching near Safdarjung',
    'NEET preparation Jor Bagh Delhi',
    'Best Biology teacher Jor Bagh',
    'NEET coaching near Lodhi Gardens',
    'Biology tutor Jor Bagh',
    'NEET Biology coaching Central Delhi',
    'Premium NEET coaching Delhi',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/jor-bagh',
  },
  openGraph: {
    title: 'NEET Biology Coaching Jor Bagh | Cerebrum Academy',
    description:
      'Premium NEET Biology coaching for Jor Bagh students. Near Safdarjung, Lodhi Gardens.',
    type: 'website',
  },
}

export default function JorBaghLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Jor Bagh Students',
            description:
              'Premium NEET Biology coaching serving Jor Bagh and central Delhi elite localities.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Jor Bagh',
              'Lodhi Colony',
              'Safdarjung',
              'Sundar Nagar',
              'Khan Market',
              'Golf Links',
              'Prithviraj Road',
            ],
            serviceType: 'NEET Biology Coaching',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Cerebrum Biology Academy - Jor Bagh',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/jor-bagh',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Jor Bagh',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5889,
              'longitude': 77.2233,
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
