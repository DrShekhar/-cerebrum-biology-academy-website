import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Tagore International Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Tagore International Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching tagore international',
    'best neet coaching for tagore international students',
    'biology coaching tagore international',
    'neet tutor tagore international',
    'aiims faculty tagore international',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for Tagore International Students',
    description: 'AIIMS-trained NEET biology coaching for Tagore International students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-international-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-international-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching for Tagore International Students | AIIMS Faculty | Cerebrum',
    description:
      'NEET biology coaching for Tagore International Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college sele...',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('tagore-international-delhi')} />
}
