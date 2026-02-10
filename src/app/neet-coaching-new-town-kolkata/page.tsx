import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'New Town Rajarhat'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in New Town Rajarhat Kolkata | IT Hub | Cerebrum',
  description:
    'Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for Eco Park & Action Area families. Book free demo!',
  keywords: [
    'NEET coaching New Town',
    'biology tuition Rajarhat Kolkata',
    'NEET classes New Town Rajarhat',
    'best NEET tutor Eco Park',
    'medical entrance Action Area',
    'NEET preparation New Town Kolkata',
  ],
  openGraph: {
    title: 'Best NEET Coaching in New Town Rajarhat Kolkata | IT Hub | Cerebrum',
    description:
      'Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-new-town-kolkata`,
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
    title: 'Best NEET Coaching in New Town Rajarhat Kolkata | IT Hub',
    description:
      'Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-new-town-kolkata`,
  },
}

export default function NEETCoachingNewTownKolkataPage() {
  return (
    <>
      <LocalitySchema
        locality="New Town Rajarhat"
        slug="neet-coaching-new-town-kolkata"
        pageTitle="Best NEET Coaching in New Town Rajarhat"
        pageDescription="Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
