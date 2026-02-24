import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Gujarat HSC Biology Coaching | NEET + GUJCET Dual Prep',
  description: 'Expert Gujarat HSC Biology coaching with GUJCET overlap and NEET integration. Master GSEB syllabus with Gujarati medium support. Complete biology preparation for state board success.',
  keywords: [
    'Gujarat HSC biology',
    'GSEB biology coaching',
    'Gujarat 12th biology',
    'NEET coaching Gujarat',
    'GUJCET biology coaching',
    'HSC biology tuition',
    'Gujarati medium biology',
    'Gujarat board exam preparation',
  ],
  openGraph: {
    title: 'Gujarat HSC Biology Coaching | NEET + GUJCET Dual Prep',
    description: 'Expert Gujarat HSC Biology coaching with GUJCET overlap and NEET integration.',
    url: `${BASE_URL}/boards/gujarat-hsc`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gujarat HSC Biology Coaching | NEET + GUJCET Dual Prep',
    description: 'Expert Gujarat HSC Biology coaching with GUJCET overlap and NEET integration.',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/gujarat-hsc`,
  },
}

export default function GujaratHscPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="boards/gujarat-hsc"
        pageTitle="Gujarat HSC Biology Coaching | NEET + GUJCET Dual Prep"
        pageDescription="Expert Gujarat HSC Biology coaching with GUJCET overlap and NEET integration."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
