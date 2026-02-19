import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dav-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dav faridabad',
    'dav public school faridabad neet',
    'biology coaching dav faridabad students',
    'neet classes near dav faridabad',
    'after school neet coaching sector 14 faridabad',
    'best coaching for dav faridabad neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dav-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dav-faridabad-students',
  },
}

export default function NEETCoachingDAVFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
