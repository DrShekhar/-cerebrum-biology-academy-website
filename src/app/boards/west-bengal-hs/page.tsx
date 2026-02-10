import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'West Bengal HS Biology Coaching | NEET + WBJEE Dual Prep | Cerebrum',
  description: 'Expert West Bengal Higher Secondary Biology coaching with WBJEE overlap and NEET integration. Master WBCHSE curriculum with unique WB topics and Kolkata coaching expertise.',
  keywords: [
    'West Bengal HS biology',
    'WBCHSE biology coaching',
    'West Bengal higher secondary biology',
    'NEET coaching West Bengal',
    'WBJEE biology coaching',
    'HS biology tuition',
    'West Bengal board exam preparation',
  ],
  openGraph: {
    title: 'West Bengal HS Biology Coaching | NEET + WBJEE Dual Prep | Cerebrum',
    description: 'Expert West Bengal Higher Secondary Biology coaching with WBJEE overlap and NEET integration.',
    url: `${BASE_URL}/boards/west-bengal-hs`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'West Bengal HS Biology Coaching | NEET + WBJEE Dual Prep',
    description: 'Expert West Bengal Higher Secondary Biology coaching with WBJEE overlap and NEET integration.',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/west-bengal-hs`,
  },
}

export default function WestBengalHsPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="boards/west-bengal-hs"
        pageTitle="West Bengal HS Biology Coaching | NEET + WBJEE Dual Prep"
        pageDescription="Expert West Bengal Higher Secondary Biology coaching with WBJEE overlap and NEET integration."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
