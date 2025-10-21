import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 12 Biology NEET Coaching | Target 2025 Batch | Cerebrum Academy',
  description:
    'Intensive Class 12 Biology coaching for NEET 2025. Complete syllabus, previous year papers, mock tests, 90+ marks guarantee. AIIMS faculty. Limited seats!',
  keywords:
    'Class 12 biology, NEET target batch, Class 12 NEET coaching, biology coaching, NEET 2025, board exam biology, NEET preparation, competitive biology',
  openGraph: {
    title: 'Class 12 Biology NEET Target Batch | Crack NEET 2025',
    description:
      'Final year intensive NEET Biology coaching. 94.2% qualification rate, board exam 90+ guarantee, complete syllabus + previous years. Book your seat now!',
    images: ['/og-images/class-12-biology.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/class-12',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 12 Biology NEET Target Batch 2025 | Cerebrum Academy',
    description: 'Intensive NEET preparation, 90+ board marks guarantee, 94.2% success rate',
    images: ['/og-images/class-12-biology.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/class-12',
  },
}

export default function Class12Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
