import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Anna Nagar Chennai | East, West | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Anna Nagar, North Chennai. 98% success rate, AIIMS faculty. Anna Nagar East, West, Thirumangalam, Mogappair. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Anna Nagar, NEET biology coaching Anna Nagar Chennai, best NEET coaching Anna Nagar East, NEET classes Thirumangalam, biology coaching Mogappair, NEET tuition Shenoy Nagar, NEET coaching North Chennai, premium NEET coaching Chennai, DAV NEET coaching, Velammal NEET prep, Chinmaya NEET preparation, biology tuition Anna Nagar, biology classes Anna Nagar Chennai, online biology coaching Anna Nagar, biology teacher Anna Nagar, NEET biology Anna Nagar',
  openGraph: {
    title: 'Best NEET Coaching in Anna Nagar Chennai | Premium Hub | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Anna Nagar with 98% success rate. AIIMS faculty, small batches. Perfect for North Chennai families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-anna-nagar-chennai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Anna Nagar Chennai | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Anna Nagar. 98% success rate. East, West, Thirumangalam, Mogappair.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-anna-nagar-chennai',
  },
}

export default function AnnaNagarChennaiCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
