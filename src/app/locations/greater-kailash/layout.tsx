import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Greater Kailash GK | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching for Greater Kailash students. GK 1, GK 2, Kailash Colony. AIIMS faculty, small batches, 98% success rate. South Extension center 5 min away. Book free demo!',
  keywords: [
    'NEET coaching Greater Kailash',
    'NEET coaching GK',
    'Biology coaching Greater Kailash',
    'NEET Biology classes GK 1',
    'NEET Biology classes GK 2',
    'Biology tuition Greater Kailash',
    'Best Biology teacher GK',
    'NEET preparation Greater Kailash',
    'Medical coaching GK',
    'Biology tutor Kailash Colony',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Greater Kailash Students',
    description:
      'Expert NEET Biology coaching for GK residents. Join our flagship South Extension center, just 5 min away.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
  },
}

function GreaterKailashSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Greater Kailash Students',
    description:
      'Premium NEET Biology coaching for students from Greater Kailash, GK 1, GK 2, and Kailash Colony. Expert AIIMS faculty, small batches.',
    url: 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
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
      'Kailash Colony',
      'East of Kailash',
      'Chirag Delhi',
      'Nehru Place',
      'CR Park',
    ],
    serviceType: 'NEET Biology Coaching',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '450',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function GreaterKailashLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Greater Kailash',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/greater-kailash',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Greater Kailash',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5488,
      'longitude': 77.2347,
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

function GreaterKailashFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How close is Cerebrum Academy to Greater Kailash (GK-1, GK-2)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy is located in South Extension Part 2, New Delhi, just 5 minutes away from Greater Kailash. Our flagship center is super convenient for GK-1, GK-2, Kailash Colony, and East of Kailash students, making it the best choice for GK residents.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Cerebrum the best NEET coaching for Greater Kailash students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum is the best NEET coaching for GK students with AIIMS Delhi trained faculty, small batch sizes of 15 students, 98% success rate, personalized attention, and our flagship South Extension center just 5 minutes from Greater Kailash. We specialize in coaching elite GK locality students.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the batch timings for Greater Kailash students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum operates Monday to Saturday from 8:00 AM to 8:00 PM with multiple batch options including morning, afternoon, and evening batches. GK students can choose timings that suit their schedule. Call +91-9870-424-442 to know current batches for Greater Kailash.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it easy to reach Cerebrum from Greater Kailash by metro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, from Greater Kailash you can easily reach our South Extension center by metro, auto, or personal vehicle in just 5 minutes. Our location is near Nehru Place and GK, making it the most convenient NEET center for Greater Kailash and surrounding areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the NEET coaching fees at Cerebrum for GK students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and duration. We offer flexible payment and EMI options for Greater Kailash students. Email cerebrumacademy@gmail.com or call +91-9870-424-442 for detailed fee structure.',
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

export default function GreaterKailashLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GreaterKailashSchema />
      <GreaterKailashLocalBusinessSchema />
      <GreaterKailashFAQSchema />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Greater Kailash', item: 'https://cerebrumbiologyacademy.com/locations/greater-kailash' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
