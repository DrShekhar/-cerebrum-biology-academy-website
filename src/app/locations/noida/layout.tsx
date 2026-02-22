import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Noida | Cerebrum Biology Academy',
  description:
    'Best NEET Biology coaching in Noida by AIIMS faculty. Small batches of 15 students, 98% success rate. Located in Sector 62. Call +91 88264 44334.',
  keywords: [
    'NEET coaching Noida',
    'Biology coaching Noida',
    'NEET Biology classes Noida',
    'Best NEET coaching Noida',
    'NEET preparation Noida',
    'Medical coaching Noida',
    'AIIMS coaching Noida',
    'NEET coaching Sector 62',
    'NEET coaching Sector 18',
    'NEET coaching near me Noida',
    'Biology tuition Noida',
    'NEET coaching Greater Noida',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Noida | Cerebrum Biology Academy',
    description:
      'Best NEET Biology coaching in Noida. AIIMS faculty, small batches, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/noida-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Noida Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Noida',
    description: 'Best NEET Biology coaching by AIIMS faculty. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations/noida',
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

function NoidaServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Noida',
    description: 'Best NEET Biology coaching in Noida with AIIMS faculty. 98% success rate, small batches, Sector 62 location.',
    url: 'https://cerebrumbiologyacademy.com/locations/noida',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.628,
      longitude: 77.3649,
    },
    areaServed: [
      'Sector 62',
      'Sector 18',
      'Sector 15',
      'Sector 16',
      'Sector 50',
      'Sector 63',
      'Noida City Centre',
      'Greater Noida',
      'Greater Noida West',
      'Gaur City',
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

// NoidaLocalBusinessSchema REMOVED — was duplicate with wrong address (South Extension/110049 for Noida)
// LocalBusiness schema is now handled by NoidaServiceSchema above with correct Sector 62 address

export default function NoidaLocationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoidaServiceSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How far is Cerebrum Academy from Noida Sector 62?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy has a dedicated center in Noida itself at B-45, Sector 62, making it extremely convenient for Noida students. It is right in the heart of Sector 62 near the metro station, so no need to travel to Delhi.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy the best NEET coaching choice for Noida students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the premier choice for Noida students because of our AIIMS Delhi trained faculty, small personalized batches, 98% success rate, and proven track record. Our structured curriculum and individual mentoring ensure every Noida student achieves their NEET goals.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings at Cerebrum Academy for Noida students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our Noida center at B-45, Sector 62 operates Monday to Saturday from 8:00 AM to 8:00 PM, with Sundays from 10:00 AM to 6:00 PM. We offer flexible batch schedules including morning, afternoon, and evening batches. Contact +91-88264-44334 for details.',
                },
              },
              {
                '@type': 'Question',
                name: 'How can Noida students reach Cerebrum Academy from Sector 62?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our Noida center at B-45, Sector 62 is just a short walk from Sector 62 Metro Station on the Blue Line. Students from all Noida sectors can easily reach us by metro, bus, or personal vehicle. The location is right in the IT hub area with excellent connectivity.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees for Noida students at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer special packages for Noida students and flexible payment options. Call us at +91-88264-44334 or email info@cerebrumbiologyacademy.com for personalized fee consultation.',
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
              { '@type': 'ListItem', position: 3, name: 'Noida', item: 'https://cerebrumbiologyacademy.com/locations/noida' },
            ],
          })
        }}
      />

      {children}
    </>
  )
}
