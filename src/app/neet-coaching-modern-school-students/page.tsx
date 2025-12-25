import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-modern-school-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for modern school',
    'modern school barakhamba neet',
    'biology coaching modern school students',
    'neet classes connaught place',
    'after school neet coaching central delhi',
    'best coaching for modern school neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-students',
  },
}

export default function NEETCoachingModernSchoolPage() {
  return <SchoolLandingPage data={pageData} />
}
