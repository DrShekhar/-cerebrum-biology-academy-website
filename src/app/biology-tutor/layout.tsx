import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor | Best Biology Tutoring in India 2025',
  description:
    'Looking for a biology tutor? Get expert biology tutoring from AIIMS-trained faculty. 98% success rate, personalized attention, small batches. Best biology tutor for NEET, CBSE, ICSE.',
  keywords: [
    'biology tutor',
    'tutor bio',
    'best biology tutor',
    'biology tutoring',
    'biology teacher',
    'online biology tutor',
    'biology tutor near me',
    'NEET biology tutor',
    'CBSE biology tutor',
    'biology tutor India',
  ],
  openGraph: {
    title: 'Biology Tutor | Best Biology Tutoring in India 2025',
    description:
      'Expert biology tutoring from AIIMS-trained faculty. 98% success rate, personalized attention. Best biology tutor for NEET, CBSE, ICSE preparation.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/biology-tutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor | Best Biology Tutoring in India',
    description: 'Expert biology tutoring from AIIMS-trained faculty. 98% success rate!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/biology-tutor',
  },
}

export default function BiologyTutorLayout({ children }: { children: React.ReactNode }) {
  return children
}
