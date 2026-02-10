import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Shahdara'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Shahdara East Delhi | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Shahdara Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Affordable premium coaching for largest student population. Book free demo!',
  keywords: [
    'NEET coaching Shahdara',
    'biology tuition Shahdara',
    'NEET classes Shahdara Delhi',
    'best NEET tutor Shahdara',
    'medical entrance Shahdara',
    'NEET preparation East Delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Shahdara East Delhi | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Shahdara Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-shahdara-east-delhi`,
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
    title: 'Best NEET Coaching in Shahdara East Delhi | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Shahdara Delhi. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-shahdara-east-delhi`,
  },
}

export default function NEETCoachingShadhdaraPage() {
  return (
    <>
      <LocalitySchema
        locality="Shahdara"
        slug="neet-coaching-shahdara-east-delhi"
        pageTitle="Best NEET Coaching in Shahdara East Delhi"
        pageDescription="Join #1 NEET coaching in Shahdara Delhi. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
