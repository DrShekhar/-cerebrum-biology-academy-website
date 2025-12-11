import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pre NEET Coaching | Early NEET Preparation Program - Cerebrum Biology Academy',
  description:
    'Best pre NEET coaching for Class 8-10 students. Start NEET preparation before Class 11 with expert faculty. Early NEET coaching builds strong foundation for medical entrance. Book free demo!',
  keywords: [
    'pre neet coaching',
    'pre neet preparation',
    'neet preparation before class 11',
    'early neet coaching',
    'pre neet course',
    'neet foundation for class 8',
    'neet foundation for class 9',
    'neet foundation for class 10',
    'early neet preparation program',
    'pre medical coaching',
    'neet coaching for young students',
    'early start neet',
  ],
  openGraph: {
    title: 'Pre NEET Coaching | Early NEET Preparation Program - Cerebrum',
    description:
      'Start NEET preparation early with our pre-NEET coaching for Class 8-10. Build strong foundation, develop scientific thinking, and get a 4-year head start.',
    url: 'https://cerebrumbiologyacademy.com/pre-neet-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Pre NEET Coaching',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pre NEET Coaching | Early NEET Preparation',
    description:
      'Start NEET journey early. Pre-NEET coaching for Class 8-10 with expert faculty and proven results.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/pre-neet-coaching',
  },
}

export default function PreNEETCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
