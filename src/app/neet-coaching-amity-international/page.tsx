import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Amity International School'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} students across multiple campuses. Expert CBSE to NEET preparation with proven success.`,
  keywords: [
    'NEET coaching Amity International School',
    'Amity NEET preparation',
    'CBSE NEET coaching',
    'Amity International School biology',
    'large batch NEET coaching',
    'competitive NEET preparation',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} with CBSE curriculum expertise.`,
    url: `${BASE_URL}/neet-coaching-amity-international`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-amity-international`,
  },
}

export default function AmityInternationalPage() {
  return (
    <>
      <LocalitySchema locality="India" slug="neet-coaching-amity-international" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for ${school} students across all campuses with proven competitive NEET preparation success.`} pageType="coaching" />
      <PageContent />
    </>
  )
}
