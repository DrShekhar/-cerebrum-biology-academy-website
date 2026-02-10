import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'La Martiniere'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} (Kolkata & Lucknow) students. ISC curriculum to NEET bridge with proven success.`,
  keywords: [
    'NEET coaching La Martiniere',
    'La Martiniere Kolkata NEET',
    'La Martiniere Lucknow NEET',
    'ISC to NEET bridge',
    'colonial heritage school NEET',
    'prestigious ISC coaching',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} students with ISC curriculum excellence bridge.`,
    url: `${BASE_URL}/neet-coaching-la-martiniere`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-la-martiniere`,
  },
}

export default function LaMartinierePage() {
  return (
    <>
      <LocalitySchema locality="Kolkata" slug="neet-coaching-la-martiniere" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for prestigious ${school} (Kolkata/Lucknow) students with ISC-to-NEET bridge program.`} pageType="coaching" />
      <PageContent />
    </>
  )
}
