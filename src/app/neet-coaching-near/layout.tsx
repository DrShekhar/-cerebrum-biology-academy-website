import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Near Top Schools Delhi | DPS, Modern, Vasant Valley | Cerebrum Academy',
  description:
    'Find NEET coaching near your school. DPS RK Puram, DPS Vasant Vihar, Modern School, Vasant Valley, Sanskriti School students. Expert AIIMS faculty. Book free demo!',
  keywords:
    'NEET coaching near DPS, biology tuition near Modern School, NEET classes near Vasant Valley, coaching near Sanskriti School, NEET preparation near school, biology coaching Delhi schools',
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Near Top Schools Delhi | DPS, Modern, Vasant Valley | Cerebrum Academy',
    description: 'Find NEET coaching near your school.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near',
  },
}

export default function NEETCoachingNearLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
