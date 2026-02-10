import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Hinjewadi'
const city = 'Pune'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Hinjewadi Pune | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty, 98% success rate. Rajiv Gandhi Infotech Park, IT professionals. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Hinjewadi',
    'biology tuition Hinjewadi',
    'NEET classes Pune',
    'best NEET tutor IT Park',
    'medical entrance Hinjewadi',
    'NEET preparation Pune',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Hinjewadi Pune | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-hinjewadi-pune`,
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
    title: 'Best NEET Coaching in Hinjewadi Pune | 98% Success Rate',
    description: 'Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-hinjewadi-pune`,
  },
}

export default function NEETCoachingHinjewadi PunePage() {
  return (
    <>
      <LocalitySchema
        locality="Hinjewadi"
        slug="neet-coaching-hinjewadi-pune"
        pageTitle="Best NEET Coaching in Hinjewadi"
        pageDescription="Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
