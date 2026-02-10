import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Park Street'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Park Street Kolkata | Central Premium | Cerebrum',
  description:
    'Join #1 NEET coaching in Park Street, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for central Kolkata families. Book free demo!',
  keywords: [
    'NEET coaching Park Street',
    'biology tuition Park Street Kolkata',
    'NEET classes Park Street',
    'best NEET tutor central Kolkata',
    'medical entrance Park Street',
    'NEET preparation premium central Kolkata',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Park Street Kolkata | Central Premium | Cerebrum',
    description:
      'Join #1 NEET coaching in Park Street, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-park-street-kolkata`,
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
    title: 'Best NEET Coaching in Park Street Kolkata | Premium',
    description:
      'Join #1 NEET coaching in Park Street, Kolkata. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-park-street-kolkata`,
  },
}

export default function NEETCoachingParkStreetKolkataPage() {
  return (
    <>
      <LocalitySchema
        locality="Park Street"
        slug="neet-coaching-park-street-kolkata"
        pageTitle="Best NEET Coaching in Park Street"
        pageDescription="Join #1 NEET coaching in Park Street, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
