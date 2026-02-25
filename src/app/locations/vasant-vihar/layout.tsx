import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Vasant Vihar | IB Biology Tutor',
  description:
    'Best NEET Biology & IB Biology coaching for Vasant Vihar students. Near diplomatic area, international schools. AIIMS faculty, small batches. South Extension center 10 min away. Book demo!',
  keywords: [
    'NEET coaching Vasant Vihar',
    'Biology coaching Vasant Vihar',
    'IB Biology tutor Vasant Vihar',
    'IGCSE Biology coaching Vasant Vihar',
    'NEET Biology classes Vasant Vihar',
    'Biology tuition Vasant Vihar',
    'Best Biology teacher Vasant Vihar',
    'NEET preparation Vasant Vihar',
    'Medical coaching Vasant Vihar',
    'Biology tutor near Vasant Vihar',
  ],
  openGraph: {
    title: 'NEET & IB Biology Coaching for Vasant Vihar Students',
    description:
      'Expert NEET and IB Biology coaching for Vasant Vihar residents. Join our South Extension flagship center.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/vasant-vihar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Vasant Vihar | IB Biology Tutor',
    description: 'Best NEET Biology & IB Biology coaching for Vasant Vihar students. Near diplomatic area, international schools.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/vasant-vihar',
  },
}

function VasantViharSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET & IB Biology Coaching for Vasant Vihar Students',
    description:
      'Premium NEET and IB Biology coaching for students from Vasant Vihar, Chanakyapuri, and diplomatic area. Expert faculty from AIIMS.',
    url: 'https://cerebrumbiologyacademy.com/locations/vasant-vihar',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Vasant Vihar',
      'Chanakyapuri',
      'Shanti Niketan',
      'Westend',
      'Anand Niketan',
      'Diplomatic Enclave',
      'RK Puram',
      'Munirka',
      'JNU',
    ],
    serviceType: ['NEET Biology Coaching', 'IB Biology Tutoring', 'IGCSE Biology Coaching'],
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

function VasantViharLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Vasant Vihar',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/vasant-vihar',
    'telephone': '+91-88264-44334',
    'email': 'info@cerebrumbiologyacademy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Vasant Vihar',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5614,
      'longitude': 77.1583,
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

export default function VasantViharLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VasantViharSchema />
      <VasantViharLocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How far is Cerebrum Academy from Vasant Vihar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is approximately 10-15 minutes from Vasant Vihar. Our South Extension center is easily accessible from Vasant Vihar, making it a convenient choice for students in this diplomatic area of West-South Delhi.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy the best NEET coaching for Vasant Vihar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the premier choice for Vasant Vihar students with AIIMS Delhi trained faculty, small personalized batches, 98% success rate, and premium learning environment. We also offer IB and IGCSE Biology tutoring for international school students from Vasant Vihar.',
                },
              },
              {
                '@type': 'Question',
                name: 'What batch timings does Cerebrum Academy offer for Vasant Vihar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our center is open 24/7 with online classes available for students worldwide with multiple batch options. We offer morning, afternoon, and evening sessions to accommodate Vasant Vihar students flexible schedules. Call +91-88264-44334 to book your preferred batch time.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Vasant Vihar students reach our coaching center?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Vasant Vihar, students can reach our South Extension center via personal vehicle (10-15 minutes) or auto-rickshaw. The nearest metro station is Lajpat Nagar, which is accessible via connecting routes. The center is conveniently located for Vasant Vihar residents.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees for Vasant Vihar students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer customized packages and flexible payment options for Vasant Vihar families. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for personalized fee consultation.',
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
              { '@type': 'ListItem', position: 3, name: 'Vasant Vihar', item: 'https://cerebrumbiologyacademy.com/locations/vasant-vihar' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
