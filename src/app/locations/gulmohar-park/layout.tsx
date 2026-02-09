import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Gulmohar Park Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for Gulmohar Park students. Premium South Delhi locality. AIIMS faculty, small batches. Green Park center nearby. Book free demo!',
  keywords: [
    'NEET coaching Gulmohar Park',
    'Biology coaching Gulmohar Park',
    'NEET Biology classes Gulmohar Park',
    'Biology tuition Gulmohar Park',
    'Best Biology teacher Gulmohar Park',
    'NEET preparation Gulmohar Park',
    'Medical coaching Gulmohar Park',
    'Biology tutor near Gulmohar Park',
    'NEET classes near Hauz Khas',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Gulmohar Park Students',
    description:
      'Expert NEET Biology coaching for Gulmohar Park residents. Premium coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
  },
}

function GulmoharParkSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Gulmohar Park Students',
    description:
      'Premium NEET Biology coaching for students from Gulmohar Park and nearby premium localities. Expert AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Gulmohar Park',
      'Hauz Khas',
      'Green Park',
      'SDA',
      'Safdarjung Enclave',
      'Panchsheel Park',
      'Sarvapriya Vihar',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '200',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function GulmoharParkLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Gulmohar Park',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Gulmohar Park',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5547,
      'longitude': 77.2069,
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

export default function GulmoharParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GulmoharParkSchema />
      <GulmoharParkLocalBusinessSchema />
      {children}
    </>
  )
}
