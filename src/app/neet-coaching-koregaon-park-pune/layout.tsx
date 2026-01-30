import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Koregaon Park Pune | Kalyani Nagar, Viman Nagar | Cerebrum Academy',
  description:
    "Premium NEET biology coaching in Koregaon Park, Pune's elite address. 94.2% success rate, AIIMS faculty. KP Main, Kalyani Nagar, Viman Nagar, Kharadi. Fee ₹24,000+. Book free demo!",
  keywords:
    'NEET coaching Koregaon Park, NEET biology coaching Koregaon Park Pune, best NEET coaching Kalyani Nagar, NEET classes Viman Nagar, biology coaching Kharadi, NEET tuition East Pune, NEET coaching premium Pune, international school NEET prep, IB biology NEET, IGCSE NEET preparation, Symbiosis NEET coaching, MBIS NEET prep, biology tuition Koregaon Park, biology classes Koregaon Park Pune, online biology coaching Koregaon Park, biology teacher Koregaon Park, NEET biology Koregaon Park',
  openGraph: {
    title: 'Best NEET Coaching in Koregaon Park Pune | Premium | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Koregaon Park with 94.2% success rate. AIIMS faculty, small batches. International school specialists.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-koregaon-park-pune',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Koregaon Park Pune | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Koregaon Park. 94.2% success rate. Kalyani Nagar, Viman Nagar, Kharadi.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-koregaon-park-pune',
  },
}

export default function KoregaonParkPuneCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
