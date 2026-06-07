import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Fees 2026-27 — Transparent Pricing',
  description: 'NEET biology coaching fees at Cerebrum Academy: Rs 24,000 to Rs 98,000/year. 3-10x cheaper than the largest national NEET chains. AIIMS faculty, small batches. EMI available. No hidden charges.',
  keywords: 'neet coaching fees, neet biology coaching fees, cerebrum academy fees, neet coaching fees gurugram, affordable neet coaching, neet coaching fee structure',
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Fees 2026-27 — Transparent Pricing',
    description: 'NEET biology coaching fees at Cerebrum Academy: Rs 24,000 to Rs 98,000/year. 3-10x cheaper than the largest national NEET chains.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fees',
  },
  openGraph: {
    title: 'NEET Coaching Fees 2026-27 — Transparent Pricing',
    description: 'Starting Rs 2,500/month. AIIMS faculty, 10-12 batch size. Compare with the largest national NEET chain, the 2nd-largest national NEET chain. No hidden fees.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fees',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
