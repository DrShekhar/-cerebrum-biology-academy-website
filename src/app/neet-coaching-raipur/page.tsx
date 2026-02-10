import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Raipur'
const slug = 'neet-coaching-raipur'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate | Cerebrum`,
  description: `Top NEET Biology coaching in ${locality}, Chhattisgarh. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: ['NEET coaching Raipur', 'biology tuition Raipur', 'best NEET classes Raipur', 'NEET preparation Raipur Chhattisgarh'],
  openGraph: {
    title: `Best NEET Coaching in ${locality} | Cerebrum`,
    description: `Top NEET Biology coaching in ${locality}. AIIMS faculty, 98% success rate.`,
    url: `${BASE_URL}/${slug}`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality}` }],
  },
  twitter: { card: 'summary_large_image', title: `Best NEET Coaching in ${locality}`, description: `Top NEET Biology coaching in ${locality}. AIIMS faculty, 98% success rate.`, images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`] },
  alternates: { canonical: `${BASE_URL}/${slug}` },
}

export default function NEETCoachingRaipurPage() {
  return (
    <>
      <LocalitySchema locality="Raipur" slug={slug} pageTitle="Best NEET Coaching in Raipur" pageDescription="Top NEET Biology coaching in Raipur, Chhattisgarh with AIIMS faculty and 98% success rate." pageType="coaching" />
      <PageContent />
    </>
  )
}
