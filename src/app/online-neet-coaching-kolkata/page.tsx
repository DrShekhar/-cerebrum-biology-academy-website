import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Kolkata | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Kolkata students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Kolkata.',
  keywords: [
    'online neet coaching kolkata',
    'best online neet coaching kolkata',
    'live online neet coaching kolkata',
    'online vs offline neet coaching kolkata',
    'online neet biology coaching kolkata',
    'online neet classes kolkata',
    'aiims faculty online neet kolkata',
  ],
  openGraph: {
    title: 'Online NEET Coaching in Kolkata | AIIMS Faculty',
    description:
      'Live online NEET coaching for Kolkata students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-kolkata',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-kolkata',
  },
}

export default function OnlineNEETCoachingKolkataPage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('kolkata')} />
}
