import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('neet-coaching-working-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching working students',
    'weekend neet coaching',
    'evening neet classes',
    'neet coaching for job holders',
    'part time neet coaching',
    'neet preparation while working',
    'sunday neet classes',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-working-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-working-students',
  },
}

export default function NEETCoachingWorkingStudentsPage() {
  return <IntentLandingPage data={pageData} />
}
