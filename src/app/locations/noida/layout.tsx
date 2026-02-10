import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Noida | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Noida by AIIMS faculty. Small batches of 15 students, 90% success rate. Located in Sector 62. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Noida',
    'Biology coaching Noida',
    'NEET Biology classes Noida',
    'Best NEET coaching Noida',
    'NEET preparation Noida',
    'Medical coaching Noida',
    'AIIMS coaching Noida',
    'NEET coaching Sector 62',
    'NEET coaching Sector 18',
    'NEET coaching near me Noida',
    'Biology tuition Noida',
    'NEET coaching Greater Noida',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Noida | Cerebrum Biology Academy',
    description:
      'Best NEET Biology coaching in Noida. AIIMS faculty, small batches, 90% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/noida-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Noida Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Noida',
    description: 'Best NEET Biology coaching by AIIMS faculty. 90% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/noida',
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

function NoidaServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Noida',
    description: 'Best NEET Biology coaching in Noida with AIIMS faculty',
    url: 'https://cerebrumbiologyacademy.com/locations/noida',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.628,
      longitude: 77.3649,
    },
    areaServed: [
      'Sector 62',
      'Sector 18',
      'Sector 15',
      'Sector 16',
      'Sector 50',
      'Sector 63',
      'Noida City Centre',
      'Greater Noida',
      'Noida Extension',
      'Ghaziabad',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '320',
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
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

function NoidaLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Noida',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/noida',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Noida',
      'addressRegion': 'Uttar Pradesh',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5355,
      'longitude': 77.3910,
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

export default function NoidaLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoidaServiceSchema />
      <NoidaLocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How far is Cerebrum Academy from Noida Sector 62?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is approximately 20-25 minutes from Noida Sector 62 depending on traffic conditions. Our main center is located at South Extension Part 2, New Delhi. Noida students can reach us via the Delhi-Noida expressway which is well-connected.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy the best NEET coaching choice for Noida students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the premier choice for Noida students because of our AIIMS Delhi trained faculty, small personalized batches, 98% success rate, and proven track record. Our structured curriculum and individual mentoring ensure every Noida student achieves their NEET goals.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum Academy for Noida students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center operates Monday to Saturday from 8:00 AM to 8:00 PM, with Sundays from 9:00 AM to 6:00 PM. We offer flexible batch schedules including morning, afternoon, and evening batches. Noida students can choose timings that suit their commute from Sector 62. Contact +91-9870-424-442 for details.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Noida students reach Cerebrum Academy from Sector 62?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Noida Sector 62, students can reach our South Extension center via the Delhi-Noida expressway (25 minutes drive). Alternatively, they can take the metro to Lajpat Nagar Station and reach our center by foot or auto. The location is easily accessible for regular coaching attendance.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees for Noida students at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer special packages for Noida students and flexible payment options. Call us at +91-9870-424-442 or email cerebrumacademy@gmail.com for personalized fee consultation.',
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
              { '@type': 'ListItem', position: 3, name: 'Noida', item: 'https://cerebrumbiologyacademy.com/locations/noida' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
