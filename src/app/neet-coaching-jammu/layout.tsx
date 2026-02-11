import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Jammu | Gandhi Nagar, Residency Road | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Jammu for J&K students. GMC Jammu focused! 98% success rate, AIIMS faculty. Gandhi Nagar, Residency Road, Talab Tillo. 1,500+ students. Book free demo!',
  keywords:
    'NEET coaching Jammu, NEET biology coaching Jammu, best NEET coaching Gandhi Nagar, NEET classes Residency Road, biology coaching Talab Tillo, NEET tuition Jammu, NEET coaching Channi Himmat, NEET preparation J&K, online NEET coaching Jammu, GMC Jammu preparation, NEET biology Jammu, biology tuition Jammu, biology classes Jammu, online biology coaching Jammu, biology teacher Jammu, NEET biology Jammu',
  openGraph: {
    title: 'Best NEET Coaching in Jammu | J&K | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Jammu with 98% success rate. GMC Jammu focused! AIIMS faculty, small batches.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-jammu',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Jammu | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Jammu. GMC focused! 98% success rate. Gandhi Nagar, Residency Road.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jammu',
  },
}

export default function JammuCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
