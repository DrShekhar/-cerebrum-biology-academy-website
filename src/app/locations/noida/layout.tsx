import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Noida',
  description:
    'Best live online NEET Biology coaching for Noida students by AIIMS faculty. Small batches of 15, 98% qualification rate. Learn from home — no travel. Call +91 88264 44334.',
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
    title: 'NEET Biology Coaching in Noida',
    description:
      'Best NEET Biology coaching in Noida. AIIMS faculty, small batches, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/noida-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - Online NEET Coaching for Noida',
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
  // ONLINE service — Cerebrum has NO physical center in Noida. This is a Service
  // with areaServed (accurate) and a provider whose address is the REAL South
  // Extension flagship. Do NOT add a Noida PostalAddress / geo / opening hours.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Online NEET Biology Coaching',
    name: 'Cerebrum Biology Academy - Noida (Online)',
    description:
      'Live online NEET Biology coaching for Noida students with AIIMS-trained faculty, small batches and a 98% qualification rate. Classes are live online — the nearest walk-in center is South Extension, New Delhi.',
    url: 'https://cerebrumbiologyacademy.com/locations/noida',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      telephone: '+91-88264-44334',
      email: 'shekharcsingh57@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'D 35, South Extension Part 2',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        postalCode: '110049',
        addressCountry: 'IN',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Greater Noida' },
      { '@type': 'City', name: 'Ghaziabad' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://cerebrumbiologyacademy.com/locations/noida',
      servicePhone: '+91-88264-44334',
      availableLanguage: ['English', 'Hindi'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

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
                name: 'Does Cerebrum Academy have a physical center in Noida?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No — we teach Noida students through live online classes, so there is nothing to travel to. Our nearest walk-in center is the South Extension flagship in New Delhi. Noida, Greater Noida and Ghaziabad students learn entirely online with the same AIIMS-trained faculty.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes Cerebrum Academy the best NEET coaching choice for Noida students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Academy is the premier choice for Noida students because of our AIIMS Delhi trained faculty, small personalized live batches, 98% qualification rate, and proven track record. Our structured curriculum and individual mentoring ensure every Noida student achieves their NEET goals.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the batch timings for Noida students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We offer flexible live online batch schedules including morning and evening batches to fit school timings, with every class recorded for revision. Contact +91-88264-44334 for the current schedule.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do Noida students need to travel for classes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No travel needed — classes are live online from home. Students across all Noida sectors, Greater Noida and Ghaziabad join the same online batches with real-time doubt solving.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the NEET coaching fees for Noida students at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our NEET Biology coaching fees range from ₹45,000 to ₹1,80,000 depending on course duration and batch type. We offer special packages for Noida students and flexible payment options. Call us at +91-88264-44334 or email shekharcsingh57@gmail.com for personalized fee consultation.',
                },
              },
            ],
          }),
        }}
      />{' '}
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
                name: 'Noida',
                item: 'https://cerebrumbiologyacademy.com/locations/noida',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
