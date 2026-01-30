import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Punjab 2026 | Online Biology Classes | Cerebrum Academy',
  description:
    'Top NEET Biology coaching in Punjab with AIIMS faculty. Online classes for Ludhiana, Jalandhar, Amritsar, Mohali, Patiala. Target DMC Ludhiana, GMC Amritsar. 94% success rate. Book free demo!',
  keywords: [
    'NEET coaching Punjab',
    'best NEET coaching in Punjab',
    'online NEET coaching Punjab',
    'biology coaching Punjab',
    'NEET coaching Ludhiana',
    'NEET coaching Jalandhar',
    'NEET coaching Amritsar',
    'NEET coaching Mohali',
    'NEET coaching Patiala',
    'DMC Ludhiana admission',
    'GMC Amritsar admission',
    'Punjab medical colleges',
    'NEET biology classes Punjab',
    'online biology tuition Punjab',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Punjab 2026 | Cerebrum Biology Academy',
    description:
      'Premium online NEET biology coaching for Punjab students. AIIMS faculty, 94% success rate. Target DMC Ludhiana, GMC Amritsar, GMC Patiala.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-punjab',
  },
  other: {
    'geo.region': 'IN-PB',
    'geo.placename': 'Punjab',
  },
}

export default function PunjabLayout({ children }: { children: React.ReactNode }) {
  return children
}
