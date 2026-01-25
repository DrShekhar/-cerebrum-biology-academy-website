import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Delhi by AIIMS faculty. Small batches of 15 students, 98% success rate. Centers at South Extension & Rohini. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Delhi',
    'NEET coaching New Delhi',
    'Biology coaching Delhi',
    'NEET Biology classes Delhi',
    'Best NEET coaching Delhi',
    'NEET preparation Delhi',
    'Medical coaching Delhi',
    'AIIMS coaching Delhi',
    'NEET coaching South Extension',
    'NEET coaching Rohini',
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
    '@type': 'Service',
    name: 'NEET Biology Coaching for Delhi Students',
    description:
      'Best NEET Biology coaching for Delhi students. Join our Rohini or South Extension center for expert coaching by AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/locations/delhi',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
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
      'Punjabi Bagh',
      'Paschim Vihar',
      'Connaught Place',
      'Central Delhi',
      'West Delhi',
    ],
    serviceType: 'NEET Biology Coaching',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Class 11 NEET Biology',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Class 12 NEET Biology',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dropper Batch',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '450',
      bestRating: '5',
      worstRating: '1',
    },
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
