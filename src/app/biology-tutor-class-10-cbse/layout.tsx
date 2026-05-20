import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor Class 10 CBSE | Board Exam Biology Coaching',
  description:
    'Best biology tutor for Class 10 CBSE board exam. Complete NCERT coverage — Life Processes, Control & Coordination, Reproduction, Heredity, Our Environment. AIIMS-trained faculty, small batches, board-exam mastery + NEET foundation. Book free demo!',
  keywords: [
    'biology tutor class 10 cbse',
    'cbse class 10 biology tuition',
    'class 10 cbse biology teacher',
    'best biology tutor for cbse class 10',
    'cbse class 10 science biology',
    'class 10 biology coaching cbse',
    'ncert biology class 10 tutor',
    'cbse class 10 board exam biology',
    'class 10 cbse biology home tuition',
    'online biology tutor class 10 cbse',
    'class 10 biology life processes tutor',
    'class 10 biology control coordination tutor',
    'class 10 biology heredity tutor',
    'class 10 cbse board exam preparation biology',
    'class 10 to neet foundation biology',
  ],
  openGraph: {
    title: 'Biology Tutor Class 10 CBSE | Expert Board Exam Biology Tuition',
    description:
      'Class 10 CBSE Biology coaching — NCERT-focused, board-exam mastery, conceptual learning, NEET foundation. Small batches with AIIMS-trained faculty.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-class-10-cbse',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Biology Tutor Class 10 CBSE',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor Class 10 CBSE',
    description:
      'Expert CBSE Class 10 biology coaching. NCERT-focused, board exam preparation, NEET foundation.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-class-10-cbse',
  },
}

export default function BiologyTutorClass10CBSELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
