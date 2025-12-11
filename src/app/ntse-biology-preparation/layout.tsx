import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTSE Biology Preparation | NTSE Science Coaching - Cerebrum Biology Academy',
  description:
    'Expert NTSE biology preparation for SAT exam. Complete NTSE science coaching with biology topics, MCQ practice, mock tests. Master life science for NTSE Stage 1 & 2. Join now!',
  keywords: [
    'ntse biology preparation',
    'ntse biology',
    'biology for ntse',
    'ntse science preparation',
    'ntse sat biology',
    'ntse life science',
    'ntse biology syllabus',
    'ntse biology questions',
    'ntse biology mock test',
    'ntse stage 1 biology',
  ],
  openGraph: {
    title: 'NTSE Biology Preparation | NTSE Science Coaching',
    description:
      'Complete NTSE biology preparation for SAT exam. Expert coaching for life science section with MCQ practice, mock tests, and strategy.',
    url: 'https://cerebrumbiologyacademy.com/ntse-biology-preparation',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'NTSE Biology Preparation',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NTSE Biology Preparation | Cerebrum Biology Academy',
    description:
      'Master NTSE biology section with expert coaching. Complete SAT life science preparation with MCQs and mock tests.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ntse-biology-preparation',
  },
}

export default function NTSEBiologyPreparationLayout({ children }: { children: React.ReactNode }) {
  return children
}
