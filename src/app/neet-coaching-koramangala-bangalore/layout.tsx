import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Koramangala Bangalore | BTM Layout | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Koramangala, Bangalore startup hub. 98% success rate, AIIMS faculty. All Koramangala blocks, BTM Layout, Madiwala, Ejipura. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Koramangala, NEET biology coaching Koramangala Bangalore, best NEET coaching BTM Layout, NEET classes Koramangala 4th block, biology coaching Ejipura, NEET tuition Madiwala, NEET coaching startup hub Bangalore, premium NEET coaching Bangalore, NPS NEET coaching, DPS South NEET prep, Inventure Academy NEET, biology tuition Koramangala, biology classes Koramangala Bangalore, online biology coaching Koramangala, biology teacher Koramangala, NEET biology Koramangala',
  openGraph: {
    title: 'Best NEET Coaching in Koramangala Bangalore | Startup Hub | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Koramangala with 98% success rate. AIIMS faculty, startup-era platform. Perfect for Bangalore startup families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-koramangala-bangalore',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Koramangala Bangalore | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Koramangala. 98% success rate. All blocks, BTM Layout, Madiwala, Ejipura.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-koramangala-bangalore',
  },
}

export default function KoramangalaBangaloreCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
