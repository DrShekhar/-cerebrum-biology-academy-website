import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Mohali'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Chandigarh tricity premium education',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mohali | Online Biology Classes | Cerebrum',
  description:
    'Join #1 NEET coaching in Mohali. Expert online classes for Chandigarh tricity premium market. Punjab education hub, IT City advantage. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Mohali',
    'NEET online classes Mohali',
    'biology tuition Mohali',
    'NEET preparation Mohali',
    'best NEET coaching Mohali',
    'online NEET coaching Mohali',
    'medical entrance Mohali',
    'NEET coaching Chandigarh tricity',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Mohali | Online Biology Classes | Cerebrum',
    description:
      'Join #1 NEET coaching in Mohali. Expert online classes for Chandigarh tricity. Punjab education hub. Book free demo!',
    url: `${BASE_URL}/neet-coaching-mohali`,
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
    title: 'Best NEET Coaching in Mohali | Online Biology Classes',
    description:
      'Join #1 NEET coaching in Mohali. Expert online classes for Chandigarh tricity. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-mohali`,
  },
}

export default function NEETCoachingMohaliPage() {
  return (
    <>
      <LocalitySchema
        locality="Mohali"
        slug="neet-coaching-mohali"
        pageTitle="Best NEET Coaching in Mohali"
        pageDescription="Join #1 NEET coaching in Mohali. Expert online classes for Chandigarh tricity premium market. Punjab education hub."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
