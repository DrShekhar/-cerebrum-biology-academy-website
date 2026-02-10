import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'SG Highway'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in SG Highway Ahmedabad | Premium | Cerebrum',
  description:
    'Join #1 NEET coaching in SG Highway, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for business families. Book free demo!',
  keywords: [
    'NEET coaching SG Highway',
    'biology tuition SG Highway Ahmedabad',
    'NEET classes SG Highway',
    'best NEET tutor Ahmedabad',
    'medical entrance SG Highway',
    'NEET preparation premium Ahmedabad',
  ],
  openGraph: {
    title: 'Best NEET Coaching in SG Highway Ahmedabad | Premium | Cerebrum',
    description:
      'Join #1 NEET coaching in SG Highway, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-sg-highway-ahmedabad`,
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
    title: 'Best NEET Coaching in SG Highway Ahmedabad | Premium',
    description:
      'Join #1 NEET coaching in SG Highway, Ahmedabad. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-sg-highway-ahmedabad`,
  },
}

export default function NEETCoachingSGHighwayAhmedabadPage() {
  return (
    <>
      <LocalitySchema
        locality="SG Highway"
        slug="neet-coaching-sg-highway-ahmedabad"
        pageTitle="Best NEET Coaching in SG Highway"
        pageDescription="Join #1 NEET coaching in SG Highway, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
