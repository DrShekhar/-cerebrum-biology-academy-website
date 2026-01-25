import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Delhi by AIIMS faculty. Small batches of 15 students, 90% success rate. Located at Patel Nagar. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Delhi',
    'NEET coaching New Delhi',
    'Biology coaching Delhi',
    'NEET Biology classes Delhi',
    'Best NEET coaching Delhi',
    'NEET preparation Delhi',
    'Medical coaching Delhi',
    'AIIMS coaching Delhi',
    'NEET coaching Patel Nagar',
    'NEET coaching Rajendra Place',
    'NEET coaching Karol Bagh',
    'NEET coaching near me Delhi',
    'Biology tuition Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Delhi | Cerebrum Biology Academy',
    description:
      'Best NEET Biology coaching in Delhi. AIIMS faculty, small batches, 90% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/delhi-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Delhi Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Delhi',
    description: 'Best NEET Biology coaching by AIIMS faculty. 90% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/delhi',
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

function DelhiServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Delhi',
    description: 'Best NEET Biology coaching in Delhi with AIIMS faculty',
    url: 'https://cerebrumbiologyacademy.com/locations/delhi',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-15, Patel Nagar West',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110008',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6508,
      longitude: 77.1726,
    },
    areaServed: [
      'Patel Nagar',
      'Karol Bagh',
      'Rajendra Place',
      'Shadipur',
      'Kirti Nagar',
      'Rajouri Garden',
      'Tilak Nagar',
      'Janakpuri',
      'Moti Nagar',
      'Ramesh Nagar',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '450',
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

export default function DelhiLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DelhiServiceSchema />
      {children}
    </>
  )
}
