import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mohali 2026 | IT City & Phases',
  description: 'Top NEET coaching in Mohali Punjab. 98% success rate, AIIMS faculty. Online classes for Phase 3B2, Phase 7, Sector 70, IT City, Aerocity. 180+ Mohali students. Fee ₹24,000+. Book free demo!',
  keywords: 'NEET coaching Mohali, best NEET coaching Mohali Punjab, biology classes Mohali, NEET preparation IT City Mohali, Phase 3B2 NEET coaching, online NEET classes Mohali, NEET coaching near me Mohali, biology tuition Mohali, NEET 2026 coaching Mohali, Sector 70 NEET classes, Aerocity Mohali coaching, SAS Nagar NEET preparation',
  openGraph: {
    title: 'Best NEET Coaching in Mohali 2026 | IT City & Phases',
    description: 'Top NEET coaching in Mohali Punjab. 98% success rate, AIIMS faculty. 180+ students from Mohali. Skip traffic to Chandigarh Sector 34!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mohali',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Mohali',
    description: 'Top NEET biology coaching in Mohali, Punjab. 98% success rate. Phase 3B2, Sector 70.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mohali',
  },
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Mohali',
    'geo.position': '30.7046;76.7179',
  },
}

export default function MohaliCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
