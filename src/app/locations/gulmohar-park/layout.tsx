import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Gulmohar Park Delhi | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for Gulmohar Park students. Premium South Delhi locality. AIIMS faculty, small batches. Green Park center nearby. Book free demo!',
  keywords: [
    'NEET coaching Gulmohar Park',
    'Biology coaching Gulmohar Park',
    'NEET Biology classes Gulmohar Park',
    'Biology tuition Gulmohar Park',
    'Best Biology teacher Gulmohar Park',
    'NEET preparation Gulmohar Park',
    'Medical coaching Gulmohar Park',
    'Biology tutor near Gulmohar Park',
    'NEET classes near Hauz Khas',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Gulmohar Park Students',
    description:
      'Expert NEET Biology coaching for Gulmohar Park residents. Premium coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Gulmohar Park Delhi | Cerebrum Biology Academy',
    description: 'Best NEET Biology coaching for Gulmohar Park students. Premium South Delhi locality. AIIMS faculty, small batches.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
  },
}

function GulmoharParkSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Gulmohar Park Students',
    description:
      'Premium NEET Biology coaching for students from Gulmohar Park and nearby premium localities. Expert AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Gulmohar Park',
      'Hauz Khas',
      'Green Park',
      'SDA',
      'Safdarjung Enclave',
      'Panchsheel Park',
      'Sarvapriya Vihar',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '38',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function GulmoharParkLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Gulmohar Park',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/gulmohar-park',
    'telephone': '+91-88264-44334',
    'email': 'info@cerebrumbiologyacademy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Gulmohar Park',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5547,
      'longitude': 77.2069,
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

function GulmoharParkFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How far is Cerebrum Academy from Gulmohar Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy is located in South Extension and has a Green Park center very close to Gulmohar Park. Students from Gulmohar Park can reach our Green Park center within 5-10 minutes, making it the most convenient NEET coaching for premium South Delhi students.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Cerebrum the best NEET coaching for Gulmohar Park students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum is the best NEET coaching for Gulmohar Park with AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, personalized attention, and nearby Green Park center. We specialize in coaching elite premium South Delhi students like those from Gulmohar Park.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the batch timings for Gulmohar Park students at Cerebrum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum operates Monday to Saturday from 8:00 AM to 8:00 PM with multiple batch options. Sunday batches also available from 9:00 AM to 6:00 PM. We offer morning, afternoon, and evening batches for Gulmohar Park students. Contact +91-88264-44334 for specific schedules.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to reach Cerebrum from Gulmohar Park easily?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'From Gulmohar Park, you can reach our Green Park center within 5-10 minutes by car or auto. The Green Park center is near Yellow Line Metro. You can also reach our flagship South Extension center. Both locations are convenient for Gulmohar Park and surrounding premium areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the NEET coaching fees at Cerebrum for Gulmohar Park students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and duration. We offer flexible EMI options for Gulmohar Park families. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for customized pricing and special offers.',
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

export default function GulmoharParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GulmoharParkSchema />
      <GulmoharParkLocalBusinessSchema />
      <GulmoharParkFAQSchema />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Gulmohar Park', item: 'https://cerebrumbiologyacademy.com/locations/gulmohar-park' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
