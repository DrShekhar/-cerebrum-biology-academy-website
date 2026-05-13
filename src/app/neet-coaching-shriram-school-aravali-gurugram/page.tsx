import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Shriram School Aravali Gurugram Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Shriram School Aravali Gurugram Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching shriram school aravali gurugram',
    'best neet coaching for shriram school aravali gurugram students',
    'biology coaching shriram school aravali gurugram',
    'neet tutor shriram school aravali gurugram',
    'aiims faculty shriram school aravali gurugram',
  ],
  openGraph: {
    title: 'NEET Coaching for Shriram School Aravali Gurugram Students',
    description:
      'AIIMS-trained NEET biology coaching for Shriram School Aravali Gurugram students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-shriram-school-aravali-gurugram',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-shriram-school-aravali-gurugram',
  },
}

export default function FeederSchoolPage() {
  return (
    <BestVerticalLanding config={buildNEETFeederSchoolConfig('shriram-school-aravali-gurugram')} />
  )
}
