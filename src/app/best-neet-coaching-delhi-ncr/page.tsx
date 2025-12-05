import type { Metadata } from 'next'
import { BestNEETCoachingDelhiNCRClient } from './BestNEETCoachingDelhiNCRClient'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Delhi NCR 2025 | #1 Biology Coaching | Cerebrum Academy',
  description:
    'Looking for the best NEET coaching in Delhi NCR? Cerebrum Biology Academy offers top NEET preparation with AIIMS faculty, 98% success rate, 500+ medical selections. Delhi, Noida, Gurgaon centers.',
  keywords:
    'best NEET coaching Delhi NCR, top NEET coaching Delhi, best biology coaching Delhi, NEET coaching Delhi Noida Gurgaon, best NEET institute Delhi, top 10 NEET coaching Delhi, best NEET coaching 2025, NEET biology coaching Delhi NCR',
  openGraph: {
    title: 'Best NEET Coaching in Delhi NCR | #1 Biology Coaching Institute',
    description:
      'Top-rated NEET coaching in Delhi NCR with 98% success rate. AIIMS faculty, small batches, 500+ medical selections. Book FREE demo!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-delhi-ncr',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-coaching-delhi-ncr',
  },
}

export default function BestNEETCoachingDelhiNCRPage() {
  return <BestNEETCoachingDelhiNCRClient />
}
