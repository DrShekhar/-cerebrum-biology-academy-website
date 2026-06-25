import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare NEET Coaching | Why Cerebrum Biology Academy is Best | Comparison',
  description:
    'Compare Cerebrum Biology Academy with other NEET coaching institutes. See why we offer better results, smaller batches, expert faculty at competitive fees. Make informed choice!',
  keywords:
    'compare NEET coaching, best coaching comparison, NEET institute comparison, coaching fees comparison, Aakash vs Cerebrum, Kota chains like Allen and Resonance vs Cerebrum, coaching comparison',
  openGraph: {
    title: 'Why Cerebrum Biology Academy | Compare & Choose the Best',
    description:
      'Detailed comparison: success rates, faculty, batch sizes, fees, support. See why 15,000+ students chose us over Aakash, Kota chains like Allen and Resonance, Allen.',
    images: ['/og-image.jpg'],
    url: 'https://cerebrumbiologyacademy.com/compare',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare NEET Coaching Institutes',
    description: 'See detailed comparison: success rate, faculty, fees, batch size, support',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/compare',
  },
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
