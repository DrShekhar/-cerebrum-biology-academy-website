import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Previous Year Questions (2019-2024) | Chapter-wise PYQ with Solutions',
  description:
    'Free NEET Biology Previous Year Questions (PYQ) with detailed solutions for 2019-2024. Chapter-wise analysis, year-wise trends, and high-yield topics. Prepared by AIIMS faculty at Cerebrum Biology Academy.',
  keywords: [
    'neet biology previous year questions',
    'neet biology PYQ',
    'neet PYQ with solutions',
    'neet biology previous year papers',
    'neet 2024 biology questions',
    'neet 2023 biology PYQ',
    'chapter wise neet PYQ',
    'neet biology question bank',
    'neet biology solved papers',
    'neet previous year question paper biology',
    'NEET PYQ PDF',
    'NEET biology MCQ previous year',
  ],
  authors: [{ name: 'Cerebrum Biology Academy' }],
  openGraph: {
    type: 'website',
    title: 'NEET Biology Previous Year Questions (2019-2024) | Free PYQ with Solutions',
    description:
      'Practice 500+ NEET Biology PYQs from 2019-2024 with detailed solutions. Chapter-wise analysis reveals high-yield topics. By AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-previous-year-questions',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Biology Previous Year Questions - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology PYQ (2019-2024) | Chapter-wise Solutions',
    description:
      'Free NEET Biology PYQs with solutions. Chapter-wise trends, high-yield topics, and year-wise analysis. By AIIMS faculty.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-previous-year-questions',
  },
}

export default function PYQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
