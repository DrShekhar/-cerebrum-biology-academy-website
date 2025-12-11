import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor Class 9 CBSE | CBSE Biology Tuition - Cerebrum',
  description:
    'Expert biology tutor for Class 9 CBSE. Complete NCERT coverage, board exam preparation, conceptual clarity. Small batches, personalized attention. Build strong foundation for Class 10. Book free demo!',
  keywords: [
    'biology tutor class 9 cbse',
    'cbse class 9 biology tuition',
    'class 9 cbse biology teacher',
    'best biology tutor for cbse class 9',
    'cbse class 9 science biology',
    'class 9 biology coaching cbse',
    'ncert biology class 9 tutor',
    'cbse class 9 biology home tuition',
    'online biology tutor class 9 cbse',
  ],
  openGraph: {
    title: 'Biology Tutor Class 9 CBSE | Expert CBSE Biology Tuition',
    description:
      'Build strong biology foundation for CBSE Class 9. NCERT-focused teaching, board exam preparation, conceptual learning. Small batches with personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-class-9-cbse',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Biology Tutor Class 9 CBSE',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor Class 9 CBSE | Cerebrum Biology Academy',
    description:
      'Expert CBSE Class 9 biology coaching. NCERT-focused, board exam preparation, conceptual clarity.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-class-9-cbse',
  },
}

export default function BiologyTutorClass9CBSELayout({ children }: { children: React.ReactNode }) {
  return children
}
