import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Suncity School Gurugram Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Suncity School Gurugram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching suncity school gurugram',
    'best neet coaching for suncity school gurugram students',
    'biology coaching suncity school gurugram',
    'neet tutor suncity school gurugram',
    'aiims faculty suncity school gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for Suncity School Gurugram Students',
    description: 'AIIMS-trained NEET biology coaching for Suncity School Gurugram students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-suncity-school-gurugram',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-suncity-school-gurugram',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching for Suncity School Gurugram Students | AIIMS Faculty | Cerebrum',
    description: 'NEET biology coaching for Suncity School Gurugram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college s...',
  },
}

export default function FeederSchoolPage() {
  return <BestVerticalLanding config={buildNEETFeederSchoolConfig('suncity-school-gurugram')} />
}
