import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Tamil Nadu HSC Biology Coaching | NEET + Board Dual Prep',
  description: 'Expert Tamil Nadu HSC Biology coaching covering 12th std (Volume I & II) with integrated NEET preparation. Master TN State Board pattern with NEET cutoff optimization.',
  keywords: [
    'Tamil Nadu HSC biology',
    'TN State Board biology coaching',
    'Tamil Nadu 12th biology',
    'NEET coaching Tamil Nadu',
    'HSC biology tuition',
    'TN board exam preparation',
    'Tamil Nadu biology classes',
  ],
  openGraph: {
    title: 'Tamil Nadu HSC Biology Coaching | NEET + Board Dual Prep',
    description: 'Expert Tamil Nadu HSC Biology coaching covering 12th std with integrated NEET preparation.',
    url: `${BASE_URL}/boards/tamil-nadu-hsc`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamil Nadu HSC Biology Coaching | NEET + Board Dual Prep',
    description: 'Expert Tamil Nadu HSC Biology coaching covering 12th std with integrated NEET preparation.',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/tamil-nadu-hsc`,
  },
}

export default function TamilNaduHscPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="boards/tamil-nadu-hsc"
        pageTitle="Tamil Nadu HSC Biology Coaching | NEET + Board Dual Prep"
        pageDescription="Expert Tamil Nadu HSC Biology coaching covering 12th std with integrated NEET preparation."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
