import type { Metadata } from 'next'
import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Gurgaon 2026 | DLF, Sector 14, 56 | Cerebrum Academy',
  description:
    'Best NEET coaching in Gurgaon — DLF, Sector 14, 56, Golf Course Road. AIIMS-trained faculty, 98% success rate, small batches. Book a free demo today!',
  openGraph: {
    title: 'Best NEET Coaching in Gurgaon 2026 | DLF, Sector 14, 56 | Cerebrum Academy',
    description:
      'Best NEET coaching in Gurgaon — DLF, Sector 14, 56, Golf Course Road. AIIMS-trained faculty, 98% success rate, small batches. Book a free demo today!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
  },
}

export default function GurgaonCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NearMeKeywordInjector
        location="Gurgaon"
        parentLocation="Delhi NCR"
        centerAddress="Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram - 122018"
        centerPhone="+91-8826-444-334"
        nearbyAreas={[
          'DLF Phase 1-5',
          'Sohna Road',
          'Golf Course Road',
          'Sector 49-57',
          'Manesar',
          'Palam Vihar',
          'Sector 14',
          'MG Road',
        ]}
      />
    </>
  )
}
