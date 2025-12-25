import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-gurgaon-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps gurgaon',
    'dps gurgaon sector 45 neet',
    'biology coaching dps gurgaon students',
    'neet classes near dps gurgaon',
    'after school neet coaching sector 51',
    'best coaching for dps gurgaon neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-gurgaon-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-gurgaon-students',
  },
}

export default function NEETCoachingDPSGurgaonPage() {
  return <SchoolLandingPage data={pageData} />
}
