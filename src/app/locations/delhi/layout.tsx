import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Delhi',
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
    title: 'NEET Biology Coaching in Delhi',
    description:
      'Best NEET Biology coaching in Delhi. AIIMS faculty, small batches, 98% success rate.',
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
    description: 'Best NEET Biology coaching by AIIMS faculty. 98% success rate.',
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
      ratingValue: '5.0',
      reviewCount: '41',
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

function DelhiLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Delhi',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/delhi',
    'telephone': '+91-88264-44334',
    'email': 'info@cerebrumbiologyacademy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Delhi',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.6139,
      'longitude': 77.2090,
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
      'ratingValue': '5.0',
      'reviewCount': '41',
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

function DelhiFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is Cerebrum Biology Academy located in Delhi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy is located at South Extension Part 2, New Delhi (main center). We also have another center in Rohini for students in North Delhi. Both centers are easily accessible by metro and have excellent connectivity throughout Delhi.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Cerebrum the best NEET coaching center in Delhi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum is the best NEET coaching in Delhi because we have AIIMS Delhi trained faculty, small batches of maximum 15 students, 98% success rate, personalized teaching approach, and strategic center locations in South Extension and Rohini serving all parts of Delhi.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the batch timings for NEET coaching in Delhi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our centers in South Extension and Rohini are open Monday to Saturday from 8:00 AM to 8:00 PM. We offer morning, afternoon, and evening batches to accommodate students from different parts of Delhi. Call +91-88264-44334 to know available timings.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to reach Cerebrum Academy from different parts of Delhi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'South Extension center is easily accessible by metro with nearby stations on multiple lines. Rohini center is also well-connected by the metro. Both locations are accessible by personal vehicles and public transport from all parts of Delhi. Visit cerebrumbiologyacademy.com for directions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the fees for NEET coaching at Cerebrum Delhi centers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on the batch type and course duration. We offer EMI options for all Delhi students. Email info@cerebrumbiologyacademy.com or call +91-88264-44334 for detailed fee information and special discounts.',
        },
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
      <DelhiLocalBusinessSchema />
      <DelhiFAQSchema />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Delhi', item: 'https://cerebrumbiologyacademy.com/locations/delhi' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
