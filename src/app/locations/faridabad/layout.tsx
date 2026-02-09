import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Faridabad | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Faridabad by AIIMS faculty. Small batches of 15 students, 90% success rate. Located in Sector 15. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Faridabad',
    'Biology coaching Faridabad',
    'NEET Biology classes Faridabad',
    'Best NEET coaching Faridabad',
    'NEET preparation Faridabad',
    'Medical coaching Faridabad',
    'AIIMS coaching Faridabad',
    'NEET coaching Sector 15 Faridabad',
    'NEET coaching near me Faridabad',
    'Biology tuition Faridabad',
    'NEET coaching Ballabgarh',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Faridabad | Cerebrum Biology Academy',
    description:
      'Best NEET Biology coaching in Faridabad. AIIMS faculty, small batches, 90% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/faridabad-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Faridabad Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Faridabad',
    description: 'Best NEET Biology coaching by AIIMS faculty. 90% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/faridabad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

function FaridabadServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Faridabad',
    description: 'Best NEET Biology coaching in Faridabad with AIIMS faculty',
    url: 'https://cerebrumbiologyacademy.com/locations/faridabad',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 23, Sector 15',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121007',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.3948,
      longitude: 77.3117,
    },
    areaServed: [
      'Sector 15',
      'Sector 16',
      'Sector 17',
      'Sector 21',
      'NIT Faridabad',
      'Ballabgarh',
      'Old Faridabad',
      'Badarpur',
      'Surajkund',
      'Palwal',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '280',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function FaridabadLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Faridabad',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/faridabad',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Faridabad',
      'addressRegion': 'Haryana',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.4089,
      'longitude': 77.3178,
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

export default function FaridabadLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaridabadServiceSchema />
      <FaridabadLocalBusinessSchema />
      {children}
    </>
  )
}
