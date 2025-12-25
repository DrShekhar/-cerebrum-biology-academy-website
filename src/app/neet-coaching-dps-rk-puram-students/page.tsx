import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-rk-puram-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps rk puram',
    'dps rk puram neet preparation',
    'biology coaching dps rk puram students',
    'neet classes near dps rk puram',
    'after school neet coaching south delhi',
    'best coaching for dps students neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rk-puram-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-rk-puram-students',
  },
}

export default function NEETCoachingDPSRKPuramPage() {
  return <SchoolLandingPage data={pageData} />
}
