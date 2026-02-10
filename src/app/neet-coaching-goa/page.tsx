import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Goa'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online coaching with proven success',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Goa | Online Biology Classes | Cerebrum',
  description:
    'Join #1 NEET coaching in Goa. Expert online classes for 9000+ Goa aspirants. High success rate, NRI-friendly, franchise-only competition. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Goa',
    'NEET online classes Goa',
    'biology tuition Goa',
    'NEET preparation Goa',
    'best NEET coaching Goa',
    'online NEET coaching Goa',
    'medical entrance Goa',
    'NEET coaching Panaji Margao',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Goa | Online Biology Classes | Cerebrum',
    description:
      'Join #1 NEET coaching in Goa. Expert online classes for 9000+ aspirants. NRI-friendly, proven success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-goa`,
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
    title: 'Best NEET Coaching in Goa | Online Biology Classes',
    description:
      'Join #1 NEET coaching in Goa. Expert online classes for Goa aspirants. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-goa`,
  },
}

export default function NEETCoachingGoaPage() {
  return (
    <>
      <LocalitySchema
        locality="Goa"
        slug="neet-coaching-goa"
        pageTitle="Best NEET Coaching in Goa"
        pageDescription="Join #1 NEET coaching in Goa. Expert online classes for 9000+ aspirants. High success rate, NRI-friendly coaching."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
