import { Metadata } from 'next'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: 'NEET Coaching for Sanskriti School Students | AIIMS Faculty | Cerebrum',
  description:
    'NEET biology coaching for Sanskriti School Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.',
  keywords: [
    'neet coaching sanskriti school',
    'best neet coaching for sanskriti school students',
    'biology coaching sanskriti school',
    'neet tutor sanskriti school',
    'aiims faculty sanskriti school',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Coaching for Sanskriti School Students',
    description: 'AIIMS-trained NEET biology coaching for Sanskriti School students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sanskriti-school-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sanskriti-school-delhi',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default function FeederSchoolPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="neet-coaching-sanskriti-school-delhi" />
      <BestVerticalLanding config={buildNEETFeederSchoolConfig('sanskriti-school-delhi')} />
    </>
  )
}
