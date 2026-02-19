import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-apeejay-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for apeejay faridabad',
    'apeejay school faridabad neet',
    'biology coaching apeejay faridabad students',
    'neet classes near apeejay faridabad',
    'after school neet coaching sector 15 faridabad',
    'best coaching for apeejay faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-apeejay-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-apeejay-faridabad-students',
  },
}

export default function NEETCoachingApeejayFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
