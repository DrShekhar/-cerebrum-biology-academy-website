import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-modern-school-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for modern school faridabad',
    'modern school faridabad sector 17 neet',
    'biology coaching modern school faridabad students',
    'neet classes near modern school faridabad',
    'after school neet coaching sector 17 faridabad',
    'best coaching for modern school faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-faridabad-students',
  },
}

export default function NEETCoachingModernSchoolFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
