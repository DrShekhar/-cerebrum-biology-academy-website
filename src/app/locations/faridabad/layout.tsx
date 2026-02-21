import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Faridabad | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Faridabad by AIIMS faculty. Small batches of 15 students, 98% success rate. Located in Sector 15. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Faridabad',
    'Biology coaching Faridabad',
    'NEET Biology classes Faridabad',
    'Best NEET coaching Faridabad',
    'NEET preparation Faridabad',
    'Medical coaching Faridabad',
    'AIIMS coaching Faridabad',
    'NEET coaching Sector 15 Faridabad',
    'NEET coaching near me Faridabad',
    'Biology tuition Faridabad',
    'NEET coaching Ballabgarh',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Faridabad | Cerebrum Biology Academy',
    description:
      'Best NEET Biology coaching in Faridabad. AIIMS faculty, small batches, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/faridabad-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Faridabad Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Faridabad',
    description: 'Best NEET Biology coaching by AIIMS faculty. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/faridabad',
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

function FaridabadServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Faridabad',
    description: 'Best NEET Biology coaching in Faridabad with AIIMS faculty',
    url: 'https://cerebrumbiologyacademy.com/locations/faridabad',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 23, Sector 15',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121007',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.3948,
      longitude: 77.3117,
    },
    areaServed: [
      'Sector 15',
      'Sector 16',
      'Sector 17',
      'Sector 21',
      'NIT Faridabad',
      'Ballabgarh',
      'Old Faridabad',
      'Badarpur',
      'Surajkund',
      'Palwal',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '280',
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

function FaridabadLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Cerebrum Biology Academy - Faridabad',
    'image': 'https://cerebrumbiologyacademy.com/images/cerebrum-logo.png',
    'url': 'https://cerebrumbiologyacademy.com/locations/faridabad',
    'telephone': '+91-9870-424-442',
    'email': 'cerebrumacademy@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Near South Extension',
      'addressLocality': 'Faridabad',
      'addressRegion': 'Haryana',
      'postalCode': '110049',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.4089,
      'longitude': 77.3178,
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

function FaridabadFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How far is Cerebrum Academy from Faridabad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy has centers in South Extension, New Delhi and Faridabad Sector 15 to serve students from Faridabad and nearby areas. The Faridabad center at SCO 23, Sector 15 is centrally located for easy access to students from all sectors of Faridabad.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Cerebrum the best NEET coaching center in Faridabad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum is the best NEET coaching in Faridabad with AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, personalized attention, and a dedicated Faridabad center in Sector 15 for convenient access to local students.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the coaching timings at Cerebrum Faridabad center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Faridabad center operates 7 days a week with extended hours. Monday to Saturday: 8:00 AM to 8:00 PM, Sunday: 9:00 AM to 6:00 PM. Multiple batch timings are available for Faridabad students. Contact +91-9870-424-442 for specific batch schedules.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Faridabad center easily accessible by metro or road?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Cerebrum Faridabad center at Sector 15 is well-connected and easily accessible. You can reach via NH 44 or local roads. It is close to NIT Faridabad and other important landmarks. The location is convenient for students from all sectors of Faridabad and surrounding areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the NEET coaching fees at Cerebrum Faridabad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and course duration. We offer flexible EMI options for Faridabad students. Contact cerebrumacademy@gmail.com or call +91-9870-424-442 for detailed fee structure and special Faridabad offers.',
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

function FaridabadEventSchema() {
  const locationEvents = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming NEET Biology Batches - Faridabad Center',
    description: 'Scheduled batch starts and demo classes at Cerebrum Biology Academy Faridabad',
    itemListElement: [
      {
        '@type': 'EducationEvent',
        position: 1,
        name: 'NEET Biology Class 12 Intensive Batch - Faridabad',
        description: 'Intensive NEET Biology preparation for Class 12 students at Faridabad center. Complete syllabus coverage with MCQ practice and weekly test series.',
        startDate: '2026-03-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Faridabad',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sector 17',
            addressLocality: 'Faridabad',
            addressRegion: 'Haryana',
            postalCode: '121002',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        offers: {
          '@type': 'Offer',
          price: '75000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: 'https://cerebrumbiologyacademy.com/book-free-demo',
          validFrom: '2026-01-01',
        },
      },
      {
        '@type': 'EducationEvent',
        position: 2,
        name: 'NEET Biology Class 11 Foundation Batch - Faridabad',
        description: 'Early NEET preparation foundation batch for Class 11 students at Faridabad. Build strong fundamentals with concept clarity and MCQ practice.',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Faridabad',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sector 17',
            addressLocality: 'Faridabad',
            addressRegion: 'Haryana',
            postalCode: '121002',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        offers: {
          '@type': 'Offer',
          price: '75000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: 'https://cerebrumbiologyacademy.com/book-free-demo',
          validFrom: '2026-01-01',
        },
      },
      {
        '@type': 'EducationEvent',
        position: 3,
        name: 'Free NEET Biology Demo Class - Faridabad',
        description: 'Experience Cerebrum teaching methodology with a free demo class. Learn live Biology concepts from AIIMS faculty with interactive Q&A.',
        startDate: '2026-02-15',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Faridabad',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sector 17',
            addressLocality: 'Faridabad',
            addressRegion: 'Haryana',
            postalCode: '121002',
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: 'https://cerebrumbiologyacademy.com/book-free-demo',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(locationEvents) }}
    />
  )
}

export default function FaridabadLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaridabadServiceSchema />
      <FaridabadLocalBusinessSchema />
      <FaridabadFAQSchema />
      <FaridabadEventSchema />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Faridabad', item: 'https://cerebrumbiologyacademy.com/locations/faridabad' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
