import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Versova'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Versova Mumbai | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty, 98% success rate. Four Bungalows, Lokhandwala area. Book free demo!',
  keywords: [
    'NEET coaching Versova',
    'biology tuition Versova',
    'NEET classes Andheri West',
    'best NEET tutor Four Bungalows',
    'medical entrance Lokhandwala',
    'NEET preparation Versova',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Versova Mumbai | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-versova-mumbai`,
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
    title: 'Best NEET Coaching in Versova Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-versova-mumbai`,
  },
}

export default function NEETCoachingVersovaMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Versova"
        slug="neet-coaching-versova-mumbai"
        pageTitle="Best NEET Coaching in Versova"
        pageDescription="Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
