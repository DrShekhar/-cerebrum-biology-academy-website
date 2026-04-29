import type { Metadata } from 'next'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'
import { olympiadCourseSchema, iboPracticalHowToSchema } from '@/data/olympiads/schema-helpers'

export const metadata: Metadata = {
  title: 'IBO Preparation Online | International Biology Olympiad Coaching',
  description:
    'IBO preparation for USABO/BBO/INBO qualifiers. International Biology Olympiad coaching from IBO medalists — theory + practical training, 10+ years of past papers. US, UK, India, Singapore students supported.',
  keywords: [
    'IBO preparation',
    'International Biology Olympiad',
    'IBO coaching',
    'IBO preparation USA',
    'IBO after USABO',
    'USABO to IBO pathway',
    'biology olympiad international',
    'IBO training online',
    'biology olympiad gold medal',
    'IBO practical preparation',
    'IBO coaching for USA students',
    'international biology competition',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'IBO Preparation Online | International Biology Olympiad Coaching',
    description:
      'IBO preparation for USABO/BBO/INBO qualifiers. Theory + practical training from IBO medalists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ibo-preparation',
    languages: {
      en: 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-IN': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-US': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-GB': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'en-SG': 'https://cerebrumbiologyacademy.com/ibo-preparation',
      'x-default': 'https://cerebrumbiologyacademy.com/ibo-preparation',
    },
  },
  openGraph: {
    title: 'IBO Preparation Online | International Biology Olympiad Coaching',
    description:
      'IBO preparation for USABO/BBO/INBO qualifiers. Theory + practical training from IBO medalists, supporting US, UK, India, and Singapore students.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_IN', 'en_SG'],
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
      name: 'IBO Preparation',
      item: 'https://cerebrumbiologyacademy.com/ibo-preparation',
    },
  ],
}

const courseSchema = olympiadCourseSchema({
  name: 'IBO Preparation Programme',
  description:
    'International Biology Olympiad (IBO) preparation for students worldwide. Campbell Biology coverage, theory + practical round training, 10+ years of past-paper drills.',
  url: 'https://cerebrumbiologyacademy.com/ibo-preparation',
  about: 'IBO - International Biology Olympiad',
  audienceDescription:
    'High school students worldwide who have qualified through their national Biology Olympiad (USABO in the United States, BBO in the United Kingdom, INBO in India, SBO in Singapore, etc.) and are preparing for the International Biology Olympiad (IBO)',
})

const howToSchema = iboPracticalHowToSchema('https://cerebrumbiologyacademy.com/ibo-preparation')

export default function IBOLayout({ children }: { children: React.ReactNode }) {
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
        heading="IBO preparation — pricing in your currency"
        subheading="USD reference price. Local currency auto-detected from your region."
        equivalents={['USD', 'INR', 'GBP', 'SGD', 'EUR', 'AED']}
        regionalLinks={[
          { region: 'All Olympiads', href: '/biology-olympiads' },
          { region: 'USA (USABO)', href: '/usabo-coaching' },
          { region: 'UK (BBO)', href: '/bbo-preparation' },
          { region: 'India (INBO)', href: '/inbo-coaching' },
          { region: 'Singapore (SBO)', href: '/sbo-coaching' },
        ]}
      />
    </>
  )
}
