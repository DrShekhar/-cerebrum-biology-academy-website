import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in South Delhi | Biology Classes Hauz Khas, GK, Defence Colony | Cerebrum Academy',
  description:
    'Top-rated NEET coaching in South Delhi - Hauz Khas, Greater Kailash, Defence Colony, Saket, Vasant Vihar. Expert AIIMS faculty, 94% success rate. Online & offline classes. Book free demo!',
  keywords:
    'NEET coaching South Delhi, biology tuition South Delhi, NEET classes Hauz Khas, biology coaching GK, NEET coaching Defence Colony, biology tuition Saket, NEET coaching Vasant Vihar, Kalu Sarai coaching, medical coaching South Delhi, NEET preparation South Delhi, best NEET institute South Delhi, biology classes near me South Delhi',
  openGraph: {
    title: 'Best NEET Coaching in South Delhi | Cerebrum Biology Academy',
    description:
      'Premium NEET coaching in South Delhi. Expert faculty from AIIMS/JIPMER. Hauz Khas, GK, Defence Colony, Saket. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching South Delhi | Cerebrum Biology Academy',
    description: 'Premium NEET biology coaching in South Delhi. Expert faculty, proven results.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
  },
}

export default function NEETCoachingSouthDelhiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
