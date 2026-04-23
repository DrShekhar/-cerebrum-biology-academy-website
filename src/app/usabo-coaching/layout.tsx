import type { Metadata } from 'next'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'
import { olympiadCourseSchema, iboPracticalHowToSchema } from '@/data/olympiads/schema-helpers'

export const metadata: Metadata = {
  title: 'USABO Coaching Online | USA Biology Olympiad Preparation',
  description:
    'Expert USABO coaching for Open Exam, Semifinals & National Finals. 1:1 tutoring and small batch options with IBO-trained faculty. US timezone friendly scheduling. Book free consultation!',
  keywords: [
    'usabo coaching',
    'usa biology olympiad',
    'usabo tutoring online',
    'biology olympiad usa',
    'usabo preparation',
    'usabo open exam prep',
    'usabo semifinals coaching',
    'biology olympiad tutoring',
    'ibo preparation usa',
    'usabo online classes',
  ],
  openGraph: {
    title: 'USABO Coaching | USA Biology Olympiad Preparation',
    description:
      'Prepare for USABO (Open → Semifinals → Finals → IBO) with expert coaching. 1:1 tutoring and small batch programs with flexible US timezone scheduling.',
    url: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'USABO Coaching - USA Biology Olympiad Preparation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USABO Coaching | USA Biology Olympiad Preparation',
    description:
      'Expert coaching for USA Biology Olympiad. Open Exam → Semifinals → Finals → IBO pathway.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    languages: {
      'en-US': 'https://cerebrumbiologyacademy.com/usabo-coaching',
      en: 'https://cerebrumbiologyacademy.com/usabo-coaching',
      'x-default': 'https://cerebrumbiologyacademy.com/biology-olympiads',
    },
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
      name: 'USABO Coaching',
      item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    },
  ],
}

const courseSchema = olympiadCourseSchema({
  name: 'USABO Coaching Programme',
  description:
    'USA Biology Olympiad preparation — Open Exam, Semifinals, and National Finals. Campbell Biology coverage, past-paper drills, and senior olympiad tutors.',
  url: 'https://cerebrumbiologyacademy.com/usabo-coaching',
  about: 'USABO - USA Biology Olympiad',
  areaServed: { type: 'Country', name: 'United States' },
})

const howToSchema = iboPracticalHowToSchema('https://cerebrumbiologyacademy.com/usabo-coaching')

export default function USABOCoachingLayout({ children }: { children: React.ReactNode }) {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {children}
      <GeoAwareSharedPricingMatrix
        products={olympiadPricingProducts}
        heading="USABO coaching — pricing in your currency"
        subheading="USD reference price. Local currency auto-detected from your region."
        equivalents={['USD', 'INR', 'GBP', 'EUR', 'CAD', 'AUD']}
        regionalLinks={[
          { region: 'All Olympiads', href: '/biology-olympiads' },
          { region: 'IBO', href: '/ibo-preparation' },
          { region: 'India (INBO)', href: '/inbo-coaching' },
        ]}
      />
    </>
  )
}
