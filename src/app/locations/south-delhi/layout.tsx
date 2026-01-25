import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in South Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in South Delhi by AIIMS faculty. Small batches of 15 students, 90% success rate. Located at Greater Kailash. Call +91 88264 44334.',
  keywords: [
    'NEET coaching South Delhi',
    'Biology coaching South Delhi',
    'NEET Biology classes South Delhi',
    'Best NEET coaching South Delhi',
    'NEET preparation South Delhi',
    'Medical coaching South Delhi',
    'AIIMS coaching South Delhi',
    'NEET coaching Greater Kailash',
    'NEET coaching GK',
    'NEET coaching Lajpat Nagar',
    'NEET coaching Defence Colony',
    'NEET coaching Kalkaji',
    'NEET coaching near me South Delhi',
    'Biology tuition South Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in South Delhi | Cerebrum Biology Academy',
    description:
      'Best NEET Biology coaching in South Delhi. AIIMS faculty, small batches, 90% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/south-delhi-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy South Delhi Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in South Delhi',
    description: 'Best NEET Biology coaching by AIIMS faculty. 90% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/south-delhi',
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

function SouthDelhiServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - South Delhi',
    description: 'Best NEET Biology coaching in South Delhi with AIIMS faculty',
    url: 'https://cerebrumbiologyacademy.com/locations/south-delhi',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'M-24, Greater Kailash Part 1',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110048',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5494,
      longitude: 77.2347,
    },
    areaServed: [
      'Greater Kailash',
      'Lajpat Nagar',
      'Defence Colony',
      'Kalkaji',
      'CR Park',
      'Nehru Place',
      'Saket',
      'Malviya Nagar',
      'Hauz Khas',
      'Green Park',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '380',
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

export default function SouthDelhiLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SouthDelhiServiceSchema />
      {children}
    </>
  )
}
