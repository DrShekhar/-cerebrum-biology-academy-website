import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book FREE NEET Biology Demo Class [Limited Spots]',
  description:
    'Experience our teaching methodology in a FREE 45-min demo class. Learn from AIIMS-trained faculty with 67+ AIIMS selections. Only 5 slots/day - Book now!',
  keywords: [
    'free neet demo class',
    'neet biology demo',
    'free biology class neet',
    'neet coaching demo',
    'try neet classes free',
    'biology demo class',
    'neet free trial class',
    'online neet demo',
    'free neet biology coaching trial',
  ],
  openGraph: {
    title: 'Book FREE NEET Biology Demo Class [Limited Spots]',
    description:
      'Experience our teaching with AIIMS-trained faculty. 45-min FREE demo, 67+ AIIMS selections. Book now!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/demo-booking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FREE NEET Biology Demo Class',
    description: 'AIIMS-trained faculty, 45-min FREE demo, limited slots!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/demo-booking',
  },
}

export default function DemoBookingLayout({ children }: { children: React.ReactNode }) {
  return children
}
