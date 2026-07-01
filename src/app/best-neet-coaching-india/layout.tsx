import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in India 2026-27 | NEET Biology Specialist | Cerebrum Biology Academy',
  description:
    'Best NEET coaching in India 2026 — Cerebrum Biology Academy is the only biology-only specialist with 98% qualification rate, 680+ medical college selections, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line curriculum, 1:15-20 batch ratio. Online live across Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, all metros + Tier-2.',
  keywords: [
    'best NEET coaching India',
    'best NEET coaching 2026',
    'top NEET coaching India',
    'NEET biology specialist',
    'NEET coaching online India',
    'AIIMS faculty NEET coaching',
    'Dr Shekhar C Singh NEET',
    'best NEET biology coaching',
    'NEET institute India ranking',
    'NEET coaching Delhi',
    'NEET coaching Mumbai',
    'NEET coaching Bangalore',
    'NEET coaching Hyderabad',
    '98% NEET success rate',
    '680+ medical college selections',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/best-neet-coaching-india' },
  openGraph: {
    title: 'Best NEET Coaching in India 2026-27 | Cerebrum Biology Academy',
    description:
      'Biology-only specialist, 98% qualification rate, AIIMS-trained faculty, NCERT line-by-line. Online live across India.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-india',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best NEET Coaching in India 2026-27 | Cerebrum Biology Academy',
    description: '98% qualification rate, AIIMS faculty, biology-only specialist. NCERT-deep.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
