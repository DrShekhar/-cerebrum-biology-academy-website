import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title:
    'NEET Coaching Faridabad — Sector 17 Centre | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching at Cerebrum Faridabad centre (Sector 17, HUDA Market). AIIMS-trained faculty, 15-20 student batches, 98% qualification rate. Serving Sector 21, NIT, Ballabgarh, Greater Faridabad. ₹40K-₹1.56L/year.',
  other: { 'article:modified_time': '2026-05-25' },
  keywords:
    'NEET coaching Faridabad, NEET coaching Greater Faridabad, NEET classes Sector 21, biology coaching Ballabgarh, NEET tuition NIT Faridabad, NEET coaching Sector 15, NEET coaching near Faridabad metro, NEET coaching Neharpar, best NEET coaching Faridabad, NEET coaching BPTP, NEET coaching Sector 86, NEET preparation Faridabad, online NEET coaching Faridabad, NEET coaching Faridabad Old, medical coaching Faridabad',
  openGraph: {
    title: 'NEET Coaching Faridabad — Sector 17 Centre | Cerebrum',
    description:
      'Top NEET biology coaching in Faridabad with 98% success rate. AIIMS faculty, small batches. Join 1,200+ students from Greater Faridabad, Sector 21, Ballabgarh.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Faridabad — Sector 17 Centre',
    description:
      'Top NEET biology coaching in Faridabad. 98% success rate. Greater Faridabad, Sector 21, NIT, Ballabgarh.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
  },
}

export default function FaridabadCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocalBusinessSchema locationId="faridabad" />
      {children}
      <NearMeKeywordInjector
        location="Faridabad"
        parentLocation="Delhi NCR"
        centerAddress="SCF-124-125, 2nd Floor, Above Union Bank, Huda Market, Sector 17, Faridabad - 121002"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['Sector 21', 'NIT Faridabad', 'Ballabgarh', 'Greater Faridabad', 'Sector 15', 'Neharpar', 'BPTP', 'Surajkund']}
      />
    </>
  )
}
