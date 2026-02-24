import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Coaching | Best Coaching for Biology NEET Biology Coaching | Best Coaching for Biology NEET & Boards 2025 Boards 2027',
  description:
    'Join the best biology coaching for NEET & board exams. AIIMS-trained faculty, comprehensive curriculum, proven 98% success rate. Online & offline coaching available.',
  keywords: [
    'biology coaching',
    'coaching for biology',
    'best biology coaching',
    'biology coaching near me',
    'biology coaching classes',
    'neet biology coaching',
    'biology coaching for neet',
    'biology coaching institute',
    'biology coaching centre',
    'online biology coaching',
  ],
  openGraph: {
    title: 'Biology Coaching | AIIMS-Trained Faculty',
    description:
      'Expert biology coaching with structured curriculum and comprehensive study materials.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Coaching',
    description: 'Expert coaching for NEET & boards. 98% success rate, 15+ years experience!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching',
  },
}

export default function BiologyCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
