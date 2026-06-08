import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Amity International Noida Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Amity International Noida Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching amity international noida',
    'best neet coaching for amity international noida students',
    'biology coaching amity international noida',
    'neet tutor amity international noida',
    'aiims faculty amity international noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for Amity International Noida Students',
    description: 'AIIMS-trained NEET biology coaching for Amity International Noida students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-amity-international-noida',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-amity-international-noida',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching for Amity International Noida Students | AIIMS Faculty | Cerebrum',
    description: 'NEET biology coaching for Amity International Noida Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college...',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('amity-international-noida')} />
}
