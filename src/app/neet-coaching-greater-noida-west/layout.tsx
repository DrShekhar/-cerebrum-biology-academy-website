import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in Greater Noida West | Gaur City, Ace City, Noida Extension | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Greater Noida West (Noida Extension). 400+ students from Gaur City, Ace City, Supertech Eco Village, Panchsheel Greens. 98% success rate. Book free demo!',
  keywords:
    'NEET coaching Greater Noida West, NEET coaching Gaur City, NEET classes Ace City, biology coaching Noida Extension, NEET tuition Supertech Eco Village, NEET coaching Panchsheel Greens, NEET coaching Ajnara Homes, medical coaching Greater Noida West, best NEET coaching Noida Extension, online NEET coaching Gaur City, NEET preparation Greater Noida, biology classes Noida Extension',
  openGraph: {
    title: 'Best NEET Coaching in Greater Noida West | Gaur City, Ace City | Cerebrum Academy',
    description:
      'Top NEET coaching in Greater Noida West with 400+ students. Gaur City, Ace City, Supertech Eco Village. 98% success rate, AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida-west',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching Greater Noida West | Cerebrum Academy',
    description:
      'Top NEET coaching in Noida Extension. Gaur City, Ace City students. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida-west',
  },
}

export default function GreaterNoidaWestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
