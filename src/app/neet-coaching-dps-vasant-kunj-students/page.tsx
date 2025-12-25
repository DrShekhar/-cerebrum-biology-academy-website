import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-dps-vasant-kunj-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for dps vasant kunj',
    'dps vasant kunj neet preparation',
    'biology coaching dps vk students',
    'neet classes near vasant kunj',
    'weekend neet coaching south delhi',
    'best coaching for dps vasant kunj',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-vasant-kunj-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dps-vasant-kunj-students',
  },
}

export default function NEETCoachingDPSVasantKunjPage() {
  return <SchoolLandingPage data={pageData} />
}
