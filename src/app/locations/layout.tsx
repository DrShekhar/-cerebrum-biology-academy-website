import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Centers in Delhi NCR | Cerebrum Biology Academy',
  description:
    'Find the best NEET Biology coaching center near you. 5 locations across Delhi NCR - Gurugram, Delhi, South Delhi, Noida, Faridabad. AIIMS faculty, small batches, 98% success rate.',
  keywords: [
    'NEET coaching centers Delhi NCR',
    'NEET coaching near me',
    'Biology coaching centers',
    'NEET coaching locations',
    'NEET coaching Gurugram',
    'NEET coaching Delhi',
    'NEET coaching Noida',
    'NEET coaching Faridabad',
    'NEET coaching South Delhi',
    'Best NEET coaching centers',
  ],
  openGraph: {
    title: 'NEET Biology Coaching Centers in Delhi NCR | Cerebrum Biology Academy',
    description:
      'Find the best NEET Biology coaching center near you. 5 locations across Delhi NCR.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Biology Coaching Centers in Delhi NCR | Cerebrum Biology Academy',
    description: 'Find the best NEET Biology coaching center near you.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/locations',
  },
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
