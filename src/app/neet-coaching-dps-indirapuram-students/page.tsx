import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-indirapuram-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps indirapuram',
    'dps indirapuram ghaziabad neet',
    'biology coaching dps indirapuram students',
    'neet classes near dps indirapuram',
    'after school neet coaching indirapuram',
    'best coaching for dps indirapuram neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-indirapuram-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-indirapuram-students',
  },
}

export default function NEETCoachingDPSIndirapuramPage() {
  return <SchoolLandingPage data={pageData} />
}
