import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-somerville-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for somerville school noida',
    'somerville noida sector 22 neet',
    'biology coaching somerville noida students',
    'neet classes near somerville school noida',
    'after school neet coaching somerville noida',
    'best coaching for somerville noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-somerville-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-somerville-noida-students',
  },
}

export default function NEETCoachingSomervilleNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
