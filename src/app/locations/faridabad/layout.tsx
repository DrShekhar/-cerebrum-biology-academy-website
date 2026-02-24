import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Faridabad',
  description:
    'Best NEET Biology coaching in Faridabad by AIIMS faculty. Small batches of 15 students, 98% success rate. Located in Sector 17, HUDA Market. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Faridabad',
    'Biology coaching Faridabad',
    'NEET Biology classes Faridabad',
    'Best NEET coaching Faridabad',
    'NEET preparation Faridabad',
    'Medical coaching Faridabad',
    'AIIMS coaching Faridabad',
    'NEET coaching Sector 17 Faridabad',
    'NEET coaching near me Faridabad',
    'Biology tuition Faridabad',
    'NEET coaching Ballabgarh',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Faridabad',
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
    '@type': 'LocalBusiness',
    additionalType: 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Faridabad',
    description: 'Best NEET Biology coaching in Faridabad with AIIMS faculty. 98% success rate, small batches, Sector 17 location.',
    url: 'https://cerebrumbiologyacademy.com/locations/faridabad',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCF 124, Second Floor, Above Union Bank of India, Huda Market, Sector 17',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121002',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4089,
      longitude: 77.3178,
    },
    areaServed: [
      'Sector 15',
      'Sector 16',
      'Sector 17',
      'Sector 21',
      'NIT Faridabad',
      'Ballabgarh',
      'Old Faridabad',
      'Greater Faridabad',
      'Surajkund',
      'BPTP',
    ],
    // IMPORTANT: Must match Google Business Profile exactly (verified Feb 2026)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '38',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '₹₹',
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
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FaridabadLocalBusinessSchema REMOVED — was duplicate with wrong address (South Extension/110049 for Faridabad)
// LocalBusiness schema is now handled by FaridabadServiceSchema above with correct Sector 17 address

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
          text: 'Cerebrum Biology Academy has a center at SCF 124, Second Floor, Above Union Bank of India, HUDA Market, Sector 17, Faridabad. The center is just 5 minutes from Bata Chowk Metro Station (Violet Line) and serves students from all sectors of Faridabad.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Cerebrum the best NEET coaching center in Faridabad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum is the best NEET coaching in Faridabad with AIIMS Delhi trained faculty, small batches of 15 students, 98% success rate, personalized attention, and a dedicated Faridabad center in Sector 17 HUDA Market for convenient access to local students.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the coaching timings at Cerebrum Faridabad center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Faridabad center operates 7 days a week with extended hours. Monday to Saturday: 8:00 AM to 8:00 PM, Sunday: 9:00 AM to 6:00 PM. Multiple batch timings are available for Faridabad students. Contact +91-88264-44334 for specific batch schedules.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Faridabad center easily accessible by metro or road?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Cerebrum Faridabad center at Sector 17 HUDA Market is well-connected. The nearest metro station is Bata Chowk (Violet Line), just 5 minutes walk. You can also reach via Mathura Road or NH 44. It is close to NIT Faridabad, Ballabgarh, and YMCA intersection.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the NEET coaching fees at Cerebrum Faridabad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and course duration. We offer flexible EMI options for Faridabad students. Contact info@cerebrumbiologyacademy.com or call +91-88264-44334 for detailed fee structure and special Faridabad offers.',
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
            streetAddress: 'SCF 124, Second Floor, Above Union Bank of India, Huda Market, Sector 17',
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
            streetAddress: 'SCF 124, Second Floor, Above Union Bank of India, Huda Market, Sector 17',
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
            streetAddress: 'SCF 124, Second Floor, Above Union Bank of India, Huda Market, Sector 17',
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
