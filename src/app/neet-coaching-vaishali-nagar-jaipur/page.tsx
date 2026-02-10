import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Vaishali Nagar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Vaishali Nagar Jaipur | Education Hub | Cerebrum',
  description:
    'Join #1 NEET coaching in Vaishali Nagar, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for educational families. Book free demo!',
  keywords: [
    'NEET coaching Vaishali Nagar',
    'biology tuition Vaishali Nagar Jaipur',
    'NEET classes Vaishali Nagar',
    'best NEET tutor Jaipur',
    'medical entrance education hub',
    'NEET preparation Vaishali Nagar',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Vaishali Nagar Jaipur | Education Hub | Cerebrum',
    description:
      'Join #1 NEET coaching in Vaishali Nagar, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-vaishali-nagar-jaipur`,
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
    title: 'Best NEET Coaching in Vaishali Nagar Jaipur | Education Hub',
    description:
      'Join #1 NEET coaching in Vaishali Nagar, Jaipur. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-vaishali-nagar-jaipur`,
  },
}

export default function NEETCoachingVaishaliNagarJaipurPage() {
  return (
    <>
      <LocalitySchema
        locality="Vaishali Nagar"
        slug="neet-coaching-vaishali-nagar-jaipur"
        pageTitle="Best NEET Coaching in Vaishali Nagar"
        pageDescription="Join #1 NEET coaching in Vaishali Nagar, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
