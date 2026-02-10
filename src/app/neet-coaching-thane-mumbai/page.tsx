import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Thane'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Thane | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Thane. Expert AIIMS faculty, 98% success rate. Ghodbunder Road, Hiranandani Thane, Majiwada. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Thane',
    'biology tuition Thane',
    'NEET classes Thane West',
    'best NEET tutor Hiranandani Thane',
    'medical entrance Ghodbunder Road',
    'NEET preparation Thane',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Thane | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Thane. Expert AIIMS faculty, 98% success rate. Premium gated communities. Book free demo!',
    url: `${BASE_URL}/neet-coaching-thane-mumbai`,
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
    title: 'Best NEET Coaching in Thane | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Thane. Expert AIIMS faculty. Premium gated community coaching. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-thane-mumbai`,
  },
}

export default function NEETCoachingThaneMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Thane"
        slug="neet-coaching-thane-mumbai"
        pageTitle="Best NEET Coaching in Thane"
        pageDescription="Join #1 NEET coaching in Thane. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
