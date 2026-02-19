import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps faridabad',
    'dps faridabad sector 19 neet',
    'biology coaching dps faridabad students',
    'neet classes near dps faridabad',
    'after school neet coaching faridabad',
    'best coaching for dps faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-faridabad-students',
  },
}

export default function NEETCoachingDPSFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
