import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Dropper Batch 2025 | One Year Intensive Biology Program | Cerebrum',
  description:
    "Specialized NEET dropper batch for 2025. Complete Biology syllabus in 10 months, rank improvement strategies, 98% success rate. Join India's best NEET repeater program!",
  keywords:
    'NEET dropper batch, NEET repeater, one year NEET coaching, NEET second attempt, dropper biology coaching, NEET 2025 preparation, rank improvement NEET',
  openGraph: {
    title: 'NEET Dropper Batch 2025 | Transform Your Rank in 10 Months',
    description:
      'Intensive 10-month program for NEET droppers. 98% qualification rate, personalized mentoring, rank improvement guarantee. Limited seats available!',
    images: ['/og-images/neet-dropper-batch.jpg'],
    url: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Dropper Batch 2025 | Cerebrum Biology Academy',
    description:
      'One year intensive program, 98% success, rank improvement strategies, AIIMS faculty',
    images: ['/og-images/neet-dropper-batch.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
  },
}

export default function NEETDropperLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
