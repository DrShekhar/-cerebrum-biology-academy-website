import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Indiranagar Bangalore | 100 Feet Road, HAL | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Indiranagar, East Bangalore. 98% success rate, AIIMS faculty. 100 Feet Road, 12th Main, HAL Stage, CMH Road, Domlur. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Indiranagar, NEET biology coaching Indiranagar Bangalore, best NEET coaching 100 Feet Road, NEET classes HAL Stage, biology coaching CMH Road, NEET tuition Domlur, NEET coaching East Bangalore, premium NEET coaching Bangalore, Bishop Cotton NEET coaching, St Josephs NEET prep, Harvest International NEET, biology tuition Indiranagar, biology classes Indiranagar Bangalore, online biology coaching Indiranagar, biology teacher Indiranagar, NEET biology Indiranagar',
  openGraph: {
    title: 'Best NEET Coaching in Indiranagar Bangalore | East Premium | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Indiranagar with 98% success rate. AIIMS faculty, small batches. Perfect for East Bangalore elite families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-indiranagar-bangalore',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Indiranagar Bangalore | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Indiranagar. 98% success rate. 100 Feet Road, HAL, CMH Road, Domlur.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-indiranagar-bangalore',
  },
}

export default function IndiranagarBangaloreCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
