import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { internationalSEOPages } from '@/data/seo-landing'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { GeoAwarePricingMatrix } from '@/components/ib-biology/GeoAwarePricingMatrix'
import { pricingAsCourseOffers } from '@/data/ib-biology/pricing-matrix'

const content = internationalSEOPages['ib-biology-tutor-online']
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
  name: 'IB Biology Online Tutor (HL & SL)',
  description:
    'Expert IB Biology tutors for 1:1 online lessons. Specialists in HL and SL curriculum, Internal Assessment coaching, Extended Essay support, and exam strategy across global timezones.',
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
  learningResourceType: ['Online Tutoring', '1:1 Lessons', 'IA Coaching', 'EE Support'],
  inLanguage: 'en',
  about: [
    'IB Biology HL Tutoring',
    'IB Biology SL Tutoring',
    'IB Biology Internal Assessment',
    'IB Biology Extended Essay',
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
      name: 'IB Biology HL — 1:1 Online Tutoring',
      courseMode: 'Online',
    },
    {
      '@type': 'CourseInstance',
      name: 'IB Biology SL — 1:1 Online Tutoring',
      courseMode: 'Online',
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

export default function IbBiologyTutorOnlinePage() {
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
          { label: 'IB Biology Tutor Online', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <SEOLandingPage content={content} />
      <GeoAwarePricingMatrix />
    </>
  )
}
