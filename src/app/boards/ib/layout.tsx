import type { Metadata } from 'next'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { boardsIbFAQs, toFAQSchemaItems } from '@/data/faqs/ib-biology-faqs'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/boards/ib'

export const metadata: Metadata = {
  title: 'IB Biology Coaching | HL & SL Tutors | Cerebrum Biology Academy',
  description:
    'Premium IB Biology coaching by actual IB examiners. 89% score 6-7, 2-point improvement guarantee, dedicated IA support, 24/7 WhatsApp access. Complete HL & SL preparation for students worldwide.',
  keywords: [
    'IB Biology coaching',
    'IB Biology tutor',
    'IB Biology HL',
    'IB Biology SL',
    'IB Biology IA',
    'IB Biology Internal Assessment',
    'IB Biology Extended Essay',
    'IB Biology examiner',
    'IB Biology online classes',
    'IB Biology tuition',
    'IB Biology score 7',
    'IB Biology 2025 syllabus',
  ],
  openGraph: {
    title: 'IB Biology Coaching | HL & SL Tutors | Cerebrum Biology Academy',
    description:
      'Premium IB Biology coaching by actual IB examiners. 89% score 6-7. 2-point guarantee. Dedicated IA support.',
    type: 'website',
    url: PAGE_URL,
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology Coaching | HL & SL Tutors',
    description:
      'Premium IB Biology coaching by actual IB examiners. 89% score 6-7. 2-point improvement guarantee.',
  },
  alternates: {
    canonical: PAGE_URL,
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

function IBBiologyCourseSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'IB Biology Coaching (HL & SL)',
    description:
      'Comprehensive IB Biology preparation for Higher Level and Standard Level students. Includes live examiner-led classes, Internal Assessment guidance, Extended Essay support, past paper practice, and 24/7 WhatsApp doubt resolution.',
    url: PAGE_URL,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      sameAs: [
        'https://www.youtube.com/@CerebrumBiologyAcademy',
        'https://www.instagram.com/cerebrumbiologyacademy/',
      ],
    },
    educationalLevel: 'International Baccalaureate Diploma Programme',
    learningResourceType: ['Online Course', 'Live Class', 'IA Coaching', 'EE Support'],
    inLanguage: 'en',
    about: [
      'IB Biology HL',
      'IB Biology SL',
      'IB Biology Internal Assessment',
      'IB Biology Extended Essay',
      'IB Biology 2025 Syllabus',
    ],
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'PT240H',
        name: 'IB Biology HL (Higher Level)',
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: 'PT150H',
        name: 'IB Biology SL (Standard Level)',
      },
    ],
    offers: [
      {
        '@type': 'Offer',
        name: '1:1 Elite Tutoring',
        price: '75',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '75',
          priceCurrency: 'USD',
          unitText: 'HOUR',
        },
        availability: 'https://schema.org/InStock',
        url: `${PAGE_URL}#pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Complete IB Program (Annual)',
        price: '6000',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '6000',
          priceCurrency: 'USD',
          unitText: 'ANN',
        },
        availability: 'https://schema.org/InStock',
        url: `${PAGE_URL}#pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Group Batch',
        price: '40',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '40',
          priceCurrency: 'USD',
          unitText: 'HOUR',
        },
        availability: 'https://schema.org/InStock',
        url: `${PAGE_URL}#pricing`,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '200',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function IBBiologyBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQSchema questions={toFAQSchemaItems(boardsIbFAQs)} pageUrl={PAGE_URL} />
      <BreadcrumbSchema
        items={[
          { label: 'Boards', href: '/boards' },
          { label: 'IB Biology', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <IBBiologyCourseSchema />
      {children}
    </>
  )
}
