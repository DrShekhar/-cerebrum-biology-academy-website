import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = 'Visakhapatnam'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes with 98% success rate',
  locality: city,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Visakhapatnam | Online Biology Classes',
  description:
    'Premium online NEET coaching in Visakhapatnam (Vizag) for Andhra families. 12,000+ aspirants, expert biology classes, near Andhra Medical College. 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Visakhapatnam',
    'NEET classes Vizag',
    'online biology tuition Visakhapatnam',
    'NEET preparation Andhra Pradesh',
    'best NEET tutor Vizag',
    'medical entrance coaching Visakhapatnam',
    'NEET online classes Andhra',
    'biology coaching MVP Colony',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Visakhapatnam | Online Biology Classes',
    description:
      'Premium online NEET coaching in Vizag. 12,000+ aspirants, expert faculty, near medical colleges. 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-visakhapatnam`,
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
    title: 'Best NEET Coaching in Visakhapatnam | 98% Success Rate',
    description:
      'Online NEET coaching in Vizag for AP premium families. Expert biology classes, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-visakhapatnam`,
  },
}

export default function NEETCoachingVisakhapatnamPage() {
  return (
    <>
      <LocalitySchema
        locality="Visakhapatnam"
        slug="neet-coaching-visakhapatnam"
        pageTitle="Best NEET Coaching in Visakhapatnam"
        pageDescription="Premium online NEET coaching in Vizag. 12,000+ aspirants, expert faculty, near Andhra Medical College & GITAM. 98% success rate."
        pageType="coaching" coordinates={{ lat: "17.6868", lng: "83.2185" }} />
      <PageContent />
    </>
  )
}
