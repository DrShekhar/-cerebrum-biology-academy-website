import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-mris-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for mris faridabad',
    'mris sector 14 faridabad neet',
    'biology coaching mris faridabad students',
    'neet classes near mris faridabad',
    'after school neet coaching sector 14 faridabad',
    'best coaching for mris faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mris-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mris-faridabad-students',
  },
}

export default function NEETCoachingMRISFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
