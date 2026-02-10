import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Aliganj'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Aliganj Lucknow | Premium Residential | Cerebrum',
  description:
    'Join #1 NEET coaching in Aliganj, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for university area families. Book free demo!',
  keywords: [
    'NEET coaching Aliganj',
    'biology tuition Aliganj Lucknow',
    'NEET classes Aliganj',
    'best NEET tutor near university',
    'medical entrance Aliganj',
    'NEET preparation residential Lucknow',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Aliganj Lucknow | Premium Residential | Cerebrum',
    description:
      'Join #1 NEET coaching in Aliganj, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-aliganj-lucknow`,
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
    title: 'Best NEET Coaching in Aliganj Lucknow | Premium',
    description:
      'Join #1 NEET coaching in Aliganj, Lucknow. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-aliganj-lucknow`,
  },
}

export default function NEETCoachingAliganjLucknowPage() {
  return (
    <>
      <LocalitySchema
        locality="Aliganj"
        slug="neet-coaching-aliganj-lucknow"
        pageTitle="Best NEET Coaching in Aliganj"
        pageDescription="Join #1 NEET coaching in Aliganj, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
