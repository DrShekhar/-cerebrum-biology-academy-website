import { NearMeKeywordInjector } from '@/components/seo/NearMeKeywordInjector'

export default function GurgaonCoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NearMeKeywordInjector
        location="Gurgaon"
        parentLocation="Delhi NCR"
        centerAddress="Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram - 122018"
        centerPhone="+91-8826-444-334"
        nearbyAreas={['DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'Sector 49-57', 'Manesar', 'Palam Vihar', 'Sector 14', 'MG Road']}
      />
    </>
  )
}
