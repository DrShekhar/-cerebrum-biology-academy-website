import { Metadata } from 'next'

function RohiniServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/locations/rohini',
    name: 'Cerebrum Biology Academy - Rohini',
    description:
      'NEET Biology coaching center in Rohini, Delhi at DC Chowk. AIIMS faculty, small batches, near Rohini West Metro. Best Biology coaching in North Delhi.',
    image: 'https://cerebrumbiologyacademy.com/images/rohini-center.jpg',
    telephone: '+91-88264-44334',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
      addressLocality: 'Rohini, Delhi',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.7041,
      longitude: 77.1025,
    },
    url: 'https://cerebrumbiologyacademy.com/locations/rohini',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '850',
    },
    areaServed: [
      'Rohini',
      'Pitampura',
      'Shalimar Bagh',
      'Paschim Vihar',
      'Punjabi Bagh',
      'Model Town',
      'Ashok Vihar',
      'GTB Nagar',
      'Mukherjee Nagar',
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
  title: 'NEET Biology Coaching Rohini Delhi | DC Chowk | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Rohini at DC Chowk. 211 Vikas Surya Tower, near Rohini West Metro. AIIMS faculty, small batches, 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Rohini',
    'NEET coaching DC Chowk',
    'Biology coaching Rohini',
    'NEET preparation North Delhi',
    'Best Biology teacher Rohini',
    'NEET classes Pitampura',
    'Biology tuition Shalimar Bagh',
    'NEET coaching near Rohini West Metro',
    'Vikas Surya Tower coaching',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Rohini Delhi | DC Chowk Center',
    description:
      'Premium NEET Biology coaching at DC Chowk, Rohini. Near Rohini West Metro. Small batches, AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/locations/rohini',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/rohini',
  },
}

function RohiniEventSchema() {
  const locationEvents = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming NEET Biology Batches - Rohini Center',
    description: 'Scheduled batch starts and demo classes at Cerebrum Biology Academy Rohini',
    itemListElement: [
      {
        '@type': 'EducationEvent',
        position: 1,
        name: 'NEET Biology Class 12 Intensive Batch - Rohini',
        description: 'Intensive NEET Biology preparation for Class 12 students at Rohini center. Complete syllabus coverage with MCQ practice and weekly test series.',
        startDate: '2026-03-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Rohini',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
            addressLocality: 'Rohini, Delhi',
            addressRegion: 'Delhi',
            postalCode: '110085',
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
        name: 'NEET Biology Class 11 Foundation Batch - Rohini',
        description: 'Early NEET preparation foundation batch for Class 11 students at Rohini. Build strong fundamentals with concept clarity and MCQ practice.',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Rohini',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
            addressLocality: 'Rohini, Delhi',
            addressRegion: 'Delhi',
            postalCode: '110085',
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
        name: 'Free NEET Biology Demo Class - Rohini',
        description: 'Experience Cerebrum teaching methodology with a free demo class. Learn live Biology concepts from AIIMS faculty with interactive Q&A.',
        startDate: '2026-02-15',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy - Rohini',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
            addressLocality: 'Rohini, Delhi',
            addressRegion: 'Delhi',
            postalCode: '110085',
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

export default function RohiniLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RohiniServiceSchema />
      <RohiniEventSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How close is Cerebrum Academy Rohini center to Sector 9?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy Rohini center is located at 211 Vikas Surya Tower, DC Chowk, Sector 9, Rohini, Delhi. It is directly in Sector 9, making it extremely convenient for all Rohini students with no commute required.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy Rohini the best NEET coaching center?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy Rohini offers the best NEET coaching with AIIMS Delhi trained faculty, small personalized batches, 98% success rate, and world-class learning infrastructure. Our center in North Delhi serves Pitampura, Shalimar Bagh, Paschim Vihar, and surrounding areas with premium quality education.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the coaching timings at Cerebrum Academy Rohini?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our Rohini center operates Monday to Saturday from 7:00 AM to 9:00 PM and Sunday from 9:00 AM to 6:00 PM. We offer multiple batch sessions to accommodate Rohini students flexible schedules. Call +91-9870-424-442 to know the best timing for your needs.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there metro access to Cerebrum Academy Rohini center?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Cerebrum Academy Rohini is near Rohini West Metro Station on the Blue Line, making it highly accessible. Students from across North Delhi can easily reach us via metro. The center is just a short walk from the metro station.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the fee structure for NEET coaching at Cerebrum Academy Rohini?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer flexible payment options and scholarship programs for deserving Rohini students. Contact +91-9870-424-442 or cerebrumacademy@gmail.com for detailed pricing.',
                },
              },
            ],
          }),
        }}
      />      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
              { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://cerebrumbiologyacademy.com/locations' },
              { '@type': 'ListItem', position: 3, name: 'Rohini', item: 'https://cerebrumbiologyacademy.com/locations/rohini' },
            ],
          }})
        }}
      />

      {children}
    </>
  )
}
