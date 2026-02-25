import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Panchsheel Park & Enclave',
  description:
    'Best NEET Biology coaching for Panchsheel Park & Panchsheel Enclave students. Diplomat area, premium locality. AIIMS faculty, small batches. Book free demo!',
  keywords: [
    'NEET coaching Panchsheel Park',
    'NEET coaching Panchsheel Enclave',
    'Biology coaching Panchsheel',
    'NEET Biology classes Panchsheel Park',
    'Biology tuition Panchsheel Enclave',
    'Best Biology teacher Panchsheel',
    'NEET preparation Panchsheel',
    'Medical coaching Panchsheel Park',
    'Biology tutor near Panchsheel',
    'NEET classes Chirag Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Panchsheel Students',
    description:
      'Expert NEET Biology coaching for Panchsheel Park and Enclave residents. Premium coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/panchsheel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Panchsheel Park & Enclave',
    description: 'Best NEET Biology coaching for Panchsheel Park & Panchsheel Enclave students. Diplomat area, premium locality.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/panchsheel',
  },
}

function PanchsheelSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Panchsheel Students',
    description:
      'Premium NEET Biology coaching for students from Panchsheel Park and Panchsheel Enclave. Expert AIIMS faculty, personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/locations/panchsheel',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Panchsheel Park',
      'Panchsheel Enclave',
      'Chirag Delhi',
      'Sheikh Sarai',
      'Greater Kailash',
      'Hauz Khas',
      'Malviya Nagar',
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

function PanchsheelLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Panchsheel',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/panchsheel',
    'telephone': '+91-88264-44334',
    'email': 'info@cerebrumbiologyacademy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Panchsheel',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5433,
      'longitude': 77.2163,
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

export default function PanchsheelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PanchsheelSchema />
      <PanchsheelLocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How far is Cerebrum Academy from Panchsheel Park and Enclave?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is just 5-8 minutes from Panchsheel Park and Panchsheel Enclave. Our South Extension center is very close to this affluent South Delhi locality, making it the most convenient choice for Panchsheel students.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why is Cerebrum Academy the best for NEET preparation in Panchsheel?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy stands out for Panchsheel students with AIIMS Delhi trained faculty, premium learning environment, small personalized batches, 98% success rate, and individual mentoring. We provide world-class education matching the expectations of Panchsheel families.',
                },
              },
              {
                '@type': 'Question',
                name: 'What batch timings does Cerebrum Academy offer for Panchsheel students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We operate open 24/7 with online classes available for students worldwide with multiple batch options including morning, afternoon, and evening sessions. Panchsheel students can choose flexible timings that suit their schedule. Call +91-88264-44334 to book your preferred batch.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Panchsheel students access Cerebrum Academy using public transport?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'From Panchsheel, students can easily reach our South Extension center via auto-rickshaw (5-10 minutes) or personal vehicle. Lajpat Nagar Metro Station is the nearest metro stop, from which our center is a short walk away. The location is highly accessible for Panchsheel residents.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees for Panchsheel students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer customized packages and flexible payment options for Panchsheel families. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for detailed fee information.',
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
              { '@type': 'ListItem', position: 3, name: 'Panchsheel', item: 'https://cerebrumbiologyacademy.com/locations/panchsheel' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
