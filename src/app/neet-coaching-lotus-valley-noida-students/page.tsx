import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-lotus-valley-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for lotus valley international noida',
    'lotus valley noida sector 126 neet',
    'biology coaching lotus valley students',
    'neet classes near lotus valley noida',
    'after school neet coaching lotus valley',
    'best coaching for lotus valley noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-lotus-valley-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-lotus-valley-noida-students',
  },
}

export default function NEETCoachingLotusValleyNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
