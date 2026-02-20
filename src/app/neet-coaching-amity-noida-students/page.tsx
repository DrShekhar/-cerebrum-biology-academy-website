import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-amity-noida-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for amity international noida',
    'amity noida sector 44 neet',
    'biology coaching amity noida students',
    'neet classes near amity noida',
    'after school neet coaching amity noida',
    'best coaching for amity noida neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-amity-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-amity-noida-students',
  },
}

export default function NEETCoachingAmityNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
