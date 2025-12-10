import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in India 2025 | Top Rated Biology Classes',
  description:
    'Looking for the best NEET coaching? Cerebrum Biology Academy - 98% success rate, AIIMS trained faculty, 15,000+ selections. Best coaching for NEET with proven results!',
  keywords: [
    'best NEET coaching',
    'best coaching for NEET',
    'best NEET coaching centre',
    'best NEET coaching near me',
    'top NEET coaching in India',
    'best biology coaching for NEET',
    'best NEET coaching institute',
    'NEET coaching with best results',
    'best online NEET coaching',
    'best NEET coaching 2025',
  ],
  openGraph: {
    title: 'Best NEET Coaching in India 2025 | Top Rated Biology Classes',
    description:
      "Best NEET coaching with 98% success rate, AIIMS trained faculty, 15,000+ selections. Join India's top-rated NEET coaching institute.",
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/best-neet-coaching',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in India 2025',
    description: 'Best NEET coaching with 98% success rate. AIIMS trained faculty, proven results!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/best-neet-coaching',
  },
}

export default function BestNeetCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
