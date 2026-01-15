import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'NEET Coaching in Green Park Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for Green Park, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections. Quality matching IIT area standards.',
  keywords: [
    'neet coaching green park',
    'neet coaching green park delhi',
    'medical entrance coaching green park',
    'neet biology tutor green park',
    'neet preparation green park delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in Green Park Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for Green Park, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-green-park-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-green-park-delhi',
  },
}

export default function NEETCoachingGreenParkPage() {
  return (
    <>
      <LocalitySchema
        locality="Green Park"
        slug="neet-coaching-green-park-delhi"
        pageTitle="NEET Coaching in Green Park Delhi"
        pageDescription="Best NEET coaching for Green Park, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
