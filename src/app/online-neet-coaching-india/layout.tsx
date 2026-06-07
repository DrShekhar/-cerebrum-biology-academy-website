import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online NEET Coaching India | Live Biology Classes | Cerebrum Biology Academy',
  description:
    'Online NEET coaching India — live online biology classes across all Indian states, metros, and Tier-2 cities. Biology-only specialist, AIIMS-trained Dr. Shekhar C Singh, 98% qualification rate, NCERT line-by-line, small batches of 15-20, weekly 1:1 doubt slots. Recorded sessions, WhatsApp doubt support, mock tests, performance dashboard.',
  keywords: [
    'online NEET coaching India',
    'best online NEET coaching',
    'live NEET classes online',
    'online NEET biology coaching',
    'NEET online classes India',
    'online NEET tutor India',
    'NEET online coaching Class 11 12',
    'online NEET dropper coaching',
    'NEET online preparation India',
    'best online NEET institute',
    'Zoom NEET classes',
    'live online biology classes NEET',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-india' },
  openGraph: {
    title: 'Online NEET Coaching India | Cerebrum Biology Academy',
    description:
      'Live online biology classes across India. AIIMS faculty, 98% qualification, NCERT-deep.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-india',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Online NEET Coaching India | Cerebrum',
    description: 'Live online biology classes, 98% qualification, AIIMS faculty.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
