import { Metadata } from 'next'
import { faqs } from '@/data/neetCoachingData'

export const metadata: Metadata = {
  title: 'NEET Coaching 2026 | Best NEET Biology, Physics, Chemistry Classes | Cerebrum Academy',
  description:
    'Top NEET coaching in Delhi-NCR for Class 11, 12 & Droppers. AIIMS & IITians faculties, small batches (10-18 students), 98% success rate. Physics, Chemistry & Biology. Online & offline classes at South Extension, Rohini, Gurugram, Faridabad.',
  keywords: [
    'NEET coaching',
    'NEET 2026 coaching',
    'best NEET coaching Delhi',
    'NEET biology coaching',
    'NEET physics coaching',
    'NEET chemistry coaching',
    'NEET preparation classes',
    'NEET dropper batch',
    'NEET coaching near me',
    'small batch NEET coaching',
    'AIIMS IITians faculty NEET coaching',
    'NEET online classes',
    'NEET coaching Delhi NCR',
    'NEET coaching Gurugram',
    'NEET coaching Class 11 12',
  ],
  authors: [{ name: 'Cerebrum Biology Academy' }],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching',
  },
  openGraph: {
    title: 'NEET Coaching 2026 | Physics, Chemistry, Biology | Cerebrum Academy',
    description:
      'Expert AIIMS & IITians faculties. Small batches of 10-18 students. 98% success rate. Class 11, 12 & Dropper batches. Online & offline coaching in Delhi-NCR.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/api/og?title=NEET+Coaching+2026&subtitle=Expert+AIIMS+%26+IITians+Faculty',
        width: 1200,
        height: 630,
        alt: 'NEET Coaching 2026 - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching 2026 | Cerebrum Biology Academy',
    description:
      'Expert AIIMS & IITians faculties. Small batches. 98% success rate. Class 11, 12 & Dropper. Online & offline.',
    images: ['/api/og?title=NEET+Coaching+2026&subtitle=Expert+AIIMS+%26+IITians+Faculty'],
  },
}

function generateJsonLd() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Coaching 2026 - Physics, Chemistry & Biology',
    description:
      'Comprehensive NEET preparation covering Physics, Chemistry, and Biology for Class 11, 12 and Dropper students with AIIMS & IITians trained faculties.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    url: 'https://cerebrumbiologyacademy.com/neet-coaching',
    courseCode: 'NEET-2026',
    educationalLevel: 'Undergraduate Preparation',
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: ['online', 'onsite'],
        courseWorkload: 'PT6-12H',
        instructor: {
          '@type': 'Person',
          name: 'Dr. Shekhar',
          description: 'AIIMS Delhi alumnus with 10+ years of NEET coaching experience',
        },
      },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '48000',
      highPrice: '360000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
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
        name: 'NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching',
      },
    ],
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    telephone: '+91-8826444334',
    email: 'support@cerebrumbiologyacademy.com',
    foundingDate: '2015',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '320',
      reviewCount: '280',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Block D, South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8826444334',
      contactType: 'admissions',
      availableLanguage: ['English', 'Hindi'],
    },
  }

  return [courseSchema, faqSchema, breadcrumbSchema, orgSchema]
}

export default function NEETCoachingLayout({ children }: { children: React.ReactNode }) {
  const schemas = generateJsonLd()

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`neet-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  )
}
