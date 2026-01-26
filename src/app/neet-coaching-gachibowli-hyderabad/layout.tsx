import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in Gachibowli Hyderabad | Financial District, Kondapur | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Gachibowli IT Hub, Hyderabad. 94.2% success rate, AIIMS faculty. Financial District, Kondapur, Nanakramguda, Manikonda. IT families. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Gachibowli, NEET biology coaching Financial District, best NEET coaching Kondapur, NEET classes Nanakramguda, biology coaching Manikonda, NEET tuition IT corridor Hyderabad, premium NEET coaching Hyderabad IT, NEET prep tech families, Oakridge NEET coaching, DPS Gachibowli NEET, Meridian NEET prep',
  openGraph: {
    title: 'Best NEET Coaching in Gachibowli Hyderabad | IT Hub | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Gachibowli IT Hub with 94.2% success rate. AIIMS faculty, tech-forward platform. Perfect for IT families.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gachibowli-hyderabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Gachibowli Hyderabad | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Gachibowli IT Hub. 94.2% success rate. Financial District, Kondapur, Nanakramguda.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gachibowli-hyderabad',
  },
}

export default function GachibowliHyderabadCoachingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
