import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-jaypee-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for jaypee public school noida',
    'jaypee noida sector 128 neet',
    'biology coaching jaypee noida students',
    'neet classes near jaypee public school noida',
    'after school neet coaching jaypee noida',
    'best coaching for jaypee noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-jaypee-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jaypee-noida-students',
  },
}

export default function NEETCoachingJaypeeNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
