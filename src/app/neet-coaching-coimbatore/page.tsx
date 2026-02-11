import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = 'Coimbatore'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes with 98% success rate',
  locality: city,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Coimbatore | Online Biology Classes | Cerebrum',
  description:
    'Join Cerebrum for premium online NEET coaching in Coimbatore. 18,000+ aspirants, expert biology classes, near Coimbatore Medical College & PSG IMS. 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Coimbatore',
    'online NEET classes Coimbatore',
    'biology tuition Coimbatore',
    'NEET preparation Tamil Nadu',
    'best biology coaching Coimbatore',
    'NEET tutor RS Puram',
    'medical entrance coaching Coimbatore',
    'NEET online classes TN',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Coimbatore | Online Biology Classes | Cerebrum',
    description:
      'Premium online NEET coaching in Coimbatore. 18,000+ aspirants, expert faculty, near medical colleges. 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-coimbatore`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in ${city} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Coimbatore | 98% Success Rate',
    description:
      'Online NEET coaching in Coimbatore. Expert biology classes, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-coimbatore`,
  },
}

export default function NEETCoachingCoimbatorePage() {
  return (
    <>
      <LocalitySchema
        locality="Coimbatore"
        slug="neet-coaching-coimbatore"
        pageTitle="Best NEET Coaching in Coimbatore"
        pageDescription="Premium online NEET coaching in Coimbatore. 18,000+ aspirants, expert faculty, near Coimbatore Medical College & PSG IMS. 98% success rate."
        pageType="coaching" coordinates={{ lat: "11.0168", lng: "76.9558" }} />
      <PageContent />
    </>
  )
}
