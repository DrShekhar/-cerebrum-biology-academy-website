import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Foundation Course | Class 8-10 Biology Prep | Cerebrum Biology Academy',
  description:
    'NEET Foundation course for Class 8, 9, 10 students — biology fundamentals + scientific reasoning + MCQ technique, structured 4-year glide path to NEET 2028 / 2029 / 2030. AIIMS-trained Dr. Shekhar C Singh leads. NSEB + INBO olympiad pathway entry for ambitious students. Small batches, weekly 1:1 doubt slots.',
  keywords: [
    'NEET foundation course',
    'Class 8 NEET foundation',
    'Class 9 NEET foundation',
    'Class 10 NEET foundation',
    'NEET 4 year preparation',
    'early NEET preparation',
    'NEET 2028 foundation',
    'NEET 2029 foundation',
    'NEET 2030 foundation',
    'foundation biology coaching',
    'NSEB foundation Class 9 10',
    'INBO foundation entry',
    'best NEET foundation Cerebrum',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-course' },
  openGraph: {
    title: 'NEET Foundation Course | Class 8-10 | Cerebrum',
    description:
      '4-year glide path to NEET 2028-2030 + olympiad pathway. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-course',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Course | Cerebrum',
    description: '4-year glide path + olympiad pathway.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
