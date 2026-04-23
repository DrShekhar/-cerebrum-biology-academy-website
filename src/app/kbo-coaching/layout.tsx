import { Metadata } from 'next'
import { GeoAwareSharedPricingMatrix } from '@/components/shared/GeoAwarePricingMatrix'
import { olympiadPricingProducts } from '@/data/olympiads/pricing-matrix'

export const metadata: Metadata = {
  title: 'KBO Coaching Online | Korean Biology Olympiad Preparation',
  description:
    'Expert KBO coaching for Korean Biology Olympiad. Complete Campbell Biology coverage, past paper practice, and 1-on-1 mentorship to represent South Korea at IBO.',
  keywords: [
    'kbo coaching',
    'korean biology olympiad',
    'kbo preparation',
    'biology olympiad korea',
    'kbo online classes',
    'korean biology olympiad preparation',
    'ibo korea',
    'biology olympiad training korea',
    'kbo exam preparation',
    'campbell biology korea',
  ],
  openGraph: {
    title: 'KBO Coaching Online | Korean Biology Olympiad Preparation',
    description:
      'Expert KBO coaching for Korean Biology Olympiad. Complete Campbell Biology coverage and personalized mentorship.',
    type: 'website',
    locale: 'en_KR',
    url: 'https://cerebrumbiologyacademy.com/kbo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og/kbo-coaching.png',
        width: 1200,
        height: 630,
        alt: 'KBO Coaching - Korean Biology Olympiad Preparation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KBO Coaching Online | Korean Biology Olympiad',
    description: 'Expert coaching for Korean Biology Olympiad. Join now!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/kbo-coaching',
    languages: {
      en: 'https://cerebrumbiologyacademy.com/kbo-coaching',
      'en-KR': 'https://cerebrumbiologyacademy.com/kbo-coaching',
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
      name: 'KBO Coaching',
      item: 'https://cerebrumbiologyacademy.com/kbo-coaching',
    },
  ],
}

export default function KBOCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
      <GeoAwareSharedPricingMatrix
        products={olympiadPricingProducts}
        heading="KBO coaching — pricing in your currency"
        subheading="USD reference price. Local currency auto-detected from your region."
        equivalents={['KRW', 'USD', 'JPY', 'SGD', 'INR', 'GBP']}
        regionalLinks={[
          { region: 'All Olympiads', href: '/biology-olympiads' },
          { region: 'IBO', href: '/ibo-preparation' },
        ]}
      />
    </>
  )
}
