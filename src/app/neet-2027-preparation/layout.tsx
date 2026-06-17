import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET 2027 Preparation Strategy | Biology Coaching Roadmap | Cerebrum',
  description:
    'Complete NEET 2027 preparation strategy from AIIMS-trained Dr. Shekhar C Singh — biology roadmap, NCERT line-by-line plan, weekly mock test cadence, Class 11 + Class 12 chapter weightage analysis, last-3-months revision strategy. 98% qualification rate.',
  keywords: [
    'NEET 2027 preparation',
    'NEET 2027 strategy',
    'NEET 2027 biology preparation',
    'NEET 2027 study plan',
    'NEET 2027 syllabus',
    'NEET 2027 dropper plan',
    'NEET 2027 Class 11 12 plan',
    'NEET 2027 mock test schedule',
    'NEET 2027 revision plan',
    'NEET 2027 AIIMS preparation',
    'how to prepare NEET 2027',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-2027-preparation' },
  openGraph: {
    title: 'NEET 2027 Preparation Strategy | Cerebrum Biology Academy',
    description:
      'NCERT-deep biology roadmap from AIIMS faculty. 98% qualification, 680+ medical college selections.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-2027-preparation',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET 2027 Preparation Strategy | Cerebrum',
    description: 'Full roadmap + biology plan + mock cadence.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
