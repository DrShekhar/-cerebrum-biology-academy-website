import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Defence Colony Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for Defence Colony students. AIIMS faculty, small batches, 98% success rate. Near Lajpat Nagar Metro. South Extension center 3 min away. Book free demo!',
  keywords: [
    'NEET coaching Defence Colony',
    'Biology coaching Defence Colony',
    'NEET Biology classes Defence Colony',
    'Biology tuition Defence Colony',
    'Best Biology teacher Defence Colony',
    'NEET preparation Defence Colony',
    'Medical coaching Defence Colony',
    'Biology tutor near Defence Colony',
    'CBSE Biology coaching Defence Colony',
    'ICSE Biology tuition Defence Colony',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Defence Colony Students',
    description:
      'Expert NEET Biology coaching for Defence Colony residents. Join our flagship South Extension center, just 3 min away.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
  },
}

function DefenceColonySchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Defence Colony Students',
    description:
      'Premium NEET Biology coaching for students from Defence Colony and Lajpat Nagar area. Expert AIIMS faculty, personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Defence Colony',
      'Lajpat Nagar',
      'Jangpura',
      'Nizamuddin',
      'Andrews Ganj',
      'Amar Colony',
      'Moolchand',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '380',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function DefenceColonyLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Defence Colony',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/defence-colony',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Defence Colony',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5722,
      'longitude': 77.2305,
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

export default function DefenceColonyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefenceColonySchema />
      <DefenceColonyLocalBusinessSchema />
      {children}
    </>
  )
}
