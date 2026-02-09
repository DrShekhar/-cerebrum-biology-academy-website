import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Greater Kailash GK | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for Greater Kailash students. GK 1, GK 2, Kailash Colony. AIIMS faculty, small batches, 98% success rate. South Extension center 5 min away. Book free demo!',
  keywords: [
    'NEET coaching Greater Kailash',
    'NEET coaching GK',
    'Biology coaching Greater Kailash',
    'NEET Biology classes GK 1',
    'NEET Biology classes GK 2',
    'Biology tuition Greater Kailash',
    'Best Biology teacher GK',
    'NEET preparation Greater Kailash',
    'Medical coaching GK',
    'Biology tutor Kailash Colony',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Greater Kailash Students',
    description:
      'Expert NEET Biology coaching for GK residents. Join our flagship South Extension center, just 5 min away.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
  },
}

function GreaterKailashSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Greater Kailash Students',
    description:
      'Premium NEET Biology coaching for students from Greater Kailash, GK 1, GK 2, and Kailash Colony. Expert AIIMS faculty, small batches.',
    url: 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Greater Kailash',
      'GK 1',
      'GK 2',
      'Kailash Colony',
      'East of Kailash',
      'Chirag Delhi',
      'Nehru Place',
      'CR Park',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '450',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function GreaterKailashLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Greater Kailash',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Greater Kailash',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5488,
      'longitude': 77.2347,
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function GreaterKailashLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GreaterKailashSchema />
      <GreaterKailashLocalBusinessSchema />
      {children}
    </>
  )
}
