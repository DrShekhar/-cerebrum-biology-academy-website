import { Metadata } from 'next'
import GurugramLocationContent from './GurugramLocationContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CEREBRUM_METRICS, GURUGRAM_CENTER_METRICS } from '@/lib/constants/metrics'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NEET Biology Coaching in Gurugram | Cerebrum Biology Academy Center',
  description:
    'Visit Cerebrum Biology Academy Gurugram center at M2K Corporate Park, Sector 51. AIIMS faculty, small batches of 15 students, 90% NEET success rate. Near HUDA City Centre Metro.',
  keywords: [
    'NEET coaching Gurugram',
    'Biology coaching Gurugram',
    'NEET classes Sector 51',
    'NEET preparation Gurugram',
    'Biology tuition Gurugram',
    'NEET coaching near HUDA City Centre',
    'Best NEET coaching Gurugram',
    'Medical entrance coaching Gurugram',
    'AIIMS coaching Gurugram',
    'Cerebrum Biology Academy Gurugram',
  ],
  openGraph: {
    title: 'NEET Biology Coaching in Gurugram | Cerebrum Biology Academy',
    description:
      'Premier NEET Biology coaching at M2K Corporate Park, Sector 51, Gurugram. AIIMS faculty, 15-student batches, 90% success rate.',
    url: 'https://cerebrumbiologyacademy.com/locations/gurugram',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og/gurugram-center.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy Gurugram Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching in Gurugram | Cerebrum Biology Academy',
    description:
      'Premier NEET Biology coaching at Sector 51, Gurugram. AIIMS faculty, small batches, 90% success rate.',
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

const faqs = [
  {
    question: 'Where is Cerebrum Biology Academy located in Gurugram?',
    answer: `Our center is located at ${gurugramLocation.streetAddress}, ${gurugramLocation.addressLocality}. We are near HUDA City Centre Metro Station.`,
  },
  {
    question: 'Do you offer offline classes in Gurugram?',
    answer:
      'Yes, we offer both offline classroom coaching at our Gurugram center and online live classes. Students can choose based on their preference.',
  },
  {
    question: 'What is the batch size at your Gurugram center?',
    answer:
      'We maintain small batches of maximum 15 students to ensure personalized attention for every NEET aspirant.',
  },
  {
    question: 'Is there parking available at your Gurugram center?',
    answer: 'Yes, we have dedicated parking space for students and parents visiting our center.',
  },
  {
    question: 'What are the class timings at the Gurugram center?',
    answer: `We operate ${CONTACT_INFO.hours.displayText}. We offer morning and evening batches to accommodate school schedules.`,
  },
]

export default function GurugramLocationPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/locations/gurugram#organization',
    name: 'Cerebrum Biology Academy - Gurugram',
    description:
      'Premier NEET Biology coaching center in Gurugram offering specialized preparation by AIIMS faculty. Small batches of 15 students with personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/locations/gurugram',
    telephone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    image: 'https://cerebrumbiologyacademy.com/images/gurugram-center.jpg',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: gurugramLocation.streetAddress,
      addressLocality: gurugramLocation.addressLocality,
      addressRegion: gurugramLocation.addressRegion,
      postalCode: gurugramLocation.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: gurugramLocation.geo.latitude,
      longitude: gurugramLocation.geo.longitude,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: GURUGRAM_CENTER_METRICS.coordinates.latitude,
        longitude: GURUGRAM_CENTER_METRICS.coordinates.longitude,
      },
      geoRadius: '20000',
    },
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
      ratingValue: CEREBRUM_METRICS.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: CEREBRUM_METRICS.reviewCount,
      reviewCount: CEREBRUM_METRICS.reviewCount,
    },
    sameAs: [
      CONTACT_INFO.social.instagram,
      CONTACT_INFO.social.youtube,
      CONTACT_INFO.social.facebook,
      CONTACT_INFO.social.twitter,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Biology Class 11',
            description: 'Foundation course for Class 11 students preparing for NEET',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Biology Class 12',
            description: 'Intensive preparation for Class 12 students',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Dropper Batch',
            description: 'Comprehensive course for repeat NEET aspirants',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
          },
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': 'https://cerebrumbiologyacademy.com/locations/gurugram#place',
    name: 'Cerebrum Biology Academy Gurugram Center',
    description:
      'NEET Biology coaching center in Gurugram with AIIMS faculty and small batch sizes',
    address: {
      '@type': 'PostalAddress',
      streetAddress: gurugramLocation.streetAddress,
      addressLocality: gurugramLocation.addressLocality,
      addressRegion: gurugramLocation.addressRegion,
      postalCode: gurugramLocation.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: gurugramLocation.geo.latitude,
      longitude: gurugramLocation.geo.longitude,
    },
    hasMap: gurugramLocation.mapUrl,
    publicAccess: true,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Parking',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Air Conditioning',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wi-Fi',
        value: true,
      },
    ],
  }

  const breadcrumbSchema = {
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
        name: 'Gurugram',
        item: 'https://cerebrumbiologyacademy.com/locations/gurugram',
      },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://cerebrumbiologyacademy.com/locations/gurugram#webpage',
    url: 'https://cerebrumbiologyacademy.com/locations/gurugram',
    name: 'NEET Biology Coaching in Gurugram | Cerebrum Biology Academy Center',
    description:
      'Visit Cerebrum Biology Academy Gurugram center at M2K Corporate Park, Sector 51. AIIMS faculty, small batches of 15 students, 90% NEET success rate.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://cerebrumbiologyacademy.com#website',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    about: {
      '@id': 'https://cerebrumbiologyacademy.com/locations/gurugram#organization',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.faq-question', '.faq-answer'],
    },
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: 'main',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(placeSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <GurugramLocationContent />
    </>
  )
}
