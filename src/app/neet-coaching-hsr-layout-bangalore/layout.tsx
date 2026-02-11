import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in HSR Layout Bangalore | All Sectors | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in HSR Layout, South Bangalore. 98% success rate, AIIMS faculty. All sectors, Bommanahalli, Agara, 27th Main. IT families. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching HSR Layout, NEET biology coaching HSR Bangalore, best NEET coaching HSR Sector 1, NEET classes Bommanahalli, biology coaching Agara, NEET tuition 27th Main, NEET coaching South Bangalore, premium NEET coaching IT families, Ryan International HSR NEET, Vibgyor High NEET prep, DPS Electronic City NEET, biology tuition HSR Layout, biology classes HSR Bangalore, online biology coaching HSR Layout, biology teacher HSR Layout, NEET biology HSR Layout',
  openGraph: {
    title: 'Best NEET Coaching in HSR Layout Bangalore | Tech Hub | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in HSR Layout with 98% success rate. AIIMS faculty, tech-forward platform. Perfect for South Bangalore IT families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hsr-layout-bangalore',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in HSR Layout Bangalore | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in HSR Layout. 98% success rate. All sectors, Bommanahalli, Agara.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-hsr-layout-bangalore',
  },
}

export default function HSRLayoutBangaloreCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
