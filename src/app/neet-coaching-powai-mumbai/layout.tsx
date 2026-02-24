import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Powai Mumbai | Hiranandani, JVLR',
  description:
    'Premium NEET biology coaching in Powai, Mumbai for tech families. 98% success rate, AIIMS faculty. Hiranandani Gardens, Powai Lake, JVLR, Chandivali. IIT Bombay area. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Powai, NEET biology coaching Hiranandani, best NEET coaching Powai Mumbai, NEET classes JVLR, biology coaching Chandivali, NEET tuition Powai Lake, NEET coaching IIT Bombay area, premium NEET coaching Mumbai, tech family NEET prep, IB biology NEET, IGCSE NEET preparation, Hiranandani Foundation School NEET, Ryan International Powai NEET, biology tuition Powai, biology classes Powai Mumbai, online biology coaching Powai, biology teacher Powai, NEET biology Powai',
  openGraph: {
    title: 'Best NEET Coaching in Powai Mumbai | Tech Hub',
    description:
      'Premium NEET biology coaching in Powai with 98% success rate. AIIMS faculty, tech-forward platform. Perfect for IT families in Hiranandani Gardens.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-powai-mumbai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Powai Mumbai',
    description:
      'Premium NEET biology coaching in Powai. 98% success rate. Hiranandani, JVLR, Chandivali, IIT Bombay area.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-powai-mumbai',
  },
}

export default function PowaiMumbaiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
