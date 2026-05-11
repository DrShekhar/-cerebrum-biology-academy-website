import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching in San Jose, Silicon Valley | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students in San Jose, Fremont, Cupertino, Sunnyvale, Santa Clara. AP Biology + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-san-jose-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-san-jose-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-san-jose-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in San Jose — Silicon Valley Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in SF Bay Area / Silicon Valley. AP Bio friendly, PST/PDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-san-jose-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-san-jose-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in San Jose / Silicon Valley — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in San Jose / SF Bay Area',
    description: 'Online NEET Biology coaching for Silicon Valley. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-san-jose-usa.jpg`],
  },
}

export default async function SanJoseNEETCoachingPage() {
  return (
    <>
      <NEETCoachingPageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
