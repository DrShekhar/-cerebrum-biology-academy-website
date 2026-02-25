import { Metadata } from 'next'
import { GurugramServiceSchema } from '@/components/seo/StructuredData'

function GurugramLocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/locations/gurugram',
    additionalType: 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Gurugram',
    description: 'Best NEET Biology coaching in Gurugram by AIIMS faculty. Small batches of 15 students, 98% success rate. Located at M2K Corporate Park, Sector 51.',
    image: 'https://cerebrumbiologyacademy.com/images/gurugram-center.jpg',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122018',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4295,
      longitude: 77.0426,
    },
    url: 'https://cerebrumbiologyacademy.com/locations/gurugram',
    priceRange: '₹45,000 - ₹1,80,000',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '28',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      'Gurugram', 'Sector 51', 'DLF Phase 1', 'DLF Phase 2', 'DLF Phase 3',
      'DLF Phase 4', 'DLF Phase 5', 'Sohna Road', 'Golf Course Road',
      'MG Road', 'HUDA City Centre', 'Sector 44', 'Sector 45', 'Sector 46',
      'Sector 47', 'Sector 48', 'Sector 49', 'Sector 50', 'Cyber City',
      'Sushant Lok', 'South City', 'Nirvana Country', 'Palam Vihar',
    ],
    sameAs: [
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

function GurugramFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is Cerebrum Biology Academy located in Gurugram?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy Gurugram is located at Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018. It is easily accessible from DLF Phase 1-5, Golf Course Road, Sohna Road, and MG Road areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Cerebrum the best NEET coaching in Gurugram?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum is the best NEET coaching in Gurugram with AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, and 67+ AIIMS selections. Students from DPS Gurugram, Pathways World School, Shri Ram School, and GD Goenka choose Cerebrum for personalized NEET preparation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the NEET coaching fees at Cerebrum Academy Gurugram?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NEET Biology coaching fees at Cerebrum Gurugram range from ₹45,000 to ₹1,80,000 depending on course type and duration. We offer Class 11, Class 12, Dropper, and Foundation batches with flexible EMI options. Call +91-88264-44334 for detailed fee structure.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which schools in Gurugram send students to Cerebrum Academy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Students from top Gurugram schools choose Cerebrum including DPS Gurugram, Pathways World School, The Shri Ram School, GD Goenka World School, Amity International, Heritage School, Scottish High, and Presidium School. Our Sector 51 location is centrally accessible from all these schools.',
        },
      },
      {
        '@type': 'Question',
        name: 'What batch timings are available at Cerebrum Academy Gurugram?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Gurugram center operates Monday to Saturday 8:00 AM to 8:00 PM and Sunday 10:00 AM to 6:00 PM. We offer morning, afternoon, and evening batches to suit school schedules. Contact +91-88264-44334 for available slots.',
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

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Gurugram',
  description:
    'Best NEET Biology coaching in Gurugram by AIIMS faculty. Small batches of 15 students, 98% success rate. Located near HUDA City Centre. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Gurugram',
    'NEET coaching Gurgaon',
    'Biology coaching Gurugram',
    'NEET Biology classes Gurugram',
    'Best NEET coaching Gurugram',
    'NEET preparation Gurugram',
    'Medical coaching Gurugram',
    'AIIMS coaching Gurugram',
    'NEET coaching near HUDA City Centre',
    'NEET coaching Sector 44 Gurugram',
    'NEET coaching Golf Course Road',
    'NEET coaching DLF Gurugram',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Gurugram',
    description:
      'Best NEET Biology coaching in Gurugram. AIIMS faculty, small batches, 98% success rate. No need to travel to Delhi!',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/gurugram-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Gurugram Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Gurugram',
    description: 'Best NEET Biology coaching by AIIMS faculty. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/gurugram',
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

function GurugramEventSchema() {
  const locationEvents = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming NEET Biology Batches - Gurugram Center',
    description: 'Scheduled batch starts and demo classes at Cerebrum Biology Academy Gurugram',
    itemListElement: [
      {
        '@type': 'EducationEvent',
        position: 1,
        name: 'NEET Biology Class 12 Intensive Batch - Gurugram',
        description: 'Intensive NEET Biology preparation for Class 12 students at Gurugram center. Complete syllabus coverage with MCQ practice and weekly test series.',
        startDate: '2026-03-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Gurugram',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
            addressLocality: 'Gurugram',
            addressRegion: 'Haryana',
            postalCode: '122018',
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
        name: 'NEET Biology Class 11 Foundation Batch - Gurugram',
        description: 'Early NEET preparation foundation batch for Class 11 students at Gurugram. Build strong fundamentals with concept clarity and MCQ practice.',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Gurugram',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
            addressLocality: 'Gurugram',
            addressRegion: 'Haryana',
            postalCode: '122018',
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
        name: 'Free NEET Biology Demo Class - Gurugram',
        description: 'Experience Cerebrum teaching methodology with a free demo class. Learn live Biology concepts from AIIMS faculty with interactive Q&A.',
        startDate: '2026-02-15',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Gurugram',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
            addressLocality: 'Gurugram',
            addressRegion: 'Haryana',
            postalCode: '122018',
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

export default function GurugramLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GurugramServiceSchema />
      <GurugramLocalBusinessSchema />
      <GurugramFAQSchema />
      <GurugramEventSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Gurugram', item: 'https://cerebrumbiologyacademy.com/locations/gurugram' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
