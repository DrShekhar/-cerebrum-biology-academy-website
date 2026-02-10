import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Vasant Valley School'
const city = 'New Delhi'
const slug = 'neet-coaching-vasant-valley-school'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: `Specialized coaching for ${school} students`,
  locality: city,
})

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} students in ${city}. Expert faculty, 98% success rate, personalized batches. Book free demo!`,
  keywords: [
    'NEET coaching Vasant Valley School',
    'biology tuition Vasant Valley students',
    'NEET preparation New Delhi Vasant Valley',
    'NEET classes for Vasant Valley School',
    'NEET biology coaching Vasant Kunj',
    'CBSE NEET coaching Delhi',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students`,
    description: `Specialized NEET Biology coaching for ${school} students in ${city}. Expert faculty, 98% success rate, personalized batches.`,
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
        pageDescription={`Specialized NEET Biology coaching for ${school} students in ${city}. Expert faculty, 98% success rate, personalized batches.`}
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
