import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology MCQ 2026 - Free Practice Questions with Answers',
  description:
    'Free NEET Biology MCQ practice with detailed explanations. 500+ questions covering Botany and Zoology from Class 11 & 12 NCERT. Topic-wise MCQs for NEET 2026 preparation.',
  keywords: [
    'NEET biology MCQ',
    'NEET 2026 MCQ',
    'NEET biology questions',
    'NEET practice questions',
    'biology MCQ for NEET',
    'NEET botany MCQ',
    'NEET zoology MCQ',
    'NEET biology quiz',
    'NCERT biology MCQ',
    'NEET previous year questions',
  ],
  openGraph: {
    title: 'NEET Biology MCQ 2026 - Free Practice Questions',
    description:
      'Free NEET Biology MCQ practice with 500+ questions. Topic-wise questions with detailed explanations for NEET 2026.',
    url: 'https://www.cerebrumbiologyacademy.com/neet-biology-mcq',
    type: 'website',
    images: [
      {
        url: '/images/neet-biology-mcq.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Biology MCQ Practice',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology MCQ 2026 - Free Practice',
    description: 'Practice 500+ NEET Biology MCQs with explanations. Free quiz for NEET 2026 prep.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-biology-mcq',
  },
}

export default function NEETBiologyMCQLayout({ children }: { children: React.ReactNode }) {
  return children
}
