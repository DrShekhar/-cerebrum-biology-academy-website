import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
  description: 'Compare the best NEET biology coaching institutes in India. Cerebrum vs the largest national NEET chain vs the 2nd-largest national NEET chain vs other online-only platforms. AIIMS faculty, small batches, 98% success rate. Book FREE demo.',
  keywords: 'best neet biology coaching, neet biology coaching comparison, cerebrum vs allen, neet coaching fees, best biology coaching for neet, neet biology coaching online',
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
    description: 'Compare the best NEET biology coaching institutes in India. Cerebrum vs the largest national NEET chain vs the 2nd-largest national NEET chain vs other online-only platforms.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching',
  },
  openGraph: {
    title: 'Best NEET Biology Coaching 2026 — Honest Comparison',
    description: 'Compare 7 top NEET biology coaching institutes. AIIMS faculty, 10-12 batch size, 98% success. See why students switch to Cerebrum.',
    url: 'https://cerebrumbiologyacademy.com/best-neet-biology-coaching',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
