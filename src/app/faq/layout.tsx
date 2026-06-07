import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | NEET Biology Coaching, IB, AP, USABO Questions Answered | Cerebrum Biology Academy',
  description:
    'Frequently asked questions about Cerebrum Biology Academy — NEET coaching fees, batch schedules, AIIMS faculty, NRI quota guidance, IB / AP / USABO / IBO programmes, demo class booking, online vs offline, time-zone batches for overseas students, dropper / repeater eligibility.',
  keywords: [
    'Cerebrum FAQ',
    'NEET coaching FAQ',
    'NEET biology FAQ',
    'NRI quota questions',
    'IB Biology coaching FAQ',
    'AP Biology coaching FAQ',
    'USABO preparation FAQ',
    'NEET dropper FAQ',
    'Cerebrum fees FAQ',
    'biology demo class FAQ',
    'online NEET coaching FAQ',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/faq' },
  openGraph: {
    title: 'FAQ | Cerebrum Biology Academy',
    description:
      'Common questions about NEET, IB, AP, USABO, IBO biology coaching, fees, batches, faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/faq',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'FAQ | Cerebrum Biology Academy',
    description: 'NEET, IB, AP, USABO biology coaching FAQ.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
