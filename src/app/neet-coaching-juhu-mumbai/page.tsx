import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Juhu'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Juhu Mumbai | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Juhu Mumbai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Premium online classes for celebrity families. Book free demo!',
  keywords: [
    'NEET coaching Juhu',
    'biology tuition Juhu Mumbai',
    'NEET classes Juhu',
    'best NEET tutor Juhu',
    'medical entrance Juhu',
    'NEET preparation Juhu Beach',
    'premium NEET coaching Mumbai',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Juhu Mumbai | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Juhu Mumbai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-juhu-mumbai`,
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
    title: 'Best NEET Coaching in Juhu Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Juhu Mumbai. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-juhu-mumbai`,
  },
}

export default function NEETCoachingJuhuMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Juhu"
        slug="neet-coaching-juhu-mumbai"
        pageTitle="Best NEET Coaching in Juhu"
        pageDescription="Join #1 NEET coaching in Juhu Mumbai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
