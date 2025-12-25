import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-bal-bharati-rohini-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for bal bharati rohini',
    'bal bharati public school rohini neet',
    'biology coaching bbp rohini students',
    'neet classes near bal bharati rohini',
    'after school neet coaching rohini',
    'best coaching for bal bharati neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-bal-bharati-rohini-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-bal-bharati-rohini-students',
  },
}

export default function NEETCoachingBalBharatiRohiniPage() {
  return <SchoolLandingPage data={pageData} />
}
