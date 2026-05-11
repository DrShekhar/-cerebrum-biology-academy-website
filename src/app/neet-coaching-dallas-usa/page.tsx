import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching in Dallas, USA | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students across Plano, Frisco, Irving, Coppell. AP Biology + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-dallas-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-dallas-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-dallas-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Dallas, USA — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in DFW. AP Biology friendly, CST/CDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-dallas-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-dallas-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Dallas — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Dallas, USA',
    description: 'Online NEET Biology coaching for DFW students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-dallas-usa.jpg`],
  },
}

export default async function DallasNEETCoachingPage() {
  return (
    <>
      <NEETCoachingPageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
