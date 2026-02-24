import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 | Early NEET Preparation',
  description:
    'Start NEET preparation from Class 9 with early foundation coaching. Get a 4-year head start in NEET coaching for Class 9 students. Build strong biology concepts, develop problem-solving skills, and excel in both school and competitive exams.',
  keywords: [
    'neet foundation class 9',
    'neet coaching class 9',
    'neet preparation class 9',
    'early neet coaching',
    'neet foundation course class 9',
    'class 9 neet biology',
    'neet coaching for class 9 students',
    'early neet preparation',
    'neet foundation online class 9',
  ],
  openGraph: {
    title: 'NEET Foundation Class 9 | Early NEET Preparation',
    description:
      'Get a 4-year head start in NEET preparation. NEET foundation coaching for Class 9 students with expert faculty, conceptual learning, and comprehensive curriculum.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'NEET Foundation Class 9',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Foundation Class 9 | Early NEET Preparation',
    description:
      'Start your NEET journey early. 4-year head start with expert coaching for Class 9 students.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9',
  },
}

export default function NEETFoundationClass9Layout({ children }: { children: React.ReactNode }) {
  return children
}
