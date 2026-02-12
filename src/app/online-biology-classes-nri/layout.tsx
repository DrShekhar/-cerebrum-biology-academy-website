import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Online Biology Classes for NRI Students | NEET Preparation from Abroad | Cerebrum Academy',
  description:
    'Expert online biology classes for NRI students preparing for NEET. Multi-timezone support for USA, UK, UAE, Australia. International payment options. thousands of NRI students enrolled.',
  keywords: [
    'online biology classes NRI',
    'NEET preparation abroad',
    'NRI NEET coaching',
    'biology tuition for NRI students',
    'NEET classes USA',
    'NEET coaching UAE',
    'NEET preparation UK',
    'online NEET classes international',
    'biology classes for Indian students abroad',
    'NRI NEET preparation India',
  ],
  openGraph: {
    title: 'Online Biology Classes for NRI Students | NEET from Abroad',
    description:
      'Expert NEET biology preparation for NRI students in USA, UK, UAE, Australia. Multi-timezone classes, international payments accepted.',
    url: 'https://cerebrumbiologyacademy.com/online-biology-classes-nri',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Biology Classes for NRI Students',
    description: 'NEET preparation for Indian students abroad - USA, UK, UAE, Australia',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-classes-nri',
  },
}

export default function NRILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
