import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Riyadh'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Riyadh | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Riyadh. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Timezone-friendly online classes.',
  keywords: [
    'NEET coaching Riyadh',
    'biology tuition Riyadh',
    'NEET classes Riyadh',
    'best NEET tutor Riyadh',
    'Indian NEET coaching Saudi Arabia',
    'online NEET preparation Riyadh',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Riyadh | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Riyadh. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-riyadh-saudi-arabia`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Riyadh | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Riyadh. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-riyadh-saudi-arabia` },
}

export default function NEETCoachingRiyadhPage() {
  return (
    <>
      <LocalitySchema locality="Riyadh" slug="neet-coaching-riyadh-saudi-arabia" pageTitle="Best NEET Coaching in Riyadh" pageDescription="Expert NEET coaching for Indian students in Riyadh with 98% success rate and timezone-friendly online classes." pageType="coaching" />
      <PageContent />
    </>
  )
}
