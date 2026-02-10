import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'CHIREC International'
const city = 'Hyderabad'
const slug = 'neet-coaching-chirec-hyderabad'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: `Specialized coaching for ${school} students`,
  locality: city,
})

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} students in ${city}. CBSE/Cambridge bridge coaching. 98% success rate. Book free demo!`,
  keywords: [
    'NEET coaching CHIREC Hyderabad',
    'CBSE Cambridge NEET biology tuition',
    'NEET preparation CHIREC Kondapur',
    'dual curriculum NEET coaching',
    'NEET classes CHIREC International',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students`,
    description: `Specialized NEET Biology coaching for ${school} students in ${city}. CBSE/Cambridge bridge coaching. 98% success rate.`,
    url: `${BASE_URL}/${slug}`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching for ${school} Students`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Coaching for ${school} Students`,
    description: `Specialized NEET Biology coaching for ${school} students in ${city}.`,
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/${slug}`,
  },
}

export default function SchoolPage() {
  return (
    <>
      <LocalitySchema
        locality={city}
        slug={slug}
        pageTitle={`NEET Coaching for ${school} Students`}
        pageDescription={`Specialized NEET Biology coaching for ${school} students in ${city}. CBSE/Cambridge bridge coaching. 98% success rate.`}
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
