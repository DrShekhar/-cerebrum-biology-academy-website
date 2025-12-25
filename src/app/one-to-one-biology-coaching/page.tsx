import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('one-to-one-biology-coaching')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'one to one biology coaching',
    'personal biology tutor',
    'private neet tutor',
    '1:1 biology classes',
    'personalized neet coaching',
    'individual biology tuition',
    'private biology coaching neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/one-to-one-biology-coaching',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/one-to-one-biology-coaching',
  },
}

export default function OneToOneBiologyCoachingPage() {
  return <IntentLandingPage data={pageData} />
}
