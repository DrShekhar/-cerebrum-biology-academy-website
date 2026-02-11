import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Srinagar | Lal Chowk, Rajbagh | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Srinagar for Kashmir students. GMC Srinagar focused! 98% success rate, AIIMS faculty. Lal Chowk, Rajbagh, Hyderpora. 1,200+ students. Book free demo!',
  keywords:
    'NEET coaching Srinagar, NEET biology coaching Srinagar, best NEET coaching Lal Chowk, NEET classes Rajbagh, biology coaching Hyderpora, NEET tuition Srinagar, NEET coaching Sonwar, NEET preparation Kashmir, online NEET coaching Srinagar, GMC Srinagar preparation, NEET biology Srinagar, biology tuition Srinagar, biology classes Srinagar, online biology coaching Srinagar, biology teacher Srinagar, NEET biology Srinagar',
  openGraph: {
    title: 'Best NEET Coaching in Srinagar | Kashmir | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Srinagar with 98% success rate. GMC Srinagar focused! AIIMS faculty, small batches.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-srinagar',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Srinagar | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Srinagar. GMC focused! 98% success rate. Lal Chowk, Rajbagh, Hyderpora.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-srinagar',
  },
}

export default function SrinagarCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
