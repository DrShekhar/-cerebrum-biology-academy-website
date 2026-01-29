import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Pitampura | Biology Classes DC Chauk Rohini | Cerebrum Academy',
  description:
    'Best NEET coaching in Pitampura. 10 min from Rohini center. AIIMS faculty, 98% success rate. 15+ years experience. WhatsApp 88264-44334!',
  keywords: [
    'NEET coaching Pitampura',
    'biology classes Pitampura',
    'biology tuition Pitampura',
    'NEET preparation Pitampura',
    'DC Chauk biology coaching',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching',
    'NEET biology classes',
  ],
  openGraph: {
    title: 'NEET Coaching Pitampura | Biology Classes DC Chauk Rohini | Cerebrum Academy',
    description:
      'Best NEET coaching in Pitampura. 10 min from Rohini center. AIIMS faculty, 98% success rate.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pitampura',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Pitampura | Cerebrum Academy',
    description: 'Expert NEET Biology coaching in Pitampura Delhi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pitampura',
  },
}

export default function NEETCoachingPitampuraLayout({ children }: { children: React.ReactNode }) {
  return children
}
