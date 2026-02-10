import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Bellandur'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Bellandur | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Bellandur Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Bellandur',
    'biology tuition Bellandur',
    'NEET classes Bellandur Bangalore',
    'best NEET tutor Bellandur',
    'medical entrance coaching Bellandur',
    'NEET preparation Bellandur Lake',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Bellandur | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Bellandur Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-bellandur-bangalore`,
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
    title: 'Best NEET Coaching in Bellandur | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Bellandur Bangalore. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bellandur-bangalore`,
  },
}

export default function NEETCoachingBellandurPage() {
  return (
    <>
      <LocalitySchema
        locality="Bellandur"
        slug="neet-coaching-bellandur-bangalore"
        pageTitle="Best NEET Coaching in Bellandur"
        pageDescription="Join #1 NEET coaching in Bellandur Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
