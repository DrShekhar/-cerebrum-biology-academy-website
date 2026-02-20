import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-presidium-ghaziabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for presidium school ghaziabad',
    'presidium indirapuram neet',
    'biology coaching presidium ghaziabad students',
    'neet classes near presidium indirapuram',
    'after school neet coaching presidium',
    'best coaching for presidium ghaziabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-presidium-ghaziabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-presidium-ghaziabad-students',
  },
}

export default function NEETCoachingPresidiumGhaziabadPage() {
  return <SchoolLandingPage data={pageData} />
}
