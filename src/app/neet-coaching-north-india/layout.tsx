import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching for North India | Online Classes from Delhi NCR',
  description:
    'Top NEET Biology coaching for North India students - Delhi NCR, UP, Haryana, Punjab, Rajasthan, Uttarakhand, HP, J&K. AIIMS trained faculty, 98% success rate. No Kota migration needed!',
  keywords: [
    'NEET coaching north india',
    'online NEET coaching delhi',
    'NEET coaching uttar pradesh',
    'NEET coaching haryana',
    'NEET coaching punjab',
    'NEET coaching rajasthan',
    'NEET coaching uttarakhand',
    'NEET biology online coaching',
    'best NEET coaching kota alternative',
    'NEET preparation from home',
  ],
  openGraph: {
    title: 'Best NEET Coaching for North India | Online Classes from Delhi NCR',
    description:
      'Top NEET Biology coaching for North India. AIIMS trained faculty, 98% success rate, 4,100+ students. Save Rs 2.76 lakhs vs Kota migration!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/neet-coaching-north-india',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching for North India',
    description:
      'Top NEET Biology coaching for North India. AIIMS trained faculty, 98% success rate. No Kota migration needed!',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-coaching-north-india',
  },
}

export default function NeetCoachingNorthIndiaLayout({ children }: { children: React.ReactNode }) {
  return children
}
