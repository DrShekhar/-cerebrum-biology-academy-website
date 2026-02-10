import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Goregaon'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Goregaon Mumbai | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Goregaon. Expert AIIMS faculty, 98% success rate. Film City, Oberoi Garden City, premium gated communities. Book free demo!',
  keywords: [
    'NEET coaching Goregaon',
    'biology tuition Goregaon',
    'NEET classes Film City',
    'best NEET tutor Goregaon',
    'medical entrance Oberoi Garden City',
    'NEET preparation Goregaon',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Goregaon Mumbai | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Goregaon, Film City area. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-goregaon-mumbai`,
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
    title: 'Best NEET Coaching in Goregaon Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Goregaon. Expert AIIMS faculty. Premium gated community coaching. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-goregaon-mumbai`,
  },
}

export default function NEETCoachingGoregaonMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Goregaon"
        slug="neet-coaching-goregaon-mumbai"
        pageTitle="Best NEET Coaching in Goregaon"
        pageDescription="Join #1 NEET coaching in Goregaon. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
