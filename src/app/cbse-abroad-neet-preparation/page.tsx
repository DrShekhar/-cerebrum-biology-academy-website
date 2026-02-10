import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'CBSE Abroad NEET Preparation',
  subtitle: 'Online NEET coaching for NRI students worldwide',
})

export const metadata: Metadata = {
  title: 'CBSE Abroad Students NEET Preparation | Online NEET Coaching | Cerebrum Academy',
  description:
    'Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, comprehensive preparation, 98% success rate.',
  keywords: [
    'CBSE abroad NEET',
    'NRI NEET preparation',
    'CBSE international NEET coaching',
    'online NEET for abroad students',
    'NEET coaching overseas',
    'international NEET students',
  ],
  openGraph: {
    title: 'CBSE Abroad Students NEET Preparation | Online NEET Coaching | Cerebrum Academy',
    description:
      'Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, comprehensive preparation, 98% success rate.',
    url: `${BASE_URL}/cbse-abroad-neet-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'CBSE Abroad Students NEET Preparation - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBSE Abroad Students NEET Preparation | Online NEET Coaching',
    description:
      'Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, 98% success rate.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/cbse-abroad-neet-preparation`,
  },
}

export default function CBSEAbroadNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="cbse-abroad-neet-preparation"
        pageTitle="CBSE Abroad Students NEET Preparation"
        pageDescription="Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, comprehensive preparation, 98% success rate."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
