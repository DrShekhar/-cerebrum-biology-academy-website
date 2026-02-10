import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Pathways School'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} (IB World School) students in Noida/Gurgaon. IB curriculum to NEET bridge program with expert faculty.`,
  keywords: [
    'NEET coaching Pathways School',
    'NEET coaching Noida Gurgaon',
    'IB to NEET bridge',
    'Pathways School NEET preparation',
    'biology coaching IB students',
    'NEET for international school students',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} students with IB curriculum integration.`,
    url: `${BASE_URL}/neet-coaching-pathways-school`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-pathways-school`,
  },
}

export default function PathwaysSchoolPage() {
  return (
    <>
      <LocalitySchema locality="Noida" slug="neet-coaching-pathways-school" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for ${school} (IB World School) students in Noida/Gurgaon with complete IB-to-NEET bridge program.`} pageType="coaching" />
      <PageContent />
    </>
  )
}
