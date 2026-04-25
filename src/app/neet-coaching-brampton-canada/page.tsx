import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching in Brampton, Canada | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students in Brampton, Mississauga, Peel Region. SPH/MCAT pathway alternative via NRI quota MBBS. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-brampton-canada`,
    languages: {
      'en-CA': `${BASE_URL}/neet-coaching-brampton-canada`,
      'en-IN': `${BASE_URL}/neet-coaching-brampton-canada`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Brampton, Canada — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in Peel Region. Ontario grade 11-12 friendly, EST/EDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-brampton-canada`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-brampton-canada.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Brampton — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Brampton, Canada',
    description: 'Online NEET Biology coaching for Brampton / Peel Region. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-brampton-canada.jpg`],
  },
}

export default function BramptonNEETCoachingPage() {
  return <NEETCoachingPageContent />
}
