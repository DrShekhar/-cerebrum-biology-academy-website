import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Colaba'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Colaba Mumbai | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Colaba, South Mumbai. Expert AIIMS faculty, 98% success rate. Navy Nagar, Cuffe Parade. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Colaba',
    'biology tuition Colaba',
    'NEET classes South Mumbai',
    'best NEET tutor Navy Nagar',
    'medical entrance Cuffe Parade',
    'NEET preparation Colaba',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Colaba Mumbai | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Colaba, South Mumbai. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-colaba-mumbai`,
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
    title: 'Best NEET Coaching in Colaba Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Colaba, South Mumbai. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-colaba-mumbai`,
  },
}

export default function NEETCoachingColabaMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Colaba"
        slug="neet-coaching-colaba-mumbai"
        pageTitle="Best NEET Coaching in Colaba"
        pageDescription="Join #1 NEET coaching in Colaba, South Mumbai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
