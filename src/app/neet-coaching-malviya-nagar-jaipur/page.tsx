import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Malviya Nagar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Malviya Nagar Jaipur | Premium Residential | Cerebrum',
  description:
    'Join #1 NEET coaching in Malviya Nagar, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for professional families. Book free demo!',
  keywords: [
    'NEET coaching Malviya Nagar',
    'biology tuition Malviya Nagar Jaipur',
    'NEET classes Malviya Nagar',
    'best NEET tutor Jaipur',
    'medical entrance Malviya Nagar',
    'NEET preparation premium Jaipur',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Malviya Nagar Jaipur | Premium Residential | Cerebrum',
    description:
      'Join #1 NEET coaching in Malviya Nagar, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-malviya-nagar-jaipur`,
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
    title: 'Best NEET Coaching in Malviya Nagar Jaipur | Premium',
    description:
      'Join #1 NEET coaching in Malviya Nagar, Jaipur. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-malviya-nagar-jaipur`,
  },
}

export default function NEETCoachingMalviyaNagarJaipurPage() {
  return (
    <>
      <LocalitySchema
        locality="Malviya Nagar"
        slug="neet-coaching-malviya-nagar-jaipur"
        pageTitle="Best NEET Coaching in Malviya Nagar"
        pageDescription="Join #1 NEET coaching in Malviya Nagar, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
