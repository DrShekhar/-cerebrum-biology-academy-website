import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Hitech City Hyderabad | Madhapur, Kukatpally | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Hitech City IT corridor, Hyderabad. 98% success rate, AIIMS faculty. Madhapur, Kukatpally, KPHB, Miyapur, Raidurgam. IT families. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Hitech City, NEET biology coaching Madhapur, best NEET coaching Kukatpally, NEET classes KPHB, biology coaching Miyapur, NEET tuition Raidurgam, NEET coaching IT corridor Hyderabad, premium NEET coaching tech families, DPS Hitech City NEET coaching, Oakridge NEET prep, Chirec NEET preparation, biology tuition Hitech City, biology classes Hitech City Hyderabad, online biology coaching Hitech City, biology teacher Hitech City, NEET biology Hitech City',
  openGraph: {
    title: 'Best NEET Coaching in Hitech City Hyderabad | IT Corridor | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Hitech City IT corridor with 98% success rate. AIIMS faculty, tech-forward platform. Perfect for IT families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hitech-city-hyderabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Hitech City Hyderabad | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Hitech City IT corridor. 98% success rate. Madhapur, Kukatpally, KPHB, Miyapur.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-hitech-city-hyderabad',
  },
}

export default function HitechCityHyderabadCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
