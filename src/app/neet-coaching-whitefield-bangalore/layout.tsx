import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Whitefield Bangalore | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET biology coaching in Whitefield Bangalore. 94.2% success rate. AIIMS faculty. ITPL, Brookefield, Marathahalli, Kadugodi. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Whitefield, best NEET biology coaching Whitefield Bangalore, biology tuition ITPL, NEET classes Brookefield, biology coaching Marathahalli, NEET preparation Bangalore, Whitefield NEET coaching online, international school NEET coaching, biology tuition Whitefield, biology classes Whitefield Bangalore, online biology coaching Whitefield, biology teacher Whitefield, NEET biology Whitefield',
  openGraph: {
    title: 'Best NEET Coaching in Whitefield Bangalore | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Whitefield Bangalore with 94.2% success rate. AIIMS faculty. ITPL, Brookefield, Marathahalli.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-whitefield-bangalore',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-whitefield-bangalore',
  },
}

export default function WhitefieldCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
