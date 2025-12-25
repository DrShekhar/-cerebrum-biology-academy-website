import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('neet-coaching-with-school')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching with school',
    'after school neet coaching',
    'evening neet classes',
    'neet coaching for school students',
    'part time neet coaching',
    'neet coaching without leaving school',
    'school integrated neet coaching',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-with-school',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-with-school',
  },
}

export default function NEETCoachingWithSchoolPage() {
  return <IntentLandingPage data={pageData} />
}
