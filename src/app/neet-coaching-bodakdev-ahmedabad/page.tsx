import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Bodakdev'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Bodakdev Ahmedabad | Premium Residential | Cerebrum',
  description:
    'Join #1 NEET coaching in Bodakdev, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching near IIM. Book free demo!',
  keywords: [
    'NEET coaching Bodakdev',
    'biology tuition Bodakdev Ahmedabad',
    'NEET classes Bodakdev',
    'best NEET tutor near IIM',
    'medical entrance Bodakdev',
    'NEET preparation Bodakdev',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Bodakdev Ahmedabad | Premium Residential | Cerebrum',
    description:
      'Join #1 NEET coaching in Bodakdev, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-bodakdev-ahmedabad`,
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
    title: 'Best NEET Coaching in Bodakdev Ahmedabad | Premium',
    description:
      'Join #1 NEET coaching in Bodakdev, Ahmedabad. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bodakdev-ahmedabad`,
  },
}

export default function NEETCoachingBodakdevAhmedabadPage() {
  return (
    <>
      <LocalitySchema
        locality="Bodakdev"
        slug="neet-coaching-bodakdev-ahmedabad"
        pageTitle="Best NEET Coaching in Bodakdev"
        pageDescription="Join #1 NEET coaching in Bodakdev, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
