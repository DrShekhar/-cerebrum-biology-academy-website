import type { Metadata } from 'next'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

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
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in West Delhi | Dwarka, Janakpuri, Rajouri Garden | Cerebrum Academy',
    description: 'Best NEET coaching for West Delhi students from Dwarka, Janakpuri, Rajouri Garden, Vikaspuri, Uttam Nagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-west-delhi',
  },
}

export default function NEETCoachingWestDelhiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NearMeKeywordInjector
        location="West Delhi"
        parentLocation="Delhi NCR"
        centerAddress="Block D, South Extension Part 2, New Delhi - 110049"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Dwarka', 'Janakpuri', 'Rajouri Garden', 'Vikaspuri', 'Uttam Nagar', 'Tilak Nagar', 'Tagore Garden', 'Hari Nagar']}
      />
    </>
  )
}
