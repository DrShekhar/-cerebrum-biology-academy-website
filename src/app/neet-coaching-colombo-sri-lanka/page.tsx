import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Colombo'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Colombo | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Colombo. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. A/L to NEET transition support.',
  keywords: [
    'NEET coaching Colombo',
    'biology tuition Colombo',
    'NEET classes Colombo',
    'best NEET tutor Colombo',
    'Indian NEET coaching Sri Lanka',
    'A/L to NEET preparation',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Colombo | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Colombo. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-colombo-sri-lanka`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Colombo | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Colombo. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-colombo-sri-lanka` },
}

export default function NEETCoachingColomboPage() {
  return (
    <>
      <LocalitySchema locality="Colombo" slug="neet-coaching-colombo-sri-lanka" pageTitle="Best NEET Coaching in Colombo" pageDescription="Expert NEET coaching for Indian students in Colombo with A/L to NEET transition support." pageType="coaching" />
      <PageContent />
    </>
  )
}
