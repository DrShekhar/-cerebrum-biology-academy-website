import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Gandhinagar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Gujarat capital education excellence',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Gandhinagar | Online Biology Classes | Cerebrum',
  description:
    'Join #1 NEET coaching in Gandhinagar. Expert online classes for Gujarat state capital families. Government families, education hub, GIFT City advantage. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Gandhinagar',
    'NEET online classes Gandhinagar',
    'biology tuition Gandhinagar',
    'NEET preparation Gandhinagar',
    'best NEET coaching Gandhinagar',
    'online NEET coaching Gandhinagar',
    'medical entrance Gandhinagar',
    'NEET coaching Gujarat capital',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Gandhinagar | Online Biology Classes | Cerebrum',
    description:
      'Join #1 NEET coaching in Gandhinagar. Expert online classes for Gujarat capital families. Government hub, GIFT City. Book free demo!',
    url: `${BASE_URL}/neet-coaching-gandhinagar`,
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
    title: 'Best NEET Coaching in Gandhinagar | Online Biology Classes',
    description:
      'Join #1 NEET coaching in Gandhinagar. Expert online classes for Gujarat capital families. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-gandhinagar`,
  },
}

export default function NEETCoachingGandhinagarPage() {
  return (
    <>
      <LocalitySchema
        locality="Gandhinagar"
        slug="neet-coaching-gandhinagar"
        pageTitle="Best NEET Coaching in Gandhinagar"
        pageDescription="Join #1 NEET coaching in Gandhinagar. Expert online classes for Gujarat state capital families. Government education hub."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
