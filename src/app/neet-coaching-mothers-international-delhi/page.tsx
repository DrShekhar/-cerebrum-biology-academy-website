import { Metadata } from 'next'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildNEETFeederSchoolConfig } from '@/data/neet-feeder-schools'

export const metadata: Metadata = {
  title: "NEET Coaching for Mother's International Students | AIIMS Faculty | Cerebrum",
  description:
    "NEET biology coaching for Mother's International Class 11–12 students. AIIMS-trained Dr. Shekhar C Singh, small batches of 15–20, NCERT line-by-line, weekly 1:1 doubt slots. 680+ medical college selections.",
  keywords: [
    'neet coaching mothers international',
    'best neet coaching for mothers international students',
    'biology coaching mothers international delhi',
    'neet tutor mothers international',
    'aiims faculty mothers international',
  ],
  openGraph: {
    locale: 'en_IN',
    title: "NEET Coaching for Mother's International Students",
    description: "AIIMS-trained NEET biology coaching for Mother's International students.",
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mothers-international-delhi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mothers-international-delhi',
  },
}

export default function FeederSchoolPage() {
  return (
    <>
      <DelhiAreaSchema pageSlug="neet-coaching-mothers-international-delhi" />
      <BestVerticalLanding config={buildNEETFeederSchoolConfig('mothers-international-delhi')} />
    </>
  )
}
