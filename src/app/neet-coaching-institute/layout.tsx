import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching Institute Near Me | Top NEET Institute in India',
  description:
    'Looking for the best NEET coaching institute? Cerebrum Biology Academy - 15+ years experience, AIIMS trained faculty, 98% success rate. Best institute for NEET preparation!',
  keywords: [
    'NEET coaching institute',
    'best NEET coaching institute',
    'best institute for NEET',
    'NEET institute near me',
    'best NEET institute near me',
    'NEET coaching institute near me',
    'top NEET institute in India',
    'best biology institute for NEET',
    'NEET academy',
    'NEET academy near me',
  ],
  openGraph: {
    title: 'Best NEET Coaching Institute Near Me | Top NEET Institute in India',
    description:
      'Best NEET coaching institute with 15+ years experience, AIIMS trained faculty, 98% success rate. Join the top institute for NEET preparation!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/neet-coaching-institute',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching Institute Near Me',
    description: 'Best NEET coaching institute with 15+ years experience. 98% success rate!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-coaching-institute',
  },
}

export default function NeetCoachingInstituteLayout({ children }: { children: React.ReactNode }) {
  return children
}
