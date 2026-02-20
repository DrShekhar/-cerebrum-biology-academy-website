import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-sharda-greater-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for sharda university school greater noida',
    'sharda university school knowledge park neet',
    'biology coaching sharda greater noida students',
    'neet classes near sharda university school',
    'after school neet coaching greater noida',
    'best coaching for sharda greater noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sharda-greater-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sharda-greater-noida-students',
  },
}

export default function NEETCoachingShardaGreaterNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
