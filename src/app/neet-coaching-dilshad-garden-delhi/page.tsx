import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Dilshad Garden'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dilshad Garden | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Dilshad Garden Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Growing medical aspirant hub. Book free demo!',
  keywords: [
    'NEET coaching Dilshad Garden',
    'biology tuition Dilshad Garden',
    'NEET classes Dilshad Garden Delhi',
    'best NEET tutor Dilshad Garden',
    'medical entrance Dilshad Garden',
    'NEET preparation Dilshad Garden',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Dilshad Garden | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Dilshad Garden Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-dilshad-garden-delhi`,
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
    title: 'Best NEET Coaching in Dilshad Garden | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Dilshad Garden Delhi. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-dilshad-garden-delhi`,
  },
}

export default function NEETCoachingDilshadGardenPage() {
  return (
    <>
      <LocalitySchema
        locality="Dilshad Garden"
        slug="neet-coaching-dilshad-garden-delhi"
        pageTitle="Best NEET Coaching in Dilshad Garden"
        pageDescription="Join #1 NEET coaching in Dilshad Garden Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
