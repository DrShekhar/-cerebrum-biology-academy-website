import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-ryan-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for ryan international noida',
    'ryan noida sector 39 neet',
    'biology coaching ryan noida students',
    'neet classes near ryan international noida',
    'after school neet coaching ryan noida',
    'best coaching for ryan noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ryan-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ryan-noida-students',
  },
}

export default function NEETCoachingRyanNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
