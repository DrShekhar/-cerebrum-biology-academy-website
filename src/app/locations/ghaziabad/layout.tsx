import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Ghaziabad',
  description:
    'Best NEET Biology coaching in Ghaziabad by AIIMS faculty. Small batches of 15 students, 98% success rate. Serving Indirapuram, Vaishali, Raj Nagar, Vasundhara. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Ghaziabad',
    'Biology coaching Ghaziabad',
    'NEET Biology classes Ghaziabad',
    'Best NEET coaching Ghaziabad',
    'NEET preparation Ghaziabad',
    'Medical coaching Ghaziabad',
    'AIIMS coaching Ghaziabad',
    'NEET coaching Indirapuram',
    'NEET coaching Vaishali',
    'NEET coaching Raj Nagar',
    'NEET coaching Vasundhara',
    'NEET coaching near me Ghaziabad',
    'Biology tuition Ghaziabad',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Ghaziabad',
    description:
      'Best NEET Biology coaching in Ghaziabad. AIIMS faculty, small batches, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - NEET Coaching in Ghaziabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Ghaziabad',
    description: 'Best NEET Biology coaching by AIIMS faculty. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/ghaziabad',
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

function GhaziabadServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Ghaziabad (Online)',
    description:
      'Live online NEET Biology coaching for Ghaziabad with AIIMS faculty. 98% success rate, small batches. Online classes for Indirapuram, Vaishali, Raj Nagar, Vasundhara students.',
    url: 'https://cerebrumbiologyacademy.com/locations/ghaziabad',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'D 35, South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5725,
      longitude: 77.2217,
    },
    areaServed: [
      'Indirapuram',
      'Vaishali',
      'Raj Nagar Extension',
      'Vasundhara',
      'Loni',
      'Sahibabad',
      'Mohan Nagar',
      'Kaushambi',
      'Crossing Republik',
      'Raj Nagar',
    ],
    priceRange: '₹40,000 - ₹1,80,000',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '20:00',
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

function GhaziabadFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is there a Cerebrum Biology Academy center in Ghaziabad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy currently offers live online NEET Biology classes for Ghaziabad students from Indirapuram, Vaishali, Raj Nagar, Vasundhara, and surrounding areas. Students who prefer in-person study can attend our nearest walk-in centers in Rohini (DC Chowk) and South Extension, New Delhi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is the best NEET coaching in Ghaziabad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy is rated among the best NEET Biology coaching options for Ghaziabad students with a 98% success rate, AIIMS faculty, and small batches of 10-15 students. We teach Ghaziabad students through live online classes, with in-person study available at our Rohini and South Extension centers for those who prefer it.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can Ghaziabad students join Cerebrum Academy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ghaziabad students can join through live online classes, or attend our Rohini center (DC Chowk, ~20 min from Vaishali via Blue Line Metro) or South Extension center in New Delhi if they prefer in-person study. Book a free demo class at cerebrumbiologyacademy.com/demo-booking or call +91-88264-44334.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the NEET coaching fees for Ghaziabad students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our NEET Biology coaching fees range from Rs 45,000 to Rs 1,80,000 depending on the course and batch type. We offer flexible EMI options and special packages for Ghaziabad students. Contact +91-88264-44334 for detailed fee structure.',
        },
      },
      {
        '@type': 'Question',
        name: 'What areas in Ghaziabad does Cerebrum Academy serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We serve students from all major areas of Ghaziabad including Indirapuram, Vaishali, Raj Nagar Extension, Vasundhara, Loni, Sahibabad, Mohan Nagar, Kaushambi, and Crossing Republik. Online classes are available for all Ghaziabad students.',
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

function GhaziabadEventSchema() {
  const locationEvents = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming NEET Biology Batches - Ghaziabad (Online)',
    description:
      'Scheduled batch starts and demo classes for Ghaziabad students at Cerebrum Biology Academy',
    itemListElement: [
      {
        '@type': 'EducationEvent',
        position: 1,
        name: 'NEET Biology Class 12 Online Batch - Ghaziabad Students',
        description:
          'Intensive NEET Biology preparation for Class 12 students from Ghaziabad. Complete syllabus coverage with live online classes and online proctored test series.',
        startDate: '2026-03-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
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
        name: 'Free NEET Biology Demo Class - Ghaziabad Students',
        description:
          'Experience Cerebrum teaching methodology with a free demo class. Available online for all Ghaziabad students.',
        startDate: '2026-03-15',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
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

export default function GhaziabadLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GhaziabadServiceSchema />
      <GhaziabadFAQSchema />
      <GhaziabadEventSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Locations',
                item: 'https://cerebrumbiologyacademy.com/locations',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Ghaziabad',
                item: 'https://cerebrumbiologyacademy.com/locations/ghaziabad',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
