import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mumbai 2026 | Maharashtra | Cerebrum Academy',
  description:
    'Top NEET coaching for Mumbai students. 98% success rate. Online classes from AIIMS faculty. Prepare for Seth GS, Grant Medical, KEM, LTMMC from home. Serving Andheri, Bandra, Borivali, Thane, Navi Mumbai.',
  keywords:
    'NEET coaching Mumbai, best NEET coaching Mumbai, NEET preparation Mumbai, NEET classes Maharashtra, biology coaching Mumbai, medical entrance Mumbai, NEET 2026 Mumbai, online NEET coaching Mumbai, Seth GS Medical College, KEM Hospital admission, Grant Medical College NEET cutoff',
  openGraph: {
    title: 'Best NEET Coaching in Mumbai 2026 | Cerebrum Biology Academy',
    description:
      'Join the most trusted NEET coaching for Mumbai. Online classes from AIIMS-trained faculty. 98% success rate. Prepare for top Maharashtra medical colleges from home.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mumbai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Mumbai 2026 | Maharashtra | Cerebrum Academy',
    description: 'Top NEET coaching for Mumbai students. 98% success rate. Online classes from AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mumbai',
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Mumbai',
  },
}

export default function MumbaiLayout({ children }: { children: React.ReactNode }) {
  return children
}
