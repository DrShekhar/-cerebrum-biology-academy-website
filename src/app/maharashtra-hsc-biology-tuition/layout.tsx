import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maharashtra HSC Biology Tuition | MHT-CET & NEET Coaching',
  description:
    'Expert Maharashtra HSC biology tuition for board exams & MHT-CET/NEET preparation. State board aligned teaching with competitive exam focus. Online classes available!',
  openGraph: {
    title: 'Maharashtra HSC Biology Tuition | MHT-CET & NEET Coaching',
    description:
      'Expert Maharashtra HSC biology tuition for board exams & MHT-CET/NEET preparation. State board aligned teaching with competitive exam focus. Online classes available!',
    url: 'https://cerebrumbiologyacademy.com/maharashtra-hsc-biology-tuition',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/maharashtra-hsc-biology-tuition',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
