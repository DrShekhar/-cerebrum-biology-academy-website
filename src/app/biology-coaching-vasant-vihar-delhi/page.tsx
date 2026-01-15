import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'Biology Coaching in Vasant Vihar Delhi | NEET & IB Biology Tutor',
  description:
    'Best Biology coaching for Vasant Vihar, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET & IB Biology coaching with 500+ selections. International school students welcome.',
  keywords: [
    'biology coaching vasant vihar',
    'neet coaching vasant vihar delhi',
    'ib biology tutor vasant vihar',
    'biology tutor diplomatic enclave',
    'international school biology coaching',
    'igcse biology tutor delhi',
    'online biology tutor vasant vihar',
    'best biology teacher vasant vihar',
    'neet coaching near american embassy school',
  ],
  openGraph: {
    title: 'Biology Coaching in Vasant Vihar Delhi | NEET & IB Biology Tutor',
    description:
      'Best Biology coaching for Vasant Vihar, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET & IB Biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-vihar-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-vasant-vihar-delhi',
  },
}

export default function BiologyCoachingVasantViharPage() {
  return (
    <>
      <LocalitySchema
        locality="Vasant Vihar"
        slug="biology-coaching-vasant-vihar-delhi"
        pageTitle="Biology Coaching in Vasant Vihar Delhi"
        pageDescription="Best Biology coaching for Vasant Vihar, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET & IB Biology coaching with 500+ selections."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
