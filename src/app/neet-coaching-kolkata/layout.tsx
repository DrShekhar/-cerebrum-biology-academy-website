import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Kolkata | Salt Lake, Park Street, New Town | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Kolkata for West Bengal students. 98% success rate, AIIMS faculty. Salt Lake, Park Street, New Town, Howrah, Jadavpur, Ballygunge. 4,000+ students. Book free demo!',
  keywords:
    'NEET coaching Kolkata, NEET biology coaching Kolkata, best NEET coaching Salt Lake, NEET classes Park Street, biology coaching New Town, NEET tuition Howrah, NEET coaching Jadavpur, NEET preparation West Bengal, online NEET coaching Kolkata, NEET coaching Ballygunge, NEET coaching Behala, NEET biology Kolkata, WBCHSE NEET prep, Medical College Kolkata preparation',
  openGraph: {
    title: 'Best NEET Coaching in Kolkata | West Bengal | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Kolkata with 98% success rate. AIIMS faculty, small batches. Join 4,000+ West Bengal students from Salt Lake, Park Street, New Town.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kolkata',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Kolkata | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Kolkata. 98% success rate. Salt Lake, Park Street, New Town, Howrah, Jadavpur.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kolkata',
  },
}

export default function KolkataCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
