import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Connaught Place'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Connaught Place | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Connaught Place Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Premium school catchment hub. Book free demo!',
  keywords: [
    'NEET coaching Connaught Place',
    'biology tuition Connaught Place',
    'NEET classes Connaught Place Delhi',
    'best NEET tutor Connaught Place',
    'medical entrance Connaught Place',
    'NEET preparation Central Delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Connaught Place | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Connaught Place Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-connaught-place-delhi`,
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
    title: 'Best NEET Coaching in Connaught Place | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Connaught Place Delhi. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-connaught-place-delhi`,
  },
}

export default function NEETCoachingConnaughtPlacePage() {
  return (
    <>
      <LocalitySchema
        locality="Connaught Place"
        slug="neet-coaching-connaught-place-delhi"
        pageTitle="Best NEET Coaching in Connaught Place"
        pageDescription="Join #1 NEET coaching in Connaught Place Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
