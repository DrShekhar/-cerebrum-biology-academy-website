import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Fees 2026-27 — Transparent Pricing | Cerebrum Academy',
  description: 'NEET biology coaching fees at Cerebrum Academy: Rs 24,000 to Rs 98,000/year. 3-10x cheaper than Allen/Aakash. AIIMS faculty, small batches. EMI available. No hidden charges.',
  keywords: 'neet coaching fees, neet biology coaching fees, cerebrum academy fees, neet coaching fees gurugram, affordable neet coaching, neet coaching fee structure',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fees',
  },
  openGraph: {
    title: 'NEET Coaching Fees 2026-27 — Transparent Pricing',
    description: 'Starting Rs 2,500/month. AIIMS faculty, 10-12 batch size. Compare with Allen, Aakash. No hidden fees.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fees',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
