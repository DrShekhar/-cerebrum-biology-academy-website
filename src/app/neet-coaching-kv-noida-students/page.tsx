import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-kv-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for kendriya vidyalaya noida',
    'kv noida sector 24 neet',
    'biology coaching kv noida students',
    'neet classes near kendriya vidyalaya noida',
    'after school neet coaching kv noida',
    'best coaching for kv noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kv-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kv-noida-students',
  },
}

export default function NEETCoachingKVNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
