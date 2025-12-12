import type { Metadata } from 'next'
import { NRIStudentsHubPage } from './NRIStudentsHubPage'

export const metadata: Metadata = {
  title: 'NEET Coaching for NRI Students | 14 Countries | Online Classes',
  description:
    'Best NEET Biology coaching for NRI students in UAE, Saudi Arabia, Kuwait, Singapore, Qatar, Oman, Malaysia, Nepal & more. AIIMS faculty, flexible timings, NEET exam centers abroad. 98% success rate.',
  keywords:
    'NRI NEET coaching, NEET coaching abroad, NEET coaching UAE, NEET coaching Dubai, NEET coaching Saudi Arabia, NEET coaching Singapore, NEET coaching Kuwait, online NEET coaching overseas, NRI quota NEET, CBSE students abroad NEET, Indian students abroad NEET preparation',
  openGraph: {
    title: 'NEET Coaching for NRI Students | 14+ Countries | Cerebrum Biology Academy',
    description:
      'Top NEET Biology coaching for NRI students worldwide. UAE, Saudi, Kuwait, Singapore, Qatar & more. AIIMS faculty, 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com/nri-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/nri-students',
  },
}

export default function NRIStudentsPage() {
  return <NRIStudentsHubPage />
}
