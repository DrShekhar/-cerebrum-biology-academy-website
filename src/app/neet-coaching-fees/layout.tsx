import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Fees 2027 — Transparent Pricing',
  description:
    'NEET biology coaching fees at Cerebrum Academy: Rs 24,000 to Rs 98,000/year. 3-10x cheaper than Aakash and Allen. AIIMS faculty, small batches. EMI available. No hidden charges.',
  keywords:
    'neet coaching fees, neet biology coaching fees, cerebrum academy fees, neet coaching fees gurugram, affordable neet coaching, neet coaching fee structure',
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Fees 2027 — Transparent Pricing',
    description:
      'NEET biology coaching fees at Cerebrum Academy: Rs 24,000 to Rs 98,000/year. 3-10x cheaper than Aakash and Allen.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fees',
  },
  openGraph: {
    title: 'NEET Coaching Fees 2027 — Transparent Pricing',
    description:
      'Starting Rs 2,500/month. AIIMS faculty, 10-12 batch size. Compare with Aakash, Allen. No hidden fees.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fees',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
