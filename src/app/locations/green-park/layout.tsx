import { Metadata } from 'next'

function GreenParkServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/locations/green-park',
    name: 'Cerebrum Biology Academy - Green Park',
    description:
      'NEET Biology coaching center in Green Park, Delhi. Near Yellow Line Metro, Hauz Khas, IIT Delhi. AIIMS faculty, small batches, weekend batches available.',
    image: 'https://cerebrumbiologyacademy.com/images/green-park-center.jpg',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B 113 FF Gulmohar Park',
      addressLocality: 'Green Park, New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5597,
      longitude: 77.2089,
    },
    url: 'https://cerebrumbiologyacademy.com/locations/green-park',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '650',
    },
    areaServed: [
      'Green Park',
      'Hauz Khas',
      'IIT Delhi',
      'Safdarjung',
      'Malviya Nagar',
      'Saket',
      'Panchsheel',
      'SDA',
      'Munirka',
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
  title: 'NEET Biology Coaching Green Park Delhi | Near Hauz Khas | Cerebrum',
  description:
    'NEET Biology coaching in Green Park, Delhi. Near Green Park Metro (Yellow Line), Hauz Khas, IIT Delhi. AIIMS faculty, small batches, weekend batches. Book free demo!',
  keywords: [
    'NEET coaching Green Park',
    'NEET coaching Hauz Khas',
    'Biology coaching Green Park Delhi',
    'NEET preparation near IIT Delhi',
    'Best Biology teacher Green Park',
    'NEET classes Safdarjung',
    'Biology tuition Malviya Nagar',
    'NEET coaching near Green Park Metro',
    'Weekend NEET classes Delhi',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Green Park Delhi | Near Hauz Khas',
    description:
      'Premium NEET Biology coaching in Green Park. Near Yellow Line Metro, Hauz Khas. Small batches, AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/green-park',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Green Park Delhi | Near Hauz Khas | Cerebrum',
    description: 'NEET Biology coaching center in Green Park, Delhi. Near Yellow Line Metro, Hauz Khas, IIT Delhi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/green-park',
  },
}

function GreenParkFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How far is Cerebrum Academy from Green Park?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy has a center in Green Park itself located near Hauz Khas and Yellow Line Metro. Our Green Park center is convenient for students from Green Park, Hauz Khas, Malviya Nagar, Saket, and IIT Delhi area. It provides easy access without long commutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Cerebrum the best NEET coaching for Green Park students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum is the best NEET coaching for Green Park students with AIIMS Delhi faculty, small batches of 15 students, 98% success rate, weekend batch options, and a Green Park center located in the heart of the locality. We specialize in coaching students from South Delhi premium areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the batch timings at Cerebrum Green Park center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Green Park center operates 7 days a week with extended hours. Monday to Saturday: 8:00 AM to 8:00 PM, Sunday: 9:00 AM to 6:00 PM. We offer multiple batch options including weekend batches for working students. Call +91-9870-424-442 for specific timings.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to reach Cerebrum from Green Park using metro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Green Park center is located near Green Park Metro Station (Yellow Line). You can reach us within 5 minutes from the metro station. It is also accessible by personal vehicles and auto. The location is very convenient for students from Hauz Khas, Malviya Nagar, and IIT Delhi.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the NEET coaching fees at Cerebrum Green Park center?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Academy fees range from Rs. 45,000 to Rs. 1,80,000 based on batch type and course duration. We offer flexible EMI options and special rates for Green Park students. Contact cerebrumacademy@gmail.com or +91-9870-424-442 for detailed pricing.',
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

function GreenParkEventSchema() {
  const locationEvents = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming NEET Biology Batches - Green Park Center',
    description: 'Scheduled batch starts and demo classes at Cerebrum Biology Academy Green Park',
    itemListElement: [
      {
        '@type': 'EducationEvent',
        position: 1,
        name: 'NEET Biology Class 12 Intensive Batch - Green Park',
        description: 'Intensive NEET Biology preparation for Class 12 students at Green Park center. Complete syllabus coverage with MCQ practice and weekly test series.',
        startDate: '2026-03-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Green Park',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'B 113 FF Gulmohar Park',
            addressLocality: 'Green Park, New Delhi',
            addressRegion: 'Delhi',
            postalCode: '110049',
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
        name: 'NEET Biology Class 11 Foundation Batch - Green Park',
        description: 'Early NEET preparation foundation batch for Class 11 students at Green Park. Build strong fundamentals with concept clarity and MCQ practice.',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Green Park',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'B 113 FF Gulmohar Park',
            addressLocality: 'Green Park, New Delhi',
            addressRegion: 'Delhi',
            postalCode: '110049',
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
        name: 'Free NEET Biology Demo Class - Green Park',
        description: 'Experience Cerebrum teaching methodology with a free demo class. Learn live Biology concepts from AIIMS faculty with interactive Q&A.',
        startDate: '2026-02-15',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Green Park',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'B 113 FF Gulmohar Park',
            addressLocality: 'Green Park, New Delhi',
            addressRegion: 'Delhi',
            postalCode: '110049',
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

export default function GreenParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GreenParkServiceSchema />
      <GreenParkFAQSchema />
      <GreenParkEventSchema />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Green Park', item: 'https://cerebrumbiologyacademy.com/locations/green-park' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
