import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('biology-coaching-cbse-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'biology coaching cbse students',
    'cbse biology tuition',
    'class 11 biology coaching',
    'class 12 biology coaching',
    'cbse neet integrated coaching',
    'board exam biology preparation',
    'ncert biology coaching',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-cbse-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-cbse-students',
  },
}

export default function BiologyCoachingCBSEStudentsPage() {
  return <IntentLandingPage data={pageData} />
}
