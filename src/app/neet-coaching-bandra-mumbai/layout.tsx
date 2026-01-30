import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Bandra Mumbai | Pali Hill, Carter Road, Khar | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Bandra, Mumbai for elite schools. 94.2% success rate, AIIMS faculty. Bandra West, Pali Hill, Carter Road, Khar West. ASB, Cathedral, Ecole Mondiale students. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Bandra, NEET biology coaching Bandra Mumbai, best NEET coaching Bandra West, NEET classes Pali Hill, biology coaching Carter Road, NEET tuition Khar West, NEET coaching BKC, premium NEET coaching Mumbai, international school NEET prep, IB biology NEET, IGCSE NEET preparation, American School Bombay NEET, Cathedral School NEET coaching, Ecole Mondiale NEET prep, biology tuition Bandra, biology classes Bandra Mumbai, online biology coaching Bandra, biology teacher Bandra, NEET biology Bandra',
  openGraph: {
    title: 'Best NEET Coaching in Bandra Mumbai | Premium Education | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Bandra with 94.2% success rate. AIIMS faculty, small batches. International school specialists. ASB, Cathedral, Ecole Mondiale students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-bandra-mumbai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Bandra Mumbai | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Bandra. 94.2% success rate. Bandra West, Pali Hill, Carter Road, Khar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-bandra-mumbai',
  },
}

export default function BandraMumbaiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
