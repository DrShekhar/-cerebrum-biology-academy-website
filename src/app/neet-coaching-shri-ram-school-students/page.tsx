import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-shri-ram-school-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for shri ram school',
    'the shri ram school neet preparation',
    'biology coaching tsrs aravalli students',
    'neet classes for ib students gurgaon',
    'elite neet coaching gurgaon',
    'best coaching for shri ram school neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-shri-ram-school-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-shri-ram-school-students',
  },
}

export default function NEETCoachingShriRamSchoolPage() {
  return <SchoolLandingPage data={pageData} />
}
