import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Coaching in Nagpur | NEET Tuition | Cerebrum Academy',
  description:
    'Best biology coaching & NEET tuition in Nagpur. 98% success rate. AIIMS faculty. Dharampeth, Civil Lines, Sadar, Sitabuldi. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'biology coaching Nagpur, NEET tuition Nagpur, best NEET coaching Nagpur, biology classes Dharampeth, NEET coaching Civil Lines, biology tuition Sadar, Nagpur NEET coaching online, Class 12 biology Nagpur, Maharashtra board biology Nagpur',
  openGraph: {
    title: 'Best Biology Coaching in Nagpur | NEET Tuition | Cerebrum Academy',
    description:
      'Best biology coaching in Nagpur with 98% success rate. AIIMS faculty. Dharampeth, Civil Lines, Sadar.',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-nagpur',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Coaching in Nagpur | NEET Tuition | Cerebrum Academy',
    description: 'Best biology coaching & NEET tuition in Nagpur. 98% success rate. AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-nagpur',
  },
}

export default function NagpurBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
