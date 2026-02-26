import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching Institute in Delhi NCR | Cerebrum Biology Academy',
  description:
    'Top-rated NEET coaching institute in Delhi NCR. 4 centers, AIIMS-trained faculty, 98% success rate, 67+ AIIMS selections. Affordable fees, small batches. Join now!',
  openGraph: {
    title: 'Best NEET Coaching Institute in Delhi NCR | Cerebrum Biology Academy',
    description:
      'Top-rated NEET coaching institute in Delhi NCR. 4 centers, AIIMS-trained faculty, 98% success rate, 67+ AIIMS selections. Affordable fees, small batches. Join now!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-institute',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-institute',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
