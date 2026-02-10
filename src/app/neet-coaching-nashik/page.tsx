import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Nashik'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Wine country families choosing quality coaching',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Nashik | Online Biology Classes | Cerebrum',
  description:
    'Join #1 NEET coaching in Nashik. Expert online classes for 12000+ Nashik aspirants. Trusted by wine country families, weak NEET focus region - strong competition. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Nashik',
    'NEET online classes Nashik',
    'biology tuition Nashik',
    'NEET preparation Nashik',
    'best NEET coaching Nashik',
    'online NEET coaching Nashik',
    'medical entrance Nashik',
    'NEET coaching College Road Nashik',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Nashik | Online Biology Classes | Cerebrum',
    description:
      'Join #1 NEET coaching in Nashik. Expert online classes for 12000+ aspirants. Wine country families trust us. Book free demo!',
    url: `${BASE_URL}/neet-coaching-nashik`,
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
    title: 'Best NEET Coaching in Nashik | Online Biology Classes',
    description:
      'Join #1 NEET coaching in Nashik. Expert online classes for Nashik aspirants. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nashik`,
  },
}

export default function NEETCoachingNashikPage() {
  return (
    <>
      <LocalitySchema
        locality="Nashik"
        slug="neet-coaching-nashik"
        pageTitle="Best NEET Coaching in Nashik"
        pageDescription="Join #1 NEET coaching in Nashik. Expert online classes for 12000+ aspirants. Wine country families trust us."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
