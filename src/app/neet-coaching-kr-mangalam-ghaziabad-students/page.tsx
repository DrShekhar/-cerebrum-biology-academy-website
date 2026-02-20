import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-kr-mangalam-ghaziabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for kr mangalam ghaziabad',
    'kr mangalam world school vaishali neet',
    'biology coaching kr mangalam students',
    'neet classes near kr mangalam vaishali',
    'after school neet coaching vaishali ghaziabad',
    'best coaching for kr mangalam neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kr-mangalam-ghaziabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kr-mangalam-ghaziabad-students',
  },
}

export default function NEETCoachingKRMangalamGhaziabadPage() {
  return <SchoolLandingPage data={pageData} />
}
