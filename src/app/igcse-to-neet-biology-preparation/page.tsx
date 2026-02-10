import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'IGCSE to NEET Biology Bridge',
  subtitle: 'Cambridge curriculum to Indian medical entrance',
})

export const metadata: Metadata = {
  title: 'IGCSE to NEET Biology | Bridge Course for IGCSE Students | Cerebrum Academy',
  description:
    'Seamless IGCSE to NEET transition with our specialized bridge course. Fill syllabus gaps, master NEET patterns, join 500+ successful students.',
  keywords: [
    'IGCSE to NEET',
    'IGCSE Biology NEET preparation',
    'Cambridge to NEET',
    'IGCSE students NEET coaching',
    'bridge course IGCSE',
    'international curriculum NEET',
  ],
  openGraph: {
    title: 'IGCSE to NEET Biology | Bridge Course for IGCSE Students | Cerebrum Academy',
    description:
      'Seamless IGCSE to NEET transition with our specialized bridge course. Fill syllabus gaps, master NEET patterns, join 500+ successful students.',
    url: `${BASE_URL}/igcse-to-neet-biology-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'IGCSE to NEET Biology Bridge Course - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IGCSE to NEET Biology | Bridge Course for IGCSE Students',
    description:
      'Seamless IGCSE to NEET transition with our specialized bridge course. 500+ successful students.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/igcse-to-neet-biology-preparation`,
  },
}

export default function IGCSEToNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="igcse-to-neet-biology-preparation"
        pageTitle="IGCSE to NEET Biology Bridge Course"
        pageDescription="Seamless IGCSE to NEET transition with our specialized bridge course. Fill syllabus gaps, master NEET patterns, join 500+ successful students."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
