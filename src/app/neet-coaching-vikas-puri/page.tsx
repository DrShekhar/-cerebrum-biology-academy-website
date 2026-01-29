import type { Metadata } from 'next'
import VikasPuriContent from './VikasPuriContent'

export const metadata: Metadata = {
  title: 'NEET Coaching Vikas Puri | Biology Classes West Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching in Vikas Puri, West Delhi. Expert AIIMS faculty, small batches, proven results. Serving all 9 blocks, KG apartments & DDA flats. 15-20 min from Rohini via metro.',
  keywords:
    'NEET coaching vikas puri, biology tuition vikas puri delhi, NEET classes vikas puri, medical coaching west delhi, biology coaching vikas puri, NEET preparation vikas puri',
  openGraph: {
    title: 'NEET Coaching Vikas Puri | Biology Classes West Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching in Vikas Puri. AIIMS faculty, small batches, 98% success rate. Free demo class available.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-vikas-puri',
  },
}

export default function NEETCoachingVikasPuri() {
  return <VikasPuriContent />
}
