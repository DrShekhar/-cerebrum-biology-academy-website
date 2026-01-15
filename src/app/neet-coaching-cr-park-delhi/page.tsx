import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'NEET Coaching in CR Park Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for CR Park (Chittaranjan Park), Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections. Join today.',
  keywords: [
    'neet coaching cr park',
    'neet coaching chittaranjan park delhi',
    'medical entrance coaching cr park',
    'neet biology tutor cr park',
    'neet preparation cr park delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in CR Park Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for CR Park (Chittaranjan Park), Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-cr-park-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-cr-park-delhi',
  },
}

export default function NEETCoachingCRParkPage() {
  return (
    <>
      <LocalitySchema
        locality="CR Park"
        slug="neet-coaching-cr-park-delhi"
        pageTitle="NEET Coaching in CR Park Delhi"
        pageDescription="Best NEET coaching for CR Park (Chittaranjan Park), Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
