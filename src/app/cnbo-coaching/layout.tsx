import { Metadata } from 'next'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'

export const metadata: Metadata = {
  title: 'CNBO Coaching Online | Chinese National Biology Olympiad',
  description:
    'Expert CNBO coaching for Chinese National Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent China at IBO.',
  keywords: [
    'cnbo coaching',
    'chinese biology olympiad',
    'cnbo preparation',
    'biology olympiad china',
    'cnbo online classes',
    'chinese national biology olympiad',
    'ibo china',
    'biology olympiad training china',
    'cnbo exam preparation',
    'campbell biology china',
  ],
  openGraph: {
    title: 'CNBO Coaching Online | Chinese National Biology Olympiad',
    description:
      'Expert CNBO coaching for Chinese National Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_CN',
    url: 'https://cerebrumbiologyacademy.com/cnbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/cnbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'CNBO Coaching - Chinese National Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CNBO Coaching Online | Chinese National Biology Olympiad',
    description: 'Expert coaching for Chinese National Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cnbo-coaching',
    languages: {
      en: 'https://cerebrumbiologyacademy.com/cnbo-coaching',
      'en-CN': 'https://cerebrumbiologyacademy.com/cnbo-coaching',
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
      name: 'CNBO Coaching',
      item: 'https://cerebrumbiologyacademy.com/cnbo-coaching',
    },
  ],
}

export default function CNBOCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
      <GeoAwareSharedPricingMatrix
        products={olympiadPricingProducts}
        heading="CNBO coaching — pricing in your currency"
        subheading="USD reference price. Local currency auto-detected from your region."
        equivalents={['CNY', 'USD', 'HKD', 'SGD', 'INR', 'GBP']}
        regionalLinks={[
          { region: 'All Olympiads', href: '/biology-olympiads' },
          { region: 'IBO', href: '/ibo-preparation' },
        ]}
      />
    </>
  )
}
