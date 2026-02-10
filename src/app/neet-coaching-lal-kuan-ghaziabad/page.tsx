import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Lal Kuan'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Lal Kuan, Ghaziabad | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Lal Kuan, Ghaziabad. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Affordable family focused coaching. Book free demo!',
  keywords: [
    'NEET coaching Lal Kuan',
    'NEET coaching Ghaziabad',
    'biology tuition Lal Kuan',
    'NEET classes Tronica City',
    'best NEET tutor Ghaziabad',
    'medical entrance Lal Kuan',
    'NEET preparation Loni Raj Nagar',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Lal Kuan, Ghaziabad | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Lal Kuan, Ghaziabad. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-lal-kuan-ghaziabad`,
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
    title: 'Best NEET Coaching in Lal Kuan, Ghaziabad | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Lal Kuan, Ghaziabad. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-lal-kuan-ghaziabad`,
  },
}

export default function NEETCoachingLalKuanPage() {
  return (
    <>
      <LocalitySchema
        locality="Lal Kuan"
        slug="neet-coaching-lal-kuan-ghaziabad"
        pageTitle="Best NEET Coaching in Lal Kuan, Ghaziabad"
        pageDescription="Join #1 NEET coaching in Lal Kuan, Ghaziabad. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
