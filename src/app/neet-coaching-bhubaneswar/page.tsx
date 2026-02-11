import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Bhubaneswar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Odisha education hub leader',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Bhubaneswar | Online Biology Classes | Cerebrum',
  description:
    'Join #1 NEET coaching in Bhubaneswar. Expert online classes for 13000+ Odisha aspirants. Education hub with moderate competition. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Bhubaneswar',
    'NEET online classes Bhubaneswar',
    'biology tuition Bhubaneswar',
    'NEET preparation Bhubaneswar',
    'best NEET coaching Bhubaneswar',
    'online NEET coaching Bhubaneswar',
    'medical entrance Bhubaneswar',
    'NEET coaching Odisha',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Bhubaneswar | Online Biology Classes | Cerebrum',
    description:
      'Join #1 NEET coaching in Bhubaneswar. Expert online classes for 13000+ aspirants. Odisha education hub. Book free demo!',
    url: `${BASE_URL}/neet-coaching-bhubaneswar`,
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
    title: 'Best NEET Coaching in Bhubaneswar | Online Biology Classes',
    description:
      'Join #1 NEET coaching in Bhubaneswar. Expert online classes for Odisha aspirants. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bhubaneswar`,
  },
}

export default function NEETCoachingBhubaneswarPage() {
  return (
    <>
      <LocalitySchema
        locality="Bhubaneswar"
        slug="neet-coaching-bhubaneswar"
        pageTitle="Best NEET Coaching in Bhubaneswar"
        pageDescription="Join #1 NEET coaching in Bhubaneswar. Expert online classes for 13000+ aspirants. Odisha education hub."
        pageType="coaching" coordinates={{ lat: "20.2961", lng: "85.8245" }} />
      <PageContent />
    </>
  )
}
