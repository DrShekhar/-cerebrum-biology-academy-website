import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { internationalSEOPages } from '@/data/seo-landing'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { IBBiologyPricingMatrix } from '@/components/ib-biology/PricingMatrix'
import { pricingAsCourseOffers } from '@/data/ib-biology/pricing-matrix'

const content = internationalSEOPages['ib-biology-tuition']
const PAGE_URL = `https://cerebrumbiologyacademy.com/${content.slug}`

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: PAGE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
  alternates: {
    canonical: PAGE_URL,
  },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'IB Biology Tuition (HL & SL)',
  description:
    'Expert online IB Biology tuition for Higher Level and Standard Level students. Structured topic-by-topic teaching, Internal Assessment guidance, Extended Essay support, past paper practice, and personalized exam preparation.',
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
  learningResourceType: ['Online Course', 'Live Class', 'IA Coaching'],
  inLanguage: 'en',
  about: [
    'IB Biology HL',
    'IB Biology SL',
    'IB Biology Internal Assessment',
    'IB Biology Extended Essay',
    'IB Biology 2025 Syllabus',
  ],
  instructor: {
    '@type': 'Person',
    name: 'Dr. Shekhar Singh',
    jobTitle: 'Founder & Lead IB Biology Faculty',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
    },
    alumniOf: 'AIIMS Delhi',
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'IB Biology HL (Higher Level)',
      courseMode: 'Online',
      courseWorkload: 'PT240H',
    },
    {
      '@type': 'CourseInstance',
      name: 'IB Biology SL (Standard Level)',
      courseMode: 'Online',
      courseWorkload: 'PT150H',
    },
  ],
  offers: pricingAsCourseOffers(PAGE_URL),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '200',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function IbBiologyTuitionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'IB Biology', href: '/ib-biology' },
          { label: 'IB Biology Tuition', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <SEOLandingPage content={content} />
      <IBBiologyPricingMatrix />
    </>
  )
}
