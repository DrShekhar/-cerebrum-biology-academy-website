import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'South Delhi'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'South Delhi\'s #1 NEET Institute',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in South Delhi | 98% Success Rate | Cerebrum Academy',
  description:
    'Join South Delhi\'s #1 NEET Biology coaching. Hauz Khas, GK, Defence Colony, Vasant Vihar. Expert AIIMS faculty, 94% success rate, 695/720 top score. Book free demo!',
  keywords: [
    'NEET coaching South Delhi',
    'best NEET biology coaching South Delhi',
    'NEET classes South Delhi',
    'medical entrance coaching South Delhi',
    'NEET preparation Hauz Khas',
    'NEET coaching Greater Kailash',
    'biology coaching South Delhi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in South Delhi | 98% Success Rate | Cerebrum Academy',
    description:
      'Join South Delhi\'s #1 NEET Biology coaching. Expert AIIMS faculty, 94% success rate. Hauz Khas, GK, Defence Colony, Vasant Vihar. Book free demo!',
    url: `${BASE_URL}/neet-coaching-south-delhi`,
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
    title: 'Best NEET Coaching in South Delhi | 98% Success Rate',
    description: 'Join South Delhi\'s #1 NEET Biology coaching. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-south-delhi`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function NEETCoachingSouthDelhiPage() {
  return (
    <>
      <LocalitySchema
        locality="South Delhi"
        slug="neet-coaching-south-delhi"
        pageTitle="Best NEET Coaching in South Delhi"
        pageDescription="Join South Delhi's #1 NEET Biology coaching. Expert AIIMS faculty, 94% success rate, 695/720 top score. Hauz Khas, GK, Defence Colony, Vasant Vihar."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
