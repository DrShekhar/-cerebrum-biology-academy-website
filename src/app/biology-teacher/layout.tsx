import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Teacher | Best Biology Teacher for NEET & Boards 2025',
  description:
    'Looking for the best biology teacher? Expert AIIMS-trained faculty with 15+ years experience. Structured curriculum, batch learning, proven 98% success rate. Online & offline classes available.',
  keywords: [
    'biology teacher',
    'bio teacher',
    'best biology teacher',
    'best teacher of biology',
    'best teacher for biology',
    'biology best teacher',
    'biology faculty',
    'expert biology teacher',
    'experienced biology teacher',
    'biology teacher online',
  ],
  openGraph: {
    title: 'Best Biology Teacher | AIIMS-Trained Faculty',
    description:
      'Expert biology teaching with structured curriculum and batch learning. 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-teacher',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Teacher',
    description: 'AIIMS-trained faculty with 15+ years experience. 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-teacher',
  },
}

export default function BiologyTeacherLayout({ children }: { children: React.ReactNode }) {
  return children
}
