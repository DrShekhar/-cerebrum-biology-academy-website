import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-sanskriti-school-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for sanskriti school',
    'sanskriti school chanakyapuri neet',
    'biology coaching sanskriti students',
    'neet classes near sanskriti school',
    'hybrid neet coaching south delhi',
    'best coaching for sanskriti school neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sanskriti-school-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sanskriti-school-students',
  },
}

export default function NEETCoachingSanskritiSchoolPage() {
  return <SchoolLandingPage data={pageData} />
}
