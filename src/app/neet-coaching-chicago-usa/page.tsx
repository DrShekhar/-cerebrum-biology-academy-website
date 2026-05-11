import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching in Chicago, USA | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students across Chicago, Naperville, Schaumburg, Aurora. AP Biology + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-chicago-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-chicago-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-chicago-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Chicago, USA — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in Chicago metro. AP Biology friendly, CST/CDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-chicago-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-chicago-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Chicago — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Chicago, USA',
    description: 'Online NEET Biology coaching for Chicago metro. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-chicago-usa.jpg`],
  },
}

export default async function ChicagoNEETCoachingPage() {
  return (
    <>
      <NEETCoachingPageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
