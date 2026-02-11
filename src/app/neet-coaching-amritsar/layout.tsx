import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Amritsar | Lawrence Road, Ranjit Avenue | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Amritsar for Punjab students. GMC Amritsar focused! 98% success rate, AIIMS faculty. Lawrence Road, Ranjit Avenue, Mall Road. 2,400+ students. Book free demo!',
  keywords:
    'NEET coaching Amritsar, NEET biology coaching Amritsar, best NEET coaching Lawrence Road, NEET classes Ranjit Avenue, biology coaching Mall Road, NEET tuition Amritsar, NEET coaching Model Town, NEET preparation Punjab, online NEET coaching Amritsar, GMC Amritsar preparation, NEET biology Amritsar, biology tuition Amritsar, biology classes Amritsar, online biology coaching Amritsar, biology teacher Amritsar, NEET biology Amritsar',
  openGraph: {
    title: 'Best NEET Coaching in Amritsar | Punjab | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Amritsar with 98% success rate. GMC Amritsar focused! AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-amritsar',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Amritsar | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Amritsar. GMC focused! 98% success rate. Lawrence Road, Ranjit Avenue.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-amritsar',
  },
}

export default function AmritsarCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
