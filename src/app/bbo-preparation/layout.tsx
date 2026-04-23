import type { Metadata } from 'next'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'
import { olympiadCourseSchema } from '@/data/olympiads/schema-helpers'

export const metadata: Metadata = {
  title: 'BBO Preparation Online | British Biology Olympiad Coaching',
  description:
    'Expert BBO preparation online. British Biology Olympiad coaching with Campbell Biology. Gold medal preparation for UK sixth form students. 1:1 and batch options.',
  keywords: [
    'BBO preparation',
    'British Biology Olympiad',
    'BBO coaching',
    'UK biology olympiad',
    'BBO tutoring',
    'Royal Society of Biology',
    'biology olympiad UK',
    'IBO preparation UK',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'BBO Preparation Online | British Biology Olympiad Coaching',
    description:
      'Expert BBO preparation online. British Biology Olympiad coaching with Campbell Biology.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/bbo-preparation',
    languages: {
      'en-GB': 'https://cerebrumbiologyacademy.com/bbo-preparation',
      en: 'https://cerebrumbiologyacademy.com/bbo-preparation',
      'x-default': 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
  },
  openGraph: {
    title: 'BBO Preparation Online | British Biology Olympiad Coaching',
    description:
      'Expert BBO preparation online. British Biology Olympiad coaching with Campbell Biology. Gold medal preparation for UK sixth form students.',
    type: 'website',
    siteName: 'Cerebrum Biology Academy',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Biology Olympiads',
      item: 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'BBO Preparation',
      item: 'https://cerebrumbiologyacademy.com/bbo-preparation',
    },
  ],
}

const courseSchema = olympiadCourseSchema({
  name: 'BBO Preparation Programme',
  description:
    'British Biology Olympiad coaching for UK sixth-form students. Campbell Biology coverage, past-paper drills, and 1:1 mentoring by senior olympiad tutors.',
  url: 'https://cerebrumbiologyacademy.com/bbo-preparation',
  about: 'BBO - British Biology Olympiad',
  areaServed: { type: 'Country', name: 'United Kingdom' },
})

export default function BBOLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
      <GeoAwareSharedPricingMatrix
        products={olympiadPricingProducts}
        heading="BBO coaching — pricing in your currency"
        subheading="USD reference price. Local currency auto-detected from your region."
        equivalents={['GBP', 'USD', 'EUR', 'INR', 'AED', 'SGD']}
        regionalLinks={[
          { region: 'All Olympiads', href: '/biology-olympiads' },
          { region: 'IBO', href: '/ibo-preparation' },
          { region: 'USA (USABO)', href: '/usabo-coaching' },
        ]}
      />
    </>
  )
}
