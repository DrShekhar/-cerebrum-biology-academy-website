import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = 'Madurai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes with 98% success rate',
  locality: city,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Madurai | Online Biology Classes',
  description:
    'Premium online NEET coaching in Madurai for Tamil Nadu medical families. 10,000+ aspirants, expert biology classes, near Madurai Medical College. 98% success rate. Book free demo!',
  keywords: [
    'NEET coaching Madurai',
    'online NEET classes Madurai',
    'biology tuition Madurai',
    'NEET preparation Tamil Nadu',
    'best NEET tutor Anna Nagar',
    'medical entrance coaching Madurai',
    'NEET online classes TN',
    'biology coaching KK Nagar',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Madurai | Online Biology Classes',
    description:
      'Premium online NEET coaching in Madurai. 10,000+ aspirants, expert faculty, near medical colleges. 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-madurai`,
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
    title: 'Best NEET Coaching in Madurai | 98% Success Rate',
    description:
      'Online NEET coaching in Madurai. Expert biology classes, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-madurai`,
  },
}

export default function NEETCoachingMaduraiPage() {
  return (
    <>
      <LocalitySchema
        locality="Madurai"
        slug="neet-coaching-madurai"
        pageTitle="Best NEET Coaching in Madurai"
        pageDescription="Premium online NEET coaching in Madurai. 10,000+ aspirants, expert faculty, near Madurai Medical College & Meenakshi Mission. 98% success rate."
        pageType="coaching" coordinates={{ lat: "9.9252", lng: "78.1198" }} />
      <PageContent />
    </>
  )
}
