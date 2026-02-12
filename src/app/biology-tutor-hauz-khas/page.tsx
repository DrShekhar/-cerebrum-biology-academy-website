import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'Biology Tutor in Hauz Khas Delhi | NEET & CBSE Coaching',
  description:
    'Best Biology tutor for Hauz Khas, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 67+ AIIMS selections. Near IIT Delhi, Green Park, SDA students welcome.',
  keywords: [
    'biology tutor hauz khas',
    'neet coaching hauz khas delhi',
    'biology tutor green park',
    'neet biology tutor sda',
    'cbse biology tutor safdarjung',
    'biology coaching near iit delhi',
    'online biology tutor hauz khas',
    'best biology teacher hauz khas',
    'neet coaching near green park metro',
  ],
  openGraph: {
    title: 'Biology Tutor in Hauz Khas Delhi | NEET & CBSE Coaching',
    description:
      'Best Biology tutor for Hauz Khas, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 67+ AIIMS selections. Near IIT Delhi area.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-hauz-khas',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-hauz-khas',
  },
}

export default function BiologyTutorHauzKhasPage() {
  return (
    <>
      <LocalitySchema
        locality="Hauz Khas"
        slug="biology-tutor-hauz-khas"
        pageTitle="Biology Tutor in Hauz Khas Delhi"
        pageDescription="Best Biology tutor for Hauz Khas, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 67+ AIIMS selections."
        pageType="tutor"
      />
      <PageContent />
    </>
  )
}
