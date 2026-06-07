import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Early NEET Preparation Class 8-10 | Foundation Biology Coaching | Cerebrum',
  description:
    'Early NEET preparation for Class 8, 9, 10 students — biology foundation programme building NCERT depth, scientific reasoning, MCQ technique. AIIMS-trained Dr. Shekhar C Singh, Olympiad-aligned syllabus (NSEB / INBO bridge), 4-year glide path to NEET 2028-2030.',
  keywords: [
    'early NEET preparation',
    'Class 8 NEET foundation',
    'Class 9 NEET foundation',
    'Class 10 NEET foundation',
    'NEET 2028 preparation',
    'NEET 2029 preparation',
    'NEET 2030 preparation',
    'early biology coaching NEET',
    'foundation biology Class 8 9 10',
    'NSEB foundation Cerebrum',
    'INBO foundation Class 10',
    'olympiad-aligned NEET prep',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/early-neet-preparation' },
  openGraph: {
    title: 'Early NEET Preparation Class 8-10 | Cerebrum Biology Academy',
    description:
      'Foundation biology for Class 8-10 with NEET 2028-2030 + Olympiad pathway. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/early-neet-preparation',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Early NEET Preparation Class 8-10 | Cerebrum',
    description: 'Foundation biology + Olympiad-aligned syllabus.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
