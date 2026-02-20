import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-greater-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps greater noida',
    'dps greater noida sector 132 neet',
    'biology coaching dps greater noida students',
    'neet classes near dps greater noida',
    'after school neet coaching greater noida',
    'best coaching for dps greater noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-greater-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-greater-noida-students',
  },
}

export default function NEETCoachingDPSGreaterNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
