import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'A-Level to NEET Biology Bridge',
  subtitle: 'Cambridge A-Level to NEET specialist coaching',
})

export const metadata: Metadata = {
  title: 'A-Level to NEET Biology | Bridge Course for A-Level Students | Cerebrum Academy',
  description:
    'Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice, dedicated faculty from top medical colleges.',
  keywords: [
    'A-Level to NEET',
    'A-Level Biology NEET coaching',
    'Cambridge A-Level NEET',
    'A-Level students NEET',
    'bridge course A-Level',
    'advanced level NEET',
  ],
  openGraph: {
    title: 'A-Level to NEET Biology | Bridge Course for A-Level Students | Cerebrum Academy',
    description:
      'Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice, dedicated faculty from top medical colleges.',
    url: `${BASE_URL}/a-level-to-neet-biology-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'A-Level to NEET Biology Bridge Course - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-Level to NEET Biology | Bridge Course for A-Level Students',
    description:
      'Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/a-level-to-neet-biology-preparation`,
  },
}

export default function ALevelToNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="a-level-to-neet-biology-preparation"
        pageTitle="A-Level to NEET Biology Bridge Course"
        pageDescription="Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice, dedicated faculty from top medical colleges."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
