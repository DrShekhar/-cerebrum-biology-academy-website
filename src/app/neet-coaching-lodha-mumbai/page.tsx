import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Lodha'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Lodha Mumbai | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Lodha Premium - Palava City, Lodha Park. Expert AIIMS faculty, 98% success rate. Premium gated community coaching. Book free demo!',
  keywords: [
    'NEET coaching Lodha',
    'biology tuition Lodha',
    'NEET classes Palava City',
    'best NEET tutor Lodha Premium',
    'medical entrance Lodha Park',
    'NEET preparation gated community',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Lodha Mumbai | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Lodha Premium. Expert AIIMS faculty, 98% success rate. Premium coaching for gated community. Book free demo!',
    url: `${BASE_URL}/neet-coaching-lodha-mumbai`,
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
    title: 'Best NEET Coaching in Lodha Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Lodha Premium. Expert AIIMS faculty. Premium gated community coaching. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-lodha-mumbai`,
  },
}

export default function NEETCoachingLodhaMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Lodha"
        slug="neet-coaching-lodha-mumbai"
        pageTitle="Best NEET Coaching in Lodha"
        pageDescription="Join #1 NEET coaching in Lodha Premium. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
