import type { Metadata } from 'next'
import { BiologyCoachingNearMeClient } from './BiologyCoachingNearMeClient'

export const metadata: Metadata = {
  title: 'Biology Coaching Near Me | NEET Biology Classes Delhi NCR | Cerebrum Academy',
  description:
    'Find the best biology coaching near you for NEET preparation. Expert AIIMS faculty in Delhi, Noida, Gurgaon, Ghaziabad, Faridabad. 98% success rate. Book FREE demo today!',
  keywords:
    'biology coaching near me, NEET biology coaching near me, biology coaching classes, biology coaching center, best biology coaching Delhi, biology coaching Noida, biology coaching Gurgaon, NEET coaching near me, medical coaching near me',
  openGraph: {
    title: 'Biology Coaching Near Me | NEET Preparation in Delhi NCR',
    description:
      'Best biology coaching for NEET near your location. AIIMS faculty, 98% success rate, small batches. Delhi, Noida, Gurgaon, Ghaziabad, Faridabad.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-near-me',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-near-me',
  },
}

export default function BiologyCoachingNearMePage() {
  return <BiologyCoachingNearMeClient />
}
