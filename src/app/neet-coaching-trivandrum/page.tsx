import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = 'Trivandrum'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes with 98% success rate',
  locality: city,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Trivandrum | Online Biology Classes | Cerebrum',
  description:
    'Premium online NEET coaching in Trivandrum for NRI & Kerala families. 8,000+ aspirants, expert biology classes, near Trivandrum Medical College. 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Trivandrum',
    'online NEET classes Trivandrum',
    'biology tuition Trivandrum',
    'NEET preparation Kerala',
    'best NEET tutor Kowdiar',
    'medical entrance coaching Thiruvananthapuram',
    'NEET online classes Trivandrum',
    'biology coaching Technopark',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Trivandrum | Online Biology Classes | Cerebrum',
    description:
      'Premium online NEET coaching in Trivandrum. 8,000+ aspirants, expert faculty, near medical colleges. 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-trivandrum`,
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
    title: 'Best NEET Coaching in Trivandrum | 98% Success Rate',
    description:
      'Online NEET coaching in Trivandrum for NRI families. Expert biology classes, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-trivandrum`,
  },
}

export default function NEETCoachingTrivandumPage() {
  return (
    <>
      <LocalitySchema
        locality="Trivandrum"
        slug="neet-coaching-trivandrum"
        pageTitle="Best NEET Coaching in Trivandrum"
        pageDescription="Premium online NEET coaching in Trivandrum. 8,000+ aspirants, expert faculty, near Trivandrum Medical College & SUT Royal. 98% success rate."
        pageType="coaching" coordinates={{ lat: "8.5241", lng: "76.9366" }} />
      <PageContent />
    </>
  )
}
