import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Yamuna Vihar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Yamuna Vihar | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Yamuna Vihar Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Untapped NEET market. Book free demo!',
  keywords: [
    'NEET coaching Yamuna Vihar',
    'biology tuition Yamuna Vihar',
    'NEET classes Yamuna Vihar Delhi',
    'best NEET tutor Yamuna Vihar',
    'medical entrance Yamuna Vihar',
    'NEET preparation North-East Delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Yamuna Vihar | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Yamuna Vihar Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-yamuna-vihar-delhi`,
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
    title: 'Best NEET Coaching in Yamuna Vihar | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Yamuna Vihar Delhi. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-yamuna-vihar-delhi`,
  },
}

export default function NEETCoachingYamunaViharPage() {
  return (
    <>
      <LocalitySchema
        locality="Yamuna Vihar"
        slug="neet-coaching-yamuna-vihar-delhi"
        pageTitle="Best NEET Coaching in Yamuna Vihar"
        pageDescription="Join #1 NEET coaching in Yamuna Vihar Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
