import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Telangana Intermediate Biology Coaching | NEET + Board Dual Prep',
  description: 'Expert Telangana BIE Biology coaching with integrated NEET preparation. Master BIE Telangana syllabus (Botany Paper-I & Zoology Paper-II) with EAMCET overlap coverage.',
  keywords: [
    'Telangana intermediate biology',
    'BIE Telangana biology tuition',
    'Telangana biology coaching',
    'NEET coaching Telangana',
    'Telangana EAMCET biology',
    'Intermediate biology Hyderabad',
    'BIE biology online classes',
  ],
  openGraph: {
    title: 'Telangana Intermediate Biology Coaching | NEET + Board Dual Prep',
    description: 'Expert Telangana BIE Biology coaching with integrated NEET preparation.',
    url: `${BASE_URL}/boards/telangana-intermediate`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telangana Intermediate Biology Coaching | NEET + Board Dual Prep',
    description: 'Expert Telangana BIE Biology coaching with integrated NEET preparation.',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/telangana-intermediate`,
  },
}

export default function TelanganaIntermediatePage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="boards/telangana-intermediate"
        pageTitle="Telangana Intermediate Biology Coaching | NEET + Board Dual Prep"
        pageDescription="Expert Telangana BIE Biology coaching with integrated NEET preparation."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
