import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online NEET Coaching | Live Biology Classes from AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching from Cerebrum Biology Academy — live biology classes, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, weekly 1:1 doubt slots, recorded sessions, mock tests, WhatsApp support, performance dashboard. Available across all metros, Tier-2 cities, and NRI markets (UAE, USA, UK, Canada, Singapore, Saudi).',
  keywords: [
    'online NEET coaching',
    'live NEET classes online',
    'online NEET biology',
    'online NEET tutor',
    'NEET coaching online India',
    'best online NEET coaching',
    'online NEET dropper coaching',
    'live online NEET',
    'NEET online classes Zoom',
    'NEET online recorded classes',
    'online biology classes NEET',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching' },
  openGraph: {
    title: 'Online NEET Coaching | Cerebrum Biology Academy',
    description:
      'Live online biology classes from AIIMS faculty. NCERT-deep, 98% qualification.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Online NEET Coaching | Cerebrum',
    description: 'Live online biology + AIIMS faculty.',
  },
}

export default function OnlineNEETCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
