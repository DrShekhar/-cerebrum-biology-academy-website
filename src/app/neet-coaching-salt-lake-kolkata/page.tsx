import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Salt Lake'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Salt Lake Kolkata | Premium Coaching | Cerebrum',
  description:
    'Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Perfect for Sector V IT families. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Salt Lake',
    'biology tuition Salt Lake Kolkata',
    'NEET classes Salt Lake',
    'best NEET tutor Salt Lake',
    'medical entrance Sector V',
    'NEET preparation Kolkata gated community',
    'Salt Lake Sector V NEET coaching',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Salt Lake Kolkata | Premium Coaching | Cerebrum',
    description:
      'Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-salt-lake-kolkata`,
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
    title: 'Best NEET Coaching in Salt Lake Kolkata | Premium Coaching',
    description:
      'Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-salt-lake-kolkata`,
  },
}

export default function NEETCoachingSaltLakeKolkataPage() {
  return (
    <>
      <LocalitySchema
        locality="Salt Lake"
        slug="neet-coaching-salt-lake-kolkata"
        pageTitle="Best NEET Coaching in Salt Lake"
        pageDescription="Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
