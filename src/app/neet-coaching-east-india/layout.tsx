import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching for East India | Online Classes from Delhi',
  description:
    'Top NEET Biology coaching for East India - West Bengal, Bihar, Jharkhand, Odisha, Assam, Northeast. AIIMS trained faculty, 98% success rate. Study from home!',
  keywords: [
    'NEET coaching east india',
    'NEET coaching west bengal',
    'NEET coaching bihar',
    'NEET coaching kolkata',
    'NEET coaching patna',
    'NEET coaching jharkhand',
    'NEET coaching odisha',
    'NEET coaching assam',
    'online NEET coaching bihar',
  ],
  openGraph: {
    title: 'Best NEET Coaching for East India | Online Classes from Delhi',
    description:
      'Top NEET Biology coaching for East India. AIIMS trained faculty, 98% success rate, 2,030+ students.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/neet-coaching-east-india',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching for East India',
    description:
      'Top NEET Biology coaching for East India. AIIMS trained faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/neet-coaching-east-india',
  },
}

export default function NeetCoachingEastIndiaLayout({ children }: { children: React.ReactNode }) {
  return children
}
