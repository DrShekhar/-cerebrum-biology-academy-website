import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'Biology Tutor in Malviya Nagar Delhi | NEET & CBSE Coaching',
  description:
    'Best Biology tutor for Malviya Nagar, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers personalized online NEET coaching with 500+ selections. Saket, Sheikh Sarai, Panchsheel students welcome.',
  keywords: [
    'biology tutor malviya nagar',
    'neet coaching malviya nagar delhi',
    'biology tutor saket',
    'neet biology tutor sheikh sarai',
    'cbse biology tutor panchsheel enclave',
    'home tutor biology malviya nagar',
    'online biology tutor malviya nagar',
    'best biology teacher malviya nagar',
    'neet coaching near malviya nagar metro',
  ],
  openGraph: {
    title: 'Biology Tutor in Malviya Nagar Delhi | NEET & CBSE Coaching',
    description:
      'Best Biology tutor for Malviya Nagar, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers personalized online NEET coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-malviya-nagar',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-malviya-nagar',
  },
}

export default function BiologyTutorMalviyaNagarPage() {
  return (
    <>
      <LocalitySchema
        locality="Malviya Nagar"
        slug="biology-tutor-malviya-nagar"
        pageTitle="Biology Tutor in Malviya Nagar Delhi"
        pageDescription="Best Biology tutor for Malviya Nagar, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers personalized online NEET coaching with 500+ selections."
        pageType="tutor"
      />
      <PageContent />
    </>
  )
}
