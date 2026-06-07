import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching India | Biology-Only Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching India — biology-only specialist institute with 98% qualification rate, 680+ medical college selections, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line curriculum, small batches of 15-20, weekly 1:1 doubt slots. Online live across Delhi, Mumbai, Bangalore, Hyderabad, all metros + Tier-2 + NRI markets.',
  keywords: [
    'NEET biology coaching India',
    'NEET biology coaching online',
    'best NEET biology coaching',
    'biology specialist NEET',
    'NEET biology institute India',
    'AIIMS faculty biology coaching',
    'Dr Shekhar C Singh biology',
    'NEET biology tutor India',
    'NEET biology classes online India',
    'biology only NEET coaching',
    'NEET biology preparation India',
    'biology coaching for NEET aspirants',
    '98% biology success rate',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-india' },
  openGraph: {
    title: 'NEET Biology Coaching India | Cerebrum Biology Academy',
    description:
      'Biology-only specialist, 98% qualification, AIIMS faculty, NCERT-deep across India.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-coaching-india',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Coaching India | Cerebrum',
    description: 'Biology-only specialist with 98% qualification rate.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
