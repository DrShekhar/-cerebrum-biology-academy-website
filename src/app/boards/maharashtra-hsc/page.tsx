import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Maharashtra HSC Biology Coaching | NEET + MHT-CET Dual Prep',
  description: 'Expert Maharashtra HSC Biology coaching with MHT-CET overlap coverage and NEET integration. Master Std XII Biology with chapter-wise weightage and entrance exam strategy.',
  keywords: [
    'Maharashtra HSC biology',
    'Maharashtra state board biology',
    'Maharashtra 12th biology',
    'NEET coaching Maharashtra',
    'MHT-CET biology coaching',
    'HSC biology tuition',
    'Maharashtra board exam preparation',
  ],
  openGraph: {
    title: 'Maharashtra HSC Biology Coaching | NEET + MHT-CET Dual Prep',
    description: 'Expert Maharashtra HSC Biology coaching with MHT-CET overlap coverage and NEET integration.',
    url: `${BASE_URL}/boards/maharashtra-hsc`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maharashtra HSC Biology Coaching | NEET + MHT-CET Dual Prep',
    description: 'Expert Maharashtra HSC Biology coaching with MHT-CET overlap coverage and NEET integration.',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/maharashtra-hsc`,
  },
}

export default function MaharashtraHscPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="boards/maharashtra-hsc"
        pageTitle="Maharashtra HSC Biology Coaching | NEET + MHT-CET Dual Prep"
        pageDescription="Expert Maharashtra HSC Biology coaching with MHT-CET overlap coverage and NEET integration."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
