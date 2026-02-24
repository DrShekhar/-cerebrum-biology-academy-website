import type { Metadata } from 'next'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'NEET Coaching in East Delhi | Laxmi Nagar, Preet Vihar, Mayur Vihar',
  description:
    'Best NEET coaching for East Delhi students from Laxmi Nagar, Preet Vihar, Mayur Vihar, Patparganj, IP Extension. AIIMS faculty, 98% success rate. Book FREE demo!',
  keywords:
    'NEET coaching East Delhi, NEET coaching Laxmi Nagar, NEET coaching Preet Vihar, NEET coaching Mayur Vihar, biology coaching East Delhi, medical coaching East Delhi, NEET preparation East Delhi',
  openGraph: {
    title: 'Best NEET Coaching in East Delhi',
    description:
      'Top NEET coaching for East Delhi students. Expert AIIMS faculty, small batches, 98% success rate. Serving Laxmi Nagar, Preet Vihar, Mayur Vihar & more.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-east-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in East Delhi | Laxmi Nagar, Preet Vihar, Mayur Vihar',
    description: 'Best NEET coaching for East Delhi students from Laxmi Nagar, Preet Vihar, Mayur Vihar, Patparganj, IP Extension.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-east-delhi',
  },
}

export default function NEETCoachingEastDelhiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NearMeKeywordInjector
        location="East Delhi"
        parentLocation="Delhi NCR"
        centerAddress="D 35, South Extension Part 2, New Delhi - 110049"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Laxmi Nagar', 'Preet Vihar', 'Mayur Vihar', 'Patparganj', 'Nirman Vihar', 'Anand Vihar', 'Shahdara', 'Vivek Vihar']}
      />
    </>
  )
}
