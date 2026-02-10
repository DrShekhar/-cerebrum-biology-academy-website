import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Hiranandani'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Hiranandani Mumbai | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Hiranandani, Powai. Expert AIIMS faculty, 98% success rate, 695/720 top score. Gated community, 15000+ families. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Hiranandani',
    'biology tuition Hiranandani',
    'NEET classes Powai',
    'best NEET tutor Hiranandani',
    'medical entrance Powai Lake',
    'NEET preparation Hiranandani',
    'gated community NEET coaching',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Hiranandani Mumbai | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Hiranandani, Powai. Expert AIIMS faculty, 98% success rate. Premium coaching for gated community. Book free demo!',
    url: `${BASE_URL}/neet-coaching-hiranandani-mumbai`,
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
    title: 'Best NEET Coaching in Hiranandani Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Hiranandani. Expert AIIMS faculty. Premium online classes. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-hiranandani-mumbai`,
  },
}

export default function NEETCoachingHiranandaniMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Hiranandani"
        slug="neet-coaching-hiranandani-mumbai"
        pageTitle="Best NEET Coaching in Hiranandani"
        pageDescription="Join #1 NEET coaching in Hiranandani, Powai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
