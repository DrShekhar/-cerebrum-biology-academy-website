import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Defence Colony'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Defence Colony | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Defence Colony Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Defence Colony',
    'biology tuition Defence Colony',
    'NEET classes Defence Colony Delhi',
    'best NEET tutor Defence Colony',
    'medical entrance Defence Colony',
    'NEET preparation South Delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Defence Colony | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Defence Colony Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-defence-colony-delhi`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Defence Colony | 98% Success Rate',
    description: 'Join #1 NEET coaching in Defence Colony Delhi. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-defence-colony-delhi`,
  },
}

export default function NEETCoachingDefenceColonyPage() {
  return (
    <>
      <LocalitySchema
        locality="Defence Colony"
        slug="neet-coaching-defence-colony-delhi"
        pageTitle="Best NEET Coaching in Defence Colony"
        pageDescription="Join #1 NEET coaching in Defence Colony Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
