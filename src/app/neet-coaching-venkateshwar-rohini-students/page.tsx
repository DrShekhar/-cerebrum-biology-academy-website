import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-venkateshwar-rohini-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for venkateshwar rohini',
    'venkateshwar international school neet',
    'biology coaching vis rohini students',
    'neet classes near venkateshwar rohini',
    'after school neet coaching sector 18',
    'best coaching for vis rohini neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-venkateshwar-rohini-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-venkateshwar-rohini-students',
  },
}

export default function NEETCoachingVenkateshwarRohiniPage() {
  return <SchoolLandingPage data={pageData} />
}
