import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 | Pre-NEET Coaching',
  description:
    'NEET foundation coaching for Class 10 with 2-year head start. Board exam focus + NEET prep, AIIMS faculty at Cerebrum Academy. Book a free demo today!',
  keywords: [
    'neet foundation class 10',
    'neet coaching class 10',
    'neet preparation class 10',
    'pre neet coaching class 10',
    'class 10 neet foundation',
    'neet coaching for class 10',
    'neet foundation course class 10',
    'best neet coaching class 10',
    'neet biology class 10',
  ],
  openGraph: {
    title: 'NEET Foundation Class 10 | Pre-NEET Coaching',
    description:
      'Start your NEET journey from Class 10. 2-year head start with board exam focus. Build strong biology foundation with AIIMS-trained faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'NEET Foundation Class 10',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Foundation Class 10 | Pre-NEET Coaching',
    description:
      '2-year head start for NEET success. Pre-NEET coaching for Class 10 with board exam focus.',
    images: ['https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10',
  },
}

export default function NEETFoundationClass10Layout({ children }: { children: React.ReactNode }) {
  return children
}
