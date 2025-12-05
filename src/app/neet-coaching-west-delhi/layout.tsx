import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in West Delhi | Dwarka, Janakpuri, Rajouri Garden | Cerebrum Academy',
  description:
    'Best NEET coaching for West Delhi students from Dwarka, Janakpuri, Rajouri Garden, Vikaspuri, Uttam Nagar. AIIMS faculty, 98% success rate. Book FREE demo!',
  keywords:
    'NEET coaching West Delhi, NEET coaching Dwarka, NEET coaching Janakpuri, NEET coaching Rajouri Garden, biology coaching West Delhi, medical coaching West Delhi, NEET preparation West Delhi',
  openGraph: {
    title: 'Best NEET Coaching in West Delhi | Cerebrum Biology Academy',
    description:
      'Top NEET coaching for West Delhi students. Expert AIIMS faculty, small batches, 98% success rate. Serving Dwarka, Janakpuri, Rajouri Garden & more.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-west-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-west-delhi',
  },
}

export default function NEETCoachingWestDelhiLayout({ children }: { children: React.ReactNode }) {
  return children
}
