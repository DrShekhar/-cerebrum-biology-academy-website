import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Baner'
const city = 'Pune'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Baner Pune | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty, 98% success rate. Balewadi, premium residential, IT professionals. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Baner',
    'biology tuition Baner',
    'NEET classes Balewadi',
    'best NEET tutor Baner',
    'medical entrance Baner',
    'NEET preparation Baner Pune',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Baner Pune | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-baner-pune`,
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
    title: 'Best NEET Coaching in Baner Pune | 98% Success Rate',
    description: 'Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-baner-pune`,
  },
}

export default function NEETCoachingBanerPunePage() {
  return (
    <>
      <LocalitySchema
        locality="Baner"
        slug="neet-coaching-baner-pune"
        pageTitle="Best NEET Coaching in Baner"
        pageDescription="Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
