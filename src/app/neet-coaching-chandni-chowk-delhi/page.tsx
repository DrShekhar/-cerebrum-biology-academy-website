import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Chandni Chowk'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Chandni Chowk | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Chandni Chowk Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Historic Old Delhi medical education hub. Book free demo!',
  keywords: [
    'NEET coaching Chandni Chowk',
    'biology tuition Chandni Chowk',
    'NEET classes Chandni Chowk Delhi',
    'best NEET tutor Chandni Chowk',
    'medical entrance Chandni Chowk',
    'NEET preparation Old Delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Chandni Chowk | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Chandni Chowk Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-chandni-chowk-delhi`,
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
    title: 'Best NEET Coaching in Chandni Chowk | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Chandni Chowk Delhi. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-chandni-chowk-delhi`,
  },
}

export default function NEETCoachingChandniChowkPage() {
  return (
    <>
      <LocalitySchema
        locality="Chandni Chowk"
        slug="neet-coaching-chandni-chowk-delhi"
        pageTitle="Best NEET Coaching in Chandni Chowk"
        pageDescription="Join #1 NEET coaching in Chandni Chowk Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
