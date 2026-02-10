import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Muscat'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Muscat | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Muscat. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Serving Indian schools in Oman.',
  keywords: [
    'NEET coaching Muscat',
    'biology tuition Muscat',
    'NEET classes Muscat',
    'best NEET tutor Muscat',
    'Indian NEET coaching Oman',
    'online NEET preparation Muscat',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Muscat | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Muscat. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-muscat-oman`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Muscat | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Muscat. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-muscat-oman` },
}

export default function NEETCoachingMuscatPage() {
  return (
    <>
      <LocalitySchema locality="Muscat" slug="neet-coaching-muscat-oman" pageTitle="Best NEET Coaching in Muscat" pageDescription="Expert NEET coaching for Indian students in Muscat serving Indian schools in Oman." pageType="coaching" />
      <PageContent />
    </>
  )
}
