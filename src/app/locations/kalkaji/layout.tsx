import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Kalkaji | Near Nehru Place | Cerebrum Academy',
  description:
    'Best NEET Biology coaching for Kalkaji students. Near Nehru Place, Govindpuri, Kalkaji Temple. Expert AIIMS faculty, small batches, 98% success rate.',
  keywords: [
    'NEET coaching Kalkaji',
    'Biology tuition Kalkaji',
    'NEET Biology classes Kalkaji',
    'Biology coaching near Nehru Place',
    'NEET preparation Kalkaji Delhi',
    'Best Biology teacher Kalkaji',
    'NEET coaching Govindpuri',
    'Biology tutor Kalkaji',
    'NEET coaching near Kalkaji Metro',
    'Biology classes Nehru Place',
    'NEET coaching Okhla',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/kalkaji',
  },
  openGraph: {
    title: 'NEET Biology Coaching Kalkaji | Cerebrum Academy',
    description:
      'Expert NEET Biology coaching for Kalkaji students. Near Nehru Place, convenient metro access.',
    type: 'website',
  },
}

export default function KalkajiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'NEET Biology Coaching for Kalkaji Students',
            description:
              'Expert NEET Biology coaching serving Kalkaji, Nehru Place, and nearby areas.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            areaServed: [
              'Kalkaji',
              'Nehru Place',
              'Govindpuri',
              'CR Park',
              'Okhla',
              'Greater Kailash',
              'East of Kailash',
              'Alaknanda',
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
            'name': 'Cerebrum Biology Academy - Kalkaji',
            'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
            'url': 'https://cerebrumbiologyacademy.com/locations/kalkaji',
            'telephone': '+91-9870-424-442',
            'email': 'cerebrumacademy@gmail.com',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Near South Extension',
              'addressLocality': 'Kalkaji',
              'addressRegion': 'Delhi',
              'postalCode': '110049',
              'addressCountry': 'IN',
            },
            'geo': {
              '@type': 'GeoCoordinates',
              'latitude': 28.5345,
              'longitude': 77.2558,
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
