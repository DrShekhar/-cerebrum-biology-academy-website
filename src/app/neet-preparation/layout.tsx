import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Preparation 2027 | Complete NEET Course & Study Plan',
  description:
    "Start your NEET preparation with India's best coaching. Complete NEET course covering Biology, Physics, Chemistry. Expert guidance, mock tests, study material included!",
  keywords: [
    'NEET preparation',
    'NEET preparation 2027',
    'NEET course',
    'NEET preparation tips',
    'NEET study plan',
    'how to prepare for NEET',
    'NEET preparation online',
    'best NEET preparation',
    'NEET preparation strategy',
    'complete NEET course',
  ],
  openGraph: {
    title: 'NEET Preparation 2027 | Complete NEET Course & Study Plan',
    description:
      'Complete NEET preparation course with expert guidance, mock tests, and study material. Start your NEET journey today!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-preparation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Preparation 2027',
    description:
      'Complete NEET preparation course with expert guidance. Start your NEET journey today!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-preparation',
  },
}

export default function NeetPreparationLayout({ children }: { children: React.ReactNode }) {
  return children
}
