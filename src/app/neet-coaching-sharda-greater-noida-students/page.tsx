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
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    locale: 'en_IN',
    title: pageData.metaTitle,
    images: [
      { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Image — Cerebrum Biology Academy' },
    ],
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sharda-greater-noida-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sharda-greater-noida-students',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: pageData.metaTitle,
    description: pageData.metaDescription,
  },
}

export default function NEETCoachingShardaGreaterNoidaPage() {
  return <SchoolLandingPage data={pageData} />
}
