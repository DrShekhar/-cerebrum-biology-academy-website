import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-greenfields-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for greenfields school faridabad',
    'greenfields school faridabad neet',
    'biology coaching greenfields faridabad students',
    'neet classes near greenfields school faridabad',
    'after school neet coaching sector 19 faridabad',
    'best coaching for greenfields faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-greenfields-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-greenfields-faridabad-students',
  },
}

export default function NEETCoachingGreenfieldsFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
