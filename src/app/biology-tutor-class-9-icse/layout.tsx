import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor Class 9 ICSE | ICSE Biology Tuition',
  description:
    'Expert biology tutor for ICSE Class 9 with personalized attention. Complete syllabus coverage, board exam preparation, practical training. Build strong foundation for Class 10. Book free demo!',
  keywords: [
    'biology tutor class 9 icse',
    'icse class 9 biology tuition',
    'class 9 icse biology teacher',
    'best biology tutor for icse class 9',
    'icse biology coaching class 9',
    'class 9 icse biology home tutor',
    'icse class 9 biology online tuition',
    'biology teacher for icse class 9',
    'icse class 9 biology preparation',
  ],
  openGraph: {
    title: 'Biology Tutor Class 9 ICSE | Expert ICSE Biology Tuition',
    description:
      'Expert biology tutor for ICSE Class 9 students. Complete syllabus coverage, board exam preparation, practical training. Small batches for personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-class-9-icse',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Biology Tutor Class 9 ICSE',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor Class 9 ICSE',
    description:
      'Expert ICSE Class 9 biology tuition with complete syllabus coverage and board exam preparation.',
    images: ['https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-class-9-icse',
  },
}

export default function BiologyTutorClass9ICSELayout({ children }: { children: React.ReactNode }) {
  return children
}
