import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 9 Science Tuition | Biology Coaching Class 9 - Cerebrum',
  description:
    'Best class 9 science tuition with Biology focus. Expert science tutor for class 9 CBSE covering Physics, Chemistry & Biology. Early NEET foundation preparation. Small batches, personalized attention. Book free demo!',
  keywords: [
    'class 9 science tuition',
    'science tuition class 9',
    'class 9 science teacher',
    'best science tutor for class 9',
    'science tutor class 9',
    'class 9 biology tuition',
    'class 9 science coaching',
    'cbse class 9 science tuition',
    'neet foundation class 9',
  ],
  openGraph: {
    title: 'Class 9 Science Tuition | Biology Coaching Class 9 - Cerebrum',
    description:
      'Expert class 9 science tuition with Biology specialization. Build strong foundation in Physics, Chemistry & Biology. Early NEET preparation. Small batches, personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/class-9-science-tuition',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Class 9 Science Tuition',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 9 Science Tuition | Biology Coaching Class 9',
    description:
      'Expert science tuition for class 9 with Biology focus. NEET foundation preparation starts here.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-9-science-tuition',
  },
}

export default function Class9ScienceTuitionLayout({ children }: { children: React.ReactNode }) {
  return children
}
