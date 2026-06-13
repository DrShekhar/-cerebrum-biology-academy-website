import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Class 10 NEET Foundation Biology | CBSE Board + Early NEET Prep | Cerebrum Biology Academy',
  description:
    'Class 10 NEET Foundation Biology programme — integrated CBSE board prep + early NEET 2028 / 2029 head start. NCERT depth, NSEB / INBO olympiad pathway entry, scientific reasoning + MCQ technique. AIIMS-trained Dr. Shekhar C Singh, small batches, weekly 1:1 doubt slots.',
  keywords: [
    'Class 10 NEET foundation',
    'Class 10 biology coaching',
    '10th biology online classes',
    'CBSE Class 10 biology',
    'NEET 2028 Class 10 prep',
    'NEET 2029 Class 10 prep',
    'Class 10 NSEB foundation',
    'Class 10 INBO bridge',
    'Class 10 biology olympiad',
    'early NEET Class 10',
    'best Class 10 biology teacher',
    'Class 10 NCERT biology',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/class-10-foundation' },
  openGraph: {
    title: 'Class 10 NEET Foundation Biology | Cerebrum',
    description:
      'CBSE + early NEET head start + NSEB / INBO olympiad pathway entry. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/class-10-foundation',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Class 10 NEET Foundation Biology | Cerebrum',
    description: 'CBSE + early NEET + olympiad pathway.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
