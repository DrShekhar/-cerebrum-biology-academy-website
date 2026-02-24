import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'UP Board Intermediate Biology Coaching | NEET Dual Prep',
  description: 'Expert UP Board Intermediate Biology coaching with NEET integration. Hindi medium support available. Master UP board curriculum aligned with NCERT and NEET requirements.',
  keywords: [
    'UP board intermediate biology',
    'UP board biology coaching',
    'Intermediate biology UP',
    'NEET coaching UP board',
    'Hindi medium biology coaching',
    'UP board exam preparation',
    'Intermediate biology tuition',
  ],
  openGraph: {
    title: 'UP Board Intermediate Biology Coaching | NEET Dual Prep',
    description: 'Expert UP Board Intermediate Biology coaching with NEET integration.',
    url: `${BASE_URL}/boards/up-intermediate`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UP Board Intermediate Biology Coaching | NEET Dual Prep',
    description: 'Expert UP Board Intermediate Biology coaching with NEET integration.',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/up-intermediate`,
  },
}

export default function UpIntermediatePage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="boards/up-intermediate"
        pageTitle="UP Board Intermediate Biology Coaching | NEET Dual Prep"
        pageDescription="Expert UP Board Intermediate Biology coaching with NEET integration."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
