import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in South Mumbai | Colaba, Malabar Hill, Worli | Cerebrum Academy',
  description:
    'Ultra-premium NEET biology coaching in South Mumbai for elite schools. 94.2% success rate, AIIMS faculty. Colaba, Cuffe Parade, Malabar Hill, Breach Candy, Pedder Road, Worli. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching South Mumbai, NEET biology coaching Colaba, best NEET coaching Malabar Hill, NEET classes Cuffe Parade, biology coaching Breach Candy, NEET tuition Pedder Road, NEET coaching Worli, premium NEET coaching SoBo, international school NEET prep, IB biology NEET, IGCSE NEET preparation, Cathedral School NEET coaching, Campion School NEET prep, JBCN NEET preparation',
  openGraph: {
    title: 'Best NEET Coaching in South Mumbai | Elite Education | Cerebrum Academy',
    description:
      'Ultra-premium NEET biology coaching in South Mumbai with 94.2% success rate. AIIMS faculty, concierge service. Cathedral, Campion, JBCN students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-mumbai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in South Mumbai | Cerebrum Biology Academy',
    description:
      'Ultra-premium NEET biology coaching in South Mumbai. 94.2% success rate. Colaba, Malabar Hill, Worli, Cuffe Parade.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-mumbai',
  },
}

export default function SouthMumbaiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
