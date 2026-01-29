import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Punjabi Bagh | Biology Classes West Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching in Punjabi Bagh. Near Rohini DC Chauk center, Ring Road connectivity. AIIMS faculty, 98% success rate. WhatsApp 88264-44334 for demo!',
  keywords:
    'NEET coaching Punjabi Bagh, biology classes Punjabi Bagh, biology tuition West Delhi, NEET preparation Punjabi Bagh, AIIMS faculty, medical entrance coaching West Delhi',
  openGraph: {
    title: 'NEET Coaching Punjabi Bagh | Biology Classes West Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching in Punjabi Bagh. Near Rohini DC Chauk center, Ring Road connectivity. AIIMS faculty, 98% success rate. WhatsApp 88264-44334 for demo!',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-punjabi-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-punjabi-bagh',
  },
}

export default function NEETCoachingPunjabiBaghLayout({ children }: { children: React.ReactNode }) {
  return children
}
