import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-gd-goenka-ghaziabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for gd goenka ghaziabad',
    'gd goenka indirapuram neet',
    'biology coaching gd goenka ghaziabad students',
    'neet classes near gd goenka indirapuram',
    'after school neet coaching gd goenka',
    'best coaching for gd goenka ghaziabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gd-goenka-ghaziabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gd-goenka-ghaziabad-students',
  },
}

export default function NEETCoachingGDGoenkaGhaziabadPage() {
  return <SchoolLandingPage data={pageData} />
}
