import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
  description: 'Compare the best NEET biology coaching institutes in India. Cerebrum vs Allen vs Aakash vs Physics Wallah. AIIMS faculty, small batches, 98% success rate. Book FREE demo.',
  keywords: 'best neet biology coaching, neet biology coaching comparison, cerebrum vs allen, neet coaching fees, best biology coaching for neet, neet biology coaching online',
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
    description: 'Compare the best NEET biology coaching institutes in India. Cerebrum vs Allen vs Aakash vs Physics Wallah.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching',
  },
  openGraph: {
    title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
    description: 'Compare 7 top NEET biology coaching institutes. AIIMS faculty, 10-12 batch size, 98% success. See why students switch to Cerebrum.',
    url: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
