import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Centre Near Me | Best NEET Coaching Centres in Delhi NCR',
  description:
    'Find the best NEET coaching centre near you. 4 offline centers in Delhi NCR + online classes across India. AIIMS faculty, 98% success rate, affordable fees!',
  keywords: [
    'NEET coaching centre',
    'NEET coaching centre near me',
    'NEET coaching centres near me',
    'best NEET coaching centre',
    'best NEET coaching centre near me',
    'NEET coaching centre in Delhi',
    'NEET coaching centre in Rohini',
    'NEET coaching centre in Gurugram',
    'NEET coaching centre in Faridabad',
    'NEET coaching centre with best results',
  ],
  openGraph: {
    title: 'NEET Coaching Centre Near Me | Best NEET Coaching Centres in Delhi NCR',
    description:
      'Find the best NEET coaching centre near you. 4 centers in Delhi NCR: Rohini, Gurugram, South Extension, Faridabad. 98% success rate!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-centre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Centre Near Me',
    description:
      'Find the best NEET coaching centre near you. 4 centers + online classes. 98% success rate!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-centre',
  },
}

export default function NeetCoachingCentreLayout({ children }: { children: React.ReactNode }) {
  return children
}
