import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Ballygunge'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Ballygunge Kolkata | Ultra-Premium | Cerebrum',
  description:
    'Join #1 NEET coaching in Ballygunge, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Ultra-premium coaching for elite families. Personalized batches & expert guidance. Book free demo!',
  keywords: [
    'NEET coaching Ballygunge',
    'biology tuition Ballygunge Kolkata',
    'NEET classes Ballygunge',
    'best NEET tutor Gariahat',
    'medical entrance Ballygunge',
    'NEET preparation ultra-premium Kolkata',
    'Ballygunge old money NEET coaching',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Ballygunge Kolkata | Ultra-Premium | Cerebrum',
    description:
      'Join #1 NEET coaching in Ballygunge, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-ballygunge-kolkata`,
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
    title: 'Best NEET Coaching in Ballygunge Kolkata | Ultra-Premium',
    description:
      'Join #1 NEET coaching in Ballygunge, Kolkata. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-ballygunge-kolkata`,
  },
}

export default function NEETCoachingBallygungeKolkataPage() {
  return (
    <>
      <LocalitySchema
        locality="Ballygunge"
        slug="neet-coaching-ballygunge-kolkata"
        pageTitle="Best NEET Coaching in Ballygunge"
        pageDescription="Join #1 NEET coaching in Ballygunge, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
