import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in Adyar Chennai | Besant Nagar, Thiruvanmiyur | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Adyar, Chennai educational hub. 94.2% success rate, AIIMS faculty. Besant Nagar, Thiruvanmiyur, Kotturpuram, IIT Gate. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Adyar, NEET biology coaching Adyar Chennai, best NEET coaching Besant Nagar, NEET classes Thiruvanmiyur, biology coaching Kotturpuram, NEET tuition IIT Madras, NEET coaching South Chennai, premium NEET coaching Chennai, PSBB NEET coaching, Bala Vidya Mandir NEET prep, Chettinad NEET preparation',
  openGraph: {
    title: 'Best NEET Coaching in Adyar Chennai | Educational Hub | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Adyar with 94.2% success rate. AIIMS faculty, small batches. Perfect for South Chennai elite families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-adyar-chennai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Adyar Chennai | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Adyar. 94.2% success rate. Besant Nagar, Thiruvanmiyur, Kotturpuram.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-adyar-chennai',
  },
}

export default function AdyarChennaiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
