import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Satellite'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Satellite Ahmedabad | Premium Drive-In Road | Cerebrum',
  description:
    'Join #1 NEET coaching in Satellite, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for Drive-In Road families. Book free demo!',
  keywords: [
    'NEET coaching Satellite',
    'biology tuition Satellite Ahmedabad',
    'NEET classes Drive-In Road',
    'best NEET tutor Satellite',
    'medical entrance Satellite Ahmedabad',
    'NEET preparation premium residential',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Satellite Ahmedabad | Premium Drive-In Road | Cerebrum',
    description:
      'Join #1 NEET coaching in Satellite, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-satellite-ahmedabad`,
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
    title: 'Best NEET Coaching in Satellite Ahmedabad | Premium',
    description:
      'Join #1 NEET coaching in Satellite, Ahmedabad. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-satellite-ahmedabad`,
  },
}

export default function NEETCoachingSatelliteAhmedabadPage() {
  return (
    <>
      <LocalitySchema
        locality="Satellite"
        slug="neet-coaching-satellite-ahmedabad"
        pageTitle="Best NEET Coaching in Satellite"
        pageDescription="Join #1 NEET coaching in Satellite, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
