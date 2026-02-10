import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Hazratganj'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Hazratganj Lucknow | Heritage Premium | Cerebrum',
  description:
    'Join #1 NEET coaching in Hazratganj, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score. Heritage premium coaching for central Lucknow. Book free demo!',
  keywords: [
    'NEET coaching Hazratganj',
    'biology tuition Hazratganj Lucknow',
    'NEET classes Hazratganj',
    'best NEET tutor central Lucknow',
    'medical entrance heritage area',
    'NEET preparation Hazratganj',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Hazratganj Lucknow | Heritage Premium | Cerebrum',
    description:
      'Join #1 NEET coaching in Hazratganj, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-hazratganj-lucknow`,
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
    title: 'Best NEET Coaching in Hazratganj Lucknow | Heritage Premium',
    description:
      'Join #1 NEET coaching in Hazratganj, Lucknow. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-hazratganj-lucknow`,
  },
}

export default function NEETCoachingHazratganjLucknowPage() {
  return (
    <>
      <LocalitySchema
        locality="Hazratganj"
        slug="neet-coaching-hazratganj-lucknow"
        pageTitle="Best NEET Coaching in Hazratganj"
        pageDescription="Join #1 NEET coaching in Hazratganj, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
