import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Guwahati'
const slug = 'neet-coaching-guwahati'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate | Cerebrum`,
  description: `Top NEET Biology coaching in ${locality}, Assam. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: ['NEET coaching Guwahati', 'biology tuition Guwahati', 'best NEET classes Guwahati', 'NEET preparation Guwahati Assam'],
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

export default function NEETCoachingGuwahatiPage() {
  return (
    <>
      <LocalitySchema locality="Guwahati" slug={slug} pageTitle="Best NEET Coaching in Guwahati" pageDescription="Top NEET Biology coaching in Guwahati, Assam with AIIMS faculty and 98% success rate." pageType="coaching" />
      <PageContent />
    </>
  )
}
