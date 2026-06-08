import { Metadata } from 'next'
import { SchoolLandingPage } from '@/components/seo/SchoolLandingPage'
import { getSchoolPageData } from '@/data/school-seo/school-pages-data'

const pageData = getSchoolPageData('neet-coaching-modern-school-students')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'neet coaching for modern school',
    'modern school barakhamba neet',
    'biology coaching modern school students',
    'neet classes connaught place',
    'after school neet coaching central delhi',
    'best coaching for modern school neet',
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
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-modern-school-students',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: pageData.metaTitle,
    description: pageData.metaDescription,
  },
}

export default function NEETCoachingModernSchoolPage() {
  return <SchoolLandingPage data={pageData} />
}
