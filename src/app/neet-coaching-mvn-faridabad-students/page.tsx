import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-mvn-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for mvn faridabad',
    'modern vidya niketan faridabad neet',
    'biology coaching mvn faridabad students',
    'neet classes near mvn faridabad',
    'after school neet coaching sector 17 faridabad',
    'best coaching for mvn faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mvn-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mvn-faridabad-students',
  },
}

export default function NEETCoachingMVNFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
