import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Dhaka'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dhaka | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Dhaka. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Specialized for medical entrance prep.',
  keywords: [
    'NEET coaching Dhaka',
    'biology tuition Dhaka',
    'NEET classes Dhaka',
    'medical entrance coaching Dhaka',
    'Indian NEET coaching Bangladesh',
    'online NEET preparation Dhaka',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Dhaka | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Dhaka. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-dhaka-bangladesh`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Dhaka | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Dhaka. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-dhaka-bangladesh` },
}

export default function NEETCoachingDhakaPage() {
  return (
    <>
      <LocalitySchema locality="Dhaka" slug="neet-coaching-dhaka-bangladesh" pageTitle="Best NEET Coaching in Dhaka" pageDescription="Expert NEET coaching for Indian students in Dhaka with 98% success rate and medical entrance focus." pageType="coaching" />
      <PageContent />
    </>
  )
}
