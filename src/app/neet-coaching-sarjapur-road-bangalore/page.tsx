import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Sarjapur Road'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Sarjapur Road | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Sarjapur Road',
    'biology tuition Sarjapur Road',
    'NEET classes Sarjapur Road Bangalore',
    'best NEET tutor Sarjapur Road',
    'medical entrance coaching Sarjapur Road',
    'NEET preparation East Bangalore',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Sarjapur Road | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-sarjapur-road-bangalore`,
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
    title: 'Best NEET Coaching in Sarjapur Road | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-sarjapur-road-bangalore`,
  },
}

export default function NEETCoachingSarjapurRoadPage() {
  return (
    <>
      <LocalitySchema
        locality="Sarjapur Road"
        slug="neet-coaching-sarjapur-road-bangalore"
        pageTitle="Best NEET Coaching in Sarjapur Road"
        pageDescription="Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
