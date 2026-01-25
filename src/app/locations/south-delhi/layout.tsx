import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in South Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in South Delhi by AIIMS faculty. Small batches of 15 students, 98% success rate. Flagship center at South Extension. Call +91 88264 44334.',
  keywords: [
    'NEET coaching South Delhi',
    'Biology coaching South Delhi',
    'NEET Biology classes South Delhi',
    'Best NEET coaching South Delhi',
    'NEET preparation South Delhi',
    'Medical coaching South Delhi',
    'AIIMS coaching South Delhi',
    'NEET coaching South Extension',
    'NEET coaching Lajpat Nagar',
    'NEET coaching Greater Kailash',
    'NEET coaching Defence Colony',
    'NEET coaching Kalkaji',
    'NEET coaching near me South Delhi',
    'Biology tuition South Delhi',
    'Best Biology teacher South Delhi',
    'NEET Biology coaching near me',
    'Top Biology tutor South Delhi',
    'Biology home tutor South Delhi',
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
    '@type': 'Service',
    name: 'NEET Biology Coaching for South Delhi Students',
    description:
      'Best NEET Biology coaching for South Delhi students. Join our flagship South Extension center for expert coaching by Dr. Shekhar and AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/locations/south-delhi',
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
      'CR Park',
      'Nehru Place',
      'Kalkaji',
      'Defence Colony',
      'Lajpat Nagar',
      'Jangpura',
      'Andrews Ganj',
      'East of Kailash',
      'Alaknanda',
      'Sarita Vihar',
      'Jasola',
      'Okhla',
      'Govindpuri',
      'Saket',
      'Malviya Nagar',
      'Hauz Khas',
      'Green Park',
      'Gulmohar Park',
      'Panchsheel Park',
      'Panchsheel Enclave',
      'Safdarjung Enclave',
      'SDA',
      'Vasant Vihar',
      'Shanti Niketan',
      'Anand Lok',
      'Jor Bagh',
      'Sundar Nagar',
      'New Friends Colony',
      'Friends Colony',
      'Maharani Bagh',
      'Kailash Colony',
      'Moolchand',
      'Vasant Kunj',
      'Chirag Delhi',
      'Lodhi Colony',
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
      reviewCount: '380',
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

export default function SouthDelhiLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SouthDelhiServiceSchema />
      {children}
    </>
  )
}
