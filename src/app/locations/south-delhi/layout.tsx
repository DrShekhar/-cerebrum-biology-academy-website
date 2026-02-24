import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in South Delhi',
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
    title: 'NEET Biology Coaching in South Delhi',
    description:
      'Best NEET Biology coaching in South Delhi. AIIMS faculty, small batches, 98% success rate.',
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
    description: 'Best NEET Biology coaching by AIIMS faculty. 98% success rate.',
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
      ratingValue: '5.0',
      reviewCount: '38',
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

function SouthDelhiLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - South Delhi',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/south-delhi',
    'telephone': '+91-88264-44334',
    'email': 'info@cerebrumbiologyacademy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'South Delhi',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5354,
      'longitude': 77.2500,
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
      'reviewCount': '38',
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

export default function SouthDelhiLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SouthDelhiServiceSchema />
      <SouthDelhiLocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How accessible is Cerebrum Academy from South Delhi?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is located at our flagship center in South Extension Part 2, at the heart of South Delhi. It serves all major South Delhi localities including Greater Kailash, Lajpat Nagar, Defence Colony, Saket, Vasant Vihar, and many more within 5-20 minutes.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy the best NEET coaching for South Delhi students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the premier choice for South Delhi with AIIMS Delhi trained faculty led by Dr. Shekhar, small personalized batches, 98% success rate, and state-of-the-art infrastructure. Our flagship center ensures the best quality education for South Delhi students.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum Academy for South Delhi students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center operates Monday to Saturday from 8:00 AM to 8:00 PM with multiple batch options. We offer morning, afternoon, and evening sessions to suit South Delhi students flexible schedules. Contact +91-88264-44334 to book your preferred batch time.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can South Delhi students reach Cerebrum Academy by metro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center is very close to Lajpat Nagar Metro Station on the Pink and Yellow Lines. South Delhi students can easily take metro directly to Lajpat Nagar and reach our South Extension center by a short walk or auto ride. It is the most convenient metro-connected location in South Delhi.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the fee structure for NEET coaching at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer flexible payment options, scholarships, and customized packages for South Delhi students. Call info@cerebrumbiologyacademy.com or +91-88264-44334 for detailed pricing.',
                },
              },
            ],
          }),
        }}
      />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'South Delhi', item: 'https://cerebrumbiologyacademy.com/locations/south-delhi' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
