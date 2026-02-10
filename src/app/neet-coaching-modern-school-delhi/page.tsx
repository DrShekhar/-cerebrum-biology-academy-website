import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Modern School, Delhi'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} (Barakhamba Road) students. Leverage prestigious CBSE foundation for medical entrance excellence.`,
  keywords: [
    'NEET coaching Modern School Delhi',
    'Barakhamba Road NEET',
    'Modern School Noida NEET',
    'prestigious school NEET coaching',
    'Delhi CBSE NEET preparation',
    'top school biology coaching',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} students with proven science excellence track record.`,
    url: `${BASE_URL}/neet-coaching-modern-school-delhi`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-modern-school-delhi`,
  },
}

export default function ModernSchoolDelhiPage() {
  return (
    <>
      <LocalitySchema locality="Delhi" slug="neet-coaching-modern-school-delhi" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for prestigious ${school} students with strong science tradition and CBSE excellence.`} pageType="coaching" />
      <PageContent />
    </>
  )
}
