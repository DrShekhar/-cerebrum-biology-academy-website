import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-aggarwal-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for aggarwal public school faridabad',
    'aggarwal public school nit faridabad neet',
    'biology coaching aggarwal public school students',
    'neet classes near aggarwal public school faridabad',
    'neet coaching nit faridabad',
    'best coaching for aggarwal public school neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-aggarwal-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-aggarwal-faridabad-students',
  },
}

export default function NEETCoachingAggarwalFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
