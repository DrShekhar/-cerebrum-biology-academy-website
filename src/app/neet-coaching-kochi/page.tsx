import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = 'Kochi'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes with 98% success rate',
  locality: city,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Kochi | Online Biology Classes',
  description:
    'Premium online NEET coaching in Kochi for Kerala families. 15,000+ aspirants, expert biology classes, near Amrita KUHS colleges. 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Kochi',
    'online NEET classes Kochi',
    'biology tuition Kochi',
    'NEET preparation Kerala',
    'best biology coaching Ernakulam',
    'NEET tutor Kochi',
    'medical entrance coaching Kerala',
    'NEET online classes Kochi',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Kochi | Online Biology Classes',
    description:
      'Premium online NEET coaching in Kochi. 15,000+ aspirants, expert faculty, near medical colleges. 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-kochi`,
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
    title: 'Best NEET Coaching in Kochi | 98% Success Rate',
    description:
      'Online NEET coaching in Kochi for premium Kerala families. Expert biology classes, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-kochi`,
  },
}

export default function NEETCoachingKochiPage() {
  return (
    <>
      <LocalitySchema
        locality="Kochi"
        slug="neet-coaching-kochi"
        pageTitle="Best NEET Coaching in Kochi"
        pageDescription="Premium online NEET coaching in Kochi. 15,000+ aspirants, expert faculty, near Amrita & KUHS medical colleges. 98% success rate."
        pageType="coaching" coordinates={{ lat: "9.9312", lng: "76.2673" }} />
      <PageContent />
    </>
  )
}
