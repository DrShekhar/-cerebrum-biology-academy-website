import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching for West India | Online Classes from Delhi',
  description:
    'Top NEET Biology coaching for West India - Maharashtra, Gujarat, MP, Goa, Chhattisgarh. AIIMS trained faculty, 98% success rate. Mumbai, Pune, Ahmedabad students welcome!',
  keywords: [
    'NEET coaching west india',
    'NEET coaching maharashtra',
    'NEET coaching mumbai',
    'NEET coaching pune',
    'NEET coaching gujarat',
    'NEET coaching ahmedabad',
    'NEET coaching madhya pradesh',
    'NEET coaching indore',
    'online NEET coaching mumbai',
  ],
  openGraph: {
    title: 'Best NEET Coaching for West India | Online Classes from Delhi',
    description:
      'Top NEET Biology coaching for West India. AIIMS trained faculty, 98% success rate, 1,845+ students.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/neet-coaching-west-india',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching for West India',
    description:
      'Top NEET Biology coaching for West India. AIIMS trained faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-coaching-west-india',
  },
}

export default function NeetCoachingWestIndiaLayout({ children }: { children: React.ReactNode }) {
  return children
}
