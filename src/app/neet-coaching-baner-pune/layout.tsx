import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Baner Pune | Hinjewadi, Aundh, Balewadi',
  description:
    'Premium NEET biology coaching in Baner, Pune IT corridor. 98% success rate, AIIMS faculty. Baner, Balewadi, Aundh, Hinjewadi, Wakad, Pashan. IT families. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Baner, NEET biology coaching Baner Pune, best NEET coaching Hinjewadi, NEET classes Aundh, biology coaching Balewadi, NEET tuition Wakad, NEET coaching IT corridor Pune, premium NEET coaching tech families, Indus International NEET coaching, VIBGYOR High NEET prep, DPS Pune NEET preparation, biology tuition Baner, biology classes Baner Pune, online biology coaching Baner, biology teacher Baner, NEET biology Baner',
  openGraph: {
    title: 'Best NEET Coaching in Baner Pune | IT Corridor',
    description:
      'Premium NEET biology coaching in Baner IT corridor with 98% success rate. AIIMS faculty, tech-forward platform. Perfect for IT families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-baner-pune',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Baner Pune',
    description:
      'Premium NEET biology coaching in Baner IT corridor. 98% success rate. Hinjewadi, Aundh, Balewadi, Wakad.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-baner-pune',
  },
}

export default function BanerPuneCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
