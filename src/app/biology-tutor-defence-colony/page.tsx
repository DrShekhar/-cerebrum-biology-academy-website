import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'

export const metadata: Metadata = {
  title: 'Biology Tutor in Defence Colony Delhi | NEET & CBSE Coaching',
  description:
    'Best Biology tutor for Defence Colony, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 67+ AIIMS selections. Transfer-friendly for defence families. Expert NEET & CBSE Biology preparation.',
  keywords: [
    'biology tutor defence colony',
    'neet coaching defence colony delhi',
    'biology tutor south delhi',
    'neet biology tutor lajpat nagar',
    'cbse biology tutor jangpura',
    'afmc preparation defence colony',
    'online biology tutor south extension',
    'best biology teacher defence colony',
    'neet coaching near defence colony metro',
  ],
  openGraph: {
    title: 'Biology Tutor in Defence Colony Delhi | NEET & CBSE Coaching',
    description:
      'Best Biology tutor for Defence Colony, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 67+ AIIMS selections. Transfer-friendly for defence families.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-defence-colony',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-defence-colony',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function BiologyTutorDefenceColonyPage() {
  return (
    <>
      <NEETSchemaStack
        pageUrl="https://cerebrumbiologyacademy.com/biology-tutor-defence-colony"
        pageName="Biology Tutor in Defence Colony"
        parentHub={{ name: 'NEET Biology Coaching India', url: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-india' }}
        personKnowsAbout={['NEET Defence Colony', 'NEET Biology Defence Colony', 'Medical entrance coaching Defence Colony']}
      />
      <LocalitySchema
        locality="Defence Colony"
        slug="biology-tutor-defence-colony"
        pageTitle="Biology Tutor in Defence Colony Delhi"
        pageDescription="Best Biology tutor for Defence Colony, Delhi. AIIMS alumnus Dr. Shekhar C Singh offers online NEET coaching with 67+ AIIMS selections."
        pageType="tutor"
      />
      <PageContent />
    </>
  )
}
