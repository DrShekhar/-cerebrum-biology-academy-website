import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'IB to NEET Biology Bridge',
  subtitle: 'Specialized coaching for IB students',
})

export const metadata: Metadata = {
  title: 'IB to NEET Biology | Bridge Course for IB Students | Cerebrum Academy',
  description:
    'Specialized bridge course for IB Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 95% conversion rate.',
  keywords: [
    'IB to NEET',
    'IB Biology NEET preparation',
    'IB students NEET coaching',
    'IB curriculum to NEET',
    'bridge course IB NEET',
    'IB HL SL NEET',
  ],
  openGraph: {
    title: 'IB to NEET Biology | Bridge Course for IB Students | Cerebrum Academy',
    description:
      'Specialized bridge course for IB Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 95% conversion rate.',
    url: `${BASE_URL}/ib-to-neet-biology-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'IB to NEET Biology Bridge Course - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB to NEET Biology | Bridge Course for IB Students',
    description:
      'Specialized bridge course for IB Biology students preparing for NEET. 95% conversion rate.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/ib-to-neet-biology-preparation`,
  },
}

export default function IBToNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="ib-to-neet-biology-preparation"
        pageTitle="IB to NEET Biology Bridge Course"
        pageDescription="Specialized bridge course for IB Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 95% conversion rate."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
