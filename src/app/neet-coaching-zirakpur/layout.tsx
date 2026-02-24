import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Zirakpur 2026 | VIP Road & Baltana',
  description: 'Top NEET coaching in Zirakpur Punjab. 98% success rate, AIIMS faculty. Online classes for VIP Road, Baltana, Dhakoli, Maya Garden. 90+ Zirakpur students. Fee ₹24,000+. Book free demo!',
  keywords: 'NEET coaching Zirakpur, best NEET coaching Zirakpur Punjab, biology classes Zirakpur, NEET preparation VIP Road Zirakpur, Baltana NEET coaching, online NEET classes Zirakpur, NEET coaching near me Zirakpur, biology tuition Zirakpur, NEET 2026 coaching Zirakpur, Dhakoli NEET classes, Maya Garden coaching',
  openGraph: {
    title: 'Best NEET Coaching in Zirakpur 2026 | VIP Road & Baltana',
    description: 'Top NEET coaching in Zirakpur Punjab. 98% success rate, AIIMS faculty. 90+ students from Zirakpur. Skip traffic to Chandigarh!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-zirakpur',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Zirakpur 2026 | VIP Road & Baltana',
    description: 'Top NEET coaching in Zirakpur Punjab. 98% success rate, AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-zirakpur',
  },
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Zirakpur',
    'geo.position': '30.6430;76.8174',
  },
}

export default function ZirakpurCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
