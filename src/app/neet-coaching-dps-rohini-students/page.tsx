import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-rohini-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps rohini',
    'dps rohini sector 24 neet',
    'biology coaching dps rohini students',
    'neet classes near dps rohini',
    'after school neet coaching rohini',
    'best coaching for dps rohini neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rohini-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rohini-students',
  },
}

export default function NEETCoachingDPSRohiniPage() {
  return <SchoolLandingPage data={pageData} />
}
