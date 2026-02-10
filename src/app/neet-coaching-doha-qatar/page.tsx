import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Doha'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Doha | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Doha. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Serving DPS Doha and international schools.',
  keywords: [
    'NEET coaching Doha',
    'biology tuition Doha',
    'NEET classes Doha',
    'best NEET tutor Doha',
    'Indian NEET coaching Qatar',
    'online NEET preparation Doha',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Doha | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Doha. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-doha-qatar`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Doha | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Doha. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-doha-qatar` },
}

export default function NEETCoachingDohaPage() {
  return (
    <>
      <LocalitySchema locality="Doha" slug="neet-coaching-doha-qatar" pageTitle="Best NEET Coaching in Doha" pageDescription="Expert NEET coaching for Indian students in Doha serving DPS Doha and international schools." pageType="coaching" />
      <PageContent />
    </>
  )
}
