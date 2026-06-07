import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Free NEET Biology Demo Class | Cerebrum Biology Academy',
  description:
    'Book a FREE 45-60 minute NEET Biology demo class with AIIMS-trained Dr. Shekhar C Singh. Experience live online teaching, ask questions, get a personalized study plan. Available for Class 11, 12, dropper, and NRI students worldwide.',
  keywords: [
    'book free NEET demo',
    'NEET biology demo class',
    'free NEET demo class',
    'AIIMS faculty demo',
    'biology demo class free',
    'NEET coaching demo',
    'NEET online demo',
    'Cerebrum free demo',
    'free trial NEET coaching',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/book-demo' },
  openGraph: {
    title: 'Book FREE NEET Biology Demo Class | Cerebrum',
    description:
      'AIIMS-trained Dr. Shekhar C Singh. Live online. Class 11/12/dropper/NRI students. 45-60 min, completely free.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/book-demo',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Book Free NEET Biology Demo | Cerebrum',
    description: 'AIIMS faculty + live online + personalized plan. 45-60 min.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
