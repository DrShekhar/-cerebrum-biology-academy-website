import { Metadata } from 'next'

function SouthExtensionServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/locations/south-extension',
    name: 'Cerebrum Biology Academy - South Extension (Flagship)',
    description:
      'Flagship NEET Biology coaching center in South Extension, Delhi. AIIMS faculty, small batches, near Lajpat Nagar Metro. Dr. Shekhar personally conducts classes.',
    image: 'https://cerebrumbiologyacademy.com/images/south-extension-center.jpg',
    telephone: '+91-88264-44334',
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
      latitude: 28.5678,
      longitude: 77.2234,
    },
    url: 'https://cerebrumbiologyacademy.com/locations/south-extension',
    priceRange: '₹45,000 - ₹1,80,000',
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
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: [
      'South Extension',
      'Lajpat Nagar',
      'Greater Kailash',
      'GK 1',
      'GK 2',
      'Defence Colony',
      'Kalkaji',
      'CR Park',
      'AIIMS',
      'Green Park',
      'Hauz Khas',
      'Malviya Nagar',
      'Saket',
      'Gulmohar Park',
      'Panchsheel Park',
      'Panchsheel Enclave',
      'Safdarjung Enclave',
      'SDA',
      'Vasant Vihar',
      'Shanti Niketan',
      'Anand Lok',
      'Jor Bagh',
      'Sundar Nagar',
      'New Friends Colony',
      'Friends Colony East',
      'Friends Colony West',
      'Maharani Bagh',
      'Kailash Colony',
      'East of Kailash',
      'Nehru Place',
      'Moolchand',
      'Jangpura',
      'Vasant Kunj',
      'Chirag Delhi',
      'Chirag Enclave',
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
  title: 'NEET Biology Coaching South Extension Delhi | Flagship Center',
  description:
    'Cerebrum Biology Academy flagship center in South Extension Part 2, Delhi. AIIMS faculty led by Dr. Shekhar. Near Lajpat Nagar Metro. Small batches, 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching South Extension',
    'NEET coaching Lajpat Nagar',
    'NEET Biology classes South Delhi',
    'Biology coaching near AIIMS',
    'NEET preparation South Extension',
    'Best Biology teacher South Delhi',
    'NEET coaching Defence Colony',
    'Biology tuition Greater Kailash',
    'NEET classes near Lajpat Nagar Metro',
  ],
  openGraph: {
    title: 'NEET Biology Coaching South Extension Delhi | Flagship Center',
    description:
      'Our flagship center near AIIMS where Dr. Shekhar personally teaches. Small batches, AIIMS faculty, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/south-extension',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching South Extension Delhi | Flagship Center',
    description: 'Flagship NEET Biology coaching center in South Extension, Delhi. AIIMS faculty, small batches, near Lajpat Nagar Metro.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/south-extension',
  },
}

function SouthExtensionEventSchema() {
  const locationEvents = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming NEET Biology Batches - South Extension Center',
    description: 'Scheduled batch starts and demo classes at Cerebrum Biology Academy South Extension',
    itemListElement: [
      {
        '@type': 'EducationEvent',
        position: 1,
        name: 'NEET Biology Class 12 Intensive Batch - South Extension',
        description: 'Intensive NEET Biology preparation for Class 12 students at South Extension flagship center. Complete syllabus coverage with MCQ practice and weekly test series.',
        startDate: '2026-03-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - South Extension',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'D 35, South Extension Part 2',
            addressLocality: 'New Delhi',
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
        name: 'NEET Biology Class 11 Foundation Batch - South Extension',
        description: 'Early NEET preparation foundation batch for Class 11 students at South Extension. Build strong fundamentals with concept clarity and MCQ practice.',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - South Extension',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'D 35, South Extension Part 2',
            addressLocality: 'New Delhi',
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
        name: 'Free NEET Biology Demo Class - South Extension',
        description: 'Experience Cerebrum teaching methodology with a free demo class. Learn live Biology concepts from AIIMS faculty with interactive Q&A.',
        startDate: '2026-02-15',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - South Extension',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'D 35, South Extension Part 2',
            addressLocality: 'New Delhi',
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

export default function SouthExtensionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SouthExtensionServiceSchema />
      <SouthExtensionEventSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How close is Cerebrum Academy to South Extension?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy flagship center is located directly in South Extension Part 2, D 35, New Delhi. It is at the heart of South Extension, making it extremely convenient for South Extension students with no commute required.',
                },
              },
              {
                '@type': 'Question',
                name: 'Why should South Extension students choose Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the best choice for South Extension students with AIIMS Delhi trained faculty led by Dr. Shekhar who personally conducts classes, small personalized batches, 98% success rate, and premium learning environment. Our flagship center offers unparalleled excellence.',
                },
              },
              {
                '@type': 'Question',
                name: 'What batch timings are available at Cerebrum Academy South Extension?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our flagship center is open 24/7 with online classes available for students worldwide. We offer multiple batch options including morning, afternoon, and evening sessions for in-person classes, plus round-the-clock online support for international students. Call +91-88264-44334 to check your preferred batch timing.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the metro and transport access to Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is directly near Lajpat Nagar Metro Station (Pink and Yellow Lines), making it extremely accessible. South Extension students can take metro directly to our center. The location is also accessible via buses and personal vehicles with ample parking.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the coaching fees at Cerebrum Academy South Extension?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer flexible payment options and customized packages for South Extension students. Contact info@cerebrumbiologyacademy.com or +91-88264-44334 for detailed fee structure.',
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
              { '@type': 'ListItem', position: 3, name: 'South Extension', item: 'https://cerebrumbiologyacademy.com/locations/south-extension' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
