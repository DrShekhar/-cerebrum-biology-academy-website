import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Navi Mumbai'
const city = 'Metro Area'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Navi Mumbai | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty, 98% success rate. Kharghar, Vashi, Belapur, Palm Beach Road. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Navi Mumbai',
    'biology tuition Kharghar',
    'NEET classes Vashi',
    'best NEET tutor Belapur',
    'medical entrance Palm Beach Road',
    'NEET preparation Navi Mumbai',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Navi Mumbai | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty, 98% success rate. Premium coaching for planned city. Book free demo!',
    url: `${BASE_URL}/neet-coaching-navi-mumbai`,
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
    title: 'Best NEET Coaching in Navi Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty. Premium planned city coaching. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-navi-mumbai`,
  },
}

export default function NEETCoachingNaviMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Navi Mumbai"
        slug="neet-coaching-navi-mumbai"
        pageTitle="Best NEET Coaching in Navi Mumbai"
        pageDescription="Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
