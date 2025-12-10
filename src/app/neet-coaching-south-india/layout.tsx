import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching for South India | Online Classes in English',
  description:
    'Top NEET Biology coaching for South India - Karnataka, Tamil Nadu, Kerala, Andhra Pradesh, Telangana. AIIMS trained faculty, 98% success rate, English medium classes.',
  keywords: [
    'NEET coaching south india',
    'NEET coaching karnataka',
    'NEET coaching tamil nadu',
    'NEET coaching kerala',
    'NEET coaching bangalore',
    'NEET coaching chennai',
    'NEET coaching hyderabad',
    'online NEET coaching english medium',
    'best NEET coaching south',
  ],
  openGraph: {
    title: 'Best NEET Coaching for South India | Online Classes in English',
    description:
      'Top NEET Biology coaching for South India. AIIMS trained faculty, 98% success rate, 2,450+ students. English medium classes!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/neet-coaching-south-india',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching for South India',
    description:
      'Top NEET Biology coaching for South India. AIIMS trained faculty, 98% success rate. English medium!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-coaching-south-india',
  },
}

export default function NeetCoachingSouthIndiaLayout({ children }: { children: React.ReactNode }) {
  return children
}
