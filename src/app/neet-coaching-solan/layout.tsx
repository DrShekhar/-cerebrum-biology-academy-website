import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Solan 2026 | Mushroom City HP | Cerebrum Academy',
  description:
    'Top NEET coaching for Solan students. 98% success rate. Online classes from AIIMS faculty. Serving Solan, Kasauli, Baddi, Nalagarh. MMMC Solan has 150 MBBS seats in your city!',
  keywords:
    'NEET coaching Solan, best NEET coaching Solan Himachal, NEET preparation Solan, NEET classes MMMC Solan, biology coaching Solan, medical entrance Himachal Pradesh, NEET 2026 Solan, online NEET coaching Solan, Kasauli NEET coaching, Baddi NEET classes',
  openGraph: {
    title: 'Best NEET Coaching in Solan 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Solan. Online classes from AIIMS-trained faculty. 98% success rate. MMMC Solan with 150 seats is in your city!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-solan',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Solan 2026 | Mushroom City HP | Cerebrum Academy',
    description: 'Top NEET coaching for Solan students. 98% success rate. Online classes from AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-solan',
  },
  other: {
    'geo.region': 'IN-HP',
    'geo.placename': 'Solan',
  },
}

export default function SolanLayout({ children }: { children: React.ReactNode }) {
  return children
}
