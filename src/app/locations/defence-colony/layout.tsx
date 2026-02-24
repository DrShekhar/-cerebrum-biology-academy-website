import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Defence Colony Delhi',
  description:
    'Best NEET Biology coaching for Defence Colony students. AIIMS faculty, small batches, 98% success rate. Near Lajpat Nagar Metro. South Extension center 3 min away. Book free demo!',
  keywords: [
    'NEET coaching Defence Colony',
    'Biology coaching Defence Colony',
    'NEET Biology classes Defence Colony',
    'Biology tuition Defence Colony',
    'Best Biology teacher Defence Colony',
    'NEET preparation Defence Colony',
    'Medical coaching Defence Colony',
    'Biology tutor near Defence Colony',
    'CBSE Biology coaching Defence Colony',
    'ICSE Biology tuition Defence Colony',
  ],
  openGraph: {
    title: 'NEET Biology Coaching for Defence Colony Students',
    description:
      'Expert NEET Biology coaching for Defence Colony residents. Join our flagship South Extension center, just 3 min away.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Defence Colony Delhi',
    description: 'Best NEET Biology coaching for Defence Colony students. AIIMS faculty, small batches, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
  },
}

function DefenceColonySchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NEET Biology Coaching for Defence Colony Students',
    description:
      'Premium NEET Biology coaching for students from Defence Colony and Lajpat Nagar area. Expert AIIMS faculty, personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/locations/defence-colony',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
    },
    areaServed: [
      'Defence Colony',
      'Lajpat Nagar',
      'Jangpura',
      'Nizamuddin',
      'Andrews Ganj',
      'Amar Colony',
      'Moolchand',
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

function DefenceColonyLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Defence Colony',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/defence-colony',
    'telephone': '+91-88264-44334',
    'email': 'info@cerebrumbiologyacademy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Defence Colony',
      'addressRegion': 'Delhi',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.5722,
      'longitude': 77.2305,
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

function DefenceColonyFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How close is Cerebrum Academy to Defence Colony?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy is located in South Extension Part 2, New Delhi, just 3 minutes away from Defence Colony. This makes it the most convenient NEET coaching center for Defence Colony students and residents of nearby Lajpat Nagar.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why choose Cerebrum for NEET coaching in Defence Colony?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Academy is the best choice for Defence Colony students because we have expert AIIMS Delhi trained faculty, small batch sizes of 15 students, personalized attention, 98% success rate, and a location just 3 minutes from your locality. Our proven track record makes us the preferred choice.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the class timings for Defence Colony students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum operates Monday to Saturday from 8:00 AM to 8:00 PM. We offer flexible batch timings including morning, afternoon, and evening batches to suit Defence Colony students. Call +91-88264-44334 for current batch schedules.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there metro access from Defence Colony to Cerebrum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Defence Colony is near Lajpat Nagar Metro station on the Yellow and Pink Lines. Our South Extension center is easily accessible by metro, taking just 3-5 minutes. You can also reach by auto, cab, or personal vehicle. It is the most convenient location for Defence Colony students.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much are the NEET coaching fees at Cerebrum?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy offers NEET coaching fees ranging from Rs. 45,000 to Rs. 1,80,000 depending on the batch type and duration. We provide flexible EMI options for Defence Colony students. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for detailed pricing.',
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

export default function DefenceColonyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefenceColonySchema />
      <DefenceColonyLocalBusinessSchema />
      <DefenceColonyFAQSchema />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Defence Colony', item: 'https://cerebrumbiologyacademy.com/locations/defence-colony' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
