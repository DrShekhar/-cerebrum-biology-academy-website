import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-pathways-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for pathways world school noida',
    'pathways noida sector 100 neet',
    'biology coaching pathways noida students',
    'neet classes near pathways world school noida',
    'after school neet coaching pathways noida',
    'best coaching for pathways noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pathways-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pathways-noida-students',
  },
}

export default function NEETCoachingPathwaysNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
