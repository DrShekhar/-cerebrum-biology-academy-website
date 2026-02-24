import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Panchkula 2026 | Haryana',
  description: 'Top NEET coaching in Panchkula Haryana. 98% success rate, AIIMS faculty. Online classes for Sector 12A, MDC, Sector 20, Kalka. 150+ Panchkula students. Fee ₹24,000+. Book free demo!',
  keywords: 'NEET coaching Panchkula, best NEET coaching Panchkula Haryana, biology classes Panchkula, NEET preparation Sector 12A Panchkula, MDC Panchkula NEET coaching, online NEET classes Panchkula, NEET coaching near me Panchkula, biology tuition Panchkula, NEET 2026 coaching Panchkula, Kalka NEET classes, Pinjore coaching',
  openGraph: {
    title: 'Best NEET Coaching in Panchkula 2026 | Haryana',
    description: 'Top NEET coaching in Panchkula Haryana. 98% success rate, AIIMS faculty. 150+ students from Panchkula. Skip traffic to Chandigarh!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-panchkula',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Panchkula',
    description: 'Top NEET biology coaching in Panchkula, Haryana. 98% success rate. Sector 9, 12, 15.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-panchkula',
  },
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': 'Panchkula',
    'geo.position': '30.6942;76.8606',
  },
}

export default function PanchkulaCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
