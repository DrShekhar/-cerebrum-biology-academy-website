import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching New Friends Colony NFC | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for New Friends Colony students. Maharani Bagh, Friends Colony. AIIMS faculty, small batches. Near Ashram Metro. Book free demo!',
  keywords: [
    'NEET coaching New Friends Colony',
    'NEET coaching NFC',
    'Biology coaching New Friends Colony',
    'NEET Biology classes NFC',
    'Biology tuition New Friends Colony',
    'Best Biology teacher NFC',
    'NEET preparation New Friends Colony',
    'Medical coaching NFC Delhi',
    'Biology tutor Maharani Bagh',
    'NEET coaching Friends Colony',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for New Friends Colony Students',
    description:
      'Expert NEET Biology coaching for NFC and Maharani Bagh residents. Premium coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/new-friends-colony',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/new-friends-colony',
  },
}

function NFCSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for New Friends Colony Students',
    description:
      'Premium NEET Biology coaching for students from New Friends Colony, Maharani Bagh, and Friends Colony. Expert AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/locations/new-friends-colony',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'New Friends Colony',
      'NFC',
      'Maharani Bagh',
      'Friends Colony East',
      'Friends Colony West',
      'Sukhdev Vihar',
      'Okhla',
      'Jamia Nagar',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '180',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function NFCLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - New Friends Colony',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/new-friends-colony',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'New Friends Colony',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5665,
      'longitude': 77.2636,
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

export default function NewFriendsColonyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NFCSchema />
      <NFCLocalBusinessSchema />
      {children}
    </>
  )
}
