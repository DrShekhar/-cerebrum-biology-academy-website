import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'NEET Coaching in Vasant Kunj Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for Vasant Kunj, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET Biology coaching with 500+ selections. DPS Vasant Kunj, Sanskriti students welcome.',
  keywords: [
    'neet coaching vasant kunj',
    'neet biology tutor vasant kunj delhi',
    'medical entrance coaching vasant kunj',
    'neet coaching near dps vasant kunj',
    'biology coaching munirka',
    'neet preparation vasant kunj',
    'online neet coaching vasant kunj',
    'best neet tutor vasant kunj',
    'neet classes vasant kunj delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in Vasant Kunj Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for Vasant Kunj, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET Biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vasant-kunj-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vasant-kunj-delhi',
  },
}

export default function NEETCoachingVasantKunjPage() {
  return (
    <>
      <LocalitySchema
        locality="Vasant Kunj"
        slug="neet-coaching-vasant-kunj-delhi"
        pageTitle="NEET Coaching in Vasant Kunj Delhi"
        pageDescription="Best NEET coaching for Vasant Kunj, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET Biology coaching with 500+ selections."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
