import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-manav-rachna-faridabad-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for manav rachna faridabad',
    'manav rachna international school faridabad neet',
    'biology coaching manav rachna students',
    'neet classes near manav rachna faridabad',
    'neet coaching sector 46 faridabad',
    'best coaching for manav rachna neet',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-manav-rachna-faridabad-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-manav-rachna-faridabad-students',
  },
}

export default function NEETCoachingManavRachnaFaridabadPage() {
  return <SchoolLandingPage data={pageData} />
}
