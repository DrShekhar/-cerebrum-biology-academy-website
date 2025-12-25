import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('neet-dropper-crash-course-2025')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet dropper batch 2025',
    'neet crash course 2025',
    'neet repeater batch delhi',
    'neet dropper coaching',
    'neet 2025 preparation',
    'one year neet course',
    'neet long term course 2025',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-dropper-crash-course-2025',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-dropper-crash-course-2025',
  },
}

export default function NEETDropperCrashCourse2025Page() {
  return <IntentLandingPage data={pageData} />
}
