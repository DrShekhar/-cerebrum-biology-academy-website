import type { Metadata } from 'next'
import { BiologyTuitionNearMeClient } from './BiologyTuitionNearMeClient'

export const metadata: Metadata = {
  title: 'Biology Tuition Near Me | Best Biology Classes in Delhi NCR',
  description:
    'Looking for biology tuition near you? Cerebrum Biology Academy offers expert biology classes in Delhi, Noida, Gurgaon, Ghaziabad & Faridabad. AIIMS faculty, 98% success rate. Book FREE demo!',
  keywords:
    'biology tuition near me, biology classes near me, biology tutor near me, NEET biology coaching near me, biology home tuition, biology coaching Delhi NCR, best biology tuition, biology tuition Noida, biology tuition Gurgaon, biology coaching Ghaziabad, biology classes Faridabad',
  openGraph: {
    title: 'Biology Tuition Near Me | Expert Biology Classes in Delhi NCR',
    description:
      'Find the best biology tuition near you. Expert AIIMS faculty, small batches, 98% success rate. Serving Delhi, Noida, Gurgaon, Ghaziabad, Faridabad.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-near-me',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-near-me',
  },
}

export default function BiologyTuitionNearMePage() {
  return <BiologyTuitionNearMeClient />
}
