import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'

const pageData = getSchoolPageData('neet-coaching-amity-gurgaon-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for amity gurgaon',
    'amity international gurgaon neet',
    'biology coaching amity sector 46',
    'neet classes near amity gurgaon',
    'after school neet coaching gurgaon',
    'best coaching for amity students neet',
  ],
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    locale: 'en_IN',
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-amity-gurgaon-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-amity-gurgaon-students',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: pageData.metaTitle,
    description: pageData.metaDescription,
  },
}

export default function NEETCoachingAmityGurgaonPage() {
  return (
    <>
      <GurgaonGurugramAreaSchema
        spelling="gurgaon"
        pageSlug="neet-coaching-amity-gurgaon-students"
        subArea="Amity School Gurgaon"
      />
      <SchoolLandingPage data={pageData} />
    </>
  )
}
