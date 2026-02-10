import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'C-Scheme'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in C-Scheme Jaipur | Tier 1 Premium | Cerebrum',
  description:
    'Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for industrialist families. Book free demo!',
  keywords: [
    'NEET coaching C-Scheme',
    'biology tuition C-Scheme Jaipur',
    'NEET classes C-Scheme',
    'best NEET tutor MI Road',
    'medical entrance C-Scheme',
    'NEET preparation Tier 1 premium Jaipur',
  ],
  openGraph: {
    title: 'Best NEET Coaching in C-Scheme Jaipur | Tier 1 Premium | Cerebrum',
    description:
      'Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-c-scheme-jaipur`,
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
    title: 'Best NEET Coaching in C-Scheme Jaipur | Tier 1 Premium',
    description:
      'Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-c-scheme-jaipur`,
  },
}

export default function NEETCoachingCSchemeJaipurPage() {
  return (
    <>
      <LocalitySchema
        locality="C-Scheme"
        slug="neet-coaching-c-scheme-jaipur"
        pageTitle="Best NEET Coaching in C-Scheme"
        pageDescription="Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
