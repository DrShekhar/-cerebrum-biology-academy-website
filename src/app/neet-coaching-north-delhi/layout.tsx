import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'NEET Coaching in North Delhi | Rohini, Pitampura, Model Town',
  description:
    'Best NEET coaching for North Delhi students from Rohini, Pitampura, Model Town, Shalimar Bagh, Ashok Vihar. AIIMS faculty, 98% success rate. Book FREE demo!',
  keywords:
    'NEET coaching North Delhi, NEET coaching Rohini, NEET coaching Pitampura, NEET coaching Model Town, biology coaching North Delhi, medical coaching North Delhi, NEET preparation North Delhi',
  openGraph: {
    title: 'Best NEET Coaching in North Delhi',
    description:
      'Top NEET coaching for North Delhi students. Expert AIIMS faculty, small batches, 98% success rate. Serving Rohini, Pitampura, Model Town & more.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-north-delhi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in North Delhi | Rohini, Pitampura, Model Town',
    description: 'Best NEET coaching for North Delhi students from Rohini, Pitampura, Model Town, Shalimar Bagh, Ashok Vihar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-north-delhi',
  },
}

export default function NEETCoachingNorthDelhiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalBusinessSchema locationId="rohini" />
      {children}
      <NearMeKeywordInjector
        location="North Delhi"
        parentLocation="Delhi NCR"
        centerAddress="211 Vikas Surya Tower, DC Chauk, Rohini Sector 9, Delhi - 110085"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Rohini', 'Pitampura', 'Model Town', 'Shalimar Bagh', 'Ashok Vihar', 'Civil Lines', 'Wazirpur', 'Kohat Enclave']}
      />
    </>
  )
}
