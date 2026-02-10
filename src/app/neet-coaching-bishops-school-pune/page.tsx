import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = "Bishop's School, Pune"

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} (Camp area, Pune) students. ICSE/ISC curriculum to NEET bridge with proven success.`,
  keywords: [
    'NEET coaching Bishops School Pune',
    'ICSE to NEET bridge',
    'Pune NEET coaching',
    'Camp area NEET preparation',
    'ICSE NEET preparation',
    'prestigious Pune school NEET',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} students with ICSE/ISC excellence bridge.`,
    url: `${BASE_URL}/neet-coaching-bishops-school-pune`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bishops-school-pune`,
  },
}

export default function BishopsSchoolPunePage() {
  return (
    <>
      <LocalitySchema locality="Pune" slug="neet-coaching-bishops-school-pune" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for ${school} (Camp, Pune) students with ICSE/ISC-to-NEET bridge program.`} pageType="coaching" />
      <PageContent />
    </>
  )
}
