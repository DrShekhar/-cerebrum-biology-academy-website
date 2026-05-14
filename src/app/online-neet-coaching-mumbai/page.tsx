import { Metadata } from 'next'
import { BestVerticalLanding } from '@/components/seo/BestVerticalLanding'
import { buildOnlineOfflineCityConfig } from '@/data/online-vs-offline-cities'

export const metadata: Metadata = {
  title: 'Online NEET Coaching in Mumbai | Live AIIMS Faculty | Cerebrum',
  description:
    'Online NEET coaching for Mumbai students — live (not recorded) classes by AIIMS-trained faculty. Small batches of 15–20. No commute, same faculty as offline. Compare online vs offline for Mumbai.',
  keywords: [
    'online neet coaching mumbai',
    'best online neet coaching mumbai',
    'live online neet coaching mumbai',
    'online vs offline neet coaching mumbai',
    'online neet biology coaching mumbai',
    'online neet classes mumbai',
    'aiims faculty online neet mumbai',
  ],
  openGraph: {
    title: 'Online NEET Coaching in Mumbai | AIIMS Faculty',
    description:
      'Live online NEET coaching for Mumbai students. Same AIIMS faculty as offline, no commute.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-coaching-mumbai',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-coaching-mumbai',
  },
}

export default function OnlineNEETCoachingMumbaiPage() {
  return <BestVerticalLanding config={buildOnlineOfflineCityConfig('mumbai')} />
}
