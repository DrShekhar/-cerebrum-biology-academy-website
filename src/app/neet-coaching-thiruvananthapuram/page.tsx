import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Thiruvananthapuram'
const slug = 'neet-coaching-thiruvananthapuram'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate | Cerebrum`,
  description: `Top NEET Biology coaching in ${locality}, Kerala. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: [
    'NEET coaching Thiruvananthapuram',
    'online NEET classes Thiruvananthapuram',
    'biology tuition Thiruvananthapuram',
    'NEET preparation Thiruvananthapuram Kerala',
    'best biology coaching Thiruvananthapuram',
    'NEET tutor Thiruvananthapuram',
    'medical entrance coaching Thiruvananthapuram',
    'NEET online classes Kerala',
  ],
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

export default function NEETCoachingThiruvananthapuramPage() {
  return (
    <>
      <LocalitySchema locality="Thiruvananthapuram" slug={slug} pageTitle="Best NEET Coaching in Thiruvananthapuram" pageDescription="Top NEET Biology coaching in Thiruvananthapuram, Kerala with AIIMS faculty and 98% success rate." pageType="coaching" coordinates={{ lat: "8.5241", lng: "76.9366" }} />
      <PageContent />
    </>
  )
}
