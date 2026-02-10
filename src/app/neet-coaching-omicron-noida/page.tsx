import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Omicron Sector'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Omicron Sector, Greater Noida | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Pari Chowk hub coaching. Book free demo!',
  keywords: [
    'NEET coaching Omicron Sector',
    'NEET coaching Greater Noida',
    'biology tuition Omicron Noida',
    'NEET classes Pari Chowk',
    'best NEET tutor Greater Noida',
    'medical entrance Omicron',
    'NEET preparation Knowledge Park',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Omicron Sector, Greater Noida | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-omicron-noida`,
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
    title: 'Best NEET Coaching in Omicron Sector, Greater Noida | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-omicron-noida`,
  },
}

export default function NEETCoachingOmicronPage() {
  return (
    <>
      <LocalitySchema
        locality="Omicron Sector"
        slug="neet-coaching-omicron-noida"
        pageTitle="Best NEET Coaching in Omicron Sector, Greater Noida"
        pageDescription="Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
