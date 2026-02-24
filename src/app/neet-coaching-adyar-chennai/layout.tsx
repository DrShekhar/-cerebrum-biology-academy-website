import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Adyar Chennai | Besant Nagar, Thiruvanmiyur',
  description:
    'Premium NEET biology coaching in Adyar, Chennai educational hub. 98% success rate, AIIMS faculty. Besant Nagar, Thiruvanmiyur, Kotturpuram, IIT Gate. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Adyar, NEET biology coaching Adyar Chennai, best NEET coaching Besant Nagar, NEET classes Thiruvanmiyur, biology coaching Kotturpuram, NEET tuition IIT Madras, NEET coaching South Chennai, premium NEET coaching Chennai, PSBB NEET coaching, Bala Vidya Mandir NEET prep, Chettinad NEET preparation, biology tuition Adyar, biology classes Adyar Chennai, online biology coaching Adyar, biology teacher Adyar, NEET biology Adyar',
  openGraph: {
    title: 'Best NEET Coaching in Adyar Chennai | Educational Hub',
    description:
      'Premium NEET biology coaching in Adyar with 98% success rate. AIIMS faculty, small batches. Perfect for South Chennai elite families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-adyar-chennai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Adyar Chennai',
    description:
      'Premium NEET biology coaching in Adyar. 98% success rate. Besant Nagar, Thiruvanmiyur, Kotturpuram.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-adyar-chennai',
  },
}

export default function AdyarChennaiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
