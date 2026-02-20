import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps noida',
    'dps noida sector 30 neet',
    'biology coaching dps noida students',
    'neet classes near dps noida',
    'after school neet coaching noida',
    'best coaching for dps noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-noida-students',
  },
}

export default function NEETCoachingDPSNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
