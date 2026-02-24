import { Metadata } from 'next'
import { GurugramServiceSchema } from '@/components/seo/StructuredData'

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
      <GurugramEventSchema />      <script
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
