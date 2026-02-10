import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Jayanagar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Jayanagar | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Jayanagar Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Jayanagar',
    'biology tuition Jayanagar',
    'NEET classes Jayanagar Bangalore',
    'best NEET tutor Jayanagar',
    'medical entrance coaching Jayanagar',
    'NEET preparation Bangalore',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Jayanagar | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Jayanagar Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-jayanagar-bangalore`,
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
    title: 'Best NEET Coaching in Jayanagar | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Jayanagar Bangalore. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-jayanagar-bangalore`,
  },
}

export default function NEETCoachingJayanagarPage() {
  return (
    <>
      <LocalitySchema
        locality="Jayanagar"
        slug="neet-coaching-jayanagar-bangalore"
        pageTitle="Best NEET Coaching in Jayanagar"
        pageDescription="Join #1 NEET coaching in Jayanagar Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}