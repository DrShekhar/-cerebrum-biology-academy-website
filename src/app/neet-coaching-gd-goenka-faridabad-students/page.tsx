import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-gd-goenka-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for gd goenka faridabad',
    'gd goenka public school faridabad neet',
    'biology coaching gd goenka faridabad students',
    'neet classes near gd goenka faridabad',
    'neet coaching sector 48 faridabad',
    'best coaching for gd goenka faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gd-goenka-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gd-goenka-faridabad-students',
  },
}

export default function NEETCoachingGDGoenkaFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
