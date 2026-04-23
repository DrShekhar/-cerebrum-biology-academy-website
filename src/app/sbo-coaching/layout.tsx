import { Metadata } from 'next'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'

export const metadata: Metadata = {
  title: 'SBO Coaching Online | Singapore Biology Olympiad Preparation',
  description:
    'Expert SBO coaching for Singapore Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent Singapore at IBO.',
  keywords: [
    'sbo coaching',
    'singapore biology olympiad',
    'sbo preparation',
    'biology olympiad singapore',
    'sbo online classes',
    'singapore biology olympiad preparation',
    'ibo singapore',
    'biology olympiad training singapore',
    'sbo exam preparation',
    'campbell biology singapore',
  ],
  openGraph: {
    title: 'SBO Coaching Online | Singapore Biology Olympiad Preparation',
    description:
      'Expert SBO coaching for Singapore Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_SG',
    url: 'https://cerebrumbiologyacademy.com/sbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/sbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'SBO Coaching - Singapore Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBO Coaching Online | Singapore Biology Olympiad',
    description: 'Expert coaching for Singapore Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/sbo-coaching',
    languages: {
      'en-SG': 'https://cerebrumbiologyacademy.com/sbo-coaching',
      en: 'https://cerebrumbiologyacademy.com/sbo-coaching',
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
      name: 'SBO Coaching',
      item: 'https://cerebrumbiologyacademy.com/sbo-coaching',
    },
  ],
}

export default function SBOCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
      <GeoAwareSharedPricingMatrix
        products={olympiadPricingProducts}
        heading="SBO coaching — pricing in your currency"
        subheading="USD reference price. Local currency auto-detected from your region."
        equivalents={['SGD', 'USD', 'MYR', 'INR', 'HKD', 'AED']}
        regionalLinks={[
          { region: 'All Olympiads', href: '/biology-olympiads' },
          { region: 'IBO', href: '/ibo-preparation' },
        ]}
      />
    </>
  )
}
