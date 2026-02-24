import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Cuttack'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Twin city advantage with SCB Medical proximity',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Cuttack | Online Biology Classes',
  description:
    'Join #1 NEET coaching in Cuttack. Expert online classes for 5000+ Cuttack aspirants. SCB Medical College proximity advantage, twin city with Bhubaneswar. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Cuttack',
    'NEET online classes Cuttack',
    'biology tuition Cuttack',
    'NEET preparation Cuttack',
    'best NEET coaching Cuttack',
    'online NEET coaching Cuttack',
    'medical entrance Cuttack',
    'NEET coaching SCB Medical',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Cuttack | Online Biology Classes',
    description:
      'Join #1 NEET coaching in Cuttack. Expert online classes for 5000+ aspirants. SCB Medical College proximity. Book free demo!',
    url: `${BASE_URL}/neet-coaching-cuttack`,
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
    title: 'Best NEET Coaching in Cuttack | Online Biology Classes',
    description:
      'Join #1 NEET coaching in Cuttack. Expert online classes for Cuttack aspirants. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-cuttack`,
  },
}

export default function NEETCoachingCuttackPage() {
  return (
    <>
      <LocalitySchema
        locality="Cuttack"
        slug="neet-coaching-cuttack"
        pageTitle="Best NEET Coaching in Cuttack"
        pageDescription="Join #1 NEET coaching in Cuttack. Expert online classes for 5000+ aspirants. SCB Medical College proximity advantage."
        pageType="coaching" coordinates={{ lat: "20.4625", lng: "85.8830" }} />
      <PageContent />
    </>
  )
}
