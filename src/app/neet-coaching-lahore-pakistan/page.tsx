import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Lahore'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET & MDCAT Coaching in Lahore | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET and MDCAT coaching for Indian and Pakistani students in Lahore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score.',
  keywords: [
    'NEET coaching Lahore',
    'MDCAT coaching Lahore',
    'biology tuition Lahore',
    'NEET and MDCAT together',
    'Indian NEET coaching Pakistan',
    'online NEET preparation Lahore',
  ],
  openGraph: {
    title: 'Best NEET & MDCAT Coaching in Lahore | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET and MDCAT coaching for Lahore students. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-lahore-pakistan`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET & MDCAT Coaching in Lahore | 98% Success Rate',
    description: 'Join #1 NEET and MDCAT coaching for Lahore students. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-lahore-pakistan` },
}

export default function NEETCoachingLahorePage() {
  return (
    <>
      <LocalitySchema locality="Lahore" slug="neet-coaching-lahore-pakistan" pageTitle="Best NEET & MDCAT Coaching in Lahore" pageDescription="Expert NEET and MDCAT coaching for students in Lahore with 98% success rate." pageType="coaching" />
      <PageContent />
    </>
  )
}
