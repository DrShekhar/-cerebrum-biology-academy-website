import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 11 Biology Coaching | CBSE + NEET Integrated Programme | Cerebrum Biology Academy',
  description:
    'Class 11 Biology coaching from Cerebrum — integrated CBSE board + NEET preparation. NCERT line-by-line, 22 chapters fully mapped, weekly 1:1 doubt slots, small batches of 15-20. AIIMS-trained Dr. Shekhar C Singh. Foundation building for NEET 2027 attempt. Online live + recordings.',
  keywords: [
    'Class 11 biology coaching',
    'Class 11 NEET biology coaching',
    'Class 11 NCERT biology',
    'CBSE Class 11 biology',
    'Class 11 biology tuition online',
    'Class 11 biology AIIMS faculty',
    'integrated CBSE NEET Class 11',
    'NEET 2027 Class 11 preparation',
    'Class 11 biology dropper foundation',
    'best Class 11 biology teacher',
    '11th biology online classes',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/class-11' },
  openGraph: {
    title: 'Class 11 Biology Coaching | CBSE + NEET Integrated | Cerebrum',
    description:
      'NCERT-deep Class 11 biology with integrated NEET foundation. AIIMS-trained Dr. Shekhar C Singh.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/class-11',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Class 11 Biology Coaching | Cerebrum Biology Academy',
    description: 'CBSE board + NEET 2027 integrated programme. AIIMS faculty.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
