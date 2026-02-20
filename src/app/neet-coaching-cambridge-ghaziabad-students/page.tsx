import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-cambridge-ghaziabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for cambridge school ghaziabad',
    'cambridge school indirapuram neet',
    'biology coaching cambridge ghaziabad students',
    'neet classes near cambridge school indirapuram',
    'after school neet coaching ghaziabad',
    'best coaching for cambridge ghaziabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-cambridge-ghaziabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-cambridge-ghaziabad-students',
  },
}

export default function NEETCoachingCambridgeGhaziabadPage() {
  return <SchoolLandingPage data={pageData} />
}
