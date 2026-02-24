import type { Metadata } from 'next'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in Ghaziabad | Indirapuram, Vaishali, Crossing Republik | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Ghaziabad. 98% success rate, AIIMS faculty. Best coaching in Indirapuram, Vaishali, Crossing Republik, Raj Nagar Extension. 1,500+ students. Book free demo!',
  keywords:
    'NEET coaching Ghaziabad, NEET coaching Indirapuram, NEET classes Vaishali, biology coaching Crossing Republik, NEET tuition Raj Nagar Extension, NEET coaching Vasundhara, NEET coaching near Vaishali metro, NEET coaching Kaushambi, best NEET coaching Ghaziabad, NEET coaching near DPS Indirapuram, NEET coaching Ahinsa Khand, NEET preparation Ghaziabad, online NEET coaching Ghaziabad, NEET coaching NH-24, medical coaching Ghaziabad',
  openGraph: {
    title: 'Best NEET Coaching in Ghaziabad | Indirapuram, Vaishali',
    description:
      'Top NEET biology coaching in Ghaziabad with 98% success rate. AIIMS faculty, small batches. Join 1,students from Indirapuram, Vaishali, Crossing Republik.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Ghaziabad',
    description:
      'Top NEET biology coaching in Ghaziabad. 98% success rate. Indirapuram, Vaishali, Crossing Republik, Raj Nagar Extension.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad',
  },
}

export default function GhaziabadCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NearMeKeywordInjector
        location="Ghaziabad"
        parentLocation="Delhi NCR"
        centerAddress="B-45, Sector 62, Noida, Uttar Pradesh - 201301"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Indirapuram', 'Vaishali', 'Crossing Republik', 'Raj Nagar Extension', 'Vasundhara', 'Kaushambi', 'Ahinsa Khand', 'Govindpuram']}
      />
    </>
  )
}
