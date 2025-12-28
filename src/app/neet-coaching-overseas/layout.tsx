import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching for NRI & Overseas Students | Online Classes from India',
  description:
    'Best NEET coaching for NRI students in UAE, Singapore, USA, UK, Australia. AIIMS trained faculty, flexible timings across time zones, NRI quota guidance. 98% success rate!',
  keywords: [
    'NEET coaching NRI',
    'NEET coaching overseas',
    'NEET coaching dubai',
    'NEET coaching UAE',
    'NEET coaching singapore',
    'NEET coaching USA',
    'NEET coaching UK',
    'NRI NEET preparation',
    'online NEET coaching abroad',
    'NEET for NRI students',
  ],
  openGraph: {
    title: 'NEET Coaching for NRI & Overseas Students | Online Classes from India',
    description:
      'Best NEET coaching for NRI students worldwide. AIIMS trained faculty, flexible timings, 630+ overseas students, NRI quota guidance.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-overseas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching for NRI & Overseas Students',
    description:
      'Best NEET coaching for NRI students worldwide. AIIMS trained faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-overseas',
  },
}

export default function NeetCoachingOverseasLayout({ children }: { children: React.ReactNode }) {
  return children
}
